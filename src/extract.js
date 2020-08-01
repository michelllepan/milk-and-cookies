/**
 * Overarching function called by frontend, must be exported
 * @return {Array} Array of ingredient objects with keys "name" (of replacee), "selected" (null), and "replacements"
 * 
 * SAMPLE: 
 * [{name: "all-purpose flour", 
 *   selected: null, 
 * 	 replacements: ["rolled oats and baking powder", "whole wheat flour and white flour"]}, ...]
 */
function getOptions(){
    // create an empty list to store the components
    // 
}

// record of ingredients to export
var ingredients = {}

/**
 * Populates the record of ingredients
 * SAMPLE:
 * {"all-purpose flour": [1, "cup"]}
 */
function populateIngredients() {
    
}



/**
 * Gets the replacements for each ingredient
 * @return {Object} keys are ingredient names, values are lists contianing the replacements
 * SAMPLE:
 * {"all-purpose flour": ["rolled oats", "baking powder"]}
 */
function getReplacements(){
    
}


/*

componentDidMount = () => {
    const components = []
    const replacements = getReplacer()
    const things = onlyReplacements()
    for (var replacer in replacements) {
      const obj = {name: replacer, selected: null, replacements: things[replacer]}
      components.push(obj)
    }
    this.setState({ingredients: components})
  }

*/