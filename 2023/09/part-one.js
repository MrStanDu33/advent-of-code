/**
 * @file 2023 - 09 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

import History from './Classes/History';

/**
 * @description We get the input, format it and instanciate a History for each
 * of them and we get last values based on extrapolated values. We then sum
 * them to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 09 - part one test');
  const input = await getInput({ year: '2023', day: '09', separator: '\n' });

  const histories = input.map((line) => {
    return line.split(' ').map((value) => parseInt(value, 10));
  });

  const sumOfEstimations = histories.reduce((sum, historyValues) => {
    const history = new History(historyValues);

    return sum + history.values[history.values.length - 1];
  }, 0);

  Logger.info(`ANSWER: ${sumOfEstimations}`);
};

main();
