import React, {Component} from 'react'
import PropTypes from 'prop-types'

class UIDefBox extends Component {
  toggleFavourite(e) {
    this.props.data.toggleFavourite();
    this.forceUpdate();
  }
  render() {
    console.log("i am def render", this.props);
    var char = this.props.data; //new KanjiMon( this.props.data.db.getRecordByCharacter(this.props.data.char) );
    var readings = char.getReading();
    var english = char.getEnglish().join(", ");
    var stroke_count = char.getStrokeCount();
    var jlpt = char.getJLPT();
    var literal = char.getLiteral();
    var favouriteClass = {}
    // classNames({
    //   "favourite-button": true,
    //   "is-favourite": char.isFavourite()
    // });

    return (
      <section className="defBox">
        <h2>{literal}</h2>
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
        <button onClick={(e)=>{this.toggleFavourite(e)}} className={ favouriteClass }>Fav</button>
      </section>
    );
  }
};
module.exports = UIDefBox;
