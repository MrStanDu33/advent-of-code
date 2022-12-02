/**
 * @file 2022 - 01 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import formatInput from './global';
import Elf from './Classes/Elf';

/**
 * @description We get the input, format it, create a list of elves,
 * sort them by the total calories of each, and then get the first elf in the list
 * and get its total calories count.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 01 - part one test');
  const input = await getInput('2022', '01');
  const formattedInput = formatInput(input);

  const elvesList = formattedInput.map((elf) => new Elf({ snacks: elf }));
  elvesList.sort((a, b) => b.totalCalories - a.totalCalories);

  const firstElf = elvesList[0];

  Logger.info(`ANSWER: ${firstElf.totalCalories}`);
};

main();
