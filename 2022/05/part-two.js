/**
 * @file 2022 - 05 - Part two.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import Warehouse from './Classes/Warehouse';

/**
 * @description We get the input, format it, extract the warehouse default status and
 * instructions, then we instantiate the warehouse based on extracted data and execute
 * instructions.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 05 - part two test');

  const input = await getInput({ year: '2022', day: '05', separator: '\n' });

  const inputSeparator = input.indexOf('');
  const [rawWarehouse, instructions] = [
    input.slice(0, inputSeparator),
    input.slice(inputSeparator + 1),
  ];

  const stacks = rawWarehouse.pop().match(/([^ ])/g);

  const formattedInput = rawWarehouse.map((row) =>
    row
      .replaceAll(/([[\]])/g, '')
      .replaceAll(/ ([ ]{3})/g, ' -')
      .split(' '),
  );

  const formattedWarehouse = [];

  for (let column = 0; column < stacks.length; column += 1) {
    formattedWarehouse.push([]);
    formattedInput.forEach((row) =>
      formattedWarehouse[column].unshift(row[column]),
    );
  }

  const warehouse = new Warehouse({
    inventory: formattedWarehouse,
    stacksNames: stacks,
    craneName: 'CrateMover 9001',
  });

  instructions.forEach((instruction) => warehouse.operate(instruction));

  const result = Object.keys(warehouse.stacks).map(
    (stack) =>
      warehouse.stacks[stack].crates[warehouse.stacks[stack].crates.length - 1],
  );

  Logger.info(`ANSWER: ${result.join('')}`);
};

main();
