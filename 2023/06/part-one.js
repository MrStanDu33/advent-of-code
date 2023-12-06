/**
 * @file 2023 - 06 - Part one.
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
  Logger.info('Start running 2023 / 06 - part one test');
  const input = await getInput({ year: '2023', day: '06', separator: '\n' });

  const [times, distances] = input.map((lines) =>
    lines.split(/[ ]+/).slice(1).map(Number),
  );

  const races = times.map((time, index) => ({
    time,
    distance: distances[index],
  }));

  const racesRuns = races.map(({ time, distance }) => {
    let runsPossible = 0;

    for (let timeHolding = 0; timeHolding <= time; timeHolding += 1) {
      const timeLeft = time - timeHolding;
      const distanceTraveled = timeLeft * timeHolding;

      if (distance - distanceTraveled < 0) {
        runsPossible += 1;
      }
    }

    return runsPossible;
  });

  const answer = racesRuns.reduce((acc, runs) => acc * runs, 1);

  Logger.info(`ANSWER: ${answer}`);
};

main();
