require("dotenv").config();
const express = require("express");
const path = require("path");

const { logRequestToFile } = require("./Services/LogService.js");
const NoteRoutes = require("./Routes/NoteRouter.js");

const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views "));

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logRequestToFile);

app.use("/api/notes", NoteRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log("server running on port : " + port);
});
