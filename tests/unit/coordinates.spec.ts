import { Coordinates } from "../../src/domain/coordinates";

describe("Coordinates", () => {
  it("should throw an error if coordinates are not integers", () => {
    expect(() => new Coordinates(1.5, 2)).toThrow(
      "Coordinates must be integers"
    );
    expect(() => new Coordinates(1, "A" as any)).toThrow(
      "Coordinates must be integers"
    );
  });

  it("should create valid coordinates", () => {
    const coord = new Coordinates(1, 2);
    expect(coord).toBeInstanceOf(Coordinates);
    expect(coord.x).toBe(1);
    expect(coord.y).toBe(2);
  });

  it("should calculate north movement correctly", () => {
    const coord = new Coordinates(1, 2);
    const newCoord = coord.north();
    expect(newCoord.x).toBe(1);
    expect(newCoord.y).toBe(3);
  });

  it("should calculate south movement correctly", () => {
    const coord = new Coordinates(1, 2);
    const newCoord = coord.south();
    expect(newCoord.x).toBe(1);
    expect(newCoord.y).toBe(1);
  });

  it("should calculate east movement correctly", () => {
    const coord = new Coordinates(1, 2);
    const newCoord = coord.east();
    expect(newCoord.x).toBe(2);
    expect(newCoord.y).toBe(2);
  });

  it("should calculate west movement correctly", () => {
    const coord = new Coordinates(1, 2);
    const newCoord = coord.west();
    expect(newCoord.x).toBe(0);
    expect(newCoord.y).toBe(2);
  });
});
