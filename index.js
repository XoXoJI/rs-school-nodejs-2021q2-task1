const argv = require("./argv");
const fs = require("fs");
const { pipeline, Transform } = require("stream");
const encode = require("./encode");

const options = argv.getArgvOptions(process.argv);
const shift = options.isEncode ? options.shift : -options.shift;

const readStream = options.input
    ? fs.createReadStream(options.input)
    : process.stdin;

const writeStream = options.output
    ? fs.createWriteStream(options.output, { flags: 'a' })
    : process.stdout;

const encodeStream = new Transform({
    transform(chunk, encoding, callback) {
        const data = encode(chunk.toString(), shift);

        callback(null, data);
    },
});

pipeline(
    readStream,
    encodeStream,
    writeStream,
    (err) => {
        if (err) {
            console.error("Pipeline failed.", err);
        }
    }
);
