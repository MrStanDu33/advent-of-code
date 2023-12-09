/**
 * @file 2023 - 08 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get two numbers and check it they have a common factor then
 * returns it.
 *
 * @param   { number } a - Largest number, used as reference.
 * @param   { number } b - Smalles number.
 *
 * @returns { number }   Factor in common needed for A and B to match.
 */
function getMatchingFactor(a, b) {
  let aF = 1;
  let bF = 1;

  while (a * aF - b * bF !== 0) {
    if (a * aF < b * bF) {
      aF += 1;
    }
    bF += 1;
  }

  return aF;
}

/**
 *
 * @param instructions
 * @param directions
 * @param startingPosition
 */
function getRangeLength(instructions, directions, startingPosition) {
  let jumps = 1;

  let actualPosition = startingPosition;
  let directionIndex = 0;

  while (
    !instructions.get(actualPosition)[directions[directionIndex]].endsWith('Z')
  ) {
    const direction = directions[directionIndex];

    actualPosition = instructions.get(actualPosition)[direction];

    directionIndex =
      directionIndex === directions.length - 1 ? 0 : directionIndex + 1;

    jumps += 1;
  }

  return jumps;
}

/**
 * @description We get the input, then we get all given directions and maps.
 * To start we locate all instructions ending with 'A', and follow the map and
 * directions for each of them until we find how much steps we need to follow
 * until landing on a location ending with 'Z'. Then, we compute how much steps
 * we need to follow until we end on locations ending with 'Z' at the same time.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 08 - part two test');
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

  const startingPositions = [...instructions.keys()].filter((key) =>
    key.endsWith('A'),
  );

  const rangesLength = startingPositions
    .map((startingPosition) =>
      getRangeLength(instructions, directions, startingPosition),
    )
    .sort((a, b) => b - a);

  const finalFactor = rangesLength.reduce(
    (factor, value, index) =>
      factor *
      (index !== 0 ? getMatchingFactor(rangesLength[0] * factor, value) : 1),
    1,
  );

  const answer = rangesLength[0] * finalFactor;

  Logger.info(`ANSWER: ${answer}`);
};

main();
