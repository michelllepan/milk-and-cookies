import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';

class Cookie extends React.Component {

  state = {
      showing: false
  }

  handleClick = () => {
      if (this.state.showing) {
          this.props.handleUnmount()
      } else {
          this.props.handleMount()
      }
      this.setState({showing: !this.state.showing})
  }

  render() {
    return (
      <Logo className="button-element" onClick={this.handleClick}/>
    )
  }
}

export default Cookie;