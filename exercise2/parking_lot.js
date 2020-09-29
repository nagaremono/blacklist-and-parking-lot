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

    return carsWithCertainColor;
  };

  return {
    createParkingSlot,
    park,
    unpark,
    status,
    findRegistrationNumbersByColor,
  };
})();
