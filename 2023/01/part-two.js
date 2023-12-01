/**
 * @file 2023 - 01 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

const FIRST_DIGIT_REGEX =
  /([0-9]|one|two|three|four|five|six|seven|eight|nine)/;
const LAST_DIGIT_REGEX = /([0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/;
const WORD_TO_DIGIT = {
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

  const sumOfCalibrationValues = input.reduce((acc, value) => {
    const firstDigitFound = value.match(FIRST_DIGIT_REGEX)[0];
    const lastDigitFound = value
      .split('')
      .reverse()
      .join('')
      .match(LAST_DIGIT_REGEX)[0];

    const firstDigit = WORD_TO_DIGIT[firstDigitFound] || firstDigitFound;
    const lastDigit =
      WORD_TO_DIGIT[lastDigitFound.split('').reverse().join('')] ||
      lastDigitFound;

    const calibrationValue = firstDigit + lastDigit;
    return acc + parseInt(calibrationValue, 10);
  }, 0);

  Logger.info(`ANSWER: ${sumOfCalibrationValues}`);
};

main();
