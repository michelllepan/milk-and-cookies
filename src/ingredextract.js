//list of ingredient titles formatted <amount> <measurement> <name>
var ingred_title = []

//get ingredients
function getIngred(){
    //get all the ingredients of class checkList__line
    var ingredients = document.getElementsByClassName("checkList__line")
    //extract label ng-class of the checkList__line
    for (var i = 0; i < ingredients.length; i++){
        //get the ingredient title
        var item = ingredients[i].getElementsByClassName("checkList__item")
        ingred_title.push(item.textContext)
    }
}

//format: <amount> <measurement> <name>
var ingredients = {"all purpose flour": ["1", "cup"]}

function addIngred(){
    for (var i = 0; i < ingred_title.length; i++){
        var title = ingred_title[i]
        ingredients[getItem(title)] = [getVal(title), getMeas(title)]
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
    var words = rest.split(" ")
    return words[0]
}

//get the item after the measurement
function getItem(title){
    var rest = title.replace(getVal(title) + ' ' + getMeas(title), '')
    var words = rest.split(",")
    return words[0]
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


