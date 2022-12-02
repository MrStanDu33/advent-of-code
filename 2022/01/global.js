/**
 * @function formatInput
 * @description Takes an array of strings and returns an array of arrays.
 *
 * @param   { string[] }   input - List of all snacks owned by elves.
 *
 * @returns { string[][] }       Array of elves' inventory.
 */
export const formatInput = (input) => {
  const inlineInput = input.join('|');
  const elvesList = inlineInput.split('||');
  return elvesList.map((elveInventory) => elveInventory.split('|'));
};
