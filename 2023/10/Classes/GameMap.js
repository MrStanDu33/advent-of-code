/**
 * @file GameMap class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

import chalk from 'chalk';

import Pipe from './Pipe';
import Ground from './Ground';

/**
 * @class
 * @description GameMap manager class.
 */
class GameMap {
  map = null;

  startingPoint = null;

  /**
   * @description Initializes a new Game map instance, stores the map and
   * instanciate pipes.
   *
   * @param { ['│'|'─'|'└'|'┘'|'┐'|'┌'|'S'|'.'][] } grid - 2D string array
   *                                                     representing the game map.
   */
  constructor(grid) {
    this.map = grid.map((line, lineIndex) =>
      line.map((cell, columnIndex) =>
        cell !== '.' ? new Pipe(cell, [lineIndex, columnIndex]) : null,
      ),
    );

    this.startingPoint = this.locateStartingPoint();
    this.guessStartingPointCell();
  }

  /**
   * @description Returns a string representation of the game map, where each
   * pipe is represented by a character.
   *
   * @returns {string} A multiline string representation of the game map.
   */
  displayMap() {
    const printableMap = this.map
      .map((line) =>
        line
          .map((cell) => {
            if (cell instanceof Ground)
              return cell.isInside ? chalk.blue('#') : chalk.redBright('#');
            return cell.step === null
              ? chalk.gray(cell.pipe)
              : chalk.greenBright(cell.pipe);
          })
          .join(''),
      )
      .join('\n');

    return `\n${printableMap}`;
  }

  /**
   * @description Returns the number of Ground cells that are enclosed within
   * pipes.
   *
   * @returns {number} The number of Ground cells that are enclosed within pipes.
   */
  countAllEnclosedGrounds() {
    return this.map
      .flat()
      .filter((cell) => cell instanceof Ground && cell.isInside).length;
  }

  /**
   * @description Simplifies the game map by replacing all Ground cells and
   * pipes that are not connected with Ground instances and setting the isInside
   * property based on whether they are inside the pipes or not, using a
   * colision detection.
   */
  simplifyMap() {
    this.map = this.map.map((line, lineIndex) =>
      line.map((cell, columnIndex) =>
        cell && cell.step !== null
          ? cell
          : new Ground([lineIndex, columnIndex]),
      ),
    );

    const grounds = this.map.flatMap((line) =>
      line.filter((cell) => cell instanceof Ground),
    );

    grounds.forEach((ground) => {
      const rayCastStartPosition = ground.position;

      const rayCastLine = this.map[rayCastStartPosition[0]]
        .slice(0, rayCastStartPosition[1])
        .map((cell) => (cell instanceof Pipe ? cell.pipe : ''))
        .join('')
        .replaceAll(/┌─?┐/g, '')
        .replaceAll(/└─?┘/g, '');

      const colisionsRegex = [/│/g, /└─*┐/g, /┌─*┘/g];

      const colisions = colisionsRegex
        .map((colisionRegex) => rayCastLine.match(colisionRegex))
        .flat()
        .filter(Boolean);

      this.map[ground.position[0]][ground.position[1]].isInside =
        colisions.length % 2;
    });
  }

  /**
   * @description Returns the length of the longest path in the game map.
   *
   * This function uses a depth-first search algorithm to find the longest path
   * starting from the starting point and traversing through all the adjacent
   * cells. It updates the step property of each cell as it is visited, and
   * returns the maximum step value after the search is complete.
   *
   * @returns {number} The length of the longest path in the game map.
   */
  getLongestPath() {
    let neighbourCells = Object.values(
      this.getConnectedNeighbourCells(
        this.map[this.startingPoint[0]][this.startingPoint[1]],
      ),
    ).filter((cell) => cell !== null);

    this.map[this.startingPoint[0]][this.startingPoint[1]].step += 0;

    let step = 1;
    let done = false;

    while (!done) {
      const cellsToPush = [];

      const currentStep = step;

      neighbourCells.forEach((neighbourCell) => {
        if (neighbourCell.step !== null) return;

        this.map[neighbourCell.position[0]][neighbourCell.position[1]].step =
          currentStep;

        cellsToPush.push(
          ...Object.values(this.getConnectedNeighbourCells(neighbourCell)),
        );
      });

      neighbourCells = cellsToPush;
      step += 1;

      if (neighbourCells.length === 0) done = true;
    }

    return Math.max(
      ...this.map.map((line) => line.map((cell) => cell?.step || 0)).flat(),
    );
  }

