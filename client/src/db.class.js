import KanjiMon from './kanjimon.class.js';
import KMBattle from './kmbattle.class.js';

var DB = class DB {
  constructor() {
    this.db = {};
    this.ready = false;
  }

  init(callback) {
    this.getDB('/js/db.json')
    .then(() => {
      console.log('db b got');
      callback();
    });
  }

  getDB(url) {
    var db = this;
    return fetch(url)
    .then((response) => {
      var dict = response.json();
      return dict;
    })
    .then((dict) => {
      this.db = dict.kanjidic2.character;
      this.ready = true;
    });
  }

  getKanjisByJLPT(jlpt) {
    var kanjis = this.db.filter(
      function(element, index, array){
        var state = (element.misc.jlpt == jlpt);
        return state;
      }
    );
    return kanjis;
  }

  getRecordByCharacter(kanji) {
    var record = this.db.find(
      function(ele, index, array) {
        if(ele.literal == kanji) {
          console.log(ele, index);
          return true;
        } else {
          return false;
        }
      }
    );
    return record;
  }
  getKajisByReading(keyword) {
    console.log("length:", this.db.length);
    if (!this.ready) {
      console.log('db is nor ready');
      return [];
    }
    var results = this.db.filter((element, index, array) => {
      var def_found = false;
      var km = new KanjiMon(element);
      var english = km.getEnglish();
      var found = english.find((translation) => {
        //console.log(translation);
        //return (translation.toLowerCase().indexOf(keyword.toLowerCase()) >= 0);
        return (translation.toLowerCase() == keyword.toLowerCase());
      });
      return (typeof found != 'undefined');
    });
    return results;
  }

  getKanjisByYomi(keyword, yomi) {
    if (!this.ready) {
      console.log('db is nor ready');
      return [];
    }
    const results = this.db.filter((element, index, array) => {
      const km = new KanjiMon(element);
      const readings = km.getReading();
      if (readings[yomi]) {
        return (readings[yomi].indexOf(keyword) !== -1);
      }
      return false;
    });
    return results;
  }

  search(keyword) {

    let defs = [];

    // is this a kanji or an english word?
    const english_re = /[a-z]/i;

    /*
    * match https://www.unicode.org/charts/PDF/U3040.pdf
    * using https://stackoverflow.com/questions/21109011/javascript-unicode-string-chinese-character-but-no-punctuation
    * shits cool!
    * TODO: use this to lookup Kunyomi
    */
    const hiragana_re = /[\u{3040}-\u{309F}]+/u;

    if(keyword.match(english_re)) {
      //get kanjis
      defs = this.getKajisByReading(keyword).map(function(def){
        return new KanjiMon(def);
      });
    }
    else if (keyword.match(hiragana_re)) {
      defs = this.getKanjisByYomi(keyword, 'ja_kun').map((def) => {
        return new KanjiMon(def);
      });
    }
    else {
      //assume is kanji
      //TODO: test for kanji and fail gracefully
      try {
        defs = [new KanjiMon( this.getRecordByCharacter(keyword.substr(0,1)) )];　// render expects an array
      } catch(e) {
        console.log("kanji not found", keyword, e);
        defs = [];
      }
      console.log("kanjis", defs);
    }

    return defs;
  }
};

module.exports = DB;
