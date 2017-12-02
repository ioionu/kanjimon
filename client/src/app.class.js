import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import UIKanjiMon from './ui.class.js';
import KanjiMon from './kanjimon.class.js';

class App extends Component {

  render() {
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
