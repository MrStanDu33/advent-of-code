/**
 * @file Folder class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Folder manager class.
 */
class Folder {
  /**
   * @description Initializes a Folder instance and stores the content.
   *
   * @param { object } data         - Folder data.
   * @param { string } data.name    - Name of the folder.
   * @param { object } data.content - Content of folder.
   */
  constructor({ name, content }) {
    this.name = name;
    this.content = content;
  }

  /**
   * @description Size of folder, based on its content.
   *
   * @returns { number } Size of folder.
   */
  get size() {
    return Object.keys(this.content).reduce((sum, currentContent) => {
      return sum + this.content[currentContent].size;
    }, 0);
  }
}

export default Folder;
