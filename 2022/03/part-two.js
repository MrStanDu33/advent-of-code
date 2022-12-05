/**
 * @file 2022 - 03 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import Rucksack from './Classes/Rucksack';

/**
 * @description We get the input, format it, and instantiate a Rucksack class.
 * Then we count the category priority for each Rucksack of all group of three elves
 * and sum up all categories priority.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 03 - part two test');

  const input = await getInput('2022', '03');

  const rucksacks = input
    .map((_rucksack, index) => {
      if (index % 3 !== 0) return undefined;
      return new Rucksack({
        inventories: [input[index], input[index + 1], input[index + 2]],
      });
    })
    .filter((el) => el !== undefined);

  const totalRucksackCategoryPriority = rucksacks.reduce(
    (sum, rucksack) => sum + rucksack.rucksackCommonCategoryPriority,
    0,
  );

  Logger.info(`ANSWER: ${totalRucksackCategoryPriority}`);
};

main();
