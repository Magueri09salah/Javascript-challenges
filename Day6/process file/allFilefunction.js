const fs = require('fs').promises;

const readFileAsync = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    throw new Error(`Error reading file '${filePath}': ${error.message}`);
  }
};



const processFiles = async (filePaths) => {
  try {
    let text = '';
    for (const filePath of filePaths) {
      console.log("File:", filePath);
      const fileContent = await readFileAsync(filePath);
      console.log(fileContent);
      text += `\n\n${fileContent}\n`;
    }
    await writeFileAsync('./newFilecreated.txt', text);
    return 'Files processed successfully';
  } catch (error) {
    throw new Error(`Error processing files: ${error.message}`);
  }
};

const writeFileAsync = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, content);
    console.log(`File '${filePath}' written successfully`);
  } catch (error) {
    throw new Error(`Error writing to file '${filePath}': ${error.message}`);
  }
};

module.exports = { readFileAsync, writeFileAsync, processFiles };
