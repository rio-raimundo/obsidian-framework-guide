// Define functions to import by first making a reference to the templater 'tp' object
function generateTemplate(citekey) {
  // Load other functions that we need - must be inside function to prevent 'circular' initialisation at templater startup
  const userFuncs = app.plugins.plugins['templater-obsidian'].templater.functions_generator.user_functions.user_script_functions.plugin.templater.current_functions_object.user;
  const authorsString = userFuncs.authorsString;
  const urlString = userFuncs.urlString;
  
  // Define the template here!
  let entry = app.plugins.plugins['obsidian-citation-plugin'].library.entries[citekey];

  // Define the type (can either be in data.fields.type array or just data as a string)
  if ('type' in entry.data.fields) { document_type = entry.data.fields.type[0] }
  else if ('type' in entry.data) { document_type = entry.data.type }
  else { document_type = "misc" }
  document_type = document_type.toLowerCase();

  const template = `
---
title: "${entry.title}"
journal: "${entry.data.fields.journal?.[0] ?? ""}"
tags:
  - document/${document_type}
${authorsString(citekey, 2)}
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