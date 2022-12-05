/**
 * @file Rucksack class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Rucksack manager class.
 */
class Rucksack {
  /**
   * @description Initializes a new Rucksack instance and stores the rucksack's inventory.
   *
   * @param { object } data             - Round data.
   * @param { Array }  data.inventories - List of all inventories of rucksack.
   */
  constructor({ inventories }) {
    this.inventories = inventories;
  }

  /**
   * @description Finds the category letter in common between all inventories.
   *
   * @returns { string } The common letter in the inventories.
   */
  get rucksackCommonCategory() {
    let regex = new RegExp(`(${this.inventories[0].split('').join('|')})`, 'g');
    let matchingPrevGroup = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const inventory of this.inventories) {
      matchingPrevGroup = inventory.match(regex);
      regex = new RegExp(`(${matchingPrevGroup.join('|')})`, 'g');
    }
    return matchingPrevGroup[0];
  }

  /**
   * @description Get the common category priority.
   *
   * @returns { number } Common category priority.
   */
  get rucksackCommonCategoryPriority() {
    const ASCIIOffset =
      this.rucksackCommonCategory.toLowerCase() === this.rucksackCommonCategory
        ? 96
        : 38;
    return this.rucksackCommonCategory.charCodeAt(0) - ASCIIOffset;
  }
}

export default Rucksack;
