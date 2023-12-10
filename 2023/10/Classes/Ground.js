/**
 * @file Ground class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Ground manager class.
 */
class Ground {
  isInside = null;

  position = null;

  /**
   * @description Initializes a new Ground instance.
   *
   * @param {[number, number]} position - Position of the ground cell.
   */
  constructor(position) {
    this.position = position;
  }
}

export default Ground;
