const ENGLISH_ALFABET_LENGTH = 26;

/**
 * Функция шиврования кодом Цезаря
 * @param {string} str
 * @param {number} shift
 * @returns {string}
 */
function encode(str, shift) {
    shift = shift % ENGLISH_ALFABET_LENGTH;

    const newStr = str.split('').map((char) => {
        const smallAlfa = /[a-z]/;
        const bigAlfa = /[A-Z]/;

        const smallAlfaRange = [97, 122];
        const bigAlfaRange = [65, 90];

        let newAlfaIndex = char.charCodeAt(0);

        if (smallAlfa.test(char)) {
            newAlfaIndex += shift;
            newAlfaIndex = getValidIndex(newAlfaIndex, smallAlfaRange);
        }

        if (bigAlfa.test(char)) {
            newAlfaIndex += shift;
            newAlfaIndex = getValidIndex(newAlfaIndex, bigAlfaRange);
        }

        return String.fromCharCode(newAlfaIndex);
    }).join('');

    return newStr;
}

/**
 * Приводит индекс символа к указанному диапазону
 * @param {number} index
 * @param {number[]} range - массив состоящий из начального и конечного допустимого значения индекса
 * @returns {number}
 */
function getValidIndex(index, range) {
    if (index > range[1]) {
        index -= ENGLISH_ALFABET_LENGTH;
    }

    if (index < range[0]) {
        index += ENGLISH_ALFABET_LENGTH;
    }

    return index;
}

module.exports = encode;
