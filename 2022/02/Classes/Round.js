/**
 * @file Round class definition.
 * @author DANIELS-ROTH Stan <contact@daniels-roth-stan.fr>
 */

/**
 * @class
 * @description Round manager class.
 */
class Round {
  /**
   * @description Initializes a new Round instance and stores the round's information.
   *
   * @param { object } data                - Round data.
   * @param { string } data.opponentChoice - Character describing opponent choice.
   * @param { string } data.indicator      - Character indicating wether the game
   *                                       should be lost, won or be draw if indicatorType is set to `OUTCOME` or
   *                                       indicates what we should play against the opponent.
   * @param { string } data.indicatorType  - String that describes how to handle
   *                                       indicator value.
   */
  constructor({ opponentChoice, indicator, indicatorType }) {
    this.opponentChoice = opponentChoice;
    this.indicator = indicator;
    this.indicatorType = indicatorType;
  }

  /**
   * @type { string }
   *
   * @description The round state, wether : `WON`, `LOSE` or `DRAW`.
   */
  get #outcome() {
    return Round.#outcomes[this.opponentChoice][this.indicator];
  }

  /**
   * @type { number }
   *
   * @description Number of point we won by doing move following given startegy.
   */
  get #moveScore() {
    const move =
      this.indicatorType === 'OUTCOME'
        ? Round.#movesToPlay[this.opponentChoice][this.indicator]
        : this.indicator;
    return Round.#moveScores[move];
  }

  /**
   * @type { number }
   *
   * @description Number of point we won regarding the outcome of the round.
   */
  get #outcomePoint() {
    const outcome =
      this.indicatorType === 'OUTCOME'
        ? this.#convertIndicatorToOutcome()
        : this.#outcome;
    return Round.#outcomePoints[outcome];
  }

  /**
   * @type { number }
   *
   * @description Number of point we won in total on this round.
   */
  get totalPoints() {
    return this.#moveScore + this.#outcomePoint;
  }

  /**
   * @description Get outcome of the game based on the round indicator.
   *
   * @throws Error when indicator matches no cases.
   *
   * @returns { string } Outcome of the game.
   */
  #convertIndicatorToOutcome() {
    switch (this.indicator) {
      case 'X':
        return 'LOSE';
      case 'Y':
        return 'DRAW';
      case 'Z':
        return 'WIN';
      default:
        throw new Error(`Unknown indicator: ${this.indicator}`);
    }
  }

  /**
   * @static
   *
   * @property { object } moveScores   - List of points to add based on player moves.
   *
   * @property { number } moveScores.X - Score to use when user played `Rock`.
   * @property { number } moveScores.Y - Score to use when user played `Paper`.
   * @property { number } moveScores.Z - Score to use when user played `Scissors`.
   */
  static #moveScores = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  /**
   * @static
   *
   * @property { object } outcomePoints   - List of points to add based on round outcome.
   *
   * @property { number } outcomePoints.X - Score to use when game was `LOSE`.
   * @property { number } outcomePoints.Y - Score to use when game was `DRAW`.
   * @property { number } outcomePoints.Z - Score to use when game was `WIN`.
   */
  static #outcomePoints = {
    LOSE: 0,
    DRAW: 3,
    WIN: 6,
  };

  /**
   * @static
   *
   * @property { object } movesToPlay     - Moves to play based on opponent choice and
   *                                      needed game outcome.
   *
   * @property { object } movesToPlay.A   - Moves to play when opponent played `Rock`.
   * @property { string } movesToPlay.A.X - Move to play when opponent played `Rock`
   *                                      and we need to lose.
   * @property { string } movesToPlay.A.Y - Move to play when opponent played `Rock`
   *                                      and we need to draw.
   * @property { string } movesToPlay.A.Z - Move to play when opponent played `Rock`
   *                                      and we need to win.
   *
   * @property { object } movesToPlay.B   - Moves to play when opponent played `Paper`.
   * @property { string } movesToPlay.B.X - Move to play when opponent played `Paper`
   *                                      and we need to lose.
   * @property { string } movesToPlay.B.Y - Move to play when opponent played `Paper`
   *                                      and we need to draw.
   * @property { string } movesToPlay.B.Z - Move to play when opponent played `Paper`
   *                                      and we need to win.
   *
   * @property { object } movesToPlay.C   - Moves to play when opponent played `Scissors`.
   * @property { string } movesToPlay.C.X - Move to play when opponent played `Scissors`
   *                                      and we need to lose.
   * @property { string } movesToPlay.C.Y - Move to play when opponent played `Scissors`
   *                                      and we need to draw.
   * @property { string } movesToPlay.C.Z - Move to play when opponent played `Scissors`
   *                                      and we need to win.
   */
  static #movesToPlay = {
    A: {
      X: 'Z',
      Y: 'X',
      Z: 'Y',
    },
    B: {
      X: 'X',
      Y: 'Y',
      Z: 'Z',
    },
    C: {
      X: 'Y',
      Y: 'Z',
      Z: 'X',
    },
  };

  /**
   * @static
   *
   * @property { object } outcomes     - List of outcomes based on
   *                                   opponent choice and our choice.
   *
   * @property { object } outcomes.A   - List of outcomes possible when
   *                                   opponent played `Rock`.
   * @property { string } outcomes.A.X - Outcome when we played `Rock` and
   *                                   opponent played `Rock`.
   * @property { string } outcomes.A.Y - Outcome when we played `Paper` and
   *                                   opponent played `Rock`.
   * @property { string } outcomes.A.Z - Outcome when we played `Scissors` and
   *                                   opponent played `Rock`.
   *
   * @property { object } outcomes.B   - List of outcomes possible when
   *                                   opponent played `Paper`.
   * @property { string } outcomes.B.X - Outcome when we played `Rock` and
   *                                   opponent played `Paper`.
   * @property { string } outcomes.B.Y - Outcome when we played `Paper` and
   *                                   opponent played `Paper`.
   * @property { string } outcomes.B.Z - Outcome when we played `Scissors` and
   *                                   opponent played `Paper`.
   *
   * @property { object } outcomes.C   - List of outcomes possible when
   *                                   opponent played `Scissors`.
   * @property { string } outcomes.C.X - Outcome when we played `Rock` and
   *                                   opponent played `Scissors`.
   * @property { string } outcomes.C.Y - Outcome when we played `Paper` and
   *                                   opponent played `Scissors`.
   * @property { string } outcomes.C.Z - Outcome when we played `Scissors` and
   *                                   opponent played `Scissors`.
   */
  static #outcomes = {
    A: {
      X: 'DRAW',
      Y: 'WIN',
      Z: 'LOSE',
    },
    B: {
      X: 'LOSE',
      Y: 'DRAW',
      Z: 'WIN',
    },
    C: {
      X: 'WIN',
      Y: 'LOSE',
      Z: 'DRAW',
    },
  };
}

export default Round;
