// script.js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// import Router from 'react-router';
// import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
// var Router = require('react-router').Router;
// var Route = require('react-router').Route;
// var Link = require('react-router').Link;
// var history = require('react-router').hashHistory; //browserHistory;
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

var css = require('../css/style.css')

//require("babel-register");
import KanjiMon from './kanjimon.class.js'
import UIKanjiMon from './ui.class.js'

import App from './app.class.js'
var dict;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}


function proceed() {
  console.log("do stuff with service worker");
}

function initRoute(app){
  console.log("i am initRoute", app);

  ReactDOM.render((
    <Router>
      <Route path="/" component={UIKanjiMon} />
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
