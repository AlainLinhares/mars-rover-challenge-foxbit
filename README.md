
# Mars Rover — Node.js + TypeScript (Senior)

Solution for the **Mars Rover** challenge focusing on **code quality**, **SOLID principles**, **automated tests**, and **execution via file**.

## ✅ Features

-   Clean Architecture in layers (domain / services / io / app).
    
-   **Value Object**: `Coordinates`.
    
-   **Custom errors**: `OutOfBoundsError`, `InvalidCommandError`, `InvalidInputError`.
    
-   **No runtime dependencies** (only dev dependencies for build/test).
    
-   **Unit and integration tests** (Jest + ts-jest).
    
-   **Execution via CLI** with `--input` pointing to the input file.
    
-   **Dockerfile** and **docker-compose**.
    

## 📦 Requirements

-   Node.js 18+ (tested on Node 20)
    
-   npm
    

> Alternative: use Docker (no need to install Node).

## ▶️ How to run

```bash
npm install
npm start
# By default, the command uses src/input.txt (which contains the sample input).

# To use another file:
npm run start:file -- --input path/to/file.txt
# or
node --loader ts-node/esm src/cli.ts --input path/to/file.txt

```

## 🧪 Tests

```bash
npm test:unit #npm test:unit: Runs unit tests to check individual components.
npm test:integration #Runs integration tests to check component interactions.

```

## 🧰 Structure

```text
src/
  app/application.ts         # orchestrates execution
  cli.ts                     # CLI: parses args and calls Application
  io/input-parser.ts         # reads/validates input file
  input.txt                  # Contains plateau dimensions and rover initial positions with movement commands for simulation.
  domain/
    enums/
      enums.ts                # Direction: Enum for cardinal directions (N, E, S, W).
                              # Command: Enum for rover commands (L, R, M).
    errors/
      application-error.ts    #Generic application error
      invalid-input-error.ts  #Invalid user input error
    coordinates.ts           # Represents immutable x, y coordinates with movement methods (north, south, east, west).
    plateau.ts               # Represents the plateau boundaries and checks if coordinates are within the limits.
    rover.ts                 # Represents a rover on the plateau, handling movement and command execution while ensuring it stays within boundaries.
tests/
  integration/               # integration tests
  *.spec.ts                  # unit tests
  jest-integration.json      # Specifies module file extensions, test environment, test matching pattern, timeout, and TypeScript transformation settings.

```

## 🧠 Design Decisions

-   Local immutability: Coordinates returns new instances when moving, simplifying reasoning.
    
-   Fail-fast: explicit input and bounds validation with specific errors.
    
-   Low coupling: CommandProcessor depends only on Rover (does not read the file).
    
-   Isolated I/O: file reading is done in InputParser, keeping the domain clean.
    
-   Extensibility: easy to add new commands (e.g., B for "back") without altering the file reading logic.
    

## 🐳 Docker

Build & run:

```bash
docker build -t mars-rover-challange-foxbit-challenge-foxbit .
docker run --rm mars-rover-challange-foxbit-challenge-foxbit

```

Compose:

```bash
docker-compose up --build

```

## 📄 Input File Format

1st line: coordinates of the top-right corner of the plateau (x y), with the bottom-left corner being 0 0.

Following lines, in pairs, for each rover:

-   Initial position line: x y D (D in {N, E, S, W})
    
-   Commands line: sequence of L, R, M
    

**Example**

```text
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM

```

**Output**

```text
1 3 N
5 1 E

```

## 🔍 Code Quality

-   Strict typing, no `any`.
    
-   Tests covering happy cases and errors.
    
-   Code aligned with SRP and SOLID principles.
    

## 📝 Why Execution via File?

The decision to execute the program via a file input was made to align with real-world scenarios where automation and batch processing are essential. By using a file-based input:

-   **Scalability**: The application can process multiple rovers and commands efficiently.
    
-   **Decoupling I/O from logic**: Input parsing and file handling are isolated, keeping the domain logic (such as movement and boundary checks) focused and testable.
    
-   **Extensibility**: Future input formats or additional commands can be added without significant changes to the core application.
    
-   **Consistency**: File input simplifies testing scenarios, as you can easily swap out test input data without modifying code. This makes both development and testing more straightforward.
    

By keeping the file-based approach, the program mimics a more flexible and real-world-ready solution, where file-based inputs are common in various automation tasks.