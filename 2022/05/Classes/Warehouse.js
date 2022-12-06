/**
 * @file Warehouse class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import Stack from './Stack';

/**
 * @class
 * @description Warehouse manager class.
 */
class Warehouse {
  /**
   * @description Initializes a Warehouse instance and stores the crate name and stacks.
   *
   * @param { object }     data             - Warehouse data.
   * @param { string[][] } data.inventory   - List of all stacks in warehouse.
   * @param { string[] }   data.stacksNames - Name of all stacks.
   * @param { string }     data.craneName   - Name of used crane to operate crates.
   */
  constructor({ inventory, stacksNames, craneName }) {
    this.stacks = {};
    this.craneName = craneName;
    inventory.forEach((stack, index) => {
      this.stacks[stacksNames[index]] = new Stack({ crates: stack });
    });
  }

  /**
   * @description Move `n` crates from a stack to another, based on given instruction.
   *
   * @param   { string } instruction - Instruction to move crates.
   *
   * @returns { void }
   */
  operate(instruction) {
    const quantityToMove = Number(instruction.match(/move ([0-9]+)/)[1]);
    const source = Number(instruction.match(/from ([0-9]+)/)[1]);
    const target = Number(instruction.match(/to ([0-9]+)/)[1]);

    const cratesToMove = [];

    for (let iterator = 0; iterator < quantityToMove; iterator += 1) {
      const crate = this.stacks[source].crates.pop();
      cratesToMove.push(crate);
    }

    if (this.craneName === 'CrateMover 9001') {
      cratesToMove.reverse();
    }

    cratesToMove.forEach((crate) => this.stacks[target].crates.push(crate));
  }
}

export default Warehouse;
