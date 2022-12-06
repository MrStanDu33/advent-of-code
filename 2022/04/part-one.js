/**
 * @file 2022 - 04 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get the input, format it, and ???
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 04 - part one test');

  const input = await getInput('2022', '04');

  const formattedInput = input.map((inputPair) => {
    const pair = inputPair.split(',');
    const rawFirstZone = pair[0].split('-');
    const rawSecondZone = pair[1].split('-');
    const firstZone = [Number(rawFirstZone[0]), Number(rawFirstZone[1])];
    const secondZone = [Number(rawSecondZone[0]), Number(rawSecondZone[1])];
    return [firstZone, secondZone];
  });

  const overlappingZones = formattedInput.filter(([firstZone, secondZone]) => {
    if (firstZone[0] <= secondZone[0] && firstZone[1] >= secondZone[1])
      return true;
    if (firstZone[0] >= secondZone[0] && firstZone[1] <= secondZone[1])
      return true;
    return false;
  });

  Logger.info(`ANSWER: ${overlappingZones.length}`);
};

main();
