import chalk from 'chalk';
import { findIndex, isNumber } from 'lodash';
import { calculateCharge, validateIndianNumberPlate } from '../../utils/core';

/**
 * ParkingLot Class
 * @description :: class level logic for managing parking lot
 */

export class ParkingLot {
  MAX_PARKING_SLOTS: number;
  parkingSlots: Array<string>;
  isFull: boolean;

  constructor () {
    // this.MAX_PARKING_SLOTS = 5;
    // this.parkingSlots = [      
    //   'KA-01-HH-1234',
    //   'KA-01-HH-9999',
    //   'KA-01-BB-0001',
    //   'KA-01-HH-7777',
    //   'KA-01-HH-2701',
    // ];
    this.isFull = false;
    this.MAX_PARKING_SLOTS = 0;
    this.parkingSlots = [];
  }

  /**
	 * @param {number} totalSlotsInput user's input via terminal
	 * @description creates a parking lot with given maximum slot numbers.
	 * Throws an error if invalid input is supplied.
	 * Throws an error if something wents wrong while creating.
	 */
  create (totalSlotsInput: number) {
    try {
      if (isNaN(totalSlotsInput) || totalSlotsInput < 0) throw new Error('invalid_number');

      this.MAX_PARKING_SLOTS = totalSlotsInput;
            
      for (let i = 0; i < this.MAX_PARKING_SLOTS; i++) {
        this.parkingSlots.push(null);
      }
            
      console.log(chalk.green.bold(totalSlotsInput, ' slots created.', this.parkingSlots.length));

    } catch (error) {
      if (error.message === 'invalid_number') {
        console.log(chalk.red.bold('Please enter a valid number for parking slots.'));
      } else {
        console.log(chalk.red.bold('Something went wrong while creating parking slots.'));
      }
    }
  }

  /**
	 * @description fetch and render on terminal parking lot details.
   * Throws an error if something wents wrong while fetching.
	 */
  status () {
    try {
      console.log(chalk.yellow('Slots   Car Number Plate'));

      for (let i = 0; i < this.MAX_PARKING_SLOTS; i++) {
        const carNumber = this.parkingSlots[i];

        if (carNumber === null) {
          console.log(chalk.green.bold(i+1, '     Available'));
        } else {
          console.log(chalk.white(i+1, '     ', carNumber));
        }
      }
    } catch (error) {
      console.log(chalk.red.bold('Something went wrong while fetching parking slots.'));
    }
  }

  
  /**
	 * @description park/assign a car to a parking slot.
	 */
  park (carNumber: string) {
    try {
      // added validation for car number format
      if (!validateIndianNumberPlate(carNumber)) throw new Error('invalid_number_plate');

      if (this.isFull) throw new Error('no_available_slots');
      const availableIndex = findIndex(this.parkingSlots, (slot) => {
        return slot === null;
      }, 0);

      this.parkingSlots[availableIndex] = carNumber;

      const moreAvailable = findIndex(this.parkingSlots, (slot) => {
        return slot === null;
      }, 0);
      
      console.log(chalk.green.bold('Allocated slot number: ', availableIndex+1));

      this.isFull = !isNumber(moreAvailable);
    } catch (error) {
      if (error.message === 'invalid_number_plate') {
        console.log(chalk.red.bold('Please enter a valid car number plate!'));
      } else if (error.message === 'no_available_slots') {
        console.log(chalk.red.bold('We are sorry, there are no available slots at the moment.'));
      } else {
        console.log(chalk.red.bold('Something went wrong while assiging a parking slots with your car.'));
      }
    }
  }

  /**
	 * @description remove a car from a parking slot.
	 */
  leave (carNumber: string, hours: number) {
    try {
      // added validation for car number format
      if (!validateIndianNumberPlate(carNumber)) throw new Error('invalid_number_plate');

      if (isNaN(hours) || hours < 0) throw new Error('invalid_hours');

      const availableIndex = findIndex(this.parkingSlots, (slot) => {
        return slot === carNumber;
      }, 0);

      if (availableIndex < 0) throw new Error('invalid_car_number');
     
      this.parkingSlots[availableIndex] = null;
      const totalCharge = calculateCharge(hours);
     
      console.log(chalk.green.bold(`Registration Number ${carNumber} from Slot ${availableIndex+1} has left with Charge $${totalCharge}`));

      this.isFull = false;
    } catch (error) {
      if (error.message === 'invalid_number_plate') {
        console.log(chalk.red.bold('Please enter a valid car number plate!'));
      } else if (error.message === 'invalid_hours') {
        console.log(chalk.red.bold('Incorrect hours entered!'));
      } else if (error.message === 'invalid_car_number') {
        console.log(chalk.red.bold('Incorrect car number entered!'));
      } else {
        console.log(chalk.red.bold('Something went wrong while removing your car.'));
      }
    }
  }
}
