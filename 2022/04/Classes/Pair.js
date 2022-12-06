/**
 * @file Pair class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Pair manager class.
 */
class Pair {
  /**
   * @description Initializes a new Pair instance and stores the zones in which the pair of
   * elves works on.
   *
   * @param { object }                       data           - Pair data.
   * @param { Array }                        data.zones     - List of all the zones the pair of elves works on.
   * @param { [start: number, end: number] } data.zones[].0 - Zone where the first Elf works on.
   * @param { [start: number, end: number] } data.zones[].1 - Zone where the second Elf works on.
   */
  constructor({ zones }) {
    this.zones = zones;
  }

  /**
   * @typedef { object }  OverlappingStatus
   *
   * @property { boolean } includes - Wether an elf's zones includes the other elf's zone.
   * @property { boolean } touching - Wether an elf's zones touches the other elf's zone.
   */

  /**
   * @description Overlapping status of zones worked on by elves.
   *
   * @returns { OverlappingStatus } Overlapping status.
   */
  get overlaps() {
    const [[min1, max1], [min2, max2]] = this.zones;
    return {
      includes:
        (min1 <= min2 && max2 <= max1) || (min2 <= min1 && max1 <= max2),
      touching:
        (min2 >= min1 && min2 <= max1) ||
        (max2 >= min1 && max2 <= max1) ||
        (min1 >= min2 && min1 <= max2) ||
        (max1 >= min2 && max1 <= max2),
    };
  }
}

export default Pair;
