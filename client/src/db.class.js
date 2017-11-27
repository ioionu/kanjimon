var KanjiMon = require('./kanjimon.class.js');
var KMBattle = require('./kmbattle.class.js');


var DB = class DB {
  constructor() {
    this.db = {};
    this.ready = false;
  }

  init(callback) {
    this.getDB('/db/kanjidic2.json')
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

  newBattle() {
    var battle = new KMBattle(
      new KanjiMon(this.getRecordByCharacter("雨")),
      new KanjiMon(this.getRecordByCharacter("服"))
    );
    this.battles.push(battle);
    return battle;
  }

  search(keyword) {

    var defs;

    // is this a kanji or an english word?
    var re = /[a-z]/i;
    if(keyword.match(re)) {
      //get kanjis
      defs = this.getKajisByReading(keyword).map(function(def){
        return new KanjiMon(def);
      });
      console.log("kanjis", defs);
    } else {
      //assume is kanji
      //TODO: test for kanji and fail gracefully
      try {
        defs = [new KanjiMon( this.getRecordByCharacter(keyword.substr(0,1)) )];　// render expects an array
      } catch(e) {
        console.log("kanji not found", keyword, e);
      }
      console.log("kanjis", defs);
    }

    return defs;
  }
};

module.exports = DB;
