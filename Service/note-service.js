const path = require("path");
const { WriteData, ReadData } = require("../Utility/file-utility");

// const fullPath = path.join(__dirname, "..", "Data", process.env.DATA_FILE_PATH);
// const notes = require(fullPath) || require("../Data/NoteAPI.json");

class NoteService {
  constructor() {
    this.notes = [];
  }

  async initialize() {
    try {
      this.notes = [];
      this.notes = await ReadData();
      console.log("Files are loaded!");
    } catch (error) {
      console.error("Falied to load notes", error);
      this.notes = [];
    }
  }

  handleGetAllNotes(starred) {
    console.log(this.notes);
    if (starred === undefined) return this.notes;

    console.log("starred", starred);
    const isStarred = starred === "true";
    console.log(isStarred);
    const notes = this.notes.filter((note) => note.isStarred === isStarred);
    console.log(notes);
    return notes;
  }

  async handleCreateNote(noteData) {
    try {
      this.notes.push(noteData);
      await WriteData(this.notes);
      return this.notes;
    } catch (error) {
      console.error("Failed to create note ", error);
    }
  }

  handleGetNoteById(id) {
    try {
      const note = this.findItemById(id);
      if (!note) throw Error("Note not found");
      return note;
    } catch (error) {
      console.error(`can't get note by id : ${id}, error: ${error}`);
    }
  }

  async handleUpdateById(id, data) {
    try {
      const note = this.findItemById(id);
      if (!note) throw Error("Note not found");

      Object.keys(data).map((key) => {
        return (note[key] = data[key]);
      });

      const date = new Date();
      const updatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      note.updated_at = updatedDate;

      this.notes.filter((n) => {
        if (n.id === note.id) n = note;
      });

      await WriteData(this.notes, "Note Updated!");
      return note;
    } catch (error) {
      console.error(`Can't update note with id : ${id} , error : ${error}`);
    }
  }

  async handleDeleteById(id) {
    try {
      const note = this.findItemById(id);

      console.log("Notessss : ",note)

      if (!note) throw new Error("Note not found");

      const data = this.notes.filter((note) => note.id !== id);
      await WriteData(data, "Note Deleted!");
    } catch (error) {
      console.error(`Can't delete note with id : ${id} , error : ${error}`);
    }
  }

  findItemById(id) {
    return this.notes.find((note) => note.id === id);
  }
}

const noteService = new NoteService();
module.exports = noteService;
// module.exports = {
//   findItemById,
//   initialize,
//   handleGetAllNotes,
//   handleCreateNote,
//   handleGetNoteById,
//   handleUpdateById,
//   handleDeleteById
// };
