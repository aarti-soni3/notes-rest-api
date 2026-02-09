const fs = require("fs").promises;

const filePath = "../Data/NoteAPI.json";

async function WriteData(data, message) {
  const jsonData = JSON.stringify(data);

  try {
    await fs.writeFile(filePath, jsonData, "utf-8");
  } catch (error) {
    throw error;
  }
}

async function ReadData() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  WriteData,
  ReadData,
};
