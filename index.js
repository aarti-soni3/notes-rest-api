require("dotenv").config();
const express = require("express");

const notes =
  require(process.env.DATA_FILE_PATH) || require("./Data/NoteAPI.json");
const { logRequestToFile } = require("./Utility/log-utils.js");
const { findItemById } = require("./Utility/note-utils.js");
const { WriteData, ReadData } = require("./Utility/file-utils.js");
const {
  PostValidationCheckMiddleware,
  PostMetaDataGenerateMiddleware,
  PatchValidationMiddleware,
  DeleteValidationCheckMiddleware,
} = require("./Middleware/middleware.js");

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  logRequestToFile(req);
  next();
});

app.get("/api/notes/reload", async (req, res) => {
  try {
    const data = await ReadData();
    notes.length = 0;
    notes.push(...data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
});

app
  .route("/api/notes")
  .get((req, res) => {
    const { starred } = req.query;

    if (starred !== undefined) {
      const isStarred = starred === "true";
      const filtered = notes.filter((note) => note.is_starred === isStarred);
      return res.status(200).json(filtered);
    }
    return res.status(200).json(notes);
  })
  .post(
    PostValidationCheckMiddleware,
    PostMetaDataGenerateMiddleware,
    async (req, res) => {
      notes.push(req.newNote);

      try {
        await WriteData(notes, "New Note Created Successfully!");
        return res.status(201).json(req.newNote);
      } catch (error) {
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      }
    },
  );

app
  .route("/api/notes/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const note = findItemById(notes, id);
    if (!note)
      return res
        .status(404)
        .json({ status: "error", message: `note with ${id} does not exist` });

    return res.status(200).json(note);
  })
  .patch(PatchValidationMiddleware, async (req, res) => {
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
  })
  .delete(DeleteValidationCheckMiddleware(notes), async (req, res) => {
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
  });

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log("server running on port : " + port);
});
