const fs = require('node:fs/promises');
const path = require('path');

const bundleStyles = async () => {
  try {
    const stylesFolderPath = path.join(__dirname, 'styles');
    const outputFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

    const files = await fs.readdir(stylesFolderPath);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    let styles = [];

    for (const file of cssFiles) {
      const filePath = path.join(stylesFolderPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      styles.push(fileContent);
    }

    await fs.writeFile(outputFilePath, styles.join('\n'), 'utf-8');
    console.log('Bundle created successfully!');
  } catch (error) {
    console.log('Error:', error.message);
  }
};

bundleStyles();