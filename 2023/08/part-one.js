/**
 * @file 2023 - 08 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get the input, then we get all given directions and maps.
 * Once we have them, we follow the map using directions until we land on the
 * location 'ZZZ'. We then get the answer by counting how many steps we needed.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 08 - part one test');
  const input = await getInput({ year: '2023', day: '08', separator: '\n\n' });

  const [rawDirections, rawInstructions] = input;
  const directions = rawDirections.split('');

  const instructions = new Map(
    rawInstructions.split('\n').map((rawInstruction) => {
      const [key, value] = rawInstruction.split(' = ');
      const [L, R] = value.replaceAll(/[() ]/g, '').split(',');
      return [key, { L, R }];
    }),
  );

  let jumps = 1;

  let actualPosition = 'AAA';
  let directionIndex = 0;

  while (
    instructions.get(actualPosition)[directions[directionIndex]] !== 'ZZZ'
  ) {
    const direction = directions[directionIndex];

    actualPosition = instructions.get(actualPosition)[direction];

    directionIndex =
      directionIndex === directions.length - 1 ? 0 : directionIndex + 1;

    jumps += 1;
  }

  Logger.info(`ANSWER: ${jumps}`);
};

main();
