const program = require("commander");

program
  .option("-s, --shift <shift>")
  .option("-i, --input <input>")
  .option("-o, --output <output>")
  .option("-a, --action <action>");


program.parse(process.argv);

const options = program.opts();

console.log(options);
