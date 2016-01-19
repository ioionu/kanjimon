var React = require('react');
var ReactDOM = require('react-dom');
var UIKanjiMon = require('./ui.class.js')
var KanjiMon = require('./kanjimon.class.js');

var App = class {
  constructor(db) {
    this.db = db;
  }

  init() {
    console.log("i am app init", this.db);
    var data = {};
    ReactDOM.render(
      <UIKanjiMon version="0.0.1" data={this} />,
      document.getElementById('drop')
    );
  }
};

module.exports = App;
