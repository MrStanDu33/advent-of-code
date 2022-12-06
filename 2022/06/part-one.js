/**
 * @file 2022 - 06 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get the input, format it and locate where do first 4 character are unique
 * and returns the index of the letter that follows the sequence of first 4 unique characters.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 06 - part one test');

  const input = await getInput({ year: '2022', day: '06', separator: '' });

  const startOfDataStream =
    input.findIndex(
      (_character, index) =>
        [...new Set(input.slice(index, index + 4))].length === 4,
    ) + 4;

  Logger.info(`ANSWER: ${startOfDataStream}`);
};

main();
