/**
 * @file Input Manager library.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import fs from 'node:fs/promises';

const INPUT_FILE = 'input.txt';
/**
 * @function getInput
 * @description Reads the input file for the day and returns it as an array.
 *
 * @param   { object }            settings           - Setting for input importer.
 * @param   { string }            settings.year      - Year to load input for.
 * @param   { string }            settings.day       - Day to load input for.
 * @param   { string }            settings.separator - Character to use to format data.
 *
 * @returns { Promise<string[]> }                    An array of strings.
 */
const getInput = async ({ year, day, separator }) => {
  const rawData = await fs.readFile(`./${year}/${day}/${INPUT_FILE}`, 'utf-8');

  return rawData.split(separator);
};

export default getInput;
