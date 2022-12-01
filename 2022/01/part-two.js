/**
 * @file 2022 - 01 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import fs from 'node:fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const INPUT_LOCATION = './input.txt';

/**
 * @function getInput
 * @description Reads the input file for the day and returns it as an array.
 *
 * @returns { Promise<string[]> } An array of strings.
 */
const getInput = async () => {
  const dayFilename = fileURLToPath(import.meta.url);
  const dayDirname = dirname(dayFilename);
  const inputPath = join(dayDirname, INPUT_LOCATION);
  const rawData = await fs.readFile(inputPath, 'utf-8');

  return rawData.split('\n');
};

/**
 * @function formatInput
 * @description Takes an array of strings and returns an array of arrays.
 *
 * @param   { string[] }   input - List of all snacks owned by elves.
 *
 * @returns { string[][] }       Array of elves' inventory.
 */
const formatInput = (input) => {
  const inlineInput = input.join('|');
  const elvesList = inlineInput.split('||');
  return elvesList.map((elveInventory) => elveInventory.split('|'));
};

class Elf {
  /**
   * @description Initializes a new Elf instance and stores the elf's inventory.
   *
   * @param {object}   data        - Elf data.
   * @param {string[]} data.snacks - List of all elf's snacks calories.
   */
  constructor({ snacks }) {
    this.snacks = snacks;
  }

  get totalCalories() {
    return this.snacks.reduce((sum, snack) => sum + Number(snack), 0);
  }
}

const main = async () => {
  const input = await getInput();
  const formattedInput = formatInput(input);

  const elvesList = formattedInput.map((elf) => new Elf({ snacks: elf }));
  elvesList.sort((a, b) => b.totalCalories - a.totalCalories);

  const firstElf = elvesList[0];
  const secondElf = elvesList[1];
  const thirdElf = elvesList[2];

  const totalCaloriesHeld =
    firstElf.totalCalories + secondElf.totalCalories + thirdElf.totalCalories;

  console.log(totalCaloriesHeld);
};

main();
