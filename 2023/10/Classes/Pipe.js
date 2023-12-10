/**
 * @file Pipe class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Pipe manager class.
 */
class Pipe {
  pipe = null;

  step = null;

  position = null;

  /**
   * @description Initializes a new Pipe instance.
   *
   * @param { '│'|'─'|'└'|'┘'|'┐'|'┌'|'S' } pipeCharacter - Pipe type.
   * @param {[number, number]}              position      - Position of the pipe
   *                                                      cell.
   *
   */
  constructor(pipeCharacter, position) {
    this.pipe = pipeCharacter;
    this.step = null;
    this.position = position;
  }

  /**
   * @description Returns an array containing the locations of the foreign keys
   * on the current pipe.
   *
   * @returns {Array} An array containing the locations of the foreign keys on
   *                  the current pipe. Possible values are 'top', 'bottom',
   *                  'left' and 'right'.
   */
  getForeignKeysLocations() {
    switch (this.pipe) {
      case '|':
        return ['top', 'bottom'];
      case '─':
        return ['left', 'right'];
      case '└':
        return ['top', 'right'];
      case '┘':
        return ['top', 'left'];
      case '┐':
        return ['bottom', 'left'];
      case '┌':
        return ['bottom', 'right'];
      default:
        return ['top', 'bottom', 'left', 'right'];
    }
  }
}

export default Pipe;
