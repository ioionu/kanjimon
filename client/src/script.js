// script.js
var React = require('react');
var ReactDOM = require('react-dom');
require('fetch-polyfill');

require("babel-register");
var KanjiMon = require('./kanjimon.class.js');
var App = require('./app.class.js');
var DB = require('./db.class.js');
var dict;


function findByKanji(kanji) {
  var def = dict.kanjidic2.character.find(
    function(ele, index, array) {
      if(ele.literal == kanji) {
        console.log(ele, index);
        return true;
      } else {
        return false;
      }
    }
  );

  var km = new KanjiMon(def);
  console.log("km:", km.getLiteral());
  return km;
}

/*
var search = document.getElementById("search");
  search.addEventListener("click", function(e){
  var kanji = document.getElementById("search-term").value;
  var km = findByKanji(kanji);

  ReactDOM.render(
    <DefBox data={km} />,
    document.getElementById('drop')
  );
});
*/

function init() {
  fetch('/client/db/kanjidic2.json')
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    dict = json;
    document.getElementById("drop").innerHTML = "done!";
    return dict;
  }).then(function(dict){
    //console.log("dict dump", dict.kanjidic2.character);
    var db = new DB(dict.kanjidic2.character);
    var app = new App(db);
    app.init();

  });
}

init();
