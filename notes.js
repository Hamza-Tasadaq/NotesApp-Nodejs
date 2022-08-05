const fs = require("fs");
// Chalk library to add colors to console's
const chalk = require("chalk");

// Different colors for console
const error = chalk.red;
const success = chalk.green;
const inverse = chalk.inverse;

// Add new Note function
const addNote = (title, body) => {
  // Loads Previous Notes
  const notes = loadNotes();

  //   Check Duplicate note exists or not?
  const duplicateNote = notes.find((note) => note.title === title);

  //   If no duplicate note find then insert new note
  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);

    console.log(success(`Added Successfully!`));
  } else {
    //   If no duplicate note find then display error message
    console.log(error(`Error in adding!`));
  }
};

// Remove existing note
const removeNote = (title) => {
  // Load previous Notes
  const notes = loadNotes();

  //   Check Note is exist or not that we want to read
  const notesAfterDeletingNote = notes.filter((note) => note.title !== title);

  //   Remove note if exists
  if (notesAfterDeletingNote.length < notes.length) {
    saveNotes(notesAfterDeletingNote);
    console.log(success(`Removing Successfully!`));
  } else if (notesAfterDeletingNote.length === notes.length) {
    // Display error message if note not found
    console.log(error(`Error in removing!`));
  }
};

// To read specific note against title
const readNote = (title) => {
  // Loads Previous Notes
  const notes = loadNotes();

  //   Check Note is exist or not that we want to read
  const readedNote = notes.find((note) => note.title === title);

  //   Display note if exists
  if (readedNote) {
    console.log(success(`Your Note :-`));
    console.log(inverse(`Title = ${readedNote.title}`));
    console.log(inverse(`Body = ${readedNote.body}`));
  } else {
    // Display error message if note not found
    console.log(error(`No Note Find!`));
  }
};

// To list all the notes
const listNotes = () => {
  // Load Previous Notes
  const notes = loadNotes();

  console.log(inverse("Yor Notes"));

  //   Display Notes
  notes.forEach((note) => {
    console.log(note.title);
  });
};

// To save notes into a file
const saveNotes = function (notes) {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

// To load Notes from the file
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
