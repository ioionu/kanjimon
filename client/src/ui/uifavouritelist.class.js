import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UIDefBox from './uidefbox.class.js';
import KanjiFavourite from '../kanjifavourite.class.js';

class UIFavouriteList extends Component {
  componentDidMount() {
    console.log("i am UIFavouritesList mount");
    var kf = new KanjiFavourite();
    var favourites = kf.loadFavourites().map(
      (favourite) => {
        return this.props.data.db.search(favourite)[0];
      }
    );

    this.setState({favourites: favourites});
  }
  // componentWillReceiveProps: function(nextProps) {
  //   var keyword = nextProps.params.key;
  //   console.log("updating props", nextProps, keyword);
  //   var defs = this.props.data.db.search(keyword);
  //   this.setState({defs:defs});
  // },
  render() {
    if(!this.state) {
      return <div>thinking thinking thinking....</div>
    } else {
      var favouriteNodes = this.state.favourites.map(function(favourite){
        return (
          <UIDefBox key={favourite.kanji.key} data={favourite} />
        );
      });
      return (
        <div className="defList favourite-list">
          {favouriteNodes}
        </div>
      );
    }
  }
}

module.exports = UIFavouriteList;
