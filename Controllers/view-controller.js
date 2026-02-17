const noteService = require("../Service/note-service");

async function handleGetAllNotes(req, res) {
  const starred = req.qurey;
  const notes = noteService.handleGetAllNotes(starred);
  return res.render("notes", { notes, starred });
}

async function handleCreateNoteForm(req, res) {
  const starred = req.qurey;
  const notes = noteService.handleGetAllNotes(starred);
  return res.render("createNote", { notes });
}

module.exports = {
  handleGetAllNotes,
  handleCreateNoteForm,
};
