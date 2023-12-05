/**
 * @file 2023 - 02 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

import formatInput from './global';

/**
 * @description We get the input, format it and get the maximum needed red,
 * green and blue cubes count for each games. Once we have all the cubes count,
 * we multiply them and add them to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 02 - part two test');
  const input = await getInput({ year: '2023', day: '02', separator: '\n' });
  const games = formatInput(input);

  const gamesMinimumPower = games.map((game) => {
    const maxGameRunsColors = {
      red: Math.max(...game.runs.map((run) => run.red)),
      green: Math.max(...game.runs.map((run) => run.green)),
      blue: Math.max(...game.runs.map((run) => run.blue)),
    };

    return (
      maxGameRunsColors.red * maxGameRunsColors.green * maxGameRunsColors.blue
    );
  });

  const sumGamesMinimumPower = gamesMinimumPower.reduce(
    (acc, game) => acc + game,
    0,
  );

  Logger.info(`ANSWER: ${sumGamesMinimumPower}`);
};

main();
