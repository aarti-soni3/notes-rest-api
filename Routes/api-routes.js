const express = require("express");
const router = express.Router();
const path = require("path");

const fullPath = path.join(__dirname, "..", "Data", process.env.DATA_FILE_PATH);
const notes = require(fullPath) || require("../Data/NoteAPI.json");

const {
  PostValidationCheckMiddleware,
  PostMetaDataGenerateMiddleware,
  FieldValidationMiddleware,
  DeleteValidationCheckMiddleware,
} = require("../Middleware/index.js");

const {
  handleGetAllNotes,
  // ReloadNotes,
  handlerCreateNewNote,
  handleGetNoteById,
  handleUpdateNoteById,
  handleDeleteNoteById,
} = require("../Controllers/api-controller.js");

// router.get("/reload", ReloadNotes);

router
  .route("/")
  .get(handleGetAllNotes)
  .post(
    FieldValidationMiddleware,
    PostValidationCheckMiddleware,
    PostMetaDataGenerateMiddleware,
    handlerCreateNewNote,
  );

router
  .route("/:id")
  .get(handleGetNoteById)
  .patch(FieldValidationMiddleware, handleUpdateNoteById)
  .delete(handleDeleteNoteById);

module.exports = router;
