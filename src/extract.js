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

var ingredients = []
var ingredient_names = {}
var database = require('./new_database.json')


export function getOptions(){
    var options = []
    populateIngredients()
    populateIngredientNames()
    for(var i = 0; i < ingredients.length; i++){
        var temp = {name: ingredients[i].name, 
                selected: null, 
                replacements: ingredients[i].replacements.map(r => r.name)}
        options.push(temp)
    }
    return options
    
}

function populateIngredientNames(){
    for (var i = 0; i < ingredients.length; i++){
        ingredient_names[ingredients[i].name] = ingredients[i]
    }
}

/**
 * Uses titles from the website to populate the record of Ingredient instances
 */
//FIX THIS FUNCTION - INGREDIENT CLASS TAKES IN TWO THINGS
function populateIngredients() {
    var titles = getTitles()
    // for each ingredient object in database:
        // IF the ingredient name is in titles, construct Ingredient instance and add to ingredient list
        // pass in the ingredient object to the constructor
	for (var i=0; i<titles.length; i++){
        if (database[Ingredient.getName(titles[i])] !== undefined) {
            ingredients.push(new Ingredient(titles[i], database[Ingredient.getName(titles[i])]))
        }
	}
}

/**
 * Gets the titles from the website
 * @return {Array} array of titles from the website
 * SAMPLE:
 * ["2 cups all-purpose flour", "3 teaspoons salt"]
 */
function getTitles(){
    var ingred_titles = []
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
            ingred_titles.push(item[0].textContent.trim())
        }
    }
    //get rid of the title that says "Add items to cart"
    ingred_titles.splice(ingred_titles.length-1, ingred_titles.length)
    return ingred_titles
}

/**
 * Replaces selected ingredients/measurements with corresponding replacement
 * @param {Object} toReplace object with keys as ingredient names and values as replacement names {"all-purpose flour": "rolled oats and baking powder"}
 */
export function replaceOnScreen(toReplace){    
	// names of Ingredient instances to replace
	var names = Object.keys(toReplace)
	// access checklists
    var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
    for (var i = 0; i < checklists.length; i++){
		// access lines
		var lines = checklists[i].getElementsByClassName("checkList__line")
		// alter text on each line
        for (var j = 0; j<lines.length; j++){
			var text_to_change = lines[j].getElementsByClassName("recipe-ingred_txt added")[0].innerText // "2 cups butter softened"
            // check if the ingredient is among the list of ingredients to replace
            
            var ingred_in_title = included(names, text_to_change)
            if(ingred_in_title != ""){
                var replacement = ingredient_names[ingred_in_title].calculateAmount(toReplace[ingred_in_title])
                lines[j].getElementsByClassName("recipe-ingred_txt added")[0].innerText = replacement + " (" + Ingredient.getName(text_to_change) + ")"
            }

        }
    }
}

//to check if the title has 
function included(keys, item){
    for(var i =0; i<keys.length; i++){
        if(item.includes(keys[i])){
            return keys[i]
        }
    }
    return ""
}





