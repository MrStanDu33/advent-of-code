/**
 * @file 2023 - 05 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';

/**
 * @description Loops in each ranges defined in given map to find if one matches
 * with the given seed value. If so, we return mapped value, otherwise we return
 * the original seed value.
 *
 * @param   { object[] } map           - Map in which we want to find the seed.
 * @param   { number }   searchedValue - The seed value we want to find in the map.
 *
 * @returns { number }                 - The mapped seed value or the original
 *                                     seed value.
 */
const getMappedValue = (map, searchedValue) => {
  const matchingMap = map.find(
    (range) =>
      range.source <= searchedValue &&
      searchedValue <= range.source + range.length - 1,
  );

  return matchingMap
    ? searchedValue + (matchingMap.destination - matchingMap.source)
    : searchedValue;
};

/**
 * @description We get the input, format it and get all seeds and maps. We then
 * check for each seeds in given seeds ranges what is the seed location based on
 * all given maps. Finally, we retrieve the smaller location to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 05 - part two test');
  const startTime = new Date().getTime();
  const input = await getInput({ year: '2023', day: '05', separator: '\n\n' });

  const seedsData = input
    .shift()
    .split(': ')[1]
    .split(/(\d+ \d+)/)
    .filter((v) => v !== '' && v !== ' ')
    .map((v) => v.split(' ').map(Number));

  const maps = input.map((map) => {
    const [mapType, mapData] = map.split(' map:\n');

    return {
      type: mapType,
      map: mapData
        .split('\n')
        .map((line) => ({
          source: Number(line.split(' ')[1]),
          destination: Number(line.split(' ')[0]),
          length: Number(line.split(' ')[2]),
        }))
        .sort((a, b) => a.source - b.source),
    };
  });

  let lowestSeedLocation = Infinity;

  Logger.debug(
    `Ranges to proceed :`,
    seedsData.map((pair) => ({
      start: pair[0],
      end: pair[0] + pair[1],
      seeds: pair[1],
    })),
  );

  seedsData.forEach((seedPair) => {
    Logger.debug(
      `Processing range ${seedPair[0]} - ${seedPair[0] + seedPair[1]}`,
    );
    for (let i = 0; i < seedPair[1]; i += 1) {
      if (i === Math.round(seedPair[1] / 4) * 1) Logger.debug('25% done ...');
      if (i === Math.round(seedPair[1] / 4) * 2) Logger.debug('50% done ...');
      if (i === Math.round(seedPair[1] / 4) * 3) Logger.debug('75% done ...');

      const soil = getMappedValue(maps[0].map, seedPair[0] + i);
      const fertilizer = getMappedValue(maps[1].map, soil);
      const water = getMappedValue(maps[2].map, fertilizer);
      const light = getMappedValue(maps[3].map, water);
      const temperature = getMappedValue(maps[4].map, light);
      const humidity = getMappedValue(maps[5].map, temperature);
      const location = getMappedValue(maps[6].map, humidity);

      if (location < lowestSeedLocation) lowestSeedLocation = location;
    }
    Logger.debug('100% done ...');
  });

  Logger.debug(`Time elapsed: ${new Date().getTime() - startTime} ms`);

  Logger.info(`ANSWER: ${lowestSeedLocation}`);
};

main();
