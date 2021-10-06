Create your bot in '/bots/', following the 'example.jsonc' file notation.

The main script can run multiple bots at the same tima, it gets the bots' informations from the bot's file in the folder 'bots', so create your bot file here: '/bots/'.

Example: '/bots/myBot.json'

In the case of the example file: '/bots/example.jsonc'.

The 'index.js' file in the folder reads all files, aside of itself and the example file, from the folder and deliver to the main script, so don't edit, move or delete it, unless you know what you are doing. Also dont add any file that is not a Bot's json file or it may try to read it and break.

The main script accepts json and jsonc (json with comments) files.
The example file is a jsonc to allow comments and just for it, in your bot you can just create a normal json file, but if you use a jsonc file it will work as well.

If you are in a json file and want to comment on in, in VSCode, click on "JSON" in the right bottom corner, then type jsonc and press enter to enable json with comments.