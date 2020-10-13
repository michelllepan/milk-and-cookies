import React from 'react';
import { ReactComponent as Logo } from '../logo_small.svg';

class Cookie extends React.Component {

  render() {
    return (
      <Logo className="button-element" onMouseUp={(e) => {this.props.onClick(""); e.stopPropagation()}}/>
    )
  }
}

export default Cookie;