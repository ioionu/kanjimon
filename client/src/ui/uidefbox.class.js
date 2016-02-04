var React = require('react');

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
module.exports = UIDefBox;
