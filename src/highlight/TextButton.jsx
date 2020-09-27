import React from 'react';
import { ReactComponent as Logo } from '../logo_small.svg';

class Cookie extends React.Component {

  render() {
    return (
      <button onClick={(e) => {this.props.onClick(); e.stopPropagation()}}>{this.props.selection}</button>
    )
  }
}

export default Cookie;