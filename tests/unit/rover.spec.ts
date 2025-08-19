import { Rover } from "../../src/domain/rover";
import { Plateau } from "../../src/domain/plateau";
import { Coordinates } from "../../src/domain/coordinates";
import { Command, Direction } from "../../src/domain/enums/enums";

describe("Rover", () => {
  let plateau: Plateau;
  let rover: Rover;

  beforeEach(() => {
    plateau = new Plateau(5, 5);
    rover = new Rover(
      { coordinates: new Coordinates(1, 2), direction: Direction.N },
      plateau
    );
  });

  it("should move forward correctly", () => {
    rover.executeCommands("M");
    const position = rover.getPosition();
    expect(position.coordinates.x).toBe(1);
    expect(position.coordinates.y).toBe(3);
  });

  it("should turn left correctly", () => {
    rover.executeCommands("L");
    const position = rover.getPosition();
    expect(position.direction).toBe(Direction.W);
  });

  it("should turn right correctly", () => {
    rover.executeCommands("R");
    const position = rover.getPosition();
    expect(position.direction).toBe(Direction.E);
  });

  it("should not move out of bounds", () => {
    rover = new Rover(
      { coordinates: new Coordinates(0, 0), direction: Direction.S },
      plateau
    );
    expect(() => rover.executeCommands("M")).toThrow(
      "Out of bounds: 0, -1"
    );
  });

  it("should throw an error for an invalid command", () => {
    expect(() => rover.executeCommands("X")).toThrow("Invalid command: X");
  });

  it("should throw an error for an unknown direction", () => {
    const invalidRover = new Rover(
      { coordinates: new Coordinates(0, 0), direction: "Z" as Direction },
      plateau
    );

    expect(() => invalidRover.executeCommands("M")).toThrow(
      "Unknown direction: Z"
    );
  });
});
