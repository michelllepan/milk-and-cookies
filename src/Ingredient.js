// module.exports = class Ingredient {
export default class Ingredient {

    /**
     * Create an ingredient.
     * @arg {string} title - The amount, unit, and name for an ingredient.
     * @arg {Object} ingredientObject - The database object representing the ingredient.
     */
    constructor(title, ingredientObject) {
        this.title = title               // 2 cups all-purpose flour (string)
        this.amount = Ingredient.getAmount(title)   // 2 (string)
        this.unit = Ingredient.getUnit(title)       // cup (string)
        this.name = Ingredient.getName(title)       // all-purpose flour (string)
        this.replacements = this.fileReplacements(ingredientObject) // list of Replacement instances
    }

    /**
     * Extract the amount of the ingredient.
     * @return {number} - The amount of the ingredient.
     */
    static getAmount(title) {
        var index = 0
        while (! title.charAt(index).toLowerCase().match(/[a-x]/i) ){
            index++
        }
        return title.substring(0, index).trim()
    }

    /**
     * Extract the measurement unit of the ingredient.
     * @return {string} - The measurement unit of the ingredient.
     */
    static getUnit(title) {
        var rest = title.replace(Ingredient.getAmount(title), "")
        var unit = rest.trim().split(" ")[0]
        return unit
    }

    /**
     * Extract the name of the ingredient.
     * @return {string} - The name of the ingredient.
     */
    static getName(title) {
        if (Ingredient.getUnit(title).includes("egg")) {
            return Ingredient.getUnit(title)
        }
        var rest = title.replace(Ingredient.getAmount(title) + " " + Ingredient.getUnit(title), "")
        var words = rest.split(",")
        return words[0].trim()
    }

    /**
     * Retreive replacement information from the database.
     * @param {Object} ingredientObject - The database object representing the ingredient.
     * @return {Replacement[]} An array of replacements for the ingredient.
     */
    fileReplacements(ingredientObject) {
        console.log("object in filereplacements method")
        console.log(ingredientObject)
        var replacementList = ingredientObject["replacements"]
        var replacements = replacementList.map(r => (new Replacement(r)))
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
     * @param {String} amount - The amount of the ingredient to replace.
     * @param {String} unit - The unit of the ingredient to replace.
     * @return {String} The title of the replacement with amount, measurement, and name.
     */
    calculateAmount(amount, unit) {
        //scenario 1: there are multiple parts of replacer
        //scenario 2: there is only one replacer
        // ^ can be solved using one loop

        var conversion = "" //resulting string
        for (var i=0; i< this.parts.length; i++){
            var element = this.parts[i] //element is the individual part of a combination
            //calculate the conversion
            var multiplier = element["multiplier"]
            //get the converted amount in the form of a fraction: [converted amount, unit]
            var components = this.formConversion(multiplier, amount, unit)
            var new_amount = components[0] 
            var unit = components[1]
            if (unit.charAt(unit.length - 1) === "s") {
                unit = unit.substring(0, unit.length - 1)
            }
            //add the conversion to the string
            conversion += (new_amount + " " + unit + "(s) " + element["name"])
            //determine whether or not to add an "and" clause
            if (this.parts.length > 2 && i+1 < this.parts.length){
                conversion += ", "
            } else if (i+1 == this.parts.length -1){
                conversion += " and "
            }
        }
        return conversion
    }

    /**
     * Converts the amount using the multiplier
     * @param {String} multiplier the string to extract a number from 
     * @param {String} amount the amount to convert
     * @param {String} unit the original unit of the amount to convert
     * @return {Array} the converted amount (fraction) and the unit of the conversion. EXAMPLE: ["2 / 3", "cup"]
     */
    formConversion(multiplier, amount, unit){
        var mult_num = parseInt(multiplier)
        var mult_denom = 0
        if (multiplier.includes('/')){ // check if the multiplier is a fraction
            mult_denom = parseInt(multiplier.split('/')[1])
        }
        var am_num = parseInt(amount)
        var am_denom = 0
        if (amount.includes('/')){ // check if the amount is a fraction
            am_denom = parseInt(amount.split('/')[1])
        }

        var final_num = mult_num*am_num
        var final_denom
        if ((am_denom == 0 && mult_denom != 0) || (am_denom != 0 && mult_denom == 0)){ //only one is a fraction
            final_denom = Math.max(am_denom, mult_denom)
        } else if (am_denom == 0 && mult_denom == 0){ //both am and mult are whole numbers
            final_denom = 1
        } else { //denom exists for both
            final_denom = am_denom * mult_denom
        }

        if (mult_denom % 48 == 0 && mult_denom != 0){ //teaspoon case
            var converted = this.simplifyFraction(mult_num, mult_denom/48)
            return [converted, "teaspoon"]
        } else { //normal case
            return [this.simplifyFraction(final_num, final_denom), unit]
        }
    }

    /**
     * Simplifies a fraction, or turns the fraction into a mixed number if applicable
     * @param {Integer} numerator the numerator of the fraction
     * @param {Integer} denominator the denominator of the fraction
     * @return {String} the simplified fraction
     */
    simplifyFraction(numerator, denominator){
        // This is a whole number and doesn't need modification.
        if (numerator % denominator == 0){
            return numerator / denominator
        }
        var gcd = function(a, b) {
            if (!b) {
                return a;
            }
            return gcd(b, (a % b));
        };
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
        var amount = Math.floor(numerator) + '/' + Math.floor(denominator);
        if ( base ) {
            amount = base + ' ' + amount;
        }
        return amount;
    }
}
