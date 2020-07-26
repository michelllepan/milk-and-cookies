import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Checkbox } from './Checkbox.svg';
import { ReactComponent as CheckboxSelected } from './checkbox-selected.svg';
import Dropdown from './Dropdown';
//import App from '../App';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`
const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const IngredientText = styled.p`
  margin-left: 20px;
  font-size: 22px;
  font-weight: 600;
`

class Ingredient extends React.Component {

  handleSelect = () => {
    if (this.props.ingredient.selected === null) {
      //console.log(
      //this.props.ingredient.replacements[2]["replacer"][0]["name"])
      //console.log(this.props.ingredient.replacements[2]["replacer"].length)
      /*
      if (this.props.ingredient.replacements[2]["replacer"].length === 2){
        var value = this.props.ingredient.replacements[2]["replacer"][0]["name"] + " and " + this.props.ingredient.replacements[2]["replacer"][1]["name"]
      }
      else{
        var value = this.props.ingredient.replacements[2]["replacer"][0]["name"]
      }
      */
     var value = this.props.ingredient.replacements[0]


      this.props.handleSelect(this.props.ingredient, value)
      console.log("hello")
    } else {
      this.props.handleSelect(this.props.ingredient, null)
    }
  }

  render() {
    return (
      <Wrapper>
        <LabelWrapper>
          { this.props.ingredient.selected ? <CheckboxSelected className="button-element" onClick={this.handleSelect} /> : 
            <Checkbox className="button-element" onClick={this.handleSelect} /> }
          <IngredientText>{ this.props.ingredient.name }</IngredientText>
        </LabelWrapper>
        <Dropdown ingredient={this.props.ingredient} handleSelect={this.props.handleSelect} />
      </Wrapper>
    )
  }
}

export default Ingredient;