const fs = require('node:fs/promises');
const path = require('path');

const copyDir = async () => {
  const sourceDir = path.resolve(__dirname, 'files');
  const targetDir = path.resolve(__dirname, 'files-copy');

  try {
    await fs.rm(targetDir, { force: true, recursive: true });
    await fs.mkdir(targetDir, { recursive: true });

    const copyFile = async (targetDir, sourceDir) => {
      for await (const entry of await fs.opendir(targetDir)) {
        const from = path.join(targetDir, entry.name);
        const to = path.join(sourceDir, entry.name);
        entry.isDirectory() ? await copyFile(from, to) : await fs.copyFile(from, to);
      }
    };

    await copyFile(sourceDir, targetDir);

    console.log('Directory copied successfully!');
  } catch (error) {
    console.log('Error copying directory:', error.message);
  }
};

copyDir();