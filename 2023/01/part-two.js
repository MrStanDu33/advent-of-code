/**
 * @file 2023 - 01 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get the input, format it and get the first and last digit
 * (or the number word, ie `six` or `two`) present inside each input values.
 * Then, we concat those digits to get the calibration value. Once we have all
 * the calibration values, we adds them to get the sum of the calibration values.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 01 - part two test');
  const input = await getInput({ year: '2023', day: '01', separator: '\n' });
  const firstDigitRegex =
    /([0-9]|one|two|three|four|five|six|seven|eight|nine)/;
  const lastDigitRegex = /([0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/;
  const wordToDigit = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  const result = input.reduce((acc, value) => {
    const firstDigitFound = value.match(firstDigitRegex)[0];
    const lastDigitFound = value
      .split('')
      .reverse()
      .join('')
      .match(lastDigitRegex)[0];

    const firstDigit = wordToDigit[firstDigitFound] || firstDigitFound;
    const lastDigit =
      wordToDigit[lastDigitFound.split('').reverse().join('')] ||
      lastDigitFound;

    const digitsConcat = firstDigit + lastDigit;
    return acc + parseInt(digitsConcat, 10);
  }, 0);

  Logger.info(`ANSWER: ${result}`);
};

main();
