var React = require('react');
var marked = require('marked');
var KanjiMon = require('./kanjimon.class.js');

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
  getDB: function (e) {
    console.log("fu");
    this.props.onGetDB();
    e.preventDefault();
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
        <button onClick={this.getDB}>フエッチ</button>
      </div>
    );
  }
});

var UIDefList = React.createClass({
  render: function() {
    var defNodes = this.props.data.map(function(def){
      return (
        <UIDefBox key={def.kanji.key} data={def}/>
      );
    });
    return (
      <div className="defList">
        {defNodes}
      </div>
    );
  }
});

var UIDefBox = React.createClass({
  render: function() {
    console.log("i am def render", this.props);
    var char = this.props.data; //new KanjiMon( this.props.data.db.getRecordByCharacter(this.props.data.char) );
    var readings = char.getReading();
    var english = char.getEnglish().join(", ");
    var stroke_count = char.getStrokeCount();
    var jlpt = char.getJLPT();
    var literal = char.getLiteral();

    return (
      <div className="defBox">
        <h2>{literal} : Definition</h2>
        <dl>
          <dt>Kanji</dt>
          <dd>{literal}</dd>
          <dt>Onyomi</dt>
          <dd>{readings.ja_on}</dd>
          <dt>Kunyomi</dt>
          <dd>{readings.ja_kun}</dd>
          <dt>Translation</dt>
          <dd>{english}</dd>
          <dt>Stroke Count</dt>
          <dd>{stroke_count}</dd>
          <dt>JLPT</dt>
          <dd>{jlpt}</dd>
        </dl>
      </div>
    );
  }
});

var UIKanjiMon = React.createClass({
  componentDidMount: function() {
    console.log("i am mount");
  },
  getInitialState: function() {
    console.log("i am initial state", this.props.data);
    var defs = this.props.data.db.getKajisByReading("rain").map(function(def){
      return new KanjiMon(def);
    });
    return({defs: defs});
  },
  getDB: function() {
    this.props.data.db.getDB();
  },
  handleKanjiMonSearch: function(keyword) {
    console.log("i am handleKanjiMonSearch", keyword);
    var defs;

    // is this a kanji or an english word?
    var re = /[a-z]/i;
    if(keyword.match(re)) {
      //get kanjis
      defs = this.props.data.db.getKajisByReading(keyword).map(function(def){
        return new KanjiMon(def);
      });
      console.log("kanjis", defs);
      if(typeof defs == "object") { //TODO: check this is a valid KanjiMon
        this.setState({defs: defs});
      }
    } else {
      //assume is kanji
      //TODO: test for kanji and fail gracefully
      try {
        defs = [new KanjiMon( this.props.data.db.getRecordByCharacter(keyword.substr(0,1)) )];　// render expects an array
      } catch(e) {
        console.log("kanji not found", keyword);
      }
      console.log("kanjis", defs);
      if(typeof defs == "object") { //TODO: check this is a valid KanjiMon
        this.setState({defs: defs});
      }
    }

  },

  rawMarkup: function() {
    //var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    var rawMarkup = "<blink>yo!</blink>"
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div clasName="kanjimon" url="/client/db/kanjidic2.json">
        <UISearchBox
          onKanjiMonSearch={this.handleKanjiMonSearch}
          onGetDB={this.getDB}
          />
        <UIDefList data={this.state.defs} />
        <div className="about">
          <div className="version">Version {this.props.version}</div>
        </div>
      </div>
    );
  }
});

module.exports = UIKanjiMon;
