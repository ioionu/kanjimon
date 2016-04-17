var KanjiFavourite = require("./kanjifavourite.class.js");
var KanjiMon = class KanjiMon {
  constructor(kanji) {
    if(typeof kanji == 'undefined') {
      throw new ReferenceError();
    }
    this.kanji = kanji;
    this.kanji.key = this.kanji.literal;
    this.favourite = new KanjiFavourite( this );

    //  console.log("i am kanji");
  }

  getLiteral() {
    return this.kanji.literal;
  }

  getReading() {
    var readings = {};

    //some kanji readigs are not an array... agh. eg "犭"
    //TODO: this is a horrible test, based on http://stackoverflow.com/questions/4775722/check-if-object-is-array
    if(Object.prototype.toString.call(this.kanji.reading_meaning.rmgroup.reading) === '[object Array]') {
      for (var read of this.kanji.reading_meaning.rmgroup.reading ) {
        if (read['@r_type'] == 'ja_on')
          readings.ja_on = read['#text'];
        if (read['@r_type'] == 'ja_kun')
          readings.ja_kun = read['#text'];
      }
      console.log("shit", readings);
    }
    return readings;
  }

  getEnglish() { //TODO: make this a generic "getReading"
    //some kanji have no meaning eg "乁" and some no reading_meaning eg "𠂉"
    if(
      typeof this.kanji.reading_meaning == 'undefined' ||
      typeof this.kanji.reading_meaning.rmgroup.meaning == 'undefined'
    ) {
      return []; //return empty array
    }

    //if only one meaning we can just return it. eg 薔
    if(typeof this.kanji.reading_meaning.rmgroup.meaning == 'string')
      return [this.kanji.reading_meaning.rmgroup.meaning]; // always return as array

    //otherwise build from array
    var english = this.kanji.reading_meaning.rmgroup.meaning
      .filter(function(element, index, array){
        return (typeof element == 'string');
      });
    return english;
  }

  getStrokeCount() {
    if (typeof this.kanji.misc.stroke_count == 'string') {
      return this.kanji.misc.stroke_count;
    }
    var count = this.kanji.misc.stroke_count.reduce(function(prev, currentValue, currentIndex){
      console.log("reducing:", prev, currentValue, currentIndex);
      return prev > currentValue ? prev : currentValue;
    });
    return count;
  }

  getJLPT() {
    if (typeof this.kanji.misc.jlpt == 'string') {
      return this.kanji.misc.jlpt;
    }
  }

  toggleFavourite() {
    this.favourite.toggle();
  }

  isFavourite() {
    return this.favourite.isFavourite();
  }

};

module.exports = KanjiMon;
