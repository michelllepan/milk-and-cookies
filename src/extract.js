import Ingredient from './Ingredient'
/**
 * Overarching function called by frontend, must be exported
 * @return {Array} Array of ingredient objects with keys "name" (of replacee), "selected" (null), and "replacements"
 * 
 * SAMPLE: 
 * [{name: "all-purpose flour", 
 *   selected: null, 
 * 	 replacements: ["rolled oats and baking powder", "whole wheat flour and white flour"]}, ...]
 */
export function getOptions(){
    //JANVI WILL DO
}


// record of ingredients to export
var ingredients = []

/**
 * Uses titles from the website to populate the record of Ingredient instances
 */
function populateIngredients() {
    titles = getTitles()
    // for each ingredient object in database:
        // IF the ingredient name is in titles, construct Ingredient instance and add to ingredient list
        // pass in the ingredient object to the constructor
	for (var i=0; i<titles.length; i++){
		ingredients.push(new Ingredient(titles[i]))
	}
}

/**
 * Gets the titles from the website
 * @return {Array} array of titles from the website
 * SAMPLE:
 * ["2 cups all-purpose flour", "3 teaspoons salt"]
 */
function getTitles(){
    var ingred_title = []
    //obtain both lists
    var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
    //get all the ingredients of class checkList__line
    var lines = []
    for (var i = 0; i < checklists.length; i++){
        lines.push(checklists[i].getElementsByClassName("checkList__line"))
    }
    //extract label ng-class of the checkList__line
    for (var j = 0; j < lines.length; j++){
        //get the ingredient title
        for (var k = 0; k < lines[j].length; k++){
            var item = lines[j][k].getElementsByClassName("checkList__item")
            ingred_title.push(item[0].textContent.trim())
        }
    }
    //get rid of the title that says "Add items to cart"
    ingred_title.splice(ingred_title.length-1, ingred_title.length)
    return ingred_title
}

/**
 * Replaces selected ingredients/measurements with corresponding replacement
 * @param {Array} toReplace list of Ingredient instances to replace on screen
 */
export function replaceOnScreen(toReplace){
    //JANVI WILL COMPLETE
	// names of Ingredient instances to replace
	names = toReplace.map(Ingredient.getName)
	// access checklists
    var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
    for (var i = 0; i < checklists.length; i++){
		// access lines
		var lines = checklists[i].getElementsByClassName("checkList__line")
		// alter text on each line
        for (var j = 0; j<lines.length; j++){
			var text_to_change = lines[j].getElementsByClassName("recipe-ingred_txt added")[0].innerText // {"2 cups butter, softened", Ingredient(....)}
			// check if the ingredient is among the list of ingredients to replace
			if(names.includes(ingred.getName())){

				//change the text
				text_to_change = 
			}
        }
    }
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