/**
 * @file Global functions definitions.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import Folder from './Classes/Folder';

/**
 * @description Returns a recursive array of all folders in a given folder that
 * are smaller or greater than a given size.
 *
 * @param   { Folder }   parentFolder - The folder to start the search from.
 * @param   { number }   size         - The size we're looking for.
 * @param   { string }   direction    - Wether the given size is the maximum or minimum size.
 *
 * @returns { Folder[] }              - An array of folders that are smaller than the size given.
 */
const getSmallFolders = (parentFolder, size, direction) => {
  const folders = Object.keys(parentFolder.content)
    .map((key) => parentFolder.content[key])
    .filter((content) => content instanceof Folder);

  if (folders.length === 0) {
    if (direction === '>')
      return [parentFolder.size > size ? parentFolder : null];
    return [parentFolder.size < size ? parentFolder : null];
  }

  const smallFolders = folders
    .map((folder) => getSmallFolders(folder, size, direction))
    .flat();

  if (direction === '>')
    return [parentFolder.size > size ? parentFolder : null, ...smallFolders];
  return [parentFolder.size < size ? parentFolder : null, ...smallFolders];
};

export default getSmallFolders;
