/* eslint-disable no-undef */
import { gb1 } from "./gameboard";

test.skip("check length", () => {
  expect(ship1.length).toBe(4);
});

test.skip("check if ship has sunk or not", () => {
  expect(ship1.hasSunk).toBeFalsy();
});

test.skip("checking hit function", () => {
  expect(ship1.hit(true)).toBe(1);
});

test.skip("check already hit function (1)", () => {
  expect(gb1.receiveAttack(0, 1)).toBe("ok");
});
