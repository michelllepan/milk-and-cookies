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
export function replaceOnScreen(title, selection){
    let ingredient = new Ingredient(title, database[Ingredient.getName(title)])
    let new_text = ingredient.calculateAmount(selection)
    
    if (document.body.innerHTML.includes(title)) {
        document.body.innerHTML = document.body.innerHTML.replace(title, "")
    } 
    else if (document.body.innerText.includes(title)) {
        let element = Array.from(document.querySelectorAll('li')).find(el => el.innerText.includes(title));
        let toReplace = element.innerText;
        let toReplaceParts = [Ingredient.getAmount(toReplace), Ingredient.getUnit(toReplace), Ingredient.getName(toReplace)]

        let newHTML = element.innerHTML
        for (let i=0; i<toReplaceParts.length; i++) {
            newHTML = newHTML.replace(toReplaceParts[i], "")
        }
        element.innerHTML = newHTML
    } 
   return new_text

    
    



    //addPair(title, new_text)
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
    return ingredient.replacements.map(r => r.name);
}



function isIngredient(text){
    var measurements = ["cup", "tablespoon", "teaspoon", "cups", "teaspoons", "tablespoons", "eggs", "egg"]
    if(!((text.charAt(0) >= '0' && text.charAt(0) <= '9') || 
        text.charAt(0).match(/[\u00BC-\u00BE\u2150-\u215E]/)) ){
        return false
    }
    for (var i = 0; i < measurements.length; i++) {
        if(text.includes(measurements[i])){
            return true
        }    
    }
    return false
}



