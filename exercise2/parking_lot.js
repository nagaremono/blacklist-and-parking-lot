#! /usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const runCommand = require('./runCommand');

const parseCommandStringAndRun = (commandString) => {
  const splittedCommand = commandString.split(' ');
  const resultMessage = runCommand(
    splittedCommand[0],
    splittedCommand.slice(1)
  );

  return resultMessage;
};

if (process.argv.length === 3) {
  const read = async () => {
    const file = fs.createReadStream(path.join(__dirname, process.argv[2]));

    const rl = readline.createInterface({
      input: file,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const resultMessage = parseCommandStringAndRun(line);
      console.log(resultMessage);
    }
  };

  read();
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Please input commands');

  rl.on('line', (commandInput) => {
    const resultMessage = parseCommandStringAndRun(commandInput);
    console.log(resultMessage);
  });
}
