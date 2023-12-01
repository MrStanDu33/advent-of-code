/**
 * @file 2023 - 01 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

const FIRST_DIGIT_REGEX = /([0-9])/;

/**
 * @description We get the input, format it and get the first and last digit
 * present inside each input values. Then, we concat those digits to get the
 * calibration value. Once we have all the calibration values, we adds them
 * to get the sum of the calibration values.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 01 - part one test');
  const input = await getInput({ year: '2023', day: '01', separator: '\n' });

  const sumOfCalibrationValues = input.reduce((acc, value) => {
    const firstDigit = value.match(FIRST_DIGIT_REGEX)[0];
    const lastDigit = value
      .split('')
      .reverse()
      .join('')
      .match(FIRST_DIGIT_REGEX)[0];

    const calibrationValue = firstDigit + lastDigit;
    return acc + parseInt(calibrationValue, 10);
  }, 0);

  Logger.info(`ANSWER: ${sumOfCalibrationValues}`);
};

main();
