import { Plateau } from "./plateau";
import { Coordinates } from "./coordinates";
import { Command, Direction } from "./enums/enums";
import { InvalidInputError } from "./errors/invalid-input-error";

interface Position {
  coordinates: Coordinates;
  direction: Direction;
}

export class Rover {
  private position: Position;

  constructor(initialPosition: Position, private readonly plateau: Plateau) {
    this.position = initialPosition;
  }

  public getPosition(): Position {
    return this.position;
  }

  public executeCommands(commands: string): void {
    commands
      .trim()
      .split("")
      .forEach((cmd) => this.executeCommand(cmd as Command));
  }

  private executeCommand(cmd: Command): void {
    switch (cmd) {
      case Command.L:
        this.turnLeft();
        break;
      case Command.R:
        this.turnRight();
        break;
      case Command.M:
        this.moveForward();
        break;
      default:
        throw new Error(`Invalid command: ${cmd}`);
    }
  }

  private turnLeft(): void {
    const next: Record<Direction, Direction> = {
      [Direction.N]: Direction.W,
      [Direction.W]: Direction.S,
      [Direction.S]: Direction.E,
      [Direction.E]: Direction.N,
    };
    this.position.direction = next[this.position.direction];
  }

  private turnRight(): void {
    const next: Record<Direction, Direction> = {
      [Direction.N]: Direction.E,
      [Direction.E]: Direction.S,
      [Direction.S]: Direction.W,
      [Direction.W]: Direction.N,
    };
    this.position.direction = next[this.position.direction];
  }

  private moveForward(): void {
    let nextCoords: Coordinates;

    switch (this.position.direction) {
      case Direction.N:
        nextCoords = this.position.coordinates.north();
        break;
      case Direction.S:
        nextCoords = this.position.coordinates.south();
        break;
      case Direction.E:
        nextCoords = this.position.coordinates.east();
        break;
      case Direction.W:
        nextCoords = this.position.coordinates.west();
        break;
      default:
        throw new Error(`Unknown direction: ${this.position.direction}`);
    }

    if (this.plateau.isWithin(nextCoords)) {
      this.position.coordinates = nextCoords;
    } else {
      throw new Error(`Out of bounds: ${nextCoords.x}, ${nextCoords.y}`);
    }
  }
}
