/**
 * @file 2023 - 05 - Part one.
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
 * check for each seed what is the seed location based on all given maps.
 * Finally, we retrieve the smaller location to get the answer.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2023 / 05 - part one test');
  const input = await getInput({ year: '2023', day: '05', separator: '\n\n' });

  const seedsData = input.shift().split(': ')[1].split(' ').map(Number);

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

  const mappedSeedsData = seedsData.map((seed) => {
    const soil = getMappedValue(maps[0].map, seed);
    const fertilizer = getMappedValue(maps[1].map, soil);
    const water = getMappedValue(maps[2].map, fertilizer);
    const light = getMappedValue(maps[3].map, water);
    const temperature = getMappedValue(maps[4].map, light);
    const humidity = getMappedValue(maps[5].map, temperature);
    const location = getMappedValue(maps[6].map, humidity);

    return {
      seed,
      soil,
      fertilizer,
      water,
      light,
      temperature,
      humidity,
      location,
    };
  });

  const lowestSeedLocation = Math.min(
    ...mappedSeedsData.map((seed) => seed.location),
  );

  Logger.info(`ANSWER: ${lowestSeedLocation}`);
};

main();
