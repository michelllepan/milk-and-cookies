// to run this test, change the "export default class ...." in 
// Ingredient.js to "module.exports = class ..."

const database = require("./new_database")
const Ingredient = require("./ingredient")

var ingredient = new Ingredient("2 cups all-purpose flour", database[0])
var replacement = ingredient.replacements[0]

console.log("TESTING Ingredient class attributes")
console.log("======================================")
console.log("amount: " + ingredient.amount)
console.log("unit: " + ingredient.unit)
console.log("name: " + ingredient.name)
console.log("title: " + ingredient.title)

console.log() // spacing

console.log("TESTING Replacement class attributes")
console.log("======================================")
console.log("name: " + replacement.name)
console.log("notes: " + replacement.notes)

console.log() // spacing

console.log("TESTING replacement calculations")
console.log("======================================")
console.log("calculated amount: " + ingredient.calculateAmount(replacement.name))