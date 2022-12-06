/**
 * @file Stack class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Stack manager class.
 */
class Stack {
  /**
   * @description Initializes a Stack instance and stores crates.
   *
   * @param { object } data        - Stack data.
   * @param { Array }  data.crates - List of all crates in stack.
   */
  constructor({ crates }) {
    this.crates = crates.filter((crate) => crate !== '-');
  }
}

export default Stack;
