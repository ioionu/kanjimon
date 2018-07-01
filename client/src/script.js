// script.js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//import style from '../css/style.css'
//style.use()

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

function initRoute(app){
  ReactDOM.render((
    <Router>
      <Route path="/" component={UIKanjiMon} />
    </Router>
    ), document.getElementById('drop')
  );
}

function init() {
  //var app = new App();
  //initRoute(app);
  initRoute();
}

initRoute();

if (module.hot) {
  module.hot.accept('./ui.class.js', initRoute);
}