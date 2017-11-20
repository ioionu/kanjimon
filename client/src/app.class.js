import React, {Component} from 'react'
import ReactDOM from 'react-dom'

//var Link = require('react-router').Link;

import UIKanjiMon from './ui.class.js';
import KanjiMon from './kanjimon.class.js';
import Battle from './kmbattle.class.js';

class App extends Component {

  render() {
    console.log("rndering app");
    return(
      <div className="app">
        {
          this.props.children
          && React.cloneElement(this.props.children, {data: {version: '0.1'}})
          || <div>search</div>
        }
      </div>
    )
  }
}

module.exports = App;
