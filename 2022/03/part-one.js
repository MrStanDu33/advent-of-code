/**
 * @file 2022 - 03 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import Rucksack from './Classes/Rucksack';

/**
 * @description We get the input, format it, and instantiate a Rucksack class.
 * Then we count the category priority for each Rucksack and sum up all categories priority.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 03 - part one test');

  const input = await getInput('2022', '03');

  const rucksacks = input.map(
    (rucksack) =>
      new Rucksack({
        inventories: [
          rucksack.substring(0, rucksack.length / 2),
          rucksack.substring(rucksack.length / 2),
        ],
      }),
  );

  const totalRucksackCategoryPriority = rucksacks.reduce(
    (sum, rucksack) => sum + rucksack.rucksackCommonCategoryPriority,
    0,
  );

  Logger.info(`ANSWER: ${totalRucksackCategoryPriority}`);
};

main();
