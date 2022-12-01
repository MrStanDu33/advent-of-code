import { mkdir } from 'node:fs/promises';
import { existsSync } from 'fs';
import inquirer from 'inquirer';

async function main() {
  const { year } = await inquirer.prompt([
    {
      type: 'input',
      name: 'year',
      message: 'What year you want to create the folder for ?',
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
    console.log(`Created folder for ${year}`);
    process.exit(0);
  } catch (err) {
    console.error(`Unable to create folder ${year}`, err.message);
    process.exit(1);
  }
}

main();
