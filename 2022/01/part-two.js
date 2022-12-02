/**
 * @file 2022 - 01 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import { formatInput } from './global';
import Elf from './Classes/Elf';

const main = async () => {
  Logger.info('Start running 2022 / 01 - part two test');
  const input = await getInput('2022', '01');
  const formattedInput = formatInput(input);

  const elvesList = formattedInput.map((elf) => new Elf({ snacks: elf }));
  elvesList.sort((a, b) => b.totalCalories - a.totalCalories);

  const firstElf = elvesList[0];
  const secondElf = elvesList[1];
  const thirdElf = elvesList[2];

  const totalCaloriesHeld =
    firstElf.totalCalories + secondElf.totalCalories + thirdElf.totalCalories;

  Logger.info(`ANSWER: ${totalCaloriesHeld}`);
};

main();
