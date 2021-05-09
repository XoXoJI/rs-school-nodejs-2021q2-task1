const argv = require("./argv");
const fs = require("fs");
const { pipeline, Transform } = require("stream");
const encode = require("./encode");

const options = argv.getArgvOptions(process.argv);
const shift = options.isEncode ? options.shift : -options.shift;

const encodeTransformStream = new Transform({
    transform(chunk, encoding, callback) {
        const data = encode(chunk.toString(), shift);

        callback(null, data);
    },
});

pipeline(
    fs.createReadStream(options.input),
    encodeTransformStream,
    fs.createWriteStream(
        options.output,
        {
            flags: 'a'
        }
    ),
    (err) => {
        if (err) {
            console.error("Pipeline failed.", err);
        }
    }
);

console.log(options);
