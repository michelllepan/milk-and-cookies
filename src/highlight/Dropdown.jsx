import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as DownArrow } from '../assets/down-arrow.svg';
import { ReactComponent as UpArrow } from '../assets/up-arrow.svg';

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  opacity: 70%;

  ${props => props.isOpen && css`
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    opacity: 100%;
  `}

  ${props => props.selected && css`
    opacity: 100%;
  `}
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 5px 15px 5px 15px;
  background-color: #F3F3F3;
`
const SelectedText = styled.p`
  font-size: 18px;
  font-weight: 400;
  opacity: 50%;
  margin: 0px;
`
const ListWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 5px 0px 5px 0px;
  background-color: #FFFFFF;
  z-index: 10;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`
const ListItemWrapper = styled.div`
  padding: 4px 15px 4px 15px;

  opacity: 50%;
  &:hover {
    opacity: 80%;
  }
`
const ListText = styled.p`
  font-size: 18px;
  font-weight: 400; 
  margin: 0px;
`

class Dropdown extends React.Component {

  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  close = () => {
    this.setState({isOpen: false})
  }

  handleSelect = (selection) => {
    this.props.handleSelect(this.props.ingredient, selection)
  }

  componentDidUpdate = () => {
    setTimeout(() => {
      if (this.state.isOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.close);
  }

  render() {
    return (
      <Wrapper isOpen={this.state.isOpen} selected={this.props.ingredient.selected}>
        <Header className="button-element" onMouseUp={(e) => {this.toggleOpen(); e.stopPropagation();}}>
          <SelectedText>{ this.props.ingredient.selected ? this.props.ingredient.selected : 
                          "select a replacement"}</SelectedText>
          { this.state.isOpen ? <UpArrow /> : <DownArrow /> }
        </Header>
        { this.state.isOpen && 
          <ListWrapper> 
            { this.props.ingredient.replacements.map(r => 
              <ListItemWrapper className="button-element" onMouseUp={(e) => {this.props.ingredient.selected = r;}}>
                <ListText>{ r }</ListText>
              </ListItemWrapper>) 
            }
          </ListWrapper>
        }
      </Wrapper>
    )
  }
}

export default Dropdown;