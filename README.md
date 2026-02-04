# Notes REST API

A simple REST API for managing notes, built with Node.js and Express.

## Features
- Create, read, update, delete notes
- Filter notes by starred status
- File-based storage (JSON)
- Request logging

## Technologies
- Node.js
- Express.js
- File System (fs)

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-folder>
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

## API Endpoints

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

## Project Structure
```
project-root/
├── Data/
|   ├── log.txt               # Request logs (generated at runtime)
│   └── NoteAPI.json          # JSON file for storing notes data
├── Middleware/
│   └── middleware.js         # Validation middlewares for POST, PATCH, DELETE
├── Utility/
│   ├── file-utils.js         # File read/write operations
│   ├── log-utils.js          # Request logging utilities
│   └── note-utils.js         # Note helper functions (find by ID, etc.)
├── index.js                  # Main server file with route definitions
├── .env                      # Environment variables (not in repo)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
├── package-lock.json         # Locked dependency versions
└── README.md                 # Project documentation
```