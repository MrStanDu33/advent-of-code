class Round {
  constructor({ opponentChoice, indicator, indicatorType }) {
    this.opponentChoice = opponentChoice;
    this.indicator = indicator;
    this.indicatorType = indicatorType;
  }

  get #outcome() {
    return this.#outcomes[this.opponentChoice][this.indicator];
  }

  get #moveScore() {
    const move =
      this.indicatorType === 'OUTCOME'
        ? this.#movesToPlay[this.opponentChoice][this.indicator]
        : this.indicator;
    return this.#moveScores[move];
  }

  get #outcomePoint() {
    const outcome =
      this.indicatorType === 'OUTCOME'
        ? this.#convertIndicatorToOutcome()
        : this.#outcome;
    return this.#outcomePoints[outcome];
  }

  get totalPoints() {
    return this.#moveScore + this.#outcomePoint;
  }

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

  #moveScores = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  #outcomePoints = {
    LOSE: 0,
    DRAW: 3,
    WIN: 6,
  };

  #movesToPlay = {
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

  #outcomes = {
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
