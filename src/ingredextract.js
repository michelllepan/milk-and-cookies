//list of ingredient titles formatted <amount> <measurement> <name>
var ingred_title = []

//get ingredients
export function getIngred(){
    //obtain both lists
    var checklists = document.querySelectorAll('ul[class^="checklist dropdownwrapper list-ingredients-"]')
    //get all the ingredients of class checkList__line
    var lines = []
    console.log(checklists.length)
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
}

//format: <amount> <measurement> <name>
var ingredients = {"all purpose flour": ["1", "cups"]}

export function addIngred(){
    for (var i = 0; i < ingred_title.length; i++){
        var title = ingred_title[i]
        if (getMeas(title).includes("egg")) {
            ingredients[getMeas(title)] = [getVal(title)]
        } else {
            ingredients[getItem(title)] = [getVal(title), getMeas(title)]
        }
    }
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
            if(database[i].replacee == p){
                break
            }
            i = i + 1
        }
        replacers[p] = [ingredients[p][0], ingredients[p][1], database[i].replacements[0]]
    }
    return replacers
}


//returns a dictionary with the original ingredient and amount with the necessary replacement amount for that ingredient and notes 
function calculateAmount(){
    for (var replacer in replacers){
        var conv_factor = replacers[replacer][0]/getVal(replacers[replacer][2]["replaceemeasurement"])
        console.log("Conversion Factor" + conv_factor)
        for (var sub_replace in replacers[replacer][2]["replacer"]){
            replacers[replacer][2]["replacer"][sub_replace]["replacermeasurement"] = (conv_factor * getVal(replacers[replacer][2]["replacer"][sub_replace]["replacermeasurement"])).toString() + " " + getMeas(replacers[replacer][2]["replacer"][sub_replace]["replacermeasurement"]) + "(s)"
            console.log(replacers[replacer][2]["replacer"][sub_replace]["replacermeasurement"])
        }
        delete replacers[replacer][2].replaceemeasurement
    }
    console.log(replacers)
    return replacers

}
calculateAmount()

//export default {getIngred, addIngred, getReplacer}






   
