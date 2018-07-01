import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UIDefBox from './uidefbox.class.js'
import {db} from '../db.js';

class UIDefList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const keyword = this.props.match.params.key;
    console.log("i am UIDefList mount", keyword);
    const defs = db.search(keyword);
    this.setState({
      defs,
      keyword
    });
  }
  componentWillReceiveProps(nextProps) {
    const keyword = nextProps.match.params.key;
    const defs = db.search(keyword);
    this.setState({
      defs,
      keyword
    });
  }
  render() {
    if(!this.state) {
      return (
        <div>thinking thinking thinking....</div>
      )
    } else {
      var defNodes = this.state.defs.map(function(def){
        return (
          <UIDefBox key={def.kanji.key} data={def} />
        );
      });
      return (
        <div className="defList">
          {defNodes}
        </div>
      );
    }
  }
};

export default UIDefList;
