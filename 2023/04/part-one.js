/**
 * @file 2023 - 04 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get the input, format it and get all games. We then check
 * if some numbers are found in the valid numbers. If there are some, we add one
 * point and double it for each other matching numbers. We then add the sum of
 * the points to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 04 - part one test');
  const input = await getInput({ year: '2023', day: '04', separator: '\n' });

  const sumOfNumbers = input
    .map((card) => {
      const cardValues = card.split(': ')[1];

      const [winningNumbers, cardNumbers] = cardValues
        .split(' | ')
        .map((values) =>
          values
            .split(' ')
            .filter((key) => key !== '')
            .map(Number),
        );

      const validNumbers = cardNumbers.filter((cardNumber) =>
        winningNumbers.includes(cardNumber),
      );

      if (validNumbers.length === 0) return 0;

      let power = 1;

      for (let increment = 1; increment < validNumbers.length; increment += 1) {
        power *= 2;
      }

      return power;
    })
    .reduce((acc, cur) => acc + cur, 0);

  Logger.info(`ANSWER: ${sumOfNumbers}`);
};

main();
