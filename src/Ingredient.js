var unicode = {'½': '1/2', '⅓': '1/3', '⅔': '2/3', '¼': '1/4', '¾': '3/4',
                     '⅕': '1/5', '⅖': '2/5', '⅗': '3/5', '⅘': '4/5', '⅙': '1/6',
                     '⅚': '5/6', '⅐': '1/7', '⅛': '1/8', '⅜': '3/8', '⅝': '5/8',
                     '⅞': '7/8', '⅑': '1/9', '⅒': '1/10'}

//module.exports = class Ingredient {
export default class Ingredient {

    /**
     * Create an ingredient.
     * @arg {string} title - The amount, unit, and name for an ingredient.
     * @arg {Object} ingredientObject - The database object representing the ingredient.
     */
    constructor(titleGiven, ingredientObject) {
        this.title = titleGiven               // 2 cups all-purpose flour (string)
        this.amount = this.getAmount()   // 2 (string)
        this.unit = this.getUnit()       // cup (string)
        this.name = this.getName()       // all-purpose flour (string)
        this.replacements = this.fileReplacements(ingredientObject) // list of Replacement instances
    }

    /**
     * Extract the amount of the ingredient.
     * @return {number} - The amount of the ingredient.
     */
    getAmount(){
        var index = 0
        while (! this.title.charAt(index).match(/[$-.a-zA-Z]/) ){ ///[a-z]/i) ){
            index++
        }
        let num = this.title.substring(0, index).trim() //everything before the unit 
        this.title = this.title.substring(index) //change the title
        if (unicode[num]){ //if the amount is a unicode char
            return unicode[num]
        }
        //if the amount is a mixed fraction
        let parts = num.trim().split(" ")
        if (parts.length > 1){
            return this.to_improper(parts[0], parts[1])
        }
        //if the amount is a mixed fraction with a unicode char
        let possible_mix = num.substring(1).trim()
        let part = possible_mix.substring(0, 1)
        if (unicode[part]){
            return this.to_improper(num.substring(0, 1), unicode[part])
        }
        return num //if the amount is simply a number
    }

    /**
     * Extract the measurement unit of the ingredient.
     * @return {string} - The measurement unit of the ingredient.
     */
    getUnit() {
        var unit = this.title.trim().split(" ")[0]
        this.title = this.title.replace(unit, "")
        return unit
    }

    /**
     * Extract the name of the ingredient.
     * @return {string} - The name of the ingredient.
     */
    getName(title) {
        if (this.unit.includes("egg")) {
            return this.unit
        }
        var words = this.title.split(",")
        return words[0].trim()
    }

    /**
     * Retreive replacement information from the database.
     * @param {Object} ingredientObject - The database object representing the ingredient.
     * @return {Replacement[]} An array of replacements for the ingredient.
     */
    fileReplacements(ingredientObject) {
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

    //changes a mixed fraction to an improper fraction
    to_improper(whole, part){
        var w = parseInt(whole)
        var p_num = parseInt(part)
        var p_denom = parseInt(part.split('/')[1])
        var new_p_num = p_denom*w + p_num
        return new_p_num + "/" + p_denom
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
            var components = this.formConversion(multiplier, amount, unit)
            var new_amount = components[0] 
            var new_unit = components[1]
            if (new_unit.charAt(new_unit.length - 1) === "s") {
                new_unit = new_unit.substring(0, unit.length - 1)
            }
            //add the conversion to the string
            conversion += (new_amount + " " + new_unit + "(s) " + element["name"])
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

        if (mult_denom % 48 === 0 && mult_denom !== 0){ //teaspoon case
            let converted
            if (mult_num > mult_denom){
                converted = this.simplifyFraction(mult_num, mult_denom/48)
            } else {
                converted = this.simplifyFraction(mult_num, mult_denom)
            }
            return [converted, "teaspoon"]
        } else if (mult_denom % 16 === 0 && mult_denom !== 0){ //tbsp case
            let converted
            if (mult_num > mult_denom){
                converted = this.simplifyFraction(mult_num, mult_denom/16)
            } else {
                converted = this.simplifyFraction(mult_num, mult_denom)
            }
            return [converted, "tablespoon"]
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
