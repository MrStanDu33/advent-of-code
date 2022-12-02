/**
 * @file Elf class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Elf manager class.
 *
 * @exports Elf
 */
export default class Elf {
  /**
   * @description Initializes a new Elf instance and stores the elf's inventory.
   *
   * @param { object }   data        - Elf data.
   * @param { string[] } data.snacks - List of all elf's snacks calories.
   */
  constructor({ snacks }) {
    this.snacks = snacks;
  }

  /**
   * @type { number }
   *
   * @description Number of calories held by the elf.
   */
  get totalCalories() {
    return this.snacks.reduce((sum, snack) => sum + Number(snack), 0);
  }
}
