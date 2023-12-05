/**
 * @file Global functions library.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @function formatInput
 * @description Takes an array of strings and returns an array of objects.
 *
 * @param   { string[] } input - List of all games.
 *
 * @returns { object[] }       Parsed list of all games.
 */
export default (input) =>
  input.map((game) => ({
    id: Number(game.match(/Game (?<id>[0-9]+)/).groups.id),
    runs: game
      .split(': ')[1]
      .split('; ')
      .map((run) => ({
        red: Number(run.match(/(?<count>[\d]+) red/)?.groups.count ?? 0),
        green: Number(run.match(/(?<count>[\d]+) green/)?.groups.count ?? 0),
        blue: Number(run.match(/(?<count>[\d]+) blue/)?.groups.count ?? 0),
      })),
  }));
