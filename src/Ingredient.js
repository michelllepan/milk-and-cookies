module.exports = class Ingredient {
// export default class Ingredient {

    /**
     * Create an ingredient.
     * @arg {string} title - The amount, unit, and name for an ingredient.
     * @arg {Object} ingredientObject - The database object representing the ingredient.
     */
    constructor(title, ingredientObject) {
        this.title = title               // 2 cups all-purpose flour
        this.amount = this.getAmount()   // 2
        this.unit = this.getUnit()       // cups
        this.name = this.getName()       // all-purpose flour
        this.replacements = this.fileReplacements(ingredientObject) // list of Replacement instances
    }

    /**
     * Extract the amount of the ingredient.
     * @return {number} - The amount of the ingredient.
     */
    getAmount() {
        var index = 0
        while (! this.title.charAt(index).toLowerCase().match(/[a-x]/i) ){
            index++
        }
        return this.title.substring(0, index).trim()
    }

    /**
     * Extract the measurement unit of the ingredient.
     * @return {string} - The measurement unit of the ingredient.
     */
    getUnit() {
        var rest = this.title.replace(this.getAmount(this.title), "")
        var words = rest.trim().split(" ")
        return words[0]
    }

    /**
     * Extract the name of the ingredient.
     * @return {string} - The name of the ingredient.
     */
    getName() {
        if (this.getUnit(this.title).includes("egg")) {
            return this.getMeas(this.title)
        }
        var rest = this.title.replace(this.getAmount(this.title) + " " + this.getUnit(this.title), "")
        var words = rest.split(",")
        return words[0].trim()
    }

    /**
     * Retreive replacement information from the database.
     * @param {Object} ingredientObject - The database object representing the ingredient.
     * @return {Replacement[]} An array of replacements for the ingredient.
     */
    fileReplacements(ingredientObject) {
        var replacementList = ingredientObject.replacements
        var replacements = []
        // loop through replacements in database object
        for(var i = 0; i < replacementList.length; i++){
            replacements.push(new Replacement(replacementList[i]))
        }
        return replacements
    }

    /**
     * Calculate amount of specified replacement.
     * @param {string} replacement - The name of the replacement to calculate the amount for.
     * @return {string} The title of the replacement with amount, measurement, and name.
     */
    calculateAmount(replacement) {
        for (var i = 0; i < this.replacements.length; i++) {
            if (this.replacements[i].name === replacement) {
                return this.replacements[i].calculateAmount(this.amount, this.unit)
            }
        }
    }
}

class Replacement {
    
    /**
     * Create a replacement.
     * @param {Object} replacementObject - The database object representing the ingredient.
     */
    constructor(replacementObject) {
        this.parts = replacementObject.replacer
        this.notes = replacementObject.notes
        this.name = this.constructName()
    }

    /**
     * Construct name of the replacement.
     * @return {string} The name of the replacement. If multiple parts exist, they are combined.
     */
    constructName() {
        switch(this.parts.length) {
            // if only one replacement part, return it
            case 1:
                return this.parts[0].name
            // if two replacement parts, add "and" in between
            case 2:
                return this.parts[0].name + " and " + this.parts[1].name
            // if three or more replacement parts, add commas and "and"
            default:
                var name = ""
                for (var i = 0; i < this.parts.length; i++) {
                    if (i === this.parts.length - 1) {
                        name += "and " + this.parts[i]
                    } else {
                        name += this.part[i] + ", "
                    }
                }
                return name
        }
    }

    /**
     * Calculate amount of the replacement.
     * @param {number} amount - The amount of the ingredient to replace.
     * @param {string} unit - The unit of the ingredient to replace.
     * @return {string} The title of the replacement with amount, measurement, and name.
     */
    calculateAmount(amount, unit) {
        return "calculating amount for " + amount + " " + unit
    }
  
}