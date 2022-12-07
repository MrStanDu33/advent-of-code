/**
 * @file Command class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Command manager class.
 */
class Command {
  /**
   * @description Initializes a Command instance and stores the context.
   *
   * @param { object }   data          - Command data.
   * @param { string }   data.command  - Name of executed program.
   * @param { string }   data.argument - Argument that was given to command.
   * @param { string[] } data.result   - Results lines of command.
   */
  constructor({ command, argument, result }) {
    this.command = command;
    this.argument = argument;
    this.result = result;
  }
}

export default Command;
