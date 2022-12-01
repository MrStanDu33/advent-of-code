import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'fs';
import inquirer from 'inquirer';

const README_CONTENT = `\
# Day \${day}: \${challengeName}

## Introduction

CONTENT_OF_CHALLENGE_INTRODUCTION

## Bonus part

CONTENT_OF_CHALLENGE_BONUS

## Solutions

<details>
  <summary>
    There you will find all answers to the challenge for this day. For better experience, I decided to hide any values by putting them in a collapse.
  </summary>

| Introduction | Bonus part |
| ------------ | ---------- |
| \`ANSWER\`       | \`ANSWER\`     |

</details>
`;

const promptForParentFolder = async () => {
  const { year } = await inquirer.prompt([
    {
      type: 'input',
      name: 'year',
      message: 'What year you want to create the folder for ?',
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

const promptForDay = async (year) => {
  const { day } = await inquirer.prompt([
    {
      type: 'input',
      name: 'day',
      message: 'What day you want to create the folder for ?',
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

const promptForChallengeData = async () => {
  const { title } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the challenge ?',
    },
  ]);
  return { title };
};

const createDefaultFiles = async (year, day, challengeData) => {
  const filledReadmeContent = README_CONTENT.replaceAll(`\${day}`, day)
    .replaceAll(`\${year}`, year)
    .replaceAll(`\${challengeName}`, challengeData.name);
  await writeFile(`./${year}/${day}/README.md`, filledReadmeContent).catch((err) => {
    throw ('Unable to create README file.', err);
  });

  await writeFile(`./${year}/${day}/input.txt`, '').catch((err) => {
    throw ('Unable to create input file.', err);
  });

  await writeFile(`./${year}/${day}/part-one.js`, '').catch((err) => {
    throw ('Unable to create part one file.', err);
  });
};

async function main() {
  try {
    const year = await promptForParentFolder();
    const day = await promptForDay(year);
    const challengeData = await promptForChallengeData();
    await createDefaultFiles(year, day, challengeData);

    console.log(`Created folder for day ${day} of ${year}`);

    process.exit(0);
  } catch (err) {
    console.error(`Unable to create asked folder`, err.message);
    process.exit(1);
  }
}

main();
