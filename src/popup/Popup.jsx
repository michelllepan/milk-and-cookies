import React from 'react';
import styled from 'styled-components';
import './Popup.css';

const PopupOuter = styled.div`
  width: 300px;
  height: 300px;

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
  height: 230px;
  overflow-y: scroll;
`
const Pair = styled.div`
  margin: 5px 0px;
`
const Ingredient = styled.p`
  margin-top: 5px;
`
const Replacement = styled.p`
  margin-top: 5px;
  margin-left: 10px;
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
      }]
  }

  render() {
    return (
      <PopupOuter>
        <PopupInner>
          <Title>Current Replacements:</Title>
          <ListContainer>
          {this.state.pairs.map(pair => (
              <Pair>
                <Ingredient>{pair.name}</Ingredient>
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