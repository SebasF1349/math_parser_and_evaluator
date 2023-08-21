import { EToken, Tokens } from "./tokens.js";
const NumberList = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export class Lexer {
    constructor(input) {
        this.tokens = [];
        this.pos = 0;
        this._input = input;
        //tokens = new List<Tokens>();
        this.curr_input = input.length > 0 ? this._input[this.pos] : "\0";
    }
    getNext() {
        if (this.pos < this._input.length - 1) {
            this.pos++;
            this.curr_input = this._input[this.pos];
        }
        else {
            this.curr_input = "\0";
        }
    }
    getTokens() {
        while (true) {
            if (this.curr_input == " " || this.curr_input == "\t") {
                this.getNext();
                continue;
            }
            else if (NumberList.includes(this.curr_input)) {
                let numberToken = this.generateNumber();
                this.tokens.push(numberToken);
            }
            else if (this.curr_input == "+") {
                let additionToken = new Tokens(EToken.ADD, null);
                this.tokens.push(additionToken);
                this.getNext();
            }
            else if (this.curr_input == "-") {
                let minusToken = new Tokens(EToken.MINUS, null);
                this.tokens.push(minusToken);
                this.getNext();
            }
            else if (this.curr_input == "*") {
                let multiplyToken = new Tokens(EToken.MULTIPLY, null);
                this.tokens.push(multiplyToken);
                this.getNext();
            }
            else if (this.curr_input == "/") {
                let divideToken = new Tokens(EToken.DIVISION, null);
                this.tokens.push(divideToken);
                this.getNext();
            }
            else if (this.curr_input == "(") {
                let lbraceToken = new Tokens(EToken.LBRACE, null);
                this.tokens.push(lbraceToken);
                this.getNext();
            }
            else if (this.curr_input == ")") {
                let rbraceToken = new Tokens(EToken.RBRACE, null);
                this.tokens.push(rbraceToken);
                this.getNext();
            }
            else if (this.curr_input == "\0") {
                let eofToken = new Tokens(EToken.EOF, null);
                this.tokens.push(eofToken);
                break;
            }
            else {
                throw new SyntaxError(`${this.curr_input} is an unsupported character`);
            }
        }
        return this.tokens;
    }
    stringify() {
        let str = "";
        this.tokens.forEach((token) => (str += token.stringify()));
        return str;
    }
    generateNumber() {
        //this doesn't check the number is valid. For example, 0.0.0 is tokenized as NaN in the last line
        let decimal_count = 0;
        let str = "";
        while (NumberList.includes(this.curr_input)) {
            if (this.curr_input == "." && decimal_count <= 1) {
                decimal_count++;
            }
            if (str.length < 1 && decimal_count > 0) {
                str = "0";
            }
            str += this.curr_input;
            this.getNext();
        }
        if (Number.isNaN(+str)) {
            throw new SyntaxError(`${str} is an unsupported number`);
        }
        return new Tokens(EToken.NUMBER, +str);
    }
}
//# sourceMappingURL=lexer.js.map