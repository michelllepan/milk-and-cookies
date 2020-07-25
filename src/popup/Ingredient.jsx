import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Checkbox } from './checkbox.svg';
import { ReactComponent as CheckboxSelected } from './checkbox-selected.svg';
import Dropdown from './Dropdown';

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
      this.props.handleSelect(this.props.ingredient, this.props.ingredient.replacements[0])
      console.log(this.props.ingredient.replacements[0])
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