/**
 * @file 2023 - 10 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

import GameMap from './Classes/GameMap';

/**
 * @description We get the input, format it and instanciate a GameMap class with
 * given map as input. We then filter which cells that are not connected pipes
 * and mark them as ground cells. Finally, we get the count of all ground cells
 * that are inside the loop formed by connected pipes and use their count as
 * answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 10 - part two test');
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

  map.getLongestPath();
  map.simplifyMap();

  const answer = map.countAllEnclosedGrounds();

  Logger.debug(map.displayMap());

  Logger.info(`ANSWER: ${answer}`);
};

main();
