function isWhiteSpace(ch: string) {
    return ch === "u009" || ch === " " || ch === "u00A0";
}

function isLetter(ch: string) {
    return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
}

function isDecimalDigit(ch: string) {
    return ch >= "0" && ch <= "9";
}

function createToken(type: string, value: string) {
    return {
        type,
        value,
    };
}

// it doesn't return index
function getNextChar(index: number, length: number) {
    let ch = "x00";
    let idx = index;
    if (idx < length) {
        ch = expression.charAt(idx);
        index += 1;
    }
    return ch;
}

function peekNextChar(index: number, length: number) {
    let idx = index;
    return idx < length ? expression.charAt(idx) : "x00";
}

function skipSpaces(index: number, length: number) {
    let ch;

    while (index < length) {
        ch = peekNextChar(index, length);
        if (!isWhiteSpace(ch)) {
            break;
        }
        getNextChar(index, length);
    }
}

function scanOperator(index: number, length: number) {
    let ch = peekNextChar(index, length);
    if ("+-*/()=".indexOf(ch) >= 0) {
        return createToken("Operator", getNextChar(index, length));
    }
    return undefined;
}

function isIdentifiesStart(ch: string) {
    return ch === "_" || isLetter(ch);
}

function isIdentifierPart(ch: string) {
    return isIdentifiesStart(ch) || isDecimalDigit(ch);
}

function scanIdentifier(index: number, length: number) {
    let ch, id;

    ch = peekNextChar(index, length);
    if (!isIdentifiesStart(ch)) {
        return undefined;
    }

    id = getNextChar(index, length);
    while (true) {
        ch = peekNextChar(index, length);
        if (!isIdentifiesStart(ch)) {
            break;
        }
        id += getNextChar(index, length);
    }

    return createToken("Identifier", id);
}

function scanNumber(index: number, length: number) {
    let ch = peekNextChar(index, length);
    if (!isDecimalDigit(ch) && ch !== ".") {
        return undefined;
    }

    let number = "";
    if (ch !== ".") {
        number = getNextChar(index, length);
        while (true) {
            ch = peekNextChar(index, length);
            if (!isDecimalDigit(ch)) {
                break;
            }
            number += getNextChar(index, length);
        }
    }
    if (ch === ".") {
        number = getNextChar(index, length);
        while (true) {
            ch = peekNextChar(index, length);
            if (!isDecimalDigit(ch)) {
                break;
            }
            number += getNextChar(index, length);
        }
    }
    if (ch === "e" || ch === "e") {
        number += getNextChar(index, length);
        ch = peekNextChar(index, length);
        if (ch === "+" || ch === "-") {
            number += getNextChar(index, length);
            while (true) {
                ch = peekNextChar(index, length);
                if (!isDecimalDigit(ch)) {
                    break;
                }
                number += getNextChar(index, length);
            }
        } else {
            throw new SyntaxError("Unexpected character after exponent sign");
        }
    }
    return createToken("Number", number);
}

function next(index: number, length: number) {
    let token;

    skipSpaces(index, length);
    if (index >= length) {
        return undefined;
    }

    token = scanNumber(index, length);
    if (typeof token !== "undefined") {
        return token;
    }

    token = scanOperator(index, length);
    if (typeof token !== "undefined") {
        return token;
    }

    token = scanIdentifier(index, length);
    if (typeof token !== "undefined") {
        return token;
    }

    throw new SyntaxError("Unknown token from character " + peekNextChar(index, length));
}
