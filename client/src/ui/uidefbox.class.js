import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/*
import CardActions from 'material-ui/Card';
import CardHeader from 'material-ui/Card';
import CardMedia from 'material-ui/Card';
import CardTitle from 'material-ui/Card';
import CardText from 'material-ui/Card';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui-icons/Favorite';
import FavoriteBorder from 'material-ui-icons/FavoriteBorder';
*/

// import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
// import { Button } from 'react-toolbox/lib/button';

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
    var favouriteClass = classNames({
      "favourite-button": true,
      "is-favourite": char.isFavourite()
    });

    var favoriteIcon = char.isFavourite() ? (
      <button label="fav"/>
    ) : ( 
      <button label="unfav" /> 
    )

    const why_you_no_work = (
      <div className="defBox">
        <div>
          <h2>{literal}</h2>
          <div>
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
          <div>
            <button onClick={(e)=>{this.toggleFavourite(e)}} className={ favouriteClass } />
            { favoriteIcon }
          </div>
        </div>
      </div>
    );
    return why_you_no_work;
  }
};
export default UIDefBox;
