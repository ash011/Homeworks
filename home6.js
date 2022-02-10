const process = require("process");
const path = require("path");
const fs = require("fs");

const direct = process.argv[2];
if (!direct) {
  throw new Error("Please specify a directory");
}
const directPath = path.resolve(direct);
const textFilePath = path.join(directPath, "sorted_files.txt");

const files = fs.readdirSync(directPath);
const textArray = files.map((file) => {
  let filePath = path.join(directPath, file);
  filePath += `--->${fs.statSync(filePath).size / 1000}kb\n`;
  return filePath;
});

const text = textArray.join("");

fs.writeFile(textFilePath, text, (error) => {
  if (error) {
    throw error;
  }
});
