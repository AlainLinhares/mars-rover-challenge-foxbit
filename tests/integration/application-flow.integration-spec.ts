import * as fs from "fs";
import { Application } from "../../src/app/application";

describe("Application Flow (Integration)", () => {
  const inputPath = "src/test-input.txt";

  beforeAll(() => {
    const inputContent = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

    fs.writeFileSync(inputPath, inputContent);
  });

  it("should process input file and execute rover commands correctly", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    Application.execute(inputPath);

    expect(logSpy).toHaveBeenCalledWith("1 3 N");
    expect(logSpy).toHaveBeenCalledWith("5 1 E");

    logSpy.mockRestore();
  });

  afterAll(() => {
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }
  });
});
