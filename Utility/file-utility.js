const fs = require("fs").promises;
const path = require("path");

const fullPath = path.join(__dirname, "..", "Data", process.env.DATA_FILE_PATH);

async function WriteData(data, message) {
  const jsonData = JSON.stringify(data);

  try {
    await fs.writeFile(fullPath, jsonData, "utf-8");
    console.log(message);
  } catch (error) {
    throw error;
  }
}

async function ReadData() {
  try {
    const data = await fs.readFile(fullPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  WriteData,
  ReadData,
};
