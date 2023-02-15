import chalk from 'chalk';

export const ParkingLotHandler = (commandLineInputs, parkingLot) => {
  let totalSlots = 0;
  let hours = 0;

  const [command, ...rest] = commandLineInputs;
  
  // main logic
  switch (command) {
  case 'create':
    totalSlots = parseFloat(rest[0]);
    parkingLot.create(totalSlots);
    break;

  case 'park':
    parkingLot.park(rest[0]);
    break;

  case 'leave':
    hours = parseFloat(rest[1]);
    parkingLot.leave(rest[0], hours);
    break;

  case 'status':
    parkingLot.status();
    break;

  case undefined:
    console.log(chalk.red.bold('No Command found, please write a command that you wish to run.'));
    break;            

  default:
    console.log(chalk.red.bold('Invalid Command'));
    break;
  }
};
