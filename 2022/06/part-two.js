/**
 * @file 2022 - 06 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get the input, format it and locate where do first 14 character are unique
 * and returns the index of the letter that follows the sequence of first 14 unique characters.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 06 - part two test');

  const input = await getInput({ year: '2022', day: '06', separator: '' });

  const startOfDataStream =
    input.findIndex(
      (_character, index) =>
        [...new Set(input.slice(index, index + 14))].length === 14,
    ) + 14;

  Logger.info(`ANSWER: ${startOfDataStream}`);
};

main();
