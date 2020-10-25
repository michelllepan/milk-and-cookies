// switch the export mode of Ingredient.js before running this test!!

const database = require("./new_database")
const Ingredient = require("./ingredient")

const tester = "3 cups all-purpose flour"

var ingredient = new Ingredient(tester, database["all-purpose flour"])
var replacement1 = ingredient.replacements[1]


// var allpurpose = new Ingredient("4 (5 oz) cup all-purpose flour", database["all-purpose flour"])
// console.log("UNIT: " + allpurpose.unit)
// console.log("AMOUNT: " + allpurpose.amount)
// console.log("ITEM: " + allpurpose.name)
console.log("\n" + "TESTING Ingredient class function getAmount")
console.log("======================================")
console.log("AMOUNT (normal mix): " + Ingredient.getAmount("1 1/4 cup granulated sugar"))
console.log("AMOUNT (unicode mix): " + Ingredient.getAmount("2 ⅓ cups mashed overripe bananas"))
console.log("AMOUNT (normal fraction): " + Ingredient.getAmount("1/3 cup all-purpose flour"))
console.log("AMOUNT (unicode fraction): " + Ingredient.getAmount("½ teaspoon salt"))
console.log("AMOUNT (whole): " + Ingredient.getAmount("1 Tbsp olive oil"))
console.log("AMOUNT (edge case0): " + Ingredient.getAmount("4 (5 oz) chicken breasts*, pounded to an even 1/3-inch thickness"))

console.log("\n" + "TESTING Ingredient class function getUnit")
console.log("======================================")
console.log("UNIT (normal mix): " + Ingredient.getUnit("1 1/4 cup granulated sugar"))
console.log("UNIT (unicode mix): " + Ingredient.getUnit("2 ⅓ cups mashed overripe bananas"))
console.log("UNIT (normal fraction): " + Ingredient.getUnit("1/3 cup all-purpose flour"))
console.log("UNIT (unicode fraction): " + Ingredient.getUnit("½ teaspoon salt"))
console.log("UNIT (whole): " + Ingredient.getUnit("1 Tbsp olive oil"))
console.log("UNIT (edge case0): " + Ingredient.getUnit("4 (5 oz) chicken breasts*, pounded to an even 1/3-inch thickness"))

console.log("\n" + "TESTING Ingredient class function getName")
console.log("======================================")
console.log("NAME (normal mix): " + Ingredient.getName("1 1/4 cup granulated sugar"))
console.log("NAME (unicode mix): " + Ingredient.getName("2 ⅓ cups mashed overripe bananas"))
console.log("NAME (normal fraction): " + Ingredient.getName("1/3 cup all-purpose flour"))
console.log("NAME (unicode fraction): " + Ingredient.getName("½ teaspoon salt"))
console.log("NAME (whole): " + Ingredient.getName("1 Tbsp olive oil"))
console.log("NAME (edge case0): " + Ingredient.getName("4 (5 oz) chicken breasts*, pounded to an even 1/3-inch thickness"))


/*
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
*/