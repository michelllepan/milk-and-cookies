import React from 'react';
import styled from 'styled-components';
import Ingredient from './Ingredient';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;

  background-color: #3E3E3E99;
`
const PopupInner = styled.div`
  width: 850px;
  height: 600px;
  left: 50%;   
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  
  border-radius: 20px;
  background-color: #FFFFFF;
`
const Title = styled.h3`
  width: 80%;
  margin: 60px 0px 0px 60px;
`
const ListContainer = styled.div`
  margin: 30px 90px 20px 60px;
`

class Popup extends React.Component {

  state = {
    ingredients: [
      {
        name: "butter",
        selected: null,
        replacements: ["thing1", "thing2", "thing3"]
      },
      {
        name: "white sugar",
        selected: null,
        replacements: ["thing1", "thing2", "thing3"]
      },
      {
        name: "brown sugar",
        selected: null,
        replacements: ["thing1", "thing2", "thing3"]
      }
    ]
  }

  handleSelect = (ingredient, replacement) => {
    const i = this.state.ingredients.indexOf(ingredient)
    const ingredientList = this.state.ingredients
    ingredientList[i] = {name: ingredient.name,
                         selected: replacement,
                         replacements: ingredient.replacements}
    this.setState({ingredients: ingredientList})
  }

  render() {
    return (
      <Overlay>
        <PopupInner>
          <Title>
            Select the ingredients you'd like to find replacements for:
          </Title>
          <ListContainer>
            {this.state.ingredients.map(i => <Ingredient ingredient={i}
                                                         handleSelect={this.handleSelect} />)}
          </ListContainer>
        </PopupInner>
      </Overlay>

    )
  }
}

export default Popup;