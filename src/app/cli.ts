import { Application } from "./application";
import * as path from "path";

function parseArgs(argv: string[]): { input?: string } {
  const result: { input?: string } = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if ((a === "--input" || a === "-i") && argv[i + 1]) {
      result.input = argv[i + 1];
      i++;
    }
  }
  return result;
}

const args = parseArgs(process.argv.slice(2));
const inputPath = args.input ?? path.join("src/sample", "input.txt");

try {
  Application.ensureInputFileExists(inputPath);
  Application.execute(inputPath);
} catch (error) {
  if (error instanceof Error) {
    if (error.name === "InvalidInputError") {
      console.error(`Input Error: ${error.message}`);
    } else if (error.name === "ApplicationError") {
      console.error(`Application Error: ${error.message}`);
    } else {
      console.error("Unexpected error:", error.message);
    }
  } else {
    console.error("Unknown error:", error);
  }
}
