function urlString(citekey) {
    // Input: 
    //    - citekey (string)
    // Output: 
    //    - String with link to doi of publication
    
    let data = app.plugins.plugins['obsidian-citation-plugin'].library.entries[citekey].data;
    if (data.fields && data.fields.doi) {
        return "https://doi.org/" + data.fields.doi[0]
    } else { 
        return ""
    }
} 

module.exports = urlString