#! /usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const main = require('./main');

const createSearchResultMessage = (resultArray) => {
  return resultArray ? resultArray.join(', ') : 'Not Found';
};

const runCommand = (command, arguments) => {
  let message, result;

  switch (command) {
    case 'create_parking_lot':
      result = main.createParkingSlot(...arguments);
      message = `Created a parking lot with ${result} slots`;
      break;
    case 'park':
      result = main.park(...arguments);
      message = result
        ? `Allocated slot number: ${result}`
        : 'Sorry, parking lot is full';
      break;
    case 'leave':
      result = main.unpark(...arguments);
      message = `Slot number ${result} is free`;
      break;
    case 'registration_numbers_for_cars_with_colour':
      result = main.findRegistrationNumbersByColor(...arguments);
      message = createSearchResultMessage(result);
      break;
    case 'slot_numbers_for_cars_with_colour':
      result = main.findSlotNumbersByColor(...arguments);
      message = createSearchResultMessage(result);
      break;
    case 'slot_number_for_registration_number':
      result = main.findSlotNumbersByRegistrationNumber(...arguments);
      message = createSearchResultMessage(result);
      break;
    default:
      result = main.status();
      message = 'Slot\tRegistration Number\tColor\n';
      result.forEach((res) => {
        if (res) {
          message += `${res.slotNumber}\t${res.registrationNumber}\t\t${res.color}\n`;
        }
      });
      break;
  }

  return message;
};

if (process.argv.length === 3) {
  const read = async () => {
    const file = fs.createReadStream(path.join(__dirname, process.argv[2]));

    const rl = readline.createInterface({
      input: file,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const splittedCommand = line.split(' ');
      const resultMessage = runCommand(
        splittedCommand[0],
        splittedCommand.slice(1)
      );
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
    const splittedCommand = commandInput.split(' ');
    const resultMessage = runCommand(
      splittedCommand[0],
      splittedCommand.slice(1)
    );
    console.log(resultMessage);
  });
}
