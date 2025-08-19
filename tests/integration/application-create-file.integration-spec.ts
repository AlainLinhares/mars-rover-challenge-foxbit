import * as fs from "fs";
import { Application } from "../../src/app/application";

describe("Ensure Input File Exists (Integration)", () => {
  const inputPath = "src/test-input.txt";

  beforeAll(() => {
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }
  });

  it("should create a file if it does not exist with default content", () => {
    Application.ensureInputFileExists(inputPath);

    const fileContent = fs.readFileSync(inputPath, "utf-8").trim();
    expect(fileContent).toBe(`5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`);
  });

  afterAll(() => {
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }
  });
});
