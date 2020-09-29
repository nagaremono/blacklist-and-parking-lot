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

    const updatedParkingSlots = [...parkingSlots];
    updatedParkingSlots[emptySlot] = car;

    parkingSlots = updatedParkingSlots;

    return parkingSlots;
  };

  return { createParkingSlot, park };
})();
