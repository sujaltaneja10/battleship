export { Player };
// export { gb1 };

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
    this.ship1 = new Ship(4);
    this.ship2 = new Ship(3);
    this.ship3 = new Ship(2);
    this.ship4 = new Ship(3);
    this.ships = [this.ship1, this.ship2, this.ship3, this.ship4];

    this.ship1.coordinates = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];

    this.ship2.coordinates = [
      [2, 1],
      [2, 2],
      [2, 3],
    ];

    this.ship3.coordinates = [
      [4, 2],
      [4, 3],
    ];

    this.ship4.coordinates = [
      [3, 6],
      [4, 6],
      [5, 6],
    ];

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
    this.totalHits = [];

    // coordinates of ship
    this.coordinates = [
      this.ship1.coordinates,
      this.ship2.coordinates,
      this.ship3.coordinates,
      this.ship4.coordinates,
    ];
  }

  findIndexOfShip(child) {
    let shipNo = -1;
    for (let i = 0; i < this.ships.length; i++) {
      let array = this.ships[i].coordinates;
      for (let j = 0; j < array.length; j++) {
        if (array[j][0] == child.dataset.x && array[j][1] == child.dataset.y) {
          shipNo = i;
          break;
        }
      }
      if (shipNo !== -1) break;
    }
    return shipNo;
  }

  checkIfHits(x1, y1, array = this.totalBoxesClicked) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] == x1 && array[i][1] == y1) {
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
    if (this.checkIfHits(x1, y1)) {
      return "again";
    }

    this.totalBoxesClicked.push([x1, y1]);

    // check if it hits a ship or not
    let flag = false;
    for (let i = 0; i < this.ships.length; i++) {
      if (this.checkIfHits(x1, y1, this.coordinates[i])) {
        flag = true;
        this.ships[i].hit(true);
        if (this.ships[i].hasSunk()) {
          this.totalHits.push([x1, y1]);
          this.shipsSunkArray[i] = true;
        }
        return "ok";
      }
    }

    // does not hit any ship
    if (flag === false) {
      this.missedClicks.push([x1, y1]);
      return "missed";
    }
  }
}

class Player {
  constructor() {
    this.board = new Gameboard();
  }
}
