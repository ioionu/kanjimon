import React, {Component} from 'react'
import PropTypes from 'prop-types'

class UITest extends Component {
  render() {
    return <div>test {this.props.params.key}</div>
  }
}

module.exports = UITest;
