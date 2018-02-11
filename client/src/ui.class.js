import React, {Component} from 'react'
import PropTypes from 'prop-types'
import marked from 'marked';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

import {db} from './db.js';
import KanjiMon from './kanjimon.class.js';
import UISearchBox from './ui/uisearchbox.class.js';
import UIDefList from './ui/uideflist.class.js';
import UIFavouriteList from './ui/uifavouritelist.class.js';
import UIDefBox from './ui/uidefbox.class.js';
import { Button } from 'react-toolbox/lib/button';

class UIDefListWrapper extends Component {
  render() {
    return (
      <UIDefList {...this.props} />
    )
  }
}

const UIDefPlaceholder = ({match}) => (
  <div>this is a thing xx</div>
)

class UIKanjiMon extends Component {
  constructor() {
    super();
    this.state = {ready:false};
  }

  componentDidMount() {
    db.init(() => {
      this.setState({
        ready: true
      })
    });
  }

  render() {
    if(!this.state.ready) {
      return (
        <div>loading loading loading... kanji db is big, should take a few seconds.</div>
      )
    } else {
      return (
        <div className="kanjimon" url="/db/kanjidic2.json">
          <UISearchBox
            onShowFavourites={this.handleShowFavourites}
            />
          <div className="defListWrapper">
            <Route exact path="/" component={UIDefPlaceholder} />
            <Route path="/search/:key" component={UIDefListWrapper} />
            <Route path="/kanji/:key" component={UIDefBox} />
            <Route exact path="/favourites" component={UIFavouriteList} />
          </div>

          <div className="about">
            _Under Construction : Copyright 2016 Joshua McCluskey : Fork me on github <a href="https://github.com/ioionu/kanjimon">https://github.com/ioionu/kanjimon</a> : Based on edict
          </div>
        </div>
      );
    }
  }
};

module.exports = UIKanjiMon;
