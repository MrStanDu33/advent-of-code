/**
 * @file 2022 - 04 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import Pair from './Classes/Pair';

/**
 * @description We get the input, format it, and gets all pairs of elves, then we
 * get all pairs of elves having common zones or colliding zones to work on and count them.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 04 - part two test');

  const input = await getInput('2022', '04');

  const formattedInput = input.map((inputPair) =>
    inputPair.split(',').map((zones) => zones.split('-').map(Number)),
  );

  const overlappingZones = formattedInput
    .map((zones) => new Pair({ zones }))
    .filter((pair) => pair.overlaps.includes || pair.overlaps.touching);

  Logger.info(`ANSWER: ${overlappingZones.length}`);
};

main();
