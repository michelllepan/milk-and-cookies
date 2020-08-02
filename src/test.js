import Ingredient from "./ingredient.js"

var database = require("./new_database.json")
ingredient = new Ingredient("2 cups all-purpose flour", database[0])
console.log(ingredient.name)