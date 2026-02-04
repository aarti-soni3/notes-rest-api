function findItemById(notes, id) {
  return notes.find((note) => note.id === id);
}

module.exports = {
  findItemById,
};
