//list of ingredient titles formatted <amount> <measurement> <name>
var ingred_title = []

//get ingredients
function getIndred(){
    
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
}

//format: <amount> <measurement> <name>
var ingredients = []

function addIngred(){
    for (var i = 0; i < ingred_title.length; i++){
        var title = ingred_title[i]
        ingredients.push({
            key: getItem(title),
            value: [getVal(title), getMeas(title)]})
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
function getItem(title){
    var rest = title.replace(getVal(title) + ' ' + getMeas(title), '')
    var words = rest.split(",")
    return words[0].trim()
}

// import database
var database = require('./database.json')
var replacers = {}
console.log(database)
//retrieves default replacer from database
function getReplacer(){
    for (var p in ingredients) {
        i = 0
        while (i<database.length){
            if(database[i].replacee == p){
                break
            }
            i = i + 1
        }
        replacers[p] = [database[i].replacements[0]]
    }
    console.log(replacers)
}
getReplacer()


   
