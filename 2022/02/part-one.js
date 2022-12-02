/**
 * @file 2022 - 02 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import Round from './Classes/Round';

/**
 * @description We get the input, format it, create a list of rounds
 * and gets our score based on the given strategy.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 02 - part one test');

  const input = await getInput('2022', '02');
  const rounds = input.map((pair) => {
    const [opponentChoice, indicator] = pair.split(' ');
    return new Round({ opponentChoice, indicator, indicatorType: 'MOVE' });
  });

  const result = rounds.reduce((sum, round) => sum + round.totalPoints, 0);

  Logger.info(`ANSWER: ${result}`);
};

main();
