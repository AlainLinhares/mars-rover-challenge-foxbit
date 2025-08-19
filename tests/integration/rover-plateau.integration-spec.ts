import { Rover } from "../../src/domain/rover";
import { Plateau } from "../../src/domain/plateau";
import { Coordinates } from "../../src/domain/coordinates";
import { Direction } from "../../src/domain/enums/enums";

describe("Rover and Plateau (Integration)", () => {
  it("should throw an error if the rover tries to move out of bounds", () => {
    const plateau = new Plateau(5, 5);
    const rover = new Rover(
      { coordinates: new Coordinates(5, 5), direction: Direction.N },
      plateau
    );

    expect(() => rover.executeCommands("M")).toThrow("Out of bounds: 5, 6");
  });

  it("should allow rover to move within bounds", () => {
    const plateau = new Plateau(5, 5);
    const rover = new Rover(
      { coordinates: new Coordinates(1, 1), direction: Direction.N },
      plateau
    );

    rover.executeCommands("M");
    const position = rover.getPosition();
    expect(position.coordinates.x).toBe(1);
    expect(position.coordinates.y).toBe(2);
  });
});
