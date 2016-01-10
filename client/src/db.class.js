var KanjiMon = require('./kanjimon.class.js');

var DB = class DB {
  constructor(db) {
    this.db = db;
  }

  getKanjisByJLPT(jlpt) {
    //console.log("jlpt filter:", dict);
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
    var fuck = "rain";
    var results = this.db.filter(
      function(element, index, array) {
        var fuck;
        //console.log("searchin for", keyword);
        var def_found = false;
        var km = new KanjiMon(element);
        var english = km.getEnglish();
        var found = english.find(function(translation) {
          //console.log(translation);
          //return (translation.toLowerCase().indexOf(keyword.toLowerCase()) >= 0);
          return (translation.toLowerCase() == keyword.toLowerCase());
        });
        return (typeof found != 'undefined');
      }
    );
    return results;
  }


};


module.exports = DB;
