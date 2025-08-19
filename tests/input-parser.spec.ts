import * as fs from "fs";
import { InputParser } from "../src/io/input-parser";
import { ApplicationError } from "../src/domain/errors/application-error";
import { InvalidInputError } from "../src/domain/errors/invalid-input-error";

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
}));

describe("InputParser", () => {
  const validContent = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  it("should parse valid input file correctly", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(validContent);

    const parser = new InputParser("valid-path.txt");
    const outputs = parser.run();

    expect(outputs.length).toBe(2);
    expect(outputs[0]).toBe("1 3 N");
    expect(outputs[1]).toBe("5 1 E");
  });

  it("should throw error when file is empty", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("");

    const parser = new InputParser("empty.txt");
    expect(() => parser.run()).toThrow(InvalidInputError);
  });

  it("should throw error on invalid input", () => {
    const invalidContent = `5 5
    1 2 A
    LMLMLMLMM`;

    (fs.readFileSync as jest.Mock).mockReturnValue(invalidContent);

    const parser = new InputParser("invalid.txt");
    expect(() => parser.run()).toThrow(InvalidInputError);
  });

  it("should handle application error correctly", () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("File read failed");
    });

    const parser = new InputParser("invalid-path.txt");
    expect(() => parser.run()).toThrow(ApplicationError);
  });

  it("should throw error when plateau line is invalid (not two integers)", () => {
    const invalidPlateauContent = `5
1 2 N
LMLMLMLMM`;

    (fs.readFileSync as jest.Mock).mockReturnValue(invalidPlateauContent);

    const parser = new InputParser("invalid-plateau.txt");
    expect(() => parser.run()).toThrow(InvalidInputError);
    expect(() => parser.run()).toThrow(
      "Plateau line must contain two integers"
    );
  });

  it("should throw error when rover coordinates are invalid", () => {
    const invalidRoverCoordinatesContent = `5 5
    1 A N
    LMLMLMLMM`;

    (fs.readFileSync as jest.Mock).mockReturnValue(
      invalidRoverCoordinatesContent
    );

    const parser = new InputParser("invalid-rover-coordinates.txt");
    expect(() => parser.run()).toThrow(InvalidInputError);
    expect(() => parser.run()).toThrow("Invalid rover coordinates: '1 A N'");
  });

  it("should throw error when rover position format is invalid", () => {
    const invalidPositionContent = `5 5
  1 2
  LMLMLMLMM`;
  
    (fs.readFileSync as jest.Mock).mockReturnValue(invalidPositionContent);
  
    const parser = new InputParser("invalid-position-format.txt");
    expect(() => parser.run()).toThrow(InvalidInputError);
    expect(() => parser.run()).toThrow("Invalid rover position format: '1 2'");
  });

  it("should throw an error when the rover's starting position is out of bounds", () => {
    const plateauContent = `5 5
    6 6 N
    LMLMLMLMM`;
  
    (fs.readFileSync as jest.Mock).mockReturnValue(plateauContent);
  
    const parser = new InputParser("out-of-bounds.txt");
  
    expect(() => parser.run()).toThrow(InvalidInputError);
    expect(() => parser.run()).toThrow("Rover starting position is out of bounds: 6, 6");
  });
});