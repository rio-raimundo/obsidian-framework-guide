function logEntry(citekey) {
    // Input: 
    //    - citekey (string)
    // Output: 
    //    - String with year of publication

    let data = app.plugins.plugins['obsidian-citation-plugin'].library.entries[citekey].data;
    console.log(data)
}
    
module.exports = logEntry;