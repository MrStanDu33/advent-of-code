/**
 * @file 2023 - 06 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description We get the input, format it and get all seeds and maps. We then
 * check for each seed what is the seed location based on all given maps.
 * Finally, we retrieve the smaller location to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 06 - part two test');
  const input = await getInput({ year: '2023', day: '06', separator: '\n' });

  const [time, distance] = input.map(
    (lines) => Number(lines.split(/:[ ]+/).slice(1)[0].replaceAll(' ', '')), // .map(Number),
  );

  let runsPossible = 0;

  for (let timeHolding = 0; timeHolding <= time; timeHolding += 1) {
    const timeLeft = time - timeHolding;
    const distanceTraveled = timeLeft * timeHolding;

    if (distance - distanceTraveled < 0) {
      runsPossible += 1;
    }
  }

  Logger.info(`ANSWER: ${runsPossible}`);
};

main();
