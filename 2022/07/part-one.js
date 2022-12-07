/**
 * @file 2022 - 07 - Part one.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import getInput from '$lib/InputManager';
import Logger from '$lib/Logger';
import Command from './Classes/Command';
import Folder from './Classes/Folder';
import File from './Classes/File';
import getSmallFolders from './global';

/**
 * @description We get the input, format it and get all issued commands.
 * Then we build a folder structure data based on command results. Finally,
 * we get all folders that has a size smaller than 100'000 and sum up their sizes.
 *
 * @returns { Promise<void> }
 */
const main = async () => {
  Logger.info('Start running 2022 / 07 - part one test');

  const input = await getInput({ year: '2022', day: '07', separator: '$' });

  input.shift();

  const formattedInput = input.map((command) => {
    const lines = command.split('\n');
    return new Command({
      command: lines.slice(0, 1)[0].trim().split(' ')[0],
      argument: lines.slice(0, 1)[0].trim().split(' ')[1],
      result: lines.slice(1, lines.length - 1),
    });
  });

  const folders = {
    '/': new Folder({ name: '/', content: {} }),
  };
  const actualPath = [];

  formattedInput.forEach((command) => {
    if (command.command === 'cd') {
      switch (command.argument) {
        case '/':
          actualPath.splice(0, actualPath.length);
          actualPath.push('/');
          break;
        case '..':
          actualPath.pop();
          break;
        default:
          actualPath.push(command.argument);
          break;
      }
    }
    if (command.command === 'ls') {
      let parent = folders;

      actualPath.forEach((path) => {
        parent = parent[path].content;
      });

      if (parent === undefined) {
        // @ts-ignore
        parent = new Folder({
          name: actualPath[actualPath.length - 1],
          content: {},
        });
      }

      command.result.forEach((result) => {
        const isDir = result.split(' ')[0] === 'dir';
        if (isDir) {
          const dirName = result.split(' ')[1];
          parent[dirName] = new Folder({
            name: dirName,
            content: {},
          });
          return;
        }

        const fileName = result.split(' ')[1];
        parent[fileName] = new File({
          size: Number(result.split(' ')[0]),
        });
      });
    }
  });

  const result = getSmallFolders(folders['/'], 100_000, '<')
    .flat(Infinity)
    .filter((folder) => folder instanceof Folder)
    .reduce((sum, folder) => sum + folder.size, 0);

  Logger.info(`ANSWER: ${result}`);
};

main();
