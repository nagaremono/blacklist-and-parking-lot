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

module.exports = main;
