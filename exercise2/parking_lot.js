#! /usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const main = (() => {
  let parkingSlots = [];

  const createParkingSlot = (number) => {
    parkingSlots = new Array(+number).fill(null);
    return parkingSlots.length;
  };

  const park = (registrationNumber, color) => {
    const car = {
      registrationNumber,
      color,
    };

    const emptySlot = parkingSlots.findIndex((slot) => slot === null);

    if (emptySlot === -1) {
      return null;
    }

    car.slotNumber = emptySlot + 1;

    const updatedParkingSlots = [...parkingSlots];
    updatedParkingSlots[emptySlot] = car;
    parkingSlots = updatedParkingSlots;

    return emptySlot + 1;
  };

  const unpark = (parkSlot) => {
    const updatedParkingSlots = [...parkingSlots];
    updatedParkingSlots[+parkSlot - 1] = null;
    parkingSlots = updatedParkingSlots;

    return parkSlot;
  };

  const status = () => parkingSlots;

  const findRegistrationNumbersByColor = (color) => {
    const registrationNumbers = parkingSlots
      .filter((car) => {
        if (car) return car.color === color;
      })
      .map((car) => car.registrationNumber);

    return registrationNumbers.length === 0 ? null : registrationNumbers;
  };

  const findSlotNumbers = (filterFunction) => {
    const slotNumbers = parkingSlots
      .filter(filterFunction)
      .map((car) => car.slotNumber);

    return slotNumbers.length === 0 ? null : slotNumbers;
  };

  const findSlotNumbersByColor = (color) => {
    return findSlotNumbers((car) => {
      if (car) {
        return car.color === color;
      }
    });
  };

  const findSlotNumbersByRegistrationNumber = (registrationNumber) => {
    return findSlotNumbers((car) => {
      if (car) {
        return car.registrationNumber === registrationNumber;
      }
    });
  };

  return {
    createParkingSlot,
    park,
    unpark,
    status,
    findRegistrationNumbersByColor,
    findSlotNumbersByColor,
    findSlotNumbersByRegistrationNumber,
  };
})();

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
