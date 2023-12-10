/**
 * @file 2023 - 10 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

import GameMap from './Classes/GameMap';

/**
 * @description We get the input, format it and instanciate a GameMap class
 * with given map as input. We then compute furthest pipe connected from the
 * starting location that we can reach.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 10 - part one test');
  const input = await getInput({ year: '2023', day: '10', separator: '\n' });
  const formattedInput = input.map((line) =>
    line
      .replaceAll('|', '│')
      .replaceAll('-', '─')
      .replaceAll('L', '└')
      .replaceAll('J', '┘')
      .replaceAll('7', '┐')
      .replaceAll('F', '┌'),
  );

  /** @type { ['│'|'─'|'└'|'┘'|'┐'|'┌'|'S'|'.'][] } */
  const mapCells = formattedInput.map((line) => line.split(''));

  const map = new GameMap(mapCells);

  const answer = map.getLongestPath();

  Logger.debug(map.displayMap());

  Logger.info(`ANSWER: ${answer}`);
};

main();
