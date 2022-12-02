export default class Elf {
  /**
   * @description Initializes a new Elf instance and stores the elf's inventory.
   *
   * @param {object}   data        - Elf data.
   * @param {string[]} data.snacks - List of all elf's snacks calories.
   */
  constructor({ snacks }) {
    this.snacks = snacks;
  }

  get totalCalories() {
    return this.snacks.reduce((sum, snack) => sum + Number(snack), 0);
  }
}
