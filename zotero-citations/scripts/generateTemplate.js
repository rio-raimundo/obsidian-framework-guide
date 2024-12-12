// Define functions to import by first making a reference to the templater 'tp' object
function generateTemplate(citekey) {
  // Load other functions that we need - must be inside function to prevent 'circular' initialisation at templater startup
  const userFuncs = app.plugins.plugins['templater-obsidian'].templater.functions_generator.user_functions.user_script_functions.plugin.templater.current_functions_object.user;
  const authorsString = userFuncs.authorsString;
  const urlString = userFuncs.urlString;
  
  // Define the template here!
  let entry = app.plugins.plugins['obsidian-citation-plugin'].library.entries[citekey];
  console.log(entry);
  const template = `
---
title: "${entry.title}"
tags:
  - document/${entry.data.type}
${authorsString(citekey, 2)}
journal: "${entry.data.fields.journal?.[0] ?? ""}"
zotero: ${entry.zoteroSelectURI}
doi: ${urlString(citekey)}
authors:
${authorsString(citekey, 1)}
citation key: ${citekey}
---

> [!my-abstract]- Abstract
> ${entry.abstract}

> [!my-summary] Summary
> -
`.slice(1);  // remove the newline

    return template
}

module.exports = generateTemplate;