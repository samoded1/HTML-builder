const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const fileStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

fileStream.on('ready', () => console.log('Welcome! Enter text (or type "exit" to end):'));

rl.on('line', (input) => {
  if (input === 'exit') {
    fileStream.close();
    rl.close();
    return;
  }
  fileStream.write(input + '\n');
  console.log('Text entered! Enter more (or type "exit" to end):');
})

rl.on('close', () => console.log('Goodbye!'));