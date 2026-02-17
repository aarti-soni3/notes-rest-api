const noteService = require("../Service/note-service");

async function handleGetAllNotes(req, res) {
  const starred = req.qurey;
  const notes = noteService.handleGetAllNotes(starred);
  return res.render("notes", { notes, starred });
}

async function handleShowCreateNoteForm(req, res) {
  const starred = req.qurey;
  const notes = noteService.handleGetAllNotes(starred);
  return res.render("createNote", { notes });
}

async function handleCreateNewNote(req, res) {
  try {
    await noteService.handleCreateNote(req.newNote);
    return res.status(201).redirect("/notes/");
  } catch (error) {
    return res.status(500).render("createNote");
  }
}

module.exports = {
  handleGetAllNotes,
  handleShowCreateNoteForm,
  handleCreateNewNote,
};
