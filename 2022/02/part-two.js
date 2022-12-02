/**
 * @file 2022 - 02 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import Round from './Classes/Round';

const main = async () => {
  Logger.info('Start running 2022 / 02 - part two test');

  const input = await getInput('2022', '02');
  const rounds = input.map((pair) => {
    const [opponentChoice, indicator] = pair.split(' ');
    return new Round({ opponentChoice, indicator, indicatorType: 'OUTCOME' });
  });

  const result = rounds.reduce((sum, round) => sum + round.totalPoints, 0);

  Logger.info(`ANSWER: ${result}`);
};

main();
