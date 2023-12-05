/**
 * @file 2023 - 03 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

const foundNumbersRanges = {};

/**
 * @description Goes through the characters, starting from
 * `initialLookupPosition`, to find the starting and ending digits of the
 * number and the number value.
 *
 * @param   { number } initialLookupPosition - Character position to start to.
 * @param   { string } line                  - Line to process.
 *
 * @returns { object }                       - Found number, it's starting
 *                                           and ending position.
 */
const searchNumber = (initialLookupPosition, line) => {
  let numberStartingIndex = initialLookupPosition;
  let numberEndingIndex = initialLookupPosition;

  while (line[numberStartingIndex - 1]?.match(/[0-9]/)) {
    numberStartingIndex -= 1;
  }

  while (line[numberEndingIndex + 1]?.match(/[0-9]/)) {
    numberEndingIndex += 1;
  }

  const number = Number(line.slice(numberStartingIndex, numberEndingIndex + 1));

  return { number, numberStartingIndex, numberEndingIndex };
};

/**
 * @description Check wether Neighbour cell contains a digit. In which case we
 * get the whole number and add it to the `foundNumbersRanges`.
 *
 * @param { string } cellToCheck     - Neighbour cell to search for a digit.
 * @param { string } lineToCheck     - Line in which to search for the number.
 * @param { number } lineNumber      - Number of the line given in`lineToCheck`.
 * @param { number } characterNumber - `cellToCheck` position.
 */
const checkCell = (cellToCheck, lineToCheck, lineNumber, characterNumber) => {
  if (cellToCheck?.match(/[0-9]/)) {
    const { number, numberStartingIndex, numberEndingIndex } = searchNumber(
      characterNumber,
      lineToCheck,
    );

    const uniqueKey = `${lineNumber}-${numberStartingIndex}-${numberEndingIndex}`;

    if (!Object.hasOwnProperty.call(foundNumbersRanges, uniqueKey))
      foundNumbersRanges[uniqueKey] = number;
  }
};

/**
 * @description We get the input, format it and get all special characters.
 * For each special characters, we locate surrounding cells to locate numbers,
 * and add them to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 03 - part one test');
  const input = await getInput({ year: '2023', day: '03', separator: '\n' });

  input.forEach((line, lineNumber) => {
    line.split('').forEach((character, characterNumber) => {
      if (character.match(/[0-9.]/)) return;

      const previousLine = input[lineNumber - 1] || '';
      const actualLine = input[lineNumber] || '';
      const nextLine = input[lineNumber + 1] || '';

      // Top left
      checkCell(
        previousLine[characterNumber - 1],
        previousLine,
        lineNumber - 1,
        characterNumber - 1,
      );

      // Top middle
      checkCell(
        previousLine[characterNumber],
        previousLine,
        lineNumber - 1,
        characterNumber,
      );

      // Top right
      checkCell(
        previousLine[characterNumber + 1],
        previousLine,
        lineNumber - 1,
        characterNumber + 1,
      );

      // Middle left
      checkCell(
        actualLine[characterNumber - 1],
        actualLine,
        lineNumber,
        characterNumber - 1,
      );

      // Middle right
      checkCell(
        actualLine[characterNumber + 1],
        actualLine,
        lineNumber,
        characterNumber + 1,
      );

      // Bottom left
      checkCell(
        nextLine[characterNumber - 1],
        nextLine,
        lineNumber + 1,
        characterNumber - 1,
      );

      // Bottom middle
      checkCell(
        nextLine[characterNumber],
        nextLine,
        lineNumber + 1,
        characterNumber,
      );

      // Bottom right
      checkCell(
        nextLine[characterNumber + 1],
        nextLine,
        lineNumber + 1,
        characterNumber + 1,
      );
    });
  });

  const sumOfNumbers = Object.values(foundNumbersRanges).reduce(
    (acc, number) => acc + number,
  );

  Logger.info(`ANSWER: ${sumOfNumbers}`);
};

main();
