import React, {Component} from 'react'
import PropTypes from 'prop-types'
import marked from 'marked';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

import DB from './db.class.js';
import KanjiMon from './kanjimon.class.js';
import UISearchBox from './ui/uisearchbox.class.js';
import UIDefList from './ui/uideflist.class.js';

const db = new DB();

class UIBattle extends Component {
  battle(){
    console.log("lol");
  }
  render() {
    var defNodes = 123;
    return (
      <div className="defList">
        <button onClick={this.battle}>こうげき</button>
      </div>
    );
  }
}

class UIDefListWrapper extends Component {
  render() {
    return (
      <UIDefList {...this.props} data={db}/>
    )
  }
}


class UIKanjiMon extends Component {
  componentDidMount() {
    console.log("i am mount");
    this.db = db;
    var _this = this; //TODO: make bind work with promise?
    return db.getDB('/db/kanjidic2.json')
    .then(function(){
      var defs = db.getKajisByReading("rain").map(function(def){
        return new KanjiMon(def);
      });
      return defs;
    })
    .then(function(defs){
      _this.setState({
        defs: defs,
        db: db
      });
    });
  }

  getInitialState() {
    console.log("i am initial state", this);
    return null;
  }
  getDB() {
    db.getDB();
  }
  attack() {
    var km1 = new KanjiMon(db.getKajisByReading("rain")[0]);
    var km2 = new KanjiMon(db.getKajisByReading("sun")[0]);
    this.props.data.attack(km1, km2);
  }
  handleShowFavourites() {
    //browserHistory.push('/favourites');
  }

  render() {
    if(!this.state) {
      return (
        <div>loading loading loading... kanji db is big, should take a few seconds.</div>
      )
    } else {
      return (
        <div className="kanjimon" url="/db/kanjidic2.json">
          <UISearchBox
            onShowFavourites={this.handleShowFavourites}
            onGetDB={this.getDB}
            />
          <div className="defListWrapper">
          <Route path="/search/:key" component={UIDefListWrapper} data='w00t!'/>
          </div>
          <div className="about">
            Under Construction : Copyright 2016 Joshua McCluskey : Fork me on github <a href="https://github.com/ioionu/kanjimon">https://github.com/ioionu/kanjimon</a> : Based on edict
          </div>
        </div>
      );
    }
  }
};

module.exports = UIKanjiMon;
