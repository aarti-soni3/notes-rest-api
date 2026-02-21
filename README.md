# Notes REST API

A learning project — a Notes app built with Node.js and Express that supports both a **REST API** (JSON responses) and **Server-Side Rendering (SSR)** with EJS views.

> 📚 This is a personal learning project built to practice Node.js, Express, REST API design, SSR with EJS, file-based storage, and middleware patterns.

---

## Features

- Create, read, update, delete notes (CRUD)
- Filter notes by starred status
- Server-Side Rendered UI with EJS templates
- REST API endpoints returning JSON
- File-based storage (JSON)
- Request logging
- Input validation middleware

---

## Technologies

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- File System (`fs`) for storage
- method-override (for PATCH/DELETE via HTML forms)

---

## Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd notes-rest-api
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file (copy from `.env.example`)

```bash
cp .env.example .env
```

4. Start the server

```bash
npm start
# or for development with nodemon
npm run dev
```

---

## SSR Routes (Browser / UI)

These routes return rendered HTML pages.

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/notes` | View all notes |
| GET | `/notes/create-note` | Show create note form |
| POST | `/notes` | Submit new note |
| GET | `/notes/:id` | Show update form pre-filled with note data |
| PATCH | `/notes/:id` | Submit updated note (via method-override) |
| DELETE | `/notes/:id` | Delete a note (via method-override) |

---

## API Endpoints (JSON)

These routes return JSON data, suitable for use with tools like Postman or a frontend client.

### Get All Notes

```
GET /api/notes
```

### Get Notes by Starred Status

```
GET /api/notes?starred=true
```

### Get Single Note

```
GET /api/notes/:id
```

### Create Note

```
POST /api/notes
Content-Type: application/json

{
  "title": "Note title",
  "content": "Note content",
  "tags": "work",
  "is_starred": false
}
```

### Update Note

```
PATCH /api/notes/:id
Content-Type: application/json

{
  "title": "Updated title"
}
```

### Delete Note

```
DELETE /api/notes/:id
```

### Reload Notes from File

```
GET /api/notes/reload
```

---

## Project Structure

```
notes-rest-api/
├── Controllers/
│   ├── api-controller.js       # Handles API routes, returns JSON
│   └── view-controller.js      # Handles SSR routes, renders EJS views
├── Data/
│   ├── log.txt                 # Request logs (generated at runtime)
│   ├── NoteAPI.json            # JSON file for storing notes
│   └── NoteAPI_Original.json   # Backup of original notes data
├── Middleware/
│   └── index.js                # Validation middlewares (POST, PATCH, DELETE)
├── Routes/
│   ├── api-routes.js           # API route definitions (/api/notes)
│   └── view-routes.js          # SSR route definitions (/notes)
├── Service/
│   └── note-service.js         # Business logic (CRUD operations on notes)
├── Utility/
│   ├── file-utility.js         # File read/write operations
│   └── log-utility.js          # Request logging utilities
├── Views/
│   ├── notes.ejs               # All notes list page
│   ├── createNote.ejs          # Create note form
│   └── updateNote.ejs          # Update note form
├── index.js                    # App entry point, middleware setup
├── .env                        # Environment variables (not in repo)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

---

## What I Learned

- Structuring an Express app with MVC pattern (Controllers, Routes, Service layers)
- Building a REST API with proper HTTP methods (GET, POST, PATCH, DELETE)
- Server-Side Rendering with EJS templates
- Using `method-override` to support PATCH/DELETE from HTML forms
- Writing middleware for input validation
- File-based data persistence with `fs.promises`
- Keeping in-memory state in sync with file storage
- Error handling in async controllers

---

## License

MIT
