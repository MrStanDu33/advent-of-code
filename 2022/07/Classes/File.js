/**
 * @file File class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description File manager class.
 */
class File {
  /**
   * @description Initializes a File instance and stores size of file.
   *
   * @param { object } data      - File data.
   * @param { number } data.size - Size of the file.
   */
  constructor({ size }) {
    this.size = size;
  }
}

export default File;
