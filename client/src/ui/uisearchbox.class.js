import React, {Component} from 'react'
import PropTypes from 'prop-types'
/*
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui-icons/Search';
import Favorite from 'material-ui-icons/Favorite';
import AppBar from 'material-ui/AppBar';
import withStyles from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';

import { Button } from 'react-toolbox/lib/button';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Input } from 'react-toolbox/lib/input';
import { Navigation } from 'react-toolbox/lib/navigation';
*/

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import {db} from '../db.js';

const styles = {
  flex: {
    flex: 1
  }
};


class UISearchBox extends Component {
  handleSearch(e) {
    e.preventDefault();
    if(this.state !== null && this.state.keyword !== null) {
      var keyword = this.state.keyword;
      //this.props.onKanjiMonSearch(kanji);
      this.props.history.push('/search/' + keyword);
    } else {
      this.props.history.push('/');
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

  render() {
    const { classes } = this.props;

    const SearchButton = withRouter(({history})=>(
      <button onClick={(e)=>{this.handleSearch(e)}}>
        Search
      </button>
    ))

    return (
      <div className='menu'>
        <div className="wrapper">
          <div>
            <input
              type="text"
              name="char"
              hint="Search by kanji or english"
              onChange={(e)=>{this.handleCharChange(e)}}
              className="char"
            />
          </div>
          <div>
            <SearchButton/>
          </div>
          <div>
            <Link to='/favourites'>
            Fav
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(UISearchBox)
