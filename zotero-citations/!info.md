# Zotero citations
- The `.js` files here are largely helper files for the `generateTemplate.js` file, which is used as the base template when I import academic articles as papers from Zotero.

## Setting up the import structure
This section will provide an overview of my personal workflow for importing Zotero articles as Obsidian notes.
- First, both the `Templater` and `Citations` Obsidian plugins will need to be installed.
- Follow the information provided in the `Citations` plugin to generate a BibTex (`.bib`) bibliography file inside your vault and link to it from the Citations plugin.
- Next, the contents of the `scripts` subfolder here should be copied to somewhere in your vault. 
- Then, in the `Templater` settings, set the `Script files folder location` to be the location of your copied folder.
- Finally, the contents of `literature-note-content-template.md` should be copied into the `Literature note content template` in the `Citations` plugin.
- Now, all new notes should automatically have their titles renamed and be populated with the right template.
- If you would like to change the template, all you have to do is edit the `generateTemplate.js` file as needed!

## Editing existing files 
- Sometimes you change your import structure, but are then left with outdated formatting on your old article pages. To get around this, I created the [obsidian-text-tools](https://github.com/rio-raimundo/obsidian-text-tools) repository.
- This repo contains code written in Python, and provides architecture for a user to execute a simple Python function at the level of every 'article' file in the vault, alongside a set of helpful existing functions to speed up various operations (such as rearranging the properties of a file!)
- Though this repo was originally designed purely for personal use, the `main` branch has been adapted to provide documentation and hopefully allow others to use it for their own vaults.