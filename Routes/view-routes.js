const express = require("express");
const router = express.Router();

const {
  handleGetAllNotes,
  handleCreateNoteForm,
} = require("../Controllers/view-controller");

router.route("/").get(handleGetAllNotes);

router.route("/create-note").get(handleCreateNoteForm);

module.exports = router;
