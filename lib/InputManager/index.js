import fs from 'node:fs/promises';

const INPUT_FILE = 'input.txt';
/**
 * @function getInput
 * @description Reads the input file for the day and returns it as an array.
 *
 * @param   { string }            year - Year to load input for.
 * @param   { string }            day  - Day to load input for.
 *
 * @returns { Promise<string[]> }      An array of strings.
 */
const getInput = async (year, day) => {
  const rawData = await fs.readFile(`./${year}/${day}/${INPUT_FILE}`, 'utf-8');

  return rawData.split('\n');
};

export default getInput;
