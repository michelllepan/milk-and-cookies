// module.exports = class Ingredient {
export default class Ingredient {

    /**
     * @arg {String} title the value, unit, and name for an ingredient
     * SAMPLE: "2 cups all-purpose flour"
     */
    constructor(title, ingredientObject) {
        this.name = this.getItem(title)    // all-purpose flour
        this.amount = this.getVal(title)   // 2
        this.unit = this.getUnit(title)    // cups
        this.replacements = this.fileReplacements(ingredientObject)
        this.title = title
    }

    /** Extracts the name of the Ingredient */
    getItem(title) {
        if (this.getUnit(title).includes("egg")) {
            return this.getMeas(title)
        }
        var rest = title.replace(this.getVal(title) + " " + this.getUnit(title), "")
        var words = rest.split(",")
        return words[0].trim()
    }

    /** Extracts the amount of the Ingredient */
    getVal(title) {
        var index = 0
        while (! title.charAt(index).toLowerCase().match(/[a-x]/i) ){
            index++
        }
        return title.substring(0, index).trim()
    }

    /** Extracts the measurement type of the Ingredient */
    getUnit(title) {
        var rest = title.replace(this.getVal(title), "")
        var words = rest.trim().split(" ")
        return words[0]
    }

    /**
     * Accesses database.json to retrieve replacements
     * @param {Object} ingredientObject 
     * 
     */
    fileReplacements(ingredientObject) {
        //gets a list of all the replacements
       
        var replacementList = ingredientObject.replacements
        // will populate with list of ReplacementObjects for each replacement
        var replacements = []
        // loop through list of replacements, creates Replacement object for each replacement, push to lsit
        for(var i = 0; i < replacementList.length; i++){
            replacements.push(new Replacement(replacementList[i]))
        }
        // return list of ReplacementObjects for each replacement
        return replacements
    }

    /**
     * replacement: name of the replacement to be calculated
     * Returns the corresponding amount of a replacement for a specific Ingredient
     */
    calculateAmount(replacement) {
        // console.log(replacement)
        for (var i = 0; i < this.replacements.length; i++) {
            if (this.replacements[i].name === replacement) {
                return this.replacements[i].calculateAmount(this.amount, this.unit)
            }
        }
    }
}

/**
 * 
 */
class Replacement {
    
    /**
     * 
     * @param {Object} replacementObject 
     */
    constructor(replacementObject) {
        this.parts = replacementObject.replacer
        this.notes = replacementObject.notes
        this.name = this.constructName()
    }

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

    getNotes() {
        return this.notes
    }

    calculateAmount(amount, unit) {
        return "calculating amount for " + amount + " " + unit
    }
  
}