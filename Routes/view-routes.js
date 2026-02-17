const express = require("express");
const router = express.Router();

const {
  PostValidationCheckMiddleware,
  PostMetaDataGenerateMiddleware,
} = require("../Middleware/index.js");

const {
  handleGetAllNotes,
  handleShowCreateNoteForm,
  handleCreateNewNote,
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

module.exports = router;
