#! /usr/bin/env node
const main = (() => {
  let parkingSlots = [];

  const createParkingSlot = (number) => {
    parkingSlots = new Array(number).fill(null);
    return parkingSlots;
  };

  const park = (registrationNumber, color) => {
    const car = {
      registrationNumber,
      color,
    };

    const emptySlot = parkingSlots.findIndex((slot) => slot === null);

    if (emptySlot === -1) return null;

    car.slotNumber = emptySlot + 1;

    const updatedParkingSlots = [...parkingSlots];
    updatedParkingSlots[emptySlot] = car;

    parkingSlots = updatedParkingSlots;

    return emptySlot + 1;
  };

  const unpark = (parkSlot) => {
    const updatedParkingSlots = [...parkingSlots];
    updatedParkingSlots[parkSlot - 1] = null;
    parkingSlots = updatedParkingSlots;

    return parkSlot - 1;
  };

  const status = () => parkingSlots;

  const findRegistrationNumbersByColor = (color) => {
    const carsWithCertainColor = parkingSlots.filter((car) => {
      if (car) return car.color === color;
    });

    const registrationNumbers = carsWithCertainColor.map(
      (car) => car.registrationNumber
    );

    return registrationNumbers.length === 0 ? null : registrationNumbers;
  };

  const findSlotNumbers = (filterFunction) => {
    const carsWithCertainColor = parkingSlots.filter(filterFunction);

    const slotNumbers = carsWithCertainColor.map((car) => car.slotNumber);

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

main.createParkingSlot(10);

main.park('23454253', 'red');
main.park('23454253', 'blue');
main.park('23454253', 'red');
main.park('234ss54253', 'yellow');
main.park('23454253', 'red');

console.log(main.findSlotNumbersByColor('yellow'));
console.log(main.findSlotNumbersByRegistrationNumber('23454253'));
console.log(main.findRegistrationNumbersByColor('yellow'));
