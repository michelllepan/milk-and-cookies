// switch the export mode of Ingredient.js before running this test!!

const database = require("./new_database")
const Ingredient = require("./ingredient")

const tester = "1 cup all-purpose flour"

var ingredient = new Ingredient(tester, database[0])
var replacement1 = ingredient.replacements[0]

console.log("\n" + "using " + tester)

console.log("\n" + "TESTING Ingredient class attributes")
console.log("======================================")
console.log("amount: " + ingredient.amount)
console.log("unit: " + ingredient.unit)
console.log("name: " + ingredient.name)
console.log("title: " + ingredient.title)

console.log("\n" + "using the first replacement")

console.log("\n" + "TESTING Replacement class attributes")
console.log("======================================")
console.log("name: " + replacement1.name)
console.log("notes: " + replacement1.notes)

console.log("\n" + "TESTING replacement calculations")
console.log("======================================")
console.log("calculated amount: " + ingredient.calculateAmount(replacement1.name))