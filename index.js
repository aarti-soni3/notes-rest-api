require("dotenv").config();
const express = require("express");
const path = require("path");

const { logRequestToFile } = require("./Utility/log-utility.js");
const APIRoutes = require("./Routes/api-routes.js");
const ViewRoutes = require("./Routes/view-routes.js");

const noteService = require("./Service/note-service.js");

const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logRequestToFile);

(async () => {
  if (noteService.notes.length === 0) {
    await noteService.initialize();
  }
})();

app.use("/api/notes", APIRoutes);
app.use("/notes", ViewRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log("server running on port : " + port);
});
