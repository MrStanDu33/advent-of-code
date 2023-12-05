/**
 * @file 2023 - 02 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

import formatInput from './global';

const MAX_GAMES_CUBES = {
  RED: 12,
  GREEN: 13,
  BLUE: 14,
};

/**
 * @description We get the input, format it and get the maximum needed red,
 * green and blue cubes count for each games. Once we have all the cubes count,
 * we check which games could be possible, and add their IDs to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 02 - part one test');
  const input = await getInput({ year: '2023', day: '02', separator: '\n' });
  const games = formatInput(input);

  const gamesPossibles = games.filter((game) => {
    const maxGameRunsColors = {
      red: Math.max(...game.runs.map((run) => run.red)),
      green: Math.max(...game.runs.map((run) => run.green)),
      blue: Math.max(...game.runs.map((run) => run.blue)),
    };

    return (
      maxGameRunsColors.red <= MAX_GAMES_CUBES.RED &&
      maxGameRunsColors.green <= MAX_GAMES_CUBES.GREEN &&
      maxGameRunsColors.blue <= MAX_GAMES_CUBES.BLUE
    );
  });

  const sumGamesPossiblesIDs = gamesPossibles.reduce(
    (acc, game) => acc + game.id,
    0,
  );

  Logger.info(`ANSWER: ${sumGamesPossiblesIDs}`);
};

main();
