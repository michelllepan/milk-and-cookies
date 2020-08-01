//list of ingredient titles formatted <amount> <measurement> <name>
var ingred_title = []

//get ingredients
export function getIngred(){
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
    ingred_title.splice(ingred_title.length-1, ingred_title.length)
    addIngred()
    return ingred_title
}

export function exportNames(){
    getIngred()
    var all_names = addIngred()
    var names = []
    for (var ingred in all_names){
        names.push(ingred)
    }
    return names
}

//format: <amount> <measurement> <name>
var ingredients = {}

export function addIngred(){
    for (var i = 0; i < ingred_title.length; i++){
        var title = ingred_title[i]
        if (getMeas(title).includes("egg")) {
            ingredients[getMeas(title)] = [getVal(title)]
        } else {
            ingredients[getItem(title)] = [getVal(title), getMeas(title)]
        }
    }
    return ingredients
}

//get the number value at the beginning of the ingredient title
function getVal(title){
    //measurement always present in numerical format
    var index = 0
    while (! title.charAt(index).toLowerCase().match(/[a-x]/i) ){
        index++
    }
    return title.substring(0, index).trim()
}

//get the measurement after the number value
function getMeas(title){
    var rest = title.replace(getVal(title), '')
    var words = rest.trim().split(" ")
    return words[0]
}

//get the item after the measurement
export function getItem(title){
    if (getMeas(title).includes("egg")) {
        return getMeas(title)
    }
    var rest = title.replace(getVal(title) + ' ' + getMeas(title), '')
    var words = rest.split(",")
    return words[0].trim()
}

// import database
var database = require('./database.json')
var replacers = {}

//retrieves default replacer from database for each ingredient and puts into replacers
export function getReplacer(){
    for (var p in ingredients) {
        var i = 0
        while (i<database.length){
            if(p.includes(database[i].replacee)){
                break
            }
            i = i + 1
        }
        if (i<database.length){
            var things = database[i].replacements
            replacers[p] = [ingredients[p][0], ingredients[p][1], things]
        }
    }
    return replacers
}
// {"all purpose flour": [2, "cups", [
        //     {
        //         "replaceemeasurement": "2 cup",
        //         "replacer":
        //         [
        //                      {
        //                         "name": "rolled oats",
        //                         "replacermeasurement": "2 cup"
        //                      }, 
        //                      {
        //                         "name": "baking powder",
        //                         "replacermeasurement": "5 teaspoon"
        //                      }
        //         ], 
        //         "notes":"will result in a heavier yeast bread product"
        //     }, 
            
        //     {
        //         "replaceemeasurement": "3 cup",
        //         "replacer":
        //         [
        //                 {
        //                     "name": "whole wheat flour",
        //                     "replacermeasurement": "1 cup"
        //                 }, 
        //                 {
        //                     "name": "white flour",
        //                     "replacermeasurement": "2 cup"
        //                 }
        //         ], 
        //         "notes":"will result in a heavier yeast bread product"
        //     }
        // ]]}


export function replaceonScreen(selectedIngred){
    calculateAmount()
    var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
    for (var i = 0; i < checklists.length; i++){
        var inner1 = checklists[i].getElementsByClassName("checkList__line")
        for (var j = 0; j<inner1.length; j++){
            var inner2 = inner1[j].getElementsByClassName("recipe-ingred_txt added")
            if (getItem(inner2[0].innerText) in replacers && getItem(inner2[0].innerText) in selectedIngred){
                //var replacersss = replacers[getItem(inner2[0].innerText)][2]
                var number = selectedIngred[getItem(inner2[0].innerText)]
                var to_replace = ""
                for(var k = 0; k<replacers[getItem(inner2[0].innerText)][2][0].replacer.length; k++){
                    to_replace = to_replace + " and " + replacers[getItem(inner2[0].innerText)][2][number].replacer[k]["replacermeasurement"] + " " + replacers[getItem(inner2[0].innerText)][2][number].replacer[k]["name"]
                }
                inner2[0].innerText = to_replace.substring(5) + " (" + getItem(inner2[0].innerText) + ")"
            }
        }
    }
}


//returns a dictionary with the original ingredient and amount with the necessary replacement amount for that ingredient and notes 
function calculateAmount(){
    for (var replacer in replacers){
        var conv_factor = replacers[replacer][0]/getVal(replacers[replacer][2][0]["replaceemeasurement"])
        for (var sub_replace in replacers[replacer][2][0]["replacer"]){
            replacers[replacer][2][0]["replacer"][sub_replace]["replacermeasurement"] = numberToFraction((conv_factor * getVal(replacers[replacer][2][0]["replacer"][sub_replace]["replacermeasurement"]))).toString() + " " + getMeas(replacers[replacer][2][0]["replacer"][sub_replace]["replacermeasurement"]) + "(s)"
        }
        delete replacers[replacer][2].replaceemeasurement
    }
    return replacers

}

export function onlyReplacements(){
    var final = {}
    var replacements_only = []
    for (var replacer in replacers){
        for(var j = 0; j <replacers[replacer][2].length; j++){
            if(replacers[replacer][2][j]["replacer"].length == 2){
                var replacement = replacers[replacer][2][j]["replacer"][0]["name"] + " and " + replacers[replacer][2][j]["replacer"][1]["name"]

            }
            else{
                var replacement = replacers[replacer][2][j]["replacer"][0]["name"] 
            }
            replacements_only.push(replacement)  

        }
        final[replacer] = replacements_only
        replacements_only = []

    }
    return final
}
// {"all purpose flour": ["rolled oats and baking power", "whole wheat flour and white flour"], "eggs": ["banana", "applesauce", "flaxseeds and water"]}







//export default {getIngred, addIngred, getReplacer}


function numberToFraction( amount ) {
	// This is a whole number and doesn't need modification.
	if ( parseFloat( amount ) === parseInt( amount ) ) {
		return amount;
	}
	// Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
	var gcd = function(a, b) {
		if (b < 0.0000001) {
			return a;
		}
		return gcd(b, Math.floor(a % b));
	};
	var len = amount.toString().length - 2;
	var denominator = Math.pow(10, len);
	var numerator = amount * denominator;
	var divisor = gcd(numerator, denominator);
	numerator /= divisor;
	denominator /= divisor;
	var base = 0;
	// In a scenario like 3/2, convert to 1 1/2
	// by pulling out the base number and reducing the numerator.
	if ( numerator > denominator ) {
		base = Math.floor( numerator / denominator );
		numerator -= base * denominator;
	}
	amount = Math.floor(numerator) + '/' + Math.floor(denominator);
	if ( base ) {
		amount = base + ' ' + amount;
	}
	return amount;
}