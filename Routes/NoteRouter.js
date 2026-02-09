const express = require("express");
const router = express.Router();
const path = require("path");

const fullPath = path.join(__dirname, "..", "Data", process.env.DATA_FILE_PATH);
const notes = require(fullPath) || require("../Data/NoteAPI.json");

const {
  PostValidationCheckMiddleware,
  PostMetaDataGenerateMiddleware,
  PatchValidationMiddleware,
  DeleteValidationCheckMiddleware,
} = require("../Middleware/index.js");

const {
  handleGetAllUsers,
  ReloadNotes,
  handlerCreateNewNote,
  handleGetNoteById,
  handleUpdateNoteById,
  handleDeleteNoteById,
} = require("../Controllers/Note.js");

router.get("/reload", ReloadNotes);

router
  .route("/")
  .get(handleGetAllUsers)
  .post(
    PostValidationCheckMiddleware,
    PostMetaDataGenerateMiddleware,
    handlerCreateNewNote,
  );

router
  .route("/:id")
  .get(handleGetNoteById)
  .patch(PatchValidationMiddleware, handleUpdateNoteById)
  .delete(DeleteValidationCheckMiddleware(notes), handleDeleteNoteById);

module.exports = router;
