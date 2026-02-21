const express = require("express");
const router = express.Router();

const {
  PostValidationCheckMiddleware,
  PostMetaDataGenerateMiddleware,
  FieldValidationMiddleware,
} = require("../Middleware/index.js");

const {
  handleGetAllNotes,
  handleShowCreateNoteForm,
  handleCreateNewNote,
  handleShowUpdateNoteForm,
  handleUpdateNoteById,
  handleDeleteNoteById,
} = require("../Controllers/view-controller");

router
  .route("/")
  .get(handleGetAllNotes)
  .post(
    PostValidationCheckMiddleware,
    PostMetaDataGenerateMiddleware,
    handleCreateNewNote,
  ); // 1st mistake to creating post req with diff path

router.route("/create-note").get(handleShowCreateNoteForm);

router
  .route("/:id")
  .get(handleShowUpdateNoteForm)
  .patch(FieldValidationMiddleware, handleUpdateNoteById)
  .delete(handleDeleteNoteById);

module.exports = router;
