import React from 'react';
import styled, { css } from 'styled-components';
import './Popup.css';

const PopupOuter = styled.div`
  width: 350px;
  height: 400px;

  background: #FFFFFF;
  box-shadow: 0px 13px 47px rgba(0, 0, 0, 0.15);
  border-radius: 28px;
`
const PopupInner = styled.div`
  margin: 30px;
  
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  font-weight: 500;
  margin-top: 30px;
`
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 310px;
  overflow-y: scroll;
`
const Pair = styled.div`
  margin: 0px;

  ${props => !props.last && css`
    margin-bottom: 10px;
  `}
`
const Ingredient = styled.p`
  margin: 0px;

  ${props => !props.first && css`
    margin-top: 6px;
  `}
`
const Replacement = styled.p`
  margin: 12px 0px 0px 10px;
  color: #888888;
`

class Popup extends React.Component {

  state = {
    pairs:[
      {
        name: "3 cups all-purpose flour",
        replacements: ["3 cups rolled oats", "2½ teaspoons baking powder"]
      },
      {
        name: "1 cup butter",
        replacements: ["½ cup coconut oil"]
      },
      {
        name: "2 eggs",
        replacements: ["1 banana"]
      },
      {
        name: "3 eggs",
        replacements: ["100 bananas"]
      },
      {
        name: "4 eggs",
        replacements: ["20000 bananas", "22 bananas", "345 bananananas"]
      }
    ]
  }

  render() {
    return (
      <PopupOuter>
        <PopupInner>
          <Title>Current Replacements:</Title>
          <ListContainer>
          {this.state.pairs.map((pair, i) => (
              <Pair last={i == this.state.pairs.length - 1}>
                <Ingredient first={i == 0}>{pair.name}</Ingredient>
                {pair.replacements.map(r => <Replacement>{r}</Replacement>)}
              </Pair>
          ))}
          </ListContainer>
        </PopupInner>
      </PopupOuter>

    )
  }
}

export default Popup;