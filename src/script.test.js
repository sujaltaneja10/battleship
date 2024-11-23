/* eslint-disable no-undef */
import { gb1 } from "./gameboard";

test("check length", () => {
  expect(ship1.length).toBe(4);
});

test("check if ship has sunk or not", () => {
  expect(ship1.hasSunk).toBeFalsy();
});

test("checking hit function", () => {
  expect(ship1.hit(true)).toBe(1);
});

test.only("check already hit function (1)", () => {
  expect(gb1.receiveAttack(0, 1)).toBe("ok");
});
