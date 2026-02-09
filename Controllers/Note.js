const { findItemById } = require("../Services/NoteService.js");
const { WriteData, ReadData } = require("../Services/FileService.js");
const path = require("path");

const fullPath = path.join(__dirname, "..", "Data", process.env.DATA_FILE_PATH);
const notes = require(fullPath) || require("../Data/NoteAPI.json");

async function ReloadNotes(req, res) {
  try {
    const data = await ReadData();
    notes.length = 0;
    notes.push(...data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

async function handleGetAllUsers(req, res) {
  const { starred } = req.query;
  return res.render("notes", { notes, starred });
}

async function handlerCreateNewNote(req, res) {
  notes.push(req.newNote);

  try {
    await WriteData(notes, "New Note Created Successfully!");
    return res.status(201).json(req.newNote);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

async function handleGetNoteById(req, res) {
  const id = Number(req.params.id);
  const note = findItemById(notes, id);
  if (!note)
    return res
      .status(404)
      .json({ status: "error", message: `note with ${id} does not exist` });

  return res.status(200).json(note);
}

async function handleUpdateNoteById(req, res) {
  const id = Number(req.params.id);
  const data = req.body;
  const note = findItemById(notes, id);

  if (!note)
    return res
      .status(404)
      .json({ status: "error", message: "Note not found!" });

  Object.keys(data).map((key) => {
    note[key] = data[key];
  });

  const date = new Date();
  const updatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  note.updated_at = updatedDate;

  try {
    await WriteData(notes, "Note Updated !");
    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

async function handleDeleteNoteById(req, res) {
  const id = Number(req.params.id);
  const data = notes.filter((note) => note.id !== id);

  try {
    await WriteData(data, "Note Deleted Successfully!");
    return res
      .status(200)
      .json({ status: "success", message: "Note is deleted!" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = {
  handleGetAllUsers,
  ReloadNotes,
  handlerCreateNewNote,
  handleGetNoteById,
  handleUpdateNoteById,
  handleDeleteNoteById,
};
