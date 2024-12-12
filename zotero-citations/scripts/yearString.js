function yearString(citekey) {
    // Input: 
    //    - citekey (string)
    // Output: 
    //    - String with year of publication

    let year = app.plugins.plugins['obsidian-citation-plugin'].library.entries[citekey].data.fields.year[0];

    // extract Year
    return year
}

module.exports = yearString;