  /**
   * @description Returns a map of the connected neighbour cells of the
   * specified reference cell.
   *
   * @param   {object} referenceCell - The reference cell.
   *
   * @returns {object}               A map of the connected neighbour cells,
   *                                 where the keys are the cardinal directions
   *                                 (top, left, right, bottom) and the values
   *                                 are the neighbour cells.
   */
  getConnectedNeighbourCells(referenceCell) {
    const neighbourCells = this.getNeighbourCells(referenceCell.position);

    const connectedCells = {};

    const typeOfReferenceCell = GameMap.CELLS_CONSTRAINTS.find(
      (cell) => cell.cell === referenceCell.pipe,
    );

    const topCellConstraints = GameMap.CELLS_CONSTRAINTS.find(
      (cell) => cell.cell === neighbourCells.top?.pipe,
    );
    const leftCellConstraints = GameMap.CELLS_CONSTRAINTS.find(
      (cell) => cell.cell === neighbourCells.left?.pipe,
    );
    const rightCellConstraints = GameMap.CELLS_CONSTRAINTS.find(
      (cell) => cell.cell === neighbourCells.right?.pipe,
    );
    const bottomCellConstraints = GameMap.CELLS_CONSTRAINTS.find(
      (cell) => cell.cell === neighbourCells.bottom?.pipe,
    );

    if (typeOfReferenceCell?.constraints?.includes('top'))
      if (topCellConstraints?.constraints?.includes('bottom'))
        connectedCells.top = neighbourCells.top;

    if (typeOfReferenceCell?.constraints?.includes('left'))
      if (leftCellConstraints?.constraints?.includes('right'))
        connectedCells.left = neighbourCells.left;

    if (typeOfReferenceCell?.constraints?.includes('right'))
      if (rightCellConstraints?.constraints?.includes('left'))
        connectedCells.right = neighbourCells.right;

    if (typeOfReferenceCell?.constraints?.includes('bottom'))
      if (bottomCellConstraints?.constraints?.includes('top'))
        connectedCells.bottom = neighbourCells.bottom;

    return connectedCells;
  }

  /**
   * @description Returns an array of positions of the adjacent cells to the
   * specified position.
   *
   * @param   {number[]} position - The position of the cell.
   *
   * @returns { object }          An array of positions of the adjacent cells.
   */
  getNeighbourCells(position) {
    const [top, left, right, bottom] = GameMap.getNeighbourCellsLocations(
      position,
    ).map(
      (cellPosition) => this.map[cellPosition[0]]?.[cellPosition[1]] || null,
    );

    return { top, left, right, bottom };
  }

  /**
   * @description Returns an array of positions of the adjacent cells to the
   * specified position.
   *
   * @param   {number[]}   position - The position of the cell.
   *
   * @returns {number[][]}          An array of positions of the adjacent cells.
   */
  static getNeighbourCellsLocations(position) {
    return [
      [position[0] - 1, position[1]], // Up
      [position[0], position[1] - 1], // Left
      [position[0], position[1] + 1], // Right
      [position[0] + 1, position[1]], // Down
    ];
  }

  /**
   * @description Guess the pipe that will replace the starting point cell based
   * on surrounding pipes and possibilities.
   */
  guessStartingPointCell() {
    const startingPointCell = GameMap.CELLS_CONSTRAINTS.find((possibleCell) => {
      const matches = this.getConnectedNeighbourCells({
        pipe: possibleCell.cell,
        position: this.startingPoint,
      });
      if (Object.keys(matches).length === 2) return true;
    });

    this.map[this.startingPoint[0]][this.startingPoint[1]] = new Pipe(
      startingPointCell.cell,
      this.startingPoint,
    );
  }

  /**
   * @description Returns the index of the first line and column in the game map
   * that contains a starting point ('S').
   *
   * @returns {number[]} An array containing the line index and column index of
   *                     the starting point, or null if no starting point is found.
   */
  locateStartingPoint() {
    const lineIndex = this.map.findIndex((line) =>
      line.find((cell) => cell?.pipe === 'S'),
    );

    const columnIndex = this.map[lineIndex].findIndex(
      (cell) => cell?.pipe === 'S',
    );

    return [lineIndex, columnIndex];
  }

  static CELLS_CONSTRAINTS = [
    { cell: '│', constraints: ['top', 'bottom'] },
    { cell: '─', constraints: ['left', 'right'] },
    { cell: '└', constraints: ['top', 'right'] },
    { cell: '┘', constraints: ['top', 'left'] },
    { cell: '┐', constraints: ['bottom', 'left'] },
    { cell: '┌', constraints: ['bottom', 'right'] },
  ];
}

export default GameMap;
