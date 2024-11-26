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
  // constructor() {
  //   this.resetGameboard();
  // }

  constructor() {
    this.ship1 = new Ship(4);
    this.ship2 = new Ship(3);
    this.ship3 = new Ship(2);
    this.ship4 = new Ship(3);
    this.ship5 = new Ship(5);
    this.ship6 = new Ship(5);
    this.ships = [
      this.ship1,
      this.ship2,
      this.ship3,
      this.ship4,
      this.ship5,
      this.ship6,
    ];

    // coordinates of ship
    this.coordinates = [];
    this.adjacentCoordinates = [];

    // get random coordinates of the given ship
    const getCoordinatesOfShip = (ship, shipNo) => {
      // get random coordinates
      let array = [];

      // horizontal
      if (shipNo % 2 != 0) {
        let x1 = Math.floor(Math.random() * 10);
        let y1 = Math.floor(Math.random() * (10 - ship.length));
        for (let i = 0; i < ship.length; i++) {
          array.push([x1, y1 + i]);
        }
      }
      // vertical
      else {
        let x1 = Math.floor(Math.random() * (10 - ship.length));
        let y1 = Math.floor(Math.random() * 10);
        for (let i = 0; i < ship.length; i++) {
          array.push([x1 + i, y1]);
        }
      }

      // make sure the coordinates are not repeated.
      for (let i = 0; i < this.coordinates.length; i++) {
        for (let j = 0; j < this.coordinates[i].length; j++) {
          let newArray = this.coordinates[i];
          for (let k = 0; k < array.length; k++) {
            if (
              newArray[j][0] == array[k][0] &&
              newArray[j][1] == array[k][1]
            ) {
              return getCoordinatesOfShip(ship, shipNo);
            }
          }
        }
      }

      // make sure ship is not placed adjacent to other ship
      for (let i = 0; i < this.adjacentCoordinates.length; i++) {
        for (let j = 0; j < array.length; j++) {
          if (
            array[j][0] == this.adjacentCoordinates[i][0] &&
            array[j][1] == this.adjacentCoordinates[i][1]
          ) {
            return getCoordinatesOfShip(ship, shipNo);
          }
        }
      }

      // update adjacent coordinates of ships
      for (let i = 0; i < array.length; i++) {
        let x1 = array[i][0];
        let y1 = array[i][1];
        this.adjacentCoordinates.push([x1 - 1, y1]);
        this.adjacentCoordinates.push([x1, y1 - 1]);
        this.adjacentCoordinates.push([x1 + 1, y1]);
        this.adjacentCoordinates.push([x1, y1 + 1]);
        this.adjacentCoordinates.push([x1 - 1, y1 - 1]);
        this.adjacentCoordinates.push([x1 - 1, y1 + 1]);
        this.adjacentCoordinates.push([x1 + 1, y1 - 1]);
        this.adjacentCoordinates.push([x1 + 1, y1 + 1]);
      }

      return array;
    };

    for (let i = 0; i < this.ships.length; i++) {
      this.ships[i].coordinates = getCoordinatesOfShip(this.ships[i], i + 1);
      this.coordinates.push(this.ships[i].coordinates);
    }

    this.shipsSunkArray = [false, false, false, false, false, false];
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
