import React from 'react';
import { ReactComponent as Logo } from '../logo_small.svg';

class Cookie extends React.Component {

  render() {
    return (
      <Logo className="button-element" onClick={this.props.onClick}/>
    )
  }
}

export default Cookie;