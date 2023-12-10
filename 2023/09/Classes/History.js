/**
 * @file History class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description History manager class.
 */
class History {
  values = null;

  childHistory = null;

  /**
   * @description Initializes a new history instance and stores the history's values and extrapolated history values.
   *
   * @param { number[] } values - Round data.
   */
  constructor(values) {
    this.values = values;

    this.#computeChildValues();
    this.#computeFirstValue();
    this.#computeLastValue();
  }

  /**
   * @description Compute how much the last value should be based on
   * extrapolated values.
   */
  #computeLastValue() {
    const deltaToUse =
      this.childHistory === null
        ? 0
        : this.childHistory.values[this.childHistory.values.length - 1];

    this.values.push(this.values[this.values.length - 1] + deltaToUse);
  }

  /**
   * @description Compute how much the first value should be based on
   * extrapolated values.
   */
  #computeFirstValue() {
    const deltaToUse =
      this.childHistory === null ? 0 : this.childHistory.values[0];

    this.values.unshift(this.values[0] - deltaToUse);
  }

  /**
   * @description Create and stores extrapolated history values.
   */
  #computeChildValues() {
    if (this.values.filter((value) => value !== 0).length === 0) return;

    const childValues = this.values
      .map((value, index) =>
        index === this.values.length - 1
          ? null
          : this.values[index + 1] - value,
      )
      .filter((value) => value !== null);

    if (childValues.filter((value) => value !== 0).length === 0) return;

    this.childHistory = new History(childValues);
  }
}

export default History;
