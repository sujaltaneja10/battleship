export { Ship, Gameboard, Player };

class Ship {
  constructor(len) {
    this.length = len;
    this.numberOfHits = 0;
  }

  hit(hitSucceeds = false) {
    if (hitSucceeds === true) {
      this.numberOfHits++;
    }
    return this.numberOfHits;
  }

  hasSunk() {
    if (this.numberOfHits === this.length) {
      return true;
    }
    return false;
  }
}

class Gameboard {
  constructor() {
    this.ships = [new Ship(4), new Ship(3), new Ship(2), new Ship(3)];
    this.ship1 = this.ships[0];
    this.ship2 = this.ships[1];
    this.ship3 = this.ships[2];
    this.ship4 = this.ships[3];

    this.shipsSunkArray = [false, false, false, false];
    this.allShipsSunk = false;

    // total points to choose from
    // [[0, 0], [0, 1]......[9, 0].,.[9, 9]]
    this.total = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.total.push([i, j]);
      }
    }

    this.totalBoxesClicked = [];
    this.missedClicks = [];

    // coordinates of ship
    this.coordinates = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
      ],
      [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    ];
  }

  checkAlreadyHit(x1, y1, array = this.totalBoxesClicked) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === x1 && array[i][1] === y1) {
        return true;
      }
    }
    return false;
  }

  receiveAttack(x1, y1) {
    // when all ships sunk
    if (!this.shipsSunkArray.includes(false)) {
      this.allShipsSunk = true;
      return "complete";
    }

    // already hit at that place
    if (this.checkAlreadyHit(x1, y1)) {
      return "again";
    }

    this.totalBoxesClicked.push([x1, y1]);

    // check if it hits a ship or not
    let flag = false;
    for (let i = 0; i < this.ships.length; i++) {
      if (this.checkAlreadyHit(x1, y1, this.coordinates[i])) {
        flag = true;
        this.ships[i].hit(true);
        if (this.ships[i].hasSunk()) {
          this.shipsSunkArray[i] = true;
        }
        return "ok";
      }
    }

    // does not hit any ship
    if (flag === false) {
      this.missedClicks.push(x1, y1);
      return "missed";
    }
  }
}

class Player {
  constructor() {
    this.board = new Gameboard();
  }
}