export class Coordinates {
  constructor(public readonly x: number, public readonly y: number) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error(`Coordinates must be integers. Received: (${x}, ${y})`);
    }
  }

  public north(): Coordinates {
    return new Coordinates(this.x, this.y + 1);
  }

  public south(): Coordinates {
    return new Coordinates(this.x, this.y - 1);
  }

  public east(): Coordinates {
    return new Coordinates(this.x + 1, this.y);
  }

  public west(): Coordinates {
    return new Coordinates(this.x - 1, this.y);
  }
}
