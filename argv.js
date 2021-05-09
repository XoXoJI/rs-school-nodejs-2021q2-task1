const program = require("commander");
const path = require("path");
const fs = require("fs");

/**
 * @typedef {Object} Options
 * @property {number} shift - сдвиг
 * @property {string | null} input - путь до файла с исходных тесктом
 * @property {string | null} output - путь к файлу с результатом
 * @property {boolean} isEncode - кодируем, или декодируем
 */

class argvOptions {
    constructor() {
        /**
         * @type {Object<string, program.OptionValues>}
         */
        this._options = {};

        // синглтон
        if (this._instance) {
            return this._instance;
        }

        this._instance = this;

        const shift = new program.Option("-s, --shift <shift>", "a shift");
        shift.makeOptionMandatory();

        const input = new program.Option(
            "-i, --input [input]",
            "an input file"
        );

        const output = new program.Option(
            "-o, --output [output]",
            "an output file"
        );

        const action = new program.Option(
            "-a, --action <action>",
            "an action encode/decode"
        );
        action.choices(["encode", "decode"]);
        action.makeOptionMandatory();

        program
            .addOption(shift)
            .addOption(input)
            .addOption(output)
            .addOption(action);
    }

    /**
     * Функция получения аргументов переданных через консоль
     * @param {string[]} argv
     * @returns {Options}
     */
    getArgvOptions(argv) {
        // Кешируем
        if (this._options[argv.join()]) {
            return this._options[argv.join()];
        }

        program.parse(argv);

        const opts = program.opts();

        const options = this._parseOptions(opts);

        if (options.input) this._checkAccesInputFile(options.input);
        if (options.output) this._checkAccesOutputFile(options.output);

        this._options[argv.join()] = options;

        return this._options[argv.join()];
    }

    /**
     * Функция валидации полученных аргументов
     * @param {program.OptionValues} opts
     * @returns {Options}
     */
    _parseOptions(opts) {
        /**
         * @type {Options}
         */
        const options = {
            shift: +opts.shift,
            input: opts.input,
            output: opts.output,
            isEncode: opts.action === 'encode'
        };

        this._parseInputOutputOptions(options);

        return options;
    }

    /**
     * Функция валидации аргументов путей к файлам
     * @param {program.OptionValues} options
     */
    _parseInputOutputOptions(options) {
        if (options.input) {
            options.input = path.resolve(__dirname, options.input);
        }

        if (options.output) {
            options.output = path.resolve(__dirname, options.output);
        }
    }

    /**
     * Проверка прав доступа на чтение файла
     * @param {string} path
     */
    _checkAccesInputFile(path) {
        try {
            fs.accessSync(path, fs.constants.R_OK);
        } catch (err) {
            console.error(`no access to read ${path}!`);
            process.exit(8);
        }
    }

    /**
     * Проверка прав доступа на запись в файл
     * @param {string} path
     */
    _checkAccesOutputFile(path) {
        try {
            fs.accessSync(path, fs.constants.W_OK);
        } catch (err) {
            console.error(`no access to write ${path}!`);
            process.exit(8);
        }
    }
}

module.exports = new argvOptions();
