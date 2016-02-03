var React = require('react');
var ReactDOM = require('react-dom');

var Link = require('react-router').Link;

var UIKanjiMon = require('./ui.class.js');
var KanjiMon = require('./kanjimon.class.js');
var Battle = require('./kmbattle.class.js');

var App = React.createClass({

  render() {
    console.log("rndering app");
    return(
      <div className="app">
        {this.props.children}
      </div>
    )
  }
});

module.exports = App;
