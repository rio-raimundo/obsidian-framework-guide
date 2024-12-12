function authorsString(citekey, printFormat) {
    // Input:
    //    - citekey (string)
    //    - printFormat (int): 0 = string of authors, 1 = list of authors, 2 = list of tags
    // Output:
    //    - String of authors
    let fullAuthorList = [];

    // check .bib for author entry
    let data = app.plugins.plugins['obsidian-citation-plugin'].library.entries[citekey].data;

    let authors = [];
    if (data.creators.author)
        authors = data.creators.author;
    else
        authors = [{literal: "NaN"}];

    authors.forEach(author => {
        const [firstNamesArray, lastNamesString] = findFirstLast(author);
        let str = "";

        if (printFormat == 0) {
            str = lastNamesString;
        }

        // Handle if printing as a list
        if (printFormat == 1) {
            str = firstNamesArray.join(' ');  // join each 'first' name (includes middle name initials) with spaces
            str += " " + lastNamesString; // add the last name, separated by a space
        }

        else if (printFormat == 2) {
            // Try to mimic the steps taken in my python script to get the same tags
            let allNames = firstNamesArray.concat(lastNamesString);
            var filteredNames = allNames.filter(item => !item.endsWith('.'));
            filteredNames = filteredNames.filter(item => item.length > 1);
            filteredNames = filteredNames.map(item => item.toLowerCase());
            filteredNames = filteredNames.map(str => str.replace(/ /g, '-'));
            str = "authors/" + filteredNames.join("-");
        }
        
        fullAuthorList.push(str);
    });
    
    let returnAuthors;
    if (printFormat == 0) {
        returnAuthors = replaceIllegalFileNameCharactersInString(joinAuthors(fullAuthorList));
    }
    else if (printFormat == 1 || printFormat == 2) {
        startOfLine = "  - ";
        returnAuthors = startOfLine + fullAuthorList.join("\n" + startOfLine);
    }
    
    return returnAuthors;
}

module.exports = authorsString;
    
//-----------------------------------
// Helper functions
//-----------------------------------

function joinAuthors(fullAuthorList) {
    /* Join Authors: This will either
        - print all authors (separated by ";")
        - print "the author"
        - print "first and second author"
        - print "first author et al."
    */
    const len = fullAuthorList.length;
    if (len == 1)
        return fullAuthorList[0];
    else if (len == 2)
        return fullAuthorList.join("\ and ");
    else if (len >= 3)
        return fullAuthorList[0] + " et al.";
}


function findFirstLast(author) {
    /* Note, that literal names need to be worked around. This means that if lastnames consist of multiple names, they will be mixed with first names. To avoid this you should modify the .bib-file (i.e. switch to "two fields" in Zotero).

    For example
        author: Array(2)
            0: {literal: 'Anke te Heesen'}
            1: {lastName: 'Spary', firstName: 'Emma C.'}
    will be rendered as
        "Heesen, Anke te and Spary, Emma C."
    instead of
        "te Heesen, Anke and Spray, Emma C."
    */

    let lastNamesString = "";
    let firstNamesArray = [];
    if (author.lastName) {
        firstNamesArray = author.firstName.split(" ");
        lastNamesString = author.lastName;
    }
    // Workaround for literal names
    else {
        let parts = author.literal.split(" ");
        firstNamesArray = parts.slice(0,parts.length-1);
        lastNamesString = parts[parts.length-1];
    }
    return [firstNamesArray, lastNamesString];
}

function replaceIllegalFileNameCharactersInString(string) {
    /* This may be important if the authorString is e.g. used for aliasing.*/

    return string.replace(/[\\\/@]*/g, ''); // less strict for Linux/MacOS
    //     return string.replace(/[\\#%&\{\}\/*<>$\'\":@,]*/g, ''); // very strict for Windows
}