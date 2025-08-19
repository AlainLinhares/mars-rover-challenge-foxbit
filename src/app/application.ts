import * as fs from "fs";
import * as path from "path";
import { InputParser } from "../../src/io/input-parser";

export class Application {
  public static execute(inputPath: string): void {
    const parser = new InputParser(inputPath);
    const outputs = parser.run();
    console.log("Expected Output :");
    outputs.forEach((line) => console.log(line));
  }

  public static ensureInputFileExists(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const defaultContent = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

      fs.writeFileSync(filePath, defaultContent);
      console.log(`File '${filePath}' created with default content.`);
    }
  }
}
