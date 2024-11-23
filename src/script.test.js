/* eslint-disable no-undef */
import { ship1, gb1 } from "./script";

test("check length", () => {
  expect(ship1.length).toBe(4);
});

test("check if ship has sunk or not", () => {
  expect(ship1.hasSunk).toBeFalsy();
});

test("checking hit function", () => {
  expect(ship1.hit(true)).toBe(1);
});

test("check already hit function (1)", () => {
  expect(gb1.checkAlreadyHit(0, 0)).toBeFalsy();
});
