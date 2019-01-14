const program = require("commander");
const fs = require("fs");
const Papa = require("papaparse");
var transformer = require("through2-map");

const pathRequired = ["outputFile", "convertFromFile", "convertToFile"];
let reader;

const utils = {
  reverse() {
    process.stdin.on("readable", () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        process.stdout.write(
          String(chunk)
            .split("")
            .reverse()
            .join("")
        );
      }
    });
  },
  transform(str) {
    process.stdin.on("readable", () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        process.stdout.write(String(chunk).toUpperCase());
      }
    });
  },

  outputFile() {
    reader.pipe(process.stdout);
  },

  convertFromFile() {
    reader
      .pipe(
        transformer({ wantStrings: true }, chunk =>
          JSON.stringify(Papa.parse(chunk).data)
        )
      )
      .pipe(process.stdout);
  },

  convertToFile() {
    const writer = fs.createWriteStream(reader.path.replace(".csv", ".json"));
    reader
      .pipe(
        transformer({ wantStrings: true }, chunk =>
          JSON.stringify(Papa.parse(chunk).data)
        )
      )
      .pipe(writer);
  },

  cssBuilder(path) {
    if (!fs.existsSync(path)) throw new Error("No directory");
    const initialCss = fs
      .readdirSync(path)
      .map(file => fs.readFileSync(path + file, "utf8"));
    const importantFile = fs.readFileSync("../data/importantCss.css", "utf8");
    const output = initialCss.join("\n") + "\n" + importantFile;
    fs.writeFileSync("../data/bundle.css", output);
  }
};

program
  .option(
    "-a, --action [action]",
    "Select one of this: " + Object.keys(utils).join(", ")
  )
  .option("-f, --file [file]", "File path")
  .option("-p, --path [path]", "Directory path")
  .parse(process.argv);

if (!program.action) throw new Error("Action should be defined");

if (pathRequired.includes(program.action)) {
  if (!program.file) {
    throw new Error("File path should be defined");
  }
  reader = fs.createReadStream(program.file);
  reader.on("error", err => {
    throw new Error(err);
  });
  utils[program.action](program.file);
} else if (program.path) {
  if (!program.path) {
    throw new Error("Directory path should be defined");
  }
  utils[program.action](program.path);
} else {
  utils[program.action]();
}
