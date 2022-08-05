const yargs = require("yargs");

// Have functions to work with filesystem 
const notes = require("./notes");

// Creating add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: String,
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: String,
    },
  },
  handler: function (argv) {
    const { title, body } = argv;
    notes.addNote(title, body);
  },
});

// Creating remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: String,
    },
  },
  handler: function (argv) {
    const { title } = argv;
    notes.removeNote(title);
  },
});

// Creating update command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function (argv) {
    const { title } = argv;
    notes.readNote(title);
  },
});

// Creating list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler: function () {
    notes.listNotes();
  },
});

yargs.parse();
