const fs = require('node:fs/promises');
const path = require('path');

const buildPage = async () => {
  try {
    const templateFilePath = path.join(__dirname, 'template.html');
    const templateContent = await fs.readFile(templateFilePath, 'utf-8');

    const componentsFolderPath = path.join(__dirname, 'components');
    const stylesFolderPath = path.join(__dirname, 'styles');
    const assetsFolderPath = path.join(__dirname, 'assets');
    const projectDistPath = path.join(__dirname, 'project-dist');

    await fs.mkdir(projectDistPath, { recursive: true });

    let finalHtmlContent = templateContent;
    const matches = templateContent.match(/\{\{([^{}]+)\}\}/g);

    for (const match of matches) {
      const componentName = match.slice(2, -2).trim();
      const componentFilePath = path.join(componentsFolderPath, `${componentName}.html`);
      const componentContent = await fs.readFile(componentFilePath, 'utf-8');
      finalHtmlContent = finalHtmlContent.replace(match, componentContent);
    }

    const indexPath = path.join(projectDistPath, 'index.html');
    await fs.writeFile(indexPath, finalHtmlContent, 'utf-8');
    console.log('index.html created successfully!');

    const outputFilePath = path.join(projectDistPath, 'style.css');
    const files = await fs.readdir(stylesFolderPath);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    let styles = [];

    for (const file of cssFiles) {
      const filePath = path.join(stylesFolderPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      styles.push(fileContent);
    }

    await fs.writeFile(outputFilePath, styles.join('\n'), 'utf-8');
    console.log('style.css created successfully!');

    const targetAssetsPath = path.join(projectDistPath, 'assets');
    await fs.rm(targetAssetsPath, { force: true, recursive: true });
    await fs.mkdir(targetAssetsPath, { recursive: true });

    const copyFile = async (targetDir, sourceDir) => {
      for await (const entry of await fs.opendir(targetDir)) {
        const from = path.join(targetDir, entry.name);
        const to = path.join(sourceDir, entry.name);
        if (entry.isDirectory()) {
          await fs.mkdir(to, { recursive: true });
          await copyFile(from, to);
        } else {
          await fs.copyFile(from, to);
        }
      }
    };

    await copyFile(assetsFolderPath, targetAssetsPath);
    console.log('assets folder copied successfully!');
  } catch (error) {
    console.log('Error:', error.message);
  }
};

buildPage();