/**
 * @file Create year command configuration.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import { mkdir } from 'node:fs/promises';
import { existsSync } from 'fs';
import inquirer from 'inquirer';
import Logger from '$lib/Logger';

/**
 * @description We ask the user the year he wants to create the folder for,
 * then we create the requested folder.
 *
 * @returns { Promise<void> }
 */
async function main() {
  const { year } = await inquirer.prompt([
    {
      type: 'input',
      name: 'year',
      message: 'What year you want to create the folder for ?',

      /**
       * @description Validates user input to ensure he provide a valid year.
       *
       * @param   { string }         input - Year given by the user.
       *
       * @returns { string|boolean }       Error message or true if given year is valid.
       */
      validate: (input) => {
        const thisYear = new Date().getFullYear();
        const givenYear = Number(input);
        if (Number.isNaN(givenYear)) {
          return 'Please provide a valid year (format :YYYY)';
        }
        if (givenYear < 2015 || givenYear > thisYear) {
          return `You must provide a year between 2015 and ${thisYear}.`;
        }
        if (existsSync(`./${givenYear}`)) {
          return `Year folder already exists.`;
        }
        return true;
      },
    },
  ]);
  try {
    await mkdir(`./${year}`);
    Logger.info(`Created folder for ${year}`);
    process.exit(0);
  } catch (err) {
    Logger.error(`Unable to create folder ${year}`, err.message);
    process.exit(1);
  }
}

main();
