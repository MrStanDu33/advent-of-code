/**
 * @file Create day command configuration.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'fs';
import inquirer from 'inquirer';
import Logger from '$lib/Logger';

const README_CONTENT = `\
# Day \${day}: \${challengeName}

## Introduction

CONTENT_OF_CHALLENGE_INTRODUCTION

## Bonus part

CONTENT_OF_CHALLENGE_BONUS

## Solutions

There you will find all answers to the challenge for this day with given dataset. Please mind that datasets are unique, and thus those answers will not work for you

| Introduction | Bonus part |
| ------------ | ---------- |
| \`ANSWER\`       | \`ANSWER\`     |
`;

/**
 * @description We ask the user the year he wants to create the folder for,
 * then we check wether the needed folder exist or not. If not, we ask user if
 * he wants to create it.
 *
 * @returns { Promise<string> } Year in which to create the day folder.
 */
const promptForParentFolder = async () => {
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
      validate(input) {
        const thisYear = new Date().getFullYear();
        const givenYear = Number(input);
        if (Number.isNaN(givenYear)) {
          return 'Please provide a valid year (format :YYYY).';
        }
        if (givenYear < 2015 || givenYear > thisYear) {
          return `You must provide a year between 2015 and ${thisYear}.`;
        }
        return true;
      },
    },
  ]);
  let wantToCreateParentFolder = null;
  if (!existsSync(`./${year}`)) {
    wantToCreateParentFolder = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `The folder for year ${year} does not exist, do you want to create it?`,
      },
    ]);
    if (!wantToCreateParentFolder.confirm) {
      return process.exit(1);
    }
    await mkdir(`./${year}`);
  }
  return year;
};

/**
 * @description We ask the user the day number he wants to create the folder for.
 *
 * @param   { string }          year - The year within the day folder should be created.
 *
 * @returns { Promise<string> }      Day number to create.
 */
const promptForDay = async (year) => {
  const { day } = await inquirer.prompt([
    {
      type: 'input',
      name: 'day',
      message: 'What day you want to create the folder for ?',

      /**
       * @description Validates user input to ensure he provide a valid day number.
       *
       * @param   { string }         input - Day given by the user.
       *
       * @returns { string|boolean }       Error message or true if given day is valid.
       */
      validate(input) {
        const givenDay = Number(input);
        if (Number.isNaN(givenDay)) {
          return 'Please provide a valid day number.';
        }
        if (givenDay < 1 || givenDay > 30) {
          return 'You must provide a day number between 1 and 30.';
        }
        return true;
      },
    },
  ]);

  await mkdir(`./${year}/${day}`);
  return day;
};

/**
 * @description We populate created folder with base files.
 *
 * @param   { string }        year - Year we created the folder for.
 * @param   { string }        day  - Day number we created the folder for.
 *
 * @returns { Promise<void> }
 */
const createDefaultFiles = async (year, day) => {
  const filledReadmeContent = README_CONTENT.replaceAll(
    `\${day}`,
    day,
  ).replaceAll(`\${year}`, year);
  await writeFile(`./${year}/${day}/README.md`, filledReadmeContent).catch(
    (err) => {
      throw Error('Unable to create README file.', err);
    },
  );

  await writeFile(`./${year}/${day}/input.txt`, '').catch((err) => {
    throw Error('Unable to create input file.', err);
  });

  await writeFile(`./${year}/${day}/part-one.js`, '').catch((err) => {
    throw Error('Unable to create part one file.', err);
  });
};

/**
 * @description We ask the user the year and day number he wants to create the folder for,
 * then we create the requested folder.
 *
 * @returns { Promise<void> }
 */
async function main() {
  try {
    const year = await promptForParentFolder();
    const day = await promptForDay(year);
    await createDefaultFiles(year, day);

    Logger.info(`Created folder for day ${day} of ${year}`);

    process.exit(0);
  } catch (err) {
    Logger.error(`Unable to create asked folder`, err.message);
    process.exit(1);
  }
}

main();
