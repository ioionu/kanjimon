// script.js
var React = require('react');
var ReactDOM = require('react-dom');
require('fetch-polyfill');

require("babel-register");
var KanjiMon = require('./kanjimon.class.js');
var App = require('./app.class.js');
var DB = require('./db.class.js');
var dict;

// Checking if service worker is registered. If it's not, register it
// and reload the page to be sure the client is under service worker's control.
navigator.serviceWorker.getRegistration().then(function(registration) {
  if (!registration || !navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('/serviceWorker.js').then(function() {
      console.log('Service worker registered, reloading the page');
      //window.location.reload();
    });
  } else {
    console.log('DEBUG: client is under the control of service worker');
    proceed();
  }
});

function proceed() {
  console.log("fuuuuuu");
}

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
    var db = new DB(dict.kanjidic2.character);
    var app = new App(db);
    app.init();

  });
}

init();

var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function(){
  // process the server response
  console.log("stuff responded");
};
window.setTimeout(function(){
  httpRequest.open('GET', '/client/db/kanjidic2.json', true);
  fetch('/client/db/kanjidic2.json').then(function(res){console.log("derp");});
}, 2000);
