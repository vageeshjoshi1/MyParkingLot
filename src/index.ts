import { isEmpty } from 'lodash';
import fs from 'fs';

import { ParkingLot } from './lib/classes/parkingLot';
import { ParkingLotHandler } from './handlers/ParkingLotHandler';

const commandLineInputs = process.argv;

const parkingLot = new ParkingLot();
const fileNameWithPath = commandLineInputs[2];

if (!isEmpty(commandLineInputs) && fileNameWithPath.endsWith('.txt')) {
  fs.readFile(fileNameWithPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const commands = data.split('\r\n');

    for (const command of commands) {
      ParkingLotHandler(command.split(' '), parkingLot);
    }
  });
}
