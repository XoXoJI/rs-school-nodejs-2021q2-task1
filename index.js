const argv = require("./argv");
const fs = require("fs");
const { pipeline } = require("stream");

const options = argv.getArgvOptions(process.argv);

pipeline(
    fs.createReadStream(options.input),
    fs.createWriteStream(options.output),
    (err) => {
        if (err) {
            console.error("Pipeline failed.", err);
        }
    }
);

console.log(options);
