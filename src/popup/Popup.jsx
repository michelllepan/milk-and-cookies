import React from 'react';
import styled from 'styled-components';
import Ingredient from './Ingredient';
import getIngred from './ingredextract';
import getReplacer from './ingredextract';

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
  display: flex;
  flex-direction: column;
  height: 315px;
  overflow-y: scroll;
  margin: 30px 65px 20px 60px;
  padding-right: 20px;
`
const ButtonContainer = styled.div`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 20px;
`
const Button = styled.div`
  width: fit-content;
  padding: 7px 12px 7px 12px;

  background-color: #FF8159;
  border-radius: 5px;
  margin: auto;
`
const Text = styled.p`
  font-size: 22px;
  font-weight: 700;
  color: #FFFFFF;
`

class Popup extends React.Component {
  
  state = {
    ingredients: []
  }

  componentDidMount = () => {
    const components = []
    const names = getIngred()
    for (let i=0; i<names.length; i++) {
      const replacements = getReplacer()
      const obj = {name: names[i], selected: null, subs: replacements[names[i]]}
      components.push(obj)
    }
    this.setState({ingredients: components})
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
          <ButtonContainer>
            <Button className="button-element">
              <Text>continue</Text>
            </Button>
          </ButtonContainer>
        </PopupInner>
      </Overlay>

    )
  }
}

export default Popup;