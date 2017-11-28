import React, {Component} from 'react'
import PropTypes from 'prop-types'
import marked from 'marked';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import {db} from '../db.js';

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
    const SearchButton = withRouter(({history})=>(
      <button
        type='button'
        onClick={(e)=>{this.handleSearch(e)}}>
        Σ(O_O) 検索
      </button>
    ))

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
          <SearchButton/>
          <Link to='/favourites'>Fav 2.0</Link>
        </form>
      </div>
    );
  }
};

export default withRouter(UISearchBox)
