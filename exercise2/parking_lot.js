#! /usr/bin/env node

const main = (() => {
  let parkingSlots;

  const createParkingSlot = (number) => {
    parkingSlots = new Array(number).fill(null);
  };

  return { createParkingSlot };
})();
