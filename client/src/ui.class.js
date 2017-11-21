import React, {Component} from 'react'
import PropTypes from 'prop-types'
import marked from 'marked';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import DB from './db.class.js';
import KanjiMon from './kanjimon.class.js';

import UIDefList from './ui/uideflist.class.js';

class UISearchBox extends Component {
  search(e) {
    console.log("search", e);
    var kanji = {
      translation: ["desu"]
    };
    return kanji;
  }
  handleSearch(e) {
    e.preventDefault();
    if(this.state.keyword !== null) {
      var kanji = this.state.keyword;
      this.props.onKanjiMonSearch(kanji);
    }
  }
  handleCharChange(e) {
    if (e.target.value.length > 0) {
      var char = e.target.value.trim();
      char = char.substr(0,1);
      var keyword = e.target.value.trim();
      this.setState({char: char, keyword:keyword});
    }
  }
  handleShowFavourites(e) {
    e.preventDefault();
    this.props.onShowFavourites();
  }
  render() {
    return (
      <div className="searchBox">
        <form className="search" onSubmit={(e)=>{this.handleSearch(e)}}>
          <input
            name="char"
            type="text"
            placeholder="Search by kanji or english"
            onChange={(e)=>{this.handleCharChange(e)}}
            className="char"
            />
          <input
            type="submit"
            value="Σ(O_O) 検索"
            className="button"
            />
          <button
            className="showFavourites"
            onClick={(e)=>{this.handleShowFavourites(e)}}
            >Fav</button>
        </form>
      </div>
    );
  }
};

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

class UIKanjiMon extends Component {
  componentDidMount() {
    console.log("i am mount");
    this.db = new DB();
    var _this = this; //TODO: make bind work with promise?
    return _this.db.getDB('/db/kanjidic2.json')
    .then(function(){
      var defs = _this.db.getKajisByReading("rain").map(function(def){
        return new KanjiMon(def);
      });
      return defs;
    })
    .then(function(defs){
      _this.setState({
        defs: defs,
        db: _this.db
      });
    });
  }

  getInitialState() {
    console.log("i am initial state", this);
    return null;
  }
  getDB() {
    this.props.data.db.getDB();
  }
  attack() {
    var km1 = new KanjiMon(this.props.data.db.getKajisByReading("rain")[0]);
    var km2 = new KanjiMon(this.props.data.db.getKajisByReading("sun")[0]);
    this.props.data.attack(km1, km2);
  }
  handleKanjiMonSearch(keyword) {
    console.log("i am handleKanjiMonSearch", keyword);
    this.props.history.push('/search/' + keyword);
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
            onKanjiMonSearch={(keyword)=>{this.handleKanjiMonSearch(keyword)}}
            onShowFavourites={this.handleShowFavourites}
            onGetDB={this.getDB}
            />
          <div className="defListWrapper">
           {(this.props.children && React.cloneElement(this.props.children, {data: {defs: this.state.defs, db: this.state.db}}) ) || "Try the search box :D"}</div>
          <div className="about">
            Under Construction : Copyright 2016 Joshua McCluskey : Fork me on github <a href="https://github.com/ioionu/kanjimon">https://github.com/ioionu/kanjimon</a> : Based on edict
          </div>
        </div>
      );
    }
  }
};

module.exports = UIKanjiMon;
