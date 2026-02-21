const path = require("path");
const { WriteData, ReadData } = require("../Utility/file-utility");

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
    if (starred === undefined) return this.notes;

    console.log("starred", starred);
    const isStarred = starred === "true";
    const notes = this.notes.filter((note) => note.isStarred === isStarred);
    return notes;
  }

  async handleCreateNote(noteData) {
      this.notes.push(noteData);
      await WriteData(this.notes);
      return this.notes;
  }

  handleGetNoteById(id) {
      const note = this.findItemById(id);
      if (!note) throw Error("Note not found");
      return note;
  }

  async handleUpdateById(id, data) {
      const note = this.findItemById(parseInt(id));
      if (!note) throw Error("Note not found");

      Object.keys(data).map((key) => {
        return (note[key] = data[key]);
      });

      const date = new Date();
      const updatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      note.updated_at = updatedDate;

      this.notes = this.notes.map((n) => (n.id === note.id ? note : n));

      await WriteData(this.notes, "Note Updated!");
      return note;
  }

  async handleDeleteById(id) {
      const note = this.findItemById(id);
      if (!note) throw new Error("Note not found");

      const data = this.notes.filter((note) => note.id !== id);
      await WriteData(data, "Note Deleted!");
      this.notes = data;
  }

  findItemById(id) {
    return this.notes.find((note) => note.id === id);
  }
}

const noteService = new NoteService();
module.exports = noteService;
