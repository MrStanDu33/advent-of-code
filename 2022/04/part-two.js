/**
 * @file 2022 - 04 - Part two.
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
  Logger.info('Start running 2022 / 04 - part two test');

  const input = await getInput('2022', '04');

  const formattedInput = input.map((inputPair) => {
    const pair = inputPair.split(',');
    const rawFirstZone = pair[0].split('-');
    const rawSecondZone = pair[1].split('-');
    const firstZone = [Number(rawFirstZone[0]), Number(rawFirstZone[1])];
    const secondZone = [Number(rawSecondZone[0]), Number(rawSecondZone[1])];
    return [firstZone, secondZone];
  });

  const overlappingZones = formattedInput
    .map(([firstZone, secondZone]) => {
      const min1 = firstZone[0];
      const max1 = firstZone[1];
      const min2 = secondZone[0];
      const max2 = secondZone[1];
      if (min1 <= min2 && max2 <= max1) return true;
      if (min2 <= min1 && max1 <= max2) return true;
      if (min2 >= min1 && min2 <= max1) return true;
      if (max2 >= min1 && max2 <= max1) return true;
      if (min1 >= min2 && min1 <= max2) return true;
      if (max1 >= min2 && max1 <= max2) return true;

      return false;
    })
    .filter((el) => el);

  Logger.info(`ANSWER: ${overlappingZones.length}`);
};

main();
