const noteService = require("../Service/note-service.js");

function PostValidationCheckMiddleware(req, res, next) {
  const data = req.body;

  if (
    !data.title ||
    !data.content ||
    data.is_starred === undefined ||
    !data.tags
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required !" });
  } else {
    next();
  }
}

function PostMetaDataGenerateMiddleware(req, res, next) {
  const data = req.body;

  const newId = Date.now();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const newDate = `${month}/${day}/${year}`;

  data.is_starred = JSON.parse(data.is_starred);
  const newNote = {
    ...data,
    id: newId,
    created_at: newDate,
    updated_at: newDate,
  };

  req.newNote = newNote;
  next();
}

function FieldValidationMiddleware(req, res, next) {
  const protectedFields = ["id", "created_at", "updated_at"];
  const allowedFields = ["title", "content", "tags", "is_starred"];
  const data = req.body;

  for (const key of Object.keys(data)) {
    if (protectedFields.includes(key)) {
      return res
        .status(400)
        .json({ status: "error", message: `Can't update ${key} field!` });
    }

    if (!allowedFields.includes(key)) {
      return res
        .status(400)
        .json({ status: "error", message: `Can't Update random Field!` });
    }
  }
  next();
}

function DeleteValidationCheckMiddleware(notes) {
  return (req, res, next) => {
    const id = Number(req.params.id);
    const isIdValid = noteService.findItemById(notes, id);

    if (!isIdValid) {
      return res.status(400).json({
        status: "error",
        message: `you can't delete note with id:${id} doesn't with exist`,
      });
    } else {
      next();
    }
  };
}

module.exports = {
  PostValidationCheckMiddleware,
  PostMetaDataGenerateMiddleware,
  FieldValidationMiddleware,
  DeleteValidationCheckMiddleware,
};
