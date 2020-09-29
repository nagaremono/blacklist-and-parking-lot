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

module.exports = runCommand;
