const fs = require('fs').promises;
const { readFileAsync, writeFileAsync, processFiles } = require('./allFileFunction.js');

const processFile = async () => {
  try {
    const file1Content = await readFileAsync('./file2.txt');
    console.log(file1Content);


    const processedContent = await processFiles(['./file2.txt', './file3.txt', './file4.txt']);

    let modifiedContent = `${file1Content}\nThis is added from Program`;

    await writeFileAsync('./file2.txt', modifiedContent);

    console.log('File processing complete:', processedContent);
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

processFile();
