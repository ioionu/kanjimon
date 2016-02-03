var React = require('react');
var marked = require('marked');
var browserHistory = require('react-router').browserHistory;


var DB = require('./db.class.js');
var KanjiMon = require('./kanjimon.class.js');

var UIDefList = require('./ui/uideflist.class.js');

var UISearchBox = React.createClass({
  search: function(e) {
    console.log("search", e);
    var kanji = {
      translation: ["desu"]
    };
    return kanji;
  },
  handleSearch: function (e) {
    e.preventDefault();
    var kanji = this.state.keyword;
    this.props.onKanjiMonSearch(kanji);
  },
  handleCharChange: function (e) {
    if (e.target.value.length > 0) {
      var char = e.target.value.trim();
      char = char.substr(0,1);
      var keyword = e.target.value.trim();
      this.setState({char: char, keyword:keyword});
    }
  },
  render: function() {
    return (
      <div>
        <form className="search" onSubmit={this.handleSearch}>
          <input
            name="char"
            type="text"
            placeholder="search me"
            onChange={this.handleCharChange}
            />
          <input
            type="submit"
            value="捜"
            />
        </form>
      </div>
    );
  }
});

var UIBattle = React.createClass({
  battle: function(){
    console.log("lol");
  },
  render: function() {
    var defNodes = 123;
    return (
      <div className="defList">
        <button onClick={this.battle}>こうげき</button>
      </div>
    );
  }
});

var UIKanjiMon = React.createClass({
  componentDidMount: function() {
    console.log("i am mount");
    this.db = new DB();
    var _this = this; //TODO: make bind work with promise?
    return _this.db.getDB('/client/db/kanjidic2.json')
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
  },
  getInitialState: function() {
    console.log("i am initial state", this);
    return null;
  },
  getDB: function() {
    this.props.data.db.getDB();
  },
  attack: function() {
    var km1 = new KanjiMon(this.props.data.db.getKajisByReading("rain")[0]);
    var km2 = new KanjiMon(this.props.data.db.getKajisByReading("sun")[0]);
    this.props.data.attack(km1, km2);
  },
  handleKanjiMonSearch: function(keyword) {
    console.log("i am handleKanjiMonSearch", keyword);
    browserHistory.push('/search/' + keyword);
    // var defs = this.db.search(keyword);
    // if(typeof defs == "object") { //TODO: check this is a valid KanjiMon
    //   this.setState({defs: defs});
    // }
  },

  rawMarkup: function() {
    //var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    var rawMarkup = "<blink>yo!</blink>"
    return { __html: rawMarkup };
  },
  render: function() {
    if(!this.state) {
      return <div>loading loading loading...</div>
    } else {
      return (
        <div clasName="kanjimon" url="/client/db/kanjidic2.json">
          <UISearchBox
            onKanjiMonSearch={this.handleKanjiMonSearch}
            onGetDB={this.getDB}
            />
          <div className="defListWrapper">
           {(this.props.children  && React.cloneElement(this.props.children, {data: {defs: this.state.defs, db: this.state.db}}) ) || "nada"}</div>
          <div className="about">
            <div className="version">Version {this.props.version}</div>
          </div>
          <UIBattle onAttack={this.attack} />

        </div>
      );
    }
  }
});

module.exports = UIKanjiMon;
