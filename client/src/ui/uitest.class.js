var React = require('react');

var UITest = React.createClass({
  render() {
    return <div>test {this.props.params.key}</div>
  }
});

module.exports = UITest;
