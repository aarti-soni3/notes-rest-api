const noteService = require("../Service/note-service");

async function handleGetAllNotes(req, res) {
  const starred = req.qurey;
  const notes = noteService.handleGetAllNotes(starred);
  return res.render("notes", { notes, starred });
}

async function handleShowCreateNoteForm(req, res) {
  return res.render("createNote");
}

async function handleCreateNewNote(req, res) {
  try {
    await noteService.handleCreateNote(req.newNote);
    return res.status(201).redirect("/notes/");
  } catch (error) {
    return res.status(500).render("createNote");
  }
}

async function handleShowUpdateNoteForm(req, res) {
  const id = parseInt(req.params.id);
  const note = await noteService.handleGetNoteById(id);
  return res.render("updateNote", { note });
}

async function handleUpdateNoteById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const data = req.body;
    data.is_starred = data.is_starred === "on" ? true : false;
    await noteService.handleUpdateById(id, data);
    return res.status(200).redirect("/notes/");
  } catch (error) {
    const note = await noteService.handleGetNoteById(id);
    return res.status(500).render("updateNote", {
      note,
      error: "Something went wrong, please try again...!!",
    });
  }
}

async function handleDeleteNoteById(req, res) {
  const id = parseInt(req.params.id);
  const starred = req.query.starred;
  try {
    await noteService.handleDeleteById(id);
    const notes = noteService.handleGetAllNotes();
    return res.status(200).redirect("/notes/");
  } catch (error) {
    const notes = noteService.handleGetAllNotes();
    return res.status(500).render("notes", {
      notes,
      starred,
      error: "Could not delete note, please try again",
    });
  }
}

module.exports = {
  handleGetAllNotes,
  handleShowCreateNoteForm,
  handleCreateNewNote,
  handleShowUpdateNoteForm,
  handleUpdateNoteById,
  handleDeleteNoteById,
};
