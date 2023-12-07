/**
 * @file 2023 - 07 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

const AVAILABLE_CARDS = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  'J',
];

/**
 * @description We get the input, format it and get all hands. We sort them by
 * comparing all cards with different types of hands. Lowest ones come first, and
 * strongest ones come last. But we count Jacks as jokers, thus permitting to
 * mutate them to match the best card to obtain best case scenario. also, Jacks
 * in themselves are worth a score of 1. Then we multiply players bid with their
 * hand rank. Finally, we get the sum of all bids to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 07 - part two test');
  const input = await getInput({ year: '2023', day: '07', separator: '\n' });

  const plays = input.map((play) => ({
    hand: play.split(' ')[0],
    bid: Number(play.split(' ')[1]),
  }));

  const sortedPlays = plays.sort((handA, handB) => {
    const handACards = AVAILABLE_CARDS.map((card) =>
      handA.hand.match(new RegExp(`[${card}]`, 'g')),
    )
      .filter(Boolean)
      .filter((c) => !c.includes('J'));

    const handBCards = AVAILABLE_CARDS.map((card) =>
      handB.hand.match(new RegExp(`[${card}]`, 'g')),
    )
      .filter(Boolean)
      .filter((c) => !c.includes('J'));

    const handsASimilarCards = handACards
      .map((type) => type.length)
      .sort((a, b) => b - a);
    const handsBSimilarCards = handBCards
      .map((type) => type.length)
      .sort((a, b) => b - a);

    let maximumHandASimilarCards = Math.max(...handsASimilarCards) || 5;
    let maximumHandBSimilarCards = Math.max(...handsBSimilarCards) || 5;

    if (maximumHandASimilarCards === -Infinity) {
      maximumHandASimilarCards = 5;
      handsASimilarCards.push(5);
    }

    if (maximumHandBSimilarCards === -Infinity) {
      maximumHandBSimilarCards = 5;
      handsBSimilarCards.push(5);
    }

    if (maximumHandASimilarCards !== 5 && handA.hand.includes('J')) {
      maximumHandASimilarCards += handA.hand
        .split('')
        .filter((c) => c === 'J').length;
    }

    if (maximumHandBSimilarCards !== 5 && handB.hand.includes('J')) {
      maximumHandBSimilarCards += handB.hand
        .split('')
        .filter((c) => c === 'J').length;
    }

    // one hand with higher similar card count
    if (maximumHandASimilarCards !== maximumHandBSimilarCards)
      return maximumHandASimilarCards < maximumHandBSimilarCards ? -1 : 1;

    // one hand with a full house and not the other
    // one hand with a double pair and not the other
    if (handsASimilarCards.length !== handsBSimilarCards.length)
      return handsASimilarCards.length > handsBSimilarCards.length ? -1 : 1;

    for (let index = 0; index < handA.hand.split('').length; index += 1) {
      if (
        AVAILABLE_CARDS.indexOf(handA.hand.split('')[index]) ===
        AVAILABLE_CARDS.indexOf(handB.hand.split('')[index])
      ) {
        continue;
      }

      return AVAILABLE_CARDS.indexOf(handA.hand.split('')[index]) >
        AVAILABLE_CARDS.indexOf(handB.hand.split('')[index])
        ? -1
        : 1;
    }

    return 0;
  });

  const bidsResults = sortedPlays
    .map((play, index) => ({
      hand: play.hand,
      bid: play.bid,
      rank: index + 1,
      finalBid: play.bid * (index + 1),
    }))
    .reduce((a, b) => a + b.finalBid, 0);

  Logger.info(`ANSWER: ${bidsResults}`);
};

main();
