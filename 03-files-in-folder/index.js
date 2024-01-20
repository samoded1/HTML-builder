const fs = require('fs');
const path = require('path');

const folderPath = '03-files-in-folder/secret-folder';

fs.readdir(folderPath, { withFileTypes: true }, (error, folderContents) => {
  if (error) {
    console.log(`Error: ${error.message}`);
    return;
  }

  folderContents.forEach(file => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);

      fs.stat(filePath, (statError, fileStats) => {
        if (statError) {
          console.log(`Error: ${statError.message}`);
          return;
        }

        const fileName = path.parse(file.name).name;
        const fileExtension = path.extname(file.name).slice(1);
        const fileSize = fileStats.size / 1024;

        console.log(`${fileName} - ${fileExtension} - ${fileSize.toFixed(3)}kb`);
      });
    }
  });
});