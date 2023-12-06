/**
 * @file 2023 - 04 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get the input, format it and get all games. We then check
 * if some numbers are found in the valid numbers. If there are some, we add one
 * card for each of following cards until the number of added cards is equal to
 * the amount of valid number that the card has. Then we count how many cards
 * we have to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 04 - part two test');
  const input = await getInput({ year: '2023', day: '04', separator: '\n' });

  const cards = input.map((card) => {
    const cardValues = card.split(': ')[1];

    const [winningNumbers, cardNumbers] = cardValues
      .split(' | ')
      .map((values) =>
        values
          .split(' ')
          .filter((key) => key !== '')
          .map(Number),
      );

    return [{ winningNumbers, cardNumbers }];
  });

  for (let cardNumber = 0; cardNumber < cards.length; cardNumber += 1) {
    cards[cardNumber].forEach((card) => {
      const { winningNumbers, cardNumbers } = card;

      const validNumbers = cardNumbers.filter((cardValue) =>
        winningNumbers.includes(cardValue),
      );

      if (validNumbers.length === 0) return;

      for (
        let multiplier = 0;
        multiplier < validNumbers.length;
        multiplier += 1
      ) {
        cards[multiplier + cardNumber + 1].push(
          cards[multiplier + cardNumber + 1][0],
        );
      }
    });
  }

  const numberOfCards = cards.flat().length;

  Logger.info(`ANSWER: ${numberOfCards}`);
};

main();
