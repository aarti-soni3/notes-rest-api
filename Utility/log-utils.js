const fs = require("fs").promises;
const path = require("path");

const logDir = path.join(__dirname, "..", "Data");
const filePath = path.join(logDir, "log.txt");
async function logRequestToFile(req) {
  const methodName = req.method;
  const urlPath = req.url;
  try {
    await fs.appendFile(
      filePath,
      `${methodName}, ${urlPath} New Request Received\n`,
    );
  } catch (error) {
    console.error(`Failed to write log! ${error}`);
  }
}

module.exports = {
  logRequestToFile,
};
