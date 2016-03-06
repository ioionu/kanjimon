// script.js
var React = require('react');
var ReactDOM = require('react-dom');

// import Router from 'react-router';
// import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var history = require('react-router').hashHistory; //browserHistory;

require('fetch-polyfill');
require("babel-register");
var KanjiMon = require('./kanjimon.class.js');
var UIKanjiMon = require('./ui.class.js');
var UIDefList = require('./ui/uideflist.class.js');
var UIDefBox = require('./ui/uidefbox.class.js');

var App = require('./app.class.js');
var DB = require('./db.class.js');
var dict;

// Checking if service worker is registered. If it's not, register it
// and reload the page to be sure the client is under service worker's control.
navigator.serviceWorker.getRegistration().then(function(registration) {
  if (!registration || !navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('/serviceWorker.js').then(function() {
      console.log('Service worker registered, reloading the page');
    });
  } else {
    console.log('DEBUG: client is under the control of service worker');
    proceed();
  }
});

function proceed() {
  console.log("do stuff with service worker");
};

function initRoute(app){
  console.log("i am initRoute", app);

  ReactDOM.render((
    <Router history={history}>
        <Route path="/" component={UIKanjiMon}>
          <Route path="/search/:key" component={UIDefList} />
          <Route path="/kanji/:key" component={UIDefBox} />
        </Route>
    </Router>
    ), document.getElementById('drop')
  );
}

function init() {
    var app = new App();
    initRoute(app);

    //var battle = db.newBattle();
    //battle.attack();
}

init();
