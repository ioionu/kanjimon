var React = require('react');
var UIDefBox = require('./uidefbox.class.js');

var UIDefList = React.createClass({
  componentDidMount: function() {
    var keyword = this.props.params.key;
    console.log("i am UIDefList mount", keyword);
    var defs = this.props.data.db.search(keyword);
    this.setState({defs:defs});
  },
  componentWillReceiveProps: function(nextProps) {
    var keyword = nextProps.params.key;
    console.log("updating props", nextProps, keyword);
    var defs = this.props.data.db.search(keyword);
    this.setState({defs:defs});
  },
  render: function() {
    if(!this.state) {
      return <div>thinking thinking thinking....</div>
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
});

module.exports = UIDefList;
