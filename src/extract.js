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


/**
 * replaces ingredients onto the website
 * ex title: "2 cups all purpose flour"
 * ex selection: "rolled oats and baking powder"
 */
export function replaceOnScreen(title){
    //title = "2 cups all purpose flour"
    let ingredient = new Ingredient(title, database[Ingredient.getName(title)])
    //selection = "rolled oats and baking powder"
    //let new_text = ingredient.calculateAmount(selection)
    document.body.innerHTML = document.body.innerHTML.replace(title, "yay we're here")
    addPair(title, "new_text")
}

//pairs object
var pairs = {}

//function getPairs
export function getPairs() {
    return pairs
}

//function addPairs
function addPair(highlightedText, newText){
    pairs[highlightedText] = newText
}

//function to get the replacement options for the drop down
export function getReplacementOptions(text){
    if(!isIngredient(text)){
        return []
    }
    if(database[Ingredient.getName(text)] === undefined){
        return []
    }
    let ingredient = new Ingredient(text, database[Ingredient.getName(text)])
    return [ingredient.replacements.map(r => r.name)]
}



function isIngredient(text){
    var measurements = ["cup", "tablespoon", "teaspoon", "cups", "teaspoons", "tablespoons", "eggs", "egg"]
    if(!(text.charAt(0) >= '0' && text.charAt(0) <= '9')){
        return false
    }
    for (var i = 0; i < measurements.length; i++) {
        if(text.includes(measurements[i])){
            return true
        }    
    }
    return false
}



