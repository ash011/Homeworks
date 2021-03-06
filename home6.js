const process = require("process");
const path = require("path");
const fs = require("fs");

const direct = process.argv[2];
if (!direct) {
  throw new Error("Please specify a directory");
}
const directPath = path.resolve(direct);
const textFilePath = path.join(directPath, "sorted_files.txt");
const filesArray = [];

class File {
  constructor(name, size) {
    this.path = name;
    this.size = size;
  }
}

async function recurs(pathIs) {
  try {
    const files = await fs.promises.readdir(pathIs);
    files.forEach(async (file) => {
      const filePath = pathIs + "/" + file;
      const stat = await fs.promises.stat(filePath);
      if (stat.isDirectory()) {
        recurs(filePath);
      } else {
        const fileSize = stat.size;
        const fileName = filePath.substring(directPath.length + 1);
        const fileObj = new File(fileName, fileSize / 1000);
        filesArray.push(fileObj);
        writeFile();
      }
    });
  } catch (error) {
    console.log("No such directory");
  }
}
recurs(directPath);

function writeFile() {
  filesArray.sort((a, b) => {
    if (a.size > b.size) {
      return -1;
    }
    if (a.size < b.size) {
      return 1;
    }
    return 0;
  });

  const text = filesArray
    .map((file) => `${file.path} - ${file.size}kb`)
    .join("\n");

  fs.writeFile(textFilePath, text, (error) => {
    if (error) {
      throw error;
    }
  });
}
