const program = require("commander");

class argvOptions {
    constructor() {
        const shift = new program.Option("-s, --shift <shift>", "a shift");
        shift.required = true;

        const input = new program.Option(
            "-i, --input <input>",
            "an input file"
        );

        const output = new program.Option(
            "-o, --output <output>",
            "an output file"
        );

        const action = new program.Option(
            "-a, --action <action>",
            "an action encode/decode"
        );
        action.choices(["encode", "decode"]);
        action.required = true;

        program
            .addOption(shift)
            .addOption(input)
            .addOption(output)
            .addOption(action);
    }

    /**
     * Функция получения аргументов переданных через консоль
     * @param {string[]} argv
     */
    getArgvOptions(argv) {
        program.parse(argv);

        return program.opts();
    }
}

module.exports = new argvOptions();
