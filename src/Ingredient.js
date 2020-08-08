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
            //get the number version of multiplier and amount [multiplier, amount, unit]
            var components = this.extractNumbers(multiplier, amount, unit)
            var new_amount = this.numberToFraction(components[0] * components[1])
            //add the conversion to the string
            conversion += (new_amount + " " + components[2] + "(s) " + element["name"])
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
     * Returns the decimal values of each fraction
     * @param {String} multiplier the string to extract a number from 
     * @param {String} amount the amount to convert
     * @return {Array} [multiplier, amount, unit]
     */
    extractNumbers(multiplier, amount, unit){
        //get the numerator and denominator of the multiplier
        var mult = parseInt(multiplier)
        if (multiplier.includes('/')){ // check if the multiplier is a fraction
            var mult_num = parseInt(multiplier.split('/')[0])
            var mult_denom = parseInt(multiplier.split('/')[1])
            mult = mult_num/mult_denom
        }
        //get the numerator and denominator of the amount
        var amt = parseInt(amount)
        if (amount.includes('/')){ // check if the amount is a fraction
            var am_denom = parseInt(amount.split('/')[1])
            var am_num = parseInt(amount.split('/')[0])
            amt = am_num/am_denom
        }

        if (mult_denom % 48 == 0){ //tsp case
            var new_mult = mult_num / (mult_denom/48)
            return [new_mult, amt, "teaspoon"]
        } else {
            return [mult, amt, unit]
        }
    }

    /**
     * Converts numbers to fractions:
     * - 1.25 to 1 1/4
     * - 2 to 2
     */
    numberToFraction ( amount ) {
        // This is a whole number and doesn't need modification.
        if ( parseFloat( amount ) === parseInt( amount ) ) {
            return amount;
        }
        // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
        var gcd = function(a, b) {
            if (!b) {
                return a;
            }
            return gcd(b, (a % b));
        };
        var len = amount.toString().length - 2;
        var denominator = Math.pow(10, len);
        var numerator = amount * denominator;
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
        amount = Math.floor(numerator) + '/' + Math.floor(denominator);
        if ( base ) {
            amount = base + ' ' + amount;
        }
        return amount;
    }
  
}