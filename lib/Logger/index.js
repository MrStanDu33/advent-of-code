/**
 * @file Custom logger class.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import chalk from 'chalk';

/**
 * @class
 * @description Logger library.
 *
 * @hideconstructor
 *
 * @exports Logger
 */
class Logger {
  /**
   * @static
   *
   * @description Prints given debug messages to the console and to log file in debug mode.
   *
   * @param   { ...any } debug - Debug messages to be logged.
   *
   * @returns { void }
   *
   * @example
   * Logger.debug('This is a debug message', 12, false);
   */
  static debug(...debug) {
    Logger.debugToConsole(...debug);
  }

  /**
   * @static
   *
   * @description Prints given info messages to the console and to log file in info mode.
   *
   * @param   { ...any } info - Info messages to be logged.
   *
   * @returns { void }
   *
   * @example
   * Logger.info('This is an info message', false, 20);
   */
  static info(...info) {
    Logger.infoToConsole(...info);
  }

  /**
   * @static
   *
   * @description Prints given warning messages to the console and to log file in warning mode.
   *
   * @param   { ...any } warn - Warning messages to be logged.
   *
   * @returns { void }
   *
   * @example
   * Logger.warn('This is a warn message', true, 42);
   */
  static warn(...warn) {
    Logger.warnToConsole(...warn);
  }

  /**
   * @static
   *
   * @description Prints given error messages to the console and to log file in error mode.
   * If first given argument is a boolean and is evaluated as true, the function will log the error
   * in fatal mode.
   *
   * @param   { * }       [ error ] - Data to be logged.
   * @param   { boolean } error[].0 - If set to true, log error as fatal.
   * @param   { ...any }  error[].1 - Error messages to be logged.
   *
   * @returns { void }
   *
   * @example
   * Logger.error('This is an error message', 45, false);
   *
   * Logger.error(true, 'This is a fatal error message', 12, false); // note the first param being a boolean set to true, it will not be logged in console nor file
   */
  static error(...error) {
    Logger.errorToConsole(...error);
  }

  /**
   * @static
   *
   * @description Prints given debug messages to the console in log mode.
   * If the APP_DEBUG environment variable is set to false, then the function will not
   * log anything to the console.
   *
   * @param   { ...any } debug - Debug messages to be logged.
   *
   * @returns { void }
   *
   * @example
   * Logger.debugToConsole('This is a debug message', 12, false);
   */
  static debugToConsole(...debug) {
    // eslint-disable-next-line no-console
    console.log(`${Logger.#prefixes.console.debug} |`, ...debug);
  }

  /**
   * @static
   *
   * @description Prints given info messages to the console in log mode.
   *
   * @param   { ...any } info - Info messages to be logged.
   *
   * @returns { void }
   *
   * @example
   * Logger.infoToConsole('This is an info message', false, 20);
   */
  static infoToConsole(...info) {
    // eslint-disable-next-line no-console
    console.log(`${Logger.#prefixes.console.info} |`, ...info);
  }

  /**
   * @static
   *
   * @description Prints given warning messages to the console in warn mode.
   * If the APP_DEBUG environment variable is set to false, then the function will not
   * log anything to the console.
   *
   * @param   { ...any } warn - Warning messages to be logged.
   *
   * @returns { void }
   *
   * @example
   * Logger.warnToConsole('This is a warn message', true, 42);
   */
  static warnToConsole(...warn) {
    // eslint-disable-next-line no-console
    console.warn(`${Logger.#prefixes.console.warn} |`, ...warn);
  }

  /**
   * @static
   *
   * @description Prints given error messages to the console in error or fatal mode.
   * If first given argument is a boolean and is evaluated as true, the function will log the error
   * in fatal mode.
   *
   * @param   { * }       [ error ] - Data to be logged.
   * @param   { boolean } error[].0 - If set to true, log error as fatal.
   * @param   { ...any }  error[].1 - Error messages to be logged.
   *
   * @returns { void }
   *
   * @example
   * Logger.errorToConsole('This is an error message', 45, false);
   *
   * Logger.errorToConsole(true, 'This is a fatal error message', 12, false); // note the first param being a boolean set to true, it will not be logged in console
   */
  static errorToConsole(...error) {
    const fatal = error.length > 1 && error[0] === true && error.shift();
    const method = fatal ? 'error' : 'log';
    const flag = fatal ? 'fatal' : 'error';
    // eslint-disable-next-line no-console
    console[method](`${Logger.#prefixes.console[flag]}`, ...error);
  }

  /**
   * @static
   *
   * @property { object } prefixes               - List of prefixes to use for logging.
   *
   * @property { object } prefixes.console       - List of prefixes to use for console logging.
   * @property { string } prefixes.console.debug - Colored prefix for debug messages in console.
   * @property { string } prefixes.console.info  - Colored prefix for info messages in console.
   * @property { string } prefixes.console.warn  - Colored prefix for warnings in console.
   * @property { string } prefixes.console.error - Colored prefix for errors in console.
   * @property { string } prefixes.console.fatal - Colored prefix for fatal errors in console.
   *
   * @property { object } prefixes.file          - List of prefixes to use for log file logging.
   * @property { string } prefixes.file.debug    - Prefix for debug messages in log file.
   * @property { string } prefixes.file.info     - Prefix for info messages in log file.
   * @property { string } prefixes.file.warn     - Prefix for warnings in log file.
   * @property { string } prefixes.file.error    - Prefix for errors in log file.
   * @property { string } prefixes.file.fatal    - Prefix for fatal errors in log file.
   */
  static #prefixes = {
    console: {
      debug: chalk.blueBright('[DEBUG]'),
      info: chalk.greenBright('[INFO] '),
      warn: chalk.yellowBright('[WARN] '),
      error: chalk.redBright('[ERROR]'),
      fatal: chalk.red.bold('[FATAL]'),
    },
  };
}

export default Logger;
