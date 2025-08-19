import { Coordinates } from "./coordinates";

export class Plateau {
  constructor(private readonly maxX: number, private readonly maxY: number) {}

  public isWithin(coordinates: Coordinates): boolean {
    return (
      coordinates.x >= 0 &&
      coordinates.x <= this.maxX &&
      coordinates.y >= 0 &&
      coordinates.y <= this.maxY
    );
  }
}
