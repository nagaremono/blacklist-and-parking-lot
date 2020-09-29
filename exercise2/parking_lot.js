#! /usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const main = require('./main');

const createSearchResultMessage = (resultArray) => {
  return resultArray ? resultArray.join(', ') : 'Not Found';
};

const runCommand = (command, ...arguments) => {
  let message, result;

  switch (command) {
    case 'create_parking_lot':
      result = main.createParkingSlot(arguments[1]);
      message = `Created a parking lot with ${result} slots`;
      break;
    case 'park':
      result = main.park(arguments[1], arguments[2]);
      message = result
        ? `Allocated slot number: ${result}`
        : 'Sorry, parking lot is full';
      break;
    case 'leave':
      result = main.unpark(arguments[1]);
      message = `Slot number ${result} is free`;
      break;
    case 'registration_numbers_for_cars_with_colour':
      result = main.findRegistrationNumbersByColor(arguments[1]);
      message = createSearchResultMessage(result);
      break;
    case 'slot_numbers_for_cars_with_colour':
      result = main.findSlotNumbersByColor(arguments[1]);
      message = createSearchResultMessage(result);
      break;
    case 'slot_number_for_registration_number':
      result = main.findSlotNumbersByRegistrationNumber(arguments[1]);
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
      const resultMessage = runCommand(splittedCommand[0], ...splittedCommand);
      console.log(resultMessage);
    }
  };

  read();
}
