import * as fs from "fs";
import { Coordinates } from "../../src/domain/coordinates";
import { ApplicationError } from "../../src/domain/errors/application-error";
import { InvalidInputError } from "../../src/domain/errors/invalid-input-error";
import { Plateau } from "../../src/domain/plateau";
import { Rover } from "../../src/domain/rover";
import { Direction } from "../../src/domain/enums/enums";

export class InputParser {
  constructor(private readonly filepath: string) {}

  public run(): string[] {
    const content = this.readFile();
    const lines = this.parseLines(content);

    const plateau = this.createPlateau(lines[0]);
    const outputs: string[] = [];

    for (let i = 1; i < lines.length; i += 2) {
      const posLine = lines[i];
      const cmdLine = lines[i + 1];

      const rover = this.createRover(posLine, plateau);
      rover.executeCommands(cmdLine);

      const position = rover.getPosition();
      outputs.push(
        `${position.coordinates.x} ${position.coordinates.y} ${position.direction}`
      );
    }

    return outputs;
  }

  private readFile(): string {
    try {
      const content = fs.readFileSync(this.filepath, "utf-8").trim();
      if (!content) throw new InvalidInputError("Input file is empty");
      return content;
    } catch (error) {
      if (error instanceof InvalidInputError) {
        throw error;
      }
      throw new ApplicationError("Failed to read input file");
    }
  }

  private parseLines(content: string): string[] {
    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  private createPlateau(plateauLine: string): Plateau {
    const [maxX, maxY] = plateauLine.split(" ").map(Number);
    if (!Number.isInteger(maxX) || !Number.isInteger(maxY)) {
      throw new InvalidInputError(
        'Plateau line must contain two integers, e.g., "5 5"'
      );
    }
    return new Plateau(maxX, maxY);
  }

  private createRover(posLine: string, plateau: Plateau): Rover {
    const parts = posLine.split(" ");

    if (parts.length !== 3) {
      throw new InvalidInputError(
        `Invalid rover position format: '${posLine}'`
      );
    }

    const [xStr, yStr, dirStr] = parts;
    const x = Number(xStr);
    const y = Number(yStr);

    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new InvalidInputError(`Invalid rover coordinates: '${posLine}'`);
    }

    const direction = dirStr.toUpperCase() as Direction;

    if (!Object.values(Direction).includes(direction)) {
      throw new InvalidInputError(`Invalid rover direction: '${direction}'`);
    }

    const rover = new Rover(
      { coordinates: new Coordinates(x, y), direction: direction },
      plateau
    );

    if (!plateau.isWithin(rover.getPosition().coordinates)) {
      throw new InvalidInputError(
        `Rover starting position is out of bounds: ${x}, ${y}`
      );
    }

    return rover;
  }
}
