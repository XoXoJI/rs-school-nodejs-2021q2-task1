const argv = require("./argv");


const options = argv.getArgvOptions(process.argv.splice(2));

console.log(options);
