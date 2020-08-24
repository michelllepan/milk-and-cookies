import React from 'react';
import { ReactComponent as Logo } from './logo.svg';

class Cookie extends React.Component {

  render() {
    return (
      <Logo className="button-element" onClick={this.props.handleClick}/>
    )
  }
}

export default Cookie;