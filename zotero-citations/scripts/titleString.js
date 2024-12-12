/**
 * @function titleString
 * @description Returns a string containing the authors and year of publication
 * @param {string} citekey - The citekey of the publication
 * @returns {string} A string in the format "Authors (Year)"
 */
function titleString(citekey) {
    // Input: 
    //    - citekey (string)
    // Output: 
    //    - Title string containing authors and year of publication

    // Load other functions that we need - needs to be inside function
    const userFuncs = app.plugins.plugins['templater-obsidian'].templater.functions_generator.user_functions.user_script_functions.plugin.templater.current_functions_object.user;
    const authorsString = userFuncs.authorsString;
    const yearString = userFuncs.yearString;

    let authors = authorsString(citekey, 0)
    let year = yearString(citekey)

    // extract Year
    return `${authors} (${year})`
}
    
module.exports = titleString;