export class Lexer {
    index = 0;
    length;
    expression;
    constructor(text: string) {
        this.expression = text;
        this.length = this.expression.length;
    }
    isWhiteSpace(ch: string) {
        return ch === "u009" || ch === " " || ch === "u00A0";
    }

    isLetter(ch: string) {
        return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
    }

    isDecimalDigit(ch: string) {
        return ch >= "0" && ch <= "9";
    }

    createToken(type: string, value: string) {
        return {
            type,
            value,
        };
    }

    getNextChar() {
        let ch = "x00";
        let idx = this.index;
        if (idx < this.length) {
            ch = this.expression.charAt(idx);
            this.index += 1;
        }
        return ch;
    }

    peekNextChar() {
        let idx = this.index;
        return idx < this.length ? this.expression.charAt(idx) : "x00";
    }

    skipSpaces() {
        let ch;

        while (this.index < this.length) {
            ch = this.peekNextChar();
            if (!this.isWhiteSpace(ch)) {
                break;
            }
            this.getNextChar();
        }
    }

    scanOperator() {
        let ch = this.peekNextChar();
        if ("+-*/()=".indexOf(ch) >= 0) {
            return this.createToken("Operator", this.getNextChar());
        }
        return undefined;
    }

    isIdentifiesStart(ch: string) {
        return ch === "_" || this.isLetter(ch);
    }

    isIdentifierPart(ch: string) {
        return this.isIdentifiesStart(ch) || this.isDecimalDigit(ch);
    }

    scanIdentifier() {
        let ch, id;

        ch = this.peekNextChar();
        if (!this.isIdentifiesStart(ch)) {
            return undefined;
        }

        id = this.getNextChar();
        while (true) {
            ch = this.peekNextChar();
            if (!this.isIdentifiesStart(ch)) {
                break;
            }
            id += this.getNextChar();
        }

        return this.createToken("Identifier", id);
    }

    scanNumber() {
        let ch = this.peekNextChar();
        if (!this.isDecimalDigit(ch) && ch !== ".") {
            return undefined;
        }

        let number = "";
        if (ch !== ".") {
            number = this.getNextChar();
            while (true) {
                ch = this.peekNextChar();
                if (!this.isDecimalDigit(ch)) {
                    break;
                }
                number += this.getNextChar();
            }
        }
        if (ch === ".") {
            number = this.getNextChar();
            while (true) {
                ch = this.peekNextChar();
                if (!this.isDecimalDigit(ch)) {
                    break;
                }
                number += this.getNextChar();
            }
        }
        if (ch === "e" || ch === "e") {
            number += this.getNextChar();
            ch = this.peekNextChar();
            if (ch === "+" || ch === "-") {
                number += this.getNextChar();
                while (true) {
                    ch = this.peekNextChar();
                    if (!this.isDecimalDigit(ch)) {
                        break;
                    }
                    number += this.getNextChar();
                }
            } else {
                throw new SyntaxError("Unexpected character after exponent sign");
            }
        }
        return this.createToken("Number", number);
    }

    next() {
        let token;

        this.skipSpaces();
        if (this.index >= this.length) {
            return undefined;
        }

        token = this.scanNumber();
        if (typeof token !== "undefined") {
            return token;
        }

        token = this.scanOperator();
        if (typeof token !== "undefined") {
            return token;
        }

        token = this.scanIdentifier();
        if (typeof token !== "undefined") {
            return token;
        }

        throw new SyntaxError("Unknown token from character " + this.peekNextChar());
    }
}
