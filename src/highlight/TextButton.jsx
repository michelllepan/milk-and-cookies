import React from 'react';
import { ReactComponent as Logo } from '../logo_small.svg';
import {replaceOnScreen} from '../extract.js'

class Cookie extends React.Component {

  render() {
    return (
      <button onClick={(e) => {this.props.onClick(); e.stopPropagation()}}>{replaceOnScreen(this.props.ingredient, this.props.selection)}</button>
    )
  }
}

export default Cookie;