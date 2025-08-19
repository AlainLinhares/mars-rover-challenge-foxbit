import { Plateau } from "../src/domain/plateau";
import { Coordinates } from "../src/domain/coordinates";

describe("Plateau", () => {
  it("should return true if coordinates are within the plateau", () => {
    const plateau = new Plateau(5, 5);
    const coord = new Coordinates(3, 3);
    expect(plateau.isWithin(coord)).toBe(true);
  });

  it("should return false if coordinates are out of the plateau", () => {
    const plateau = new Plateau(5, 5);
    const coord = new Coordinates(6, 6);
    expect(plateau.isWithin(coord)).toBe(false);
  });
});
