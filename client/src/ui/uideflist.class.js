import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UIDefBox from './uidefbox.class.js'

class UIDefList extends Component {
  componentDidMount() {
    var keyword = this.props.params.key;
    console.log("i am UIDefList mount", keyword);
    var defs = this.props.data.db.search(keyword);
    this.setState({defs:defs});
  }
  componentWillReceiveProps(nextProps) {
    var keyword = nextProps.params.key;
    console.log("updating props", nextProps, keyword);
    var defs = this.props.data.db.search(keyword);
    this.setState({defs:defs});
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

module.exports = UIDefList;
