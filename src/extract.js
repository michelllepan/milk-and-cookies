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
    //title = "2 cups all purpose flour"
    let ingredient = new Ingredient(title, database[Ingredient.getName(title)])
    //selection = "rolled oats and baking powder"
    let new_text = ingredient.calculateAmount(selection)
    document.body.innerHTML = document.body.innerHTML.replace('2 cups all purpose flour', new_text)
    addPair(title, new_text)
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
    let ingredient = new Ingredient(text, database[Ingredient.getName(text)])
    return [ingredient.replacements.map(r => r.name)]
}

function isIngredient(text){
    measurements = ["cup", "tablespoon", "teaspoon", "cups", "teaspoons", "tablespoons", "eggs", "egg"]
    if(!(text.charAt(0) >= '0' && text.charAt(0) <= '9')){
        return False
    }
    for (var i = 0; i < measurements.length; i++) {
        if(text.includes(measurements[i])){
            return True
        }    
    }
    return False
}



/***************************Functions not needed**************************/

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
function populateIngredients() {
    var titles = getTitles()
	for (var i=0; i < titles.length; i++){
        var keys = Object.keys(database)
        for (var j=0; j < keys.length; j++) {
            
            if (Ingredient.getName(titles[i]).includes([keys[j]])) {
                ingredients.push(new Ingredient(titles[i], database[keys[j]]))
                console.log("ingredient found: " + Ingredient.getName(titles[i]))
            }
        }
        //     ingredients.push(new Ingredient(titles[i], database[Ingredient.getName(titles[i])]))
        // }
	}
}

// helper function
    // loop through the keys of the database
    // for each key in the database check if any of the titles include that key
        // if a title includes that key then add to an object with format title: object from database
    // return that object


/**
 * Gets the titles from the website
 * @return {Array} array of titles from the website
 * SAMPLE:
 * ["2 cups all-purpose flour", "3 teaspoons salt"]
 */
function getTitles(){
    var ingred_titles
    //check if it's a checklist type
    var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
    if (checklists.length > 0){
        ingred_titles = checklistTitles()
    } else{
        ingred_titles = jsonTitles()
    }
    return ingred_titles
}

//scenario without checklists
function jsonTitles(){
    //extract the json file with the ingredientList
    //returns a list of two OBJECTS
    var jsonld = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText)
    //object at index 1 contains the ingredientList, use the key "recipeIngredient"
    var titles = jsonld[1]["recipeIngredient"] //returns an array
    return titles
}

//scenario with checklists
function checklistTitles(){
    var titles = []
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
            var item = lines[j][k]
            titles.push(item.textContent.trim())
        }
    }
    //get rid of the title that says "Add items to cart"
    titles.splice(titles.length-1, titles.length)
    return titles
}


/**
 * Replaces selected ingredients/measurements with corresponding replacement
 * @param {Object} toReplace object with keys as ingredient names and values as replacement names {"all-purpose flour": "rolled oats and baking powder"}
 */
export function replaceOnScreen(toReplace){   
    //check if site is the checklist scenario 
	var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
    if (checklists.length > 0){
        replaceInChecklist(toReplace)
    } else {
        replaceInFieldSet(toReplace)
    }
}

//nonchecklist scenario
function replaceInFieldSet(toReplace){
    var names = Object.keys(toReplace)
    //get the section containing the ingredients
    var section = document.querySelectorAll('ul[class^="ingredients-section"]')
    //access the items
    var items = section[0].getElementsByClassName("ingredients-item")
    //access the checkbox list
    for (var i = 0; i < items.length; i++){
        var checkbox = items[i].getElementsByClassName("checkbox-list")[0]
        //access the checkmark
        var checkmark = checkbox.getElementsByClassName("checkbox-list-checkmark")
        //access the text_to_change
        var text_to_change = checkmark[0].getElementsByClassName("ingredients-item-name")
        //access the text
        var text = text_to_change[0].innerText
        // check if the ingredient is among the list of ingredients to replace
        var ingred_in_title = included(names, text)
        if(ingred_in_title != ""){
            var replacement = ingredient_names[ingred_in_title].calculateAmount(toReplace[ingred_in_title])
            var result = replacement.bold()
            checkmark[0].getElementsByClassName("ingredients-item-name")[0].innerHTML = result + " (" + Ingredient.getName(text_to_change) + ")"
        }
    }
    
}

//checklist scenario
function replaceInChecklist(toReplace){
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
                replaceInstructions(ingred_in_title, replacement)
                var result = replacement.bold()
                lines[j].getElementsByClassName("recipe-ingred_txt added")[0].innerHTML = result + " (" + Ingredient.getName(text_to_change) + ")"
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

/**
 * Replaces selected ingredients/measurements with corresponding replacement
 * @param {String} ingredient ingredient that needs to be replaced in the instructions
 * @param {String} replacement string of the replacement for that ingredient 
 */
function replaceInstructions(ingredient,replacement){
    // check for special case of flour NEED TO ADD MORE OF THESE (ex. for walnuts it just says nuts)
    if(ingredient == "all-purpose flour"){
        ingredient = "flour,"
    }
    else{
        ingredient = ingredient + ","
    }

    //get all the steps
    var directions = document.getElementsByClassName('recipe-directions__list--item')

    // loop through all the steps
    for(var i = 0; i<directions.length;i++){
        //get text of the steps
        var text = directions[i].innerHTML
        //if the step has that ingredient replace appropriately
        if(text.includes(ingredient)){
            var result = replacement.bold()
            directions[i].innerHTML = text.split(ingredient)[0] + ingredient + " (" + result + ")" + text.split(ingredient)[1]
        }
    }
}



