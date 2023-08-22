import { ASTDivide, ASTLeaf, ASTMinus, ASTMultiply, ASTPlus } from "./ast.js";
import { EToken, Tokens } from "./tokens.js";

export class Parser {
    termItems = [EToken.ADD, EToken.MINUS];
    factorItems = [EToken.MULTIPLY, EToken.DIVISION];
    _tokens: Tokens[] = [];
    pos = 0;
    curr_token: Tokens = null;

    constructor(tokens: Tokens[]) {
        this._tokens = tokens;
        this.getNext();
    }

    getNext() {
        if (this.pos < this._tokens.length) {
            this.curr_token = this._tokens[this.pos];
            this.pos++;
        }
    }

    parseExp() {
        let result = this.factor();
        while (
            this.curr_token._token !== EToken.EOF &&
            result !== null &&
            this.termItems.includes(this.curr_token._token)
        ) {
            if (this.curr_token._token == EToken.ADD) {
                this.getNext();
                let rightNode = this.factor();
                result = new ASTPlus(result, rightNode);
            } else if (this.curr_token._token == EToken.MINUS) {
                this.getNext();
                let rightNode = this.factor();
                result = new ASTMinus(result, rightNode);
            }
        }

        return result;
    }

    factor() {
        let factor = this.term();
        while (
            this.curr_token._token !== EToken.EOF &&
            factor !== null &&
            this.factorItems.includes(this.curr_token._token)
        ) {
            if (this.curr_token._token == EToken.MULTIPLY) {
                this.getNext();
                let rightNode = this.term();
                factor = new ASTMultiply(factor, rightNode);
            } else if (this.curr_token._token == EToken.DIVISION) {
                this.getNext();
                let rightNode = this.term();
                factor = new ASTDivide(factor, rightNode);
            }
        }
        return factor;
    }

    term() {
        let term = null;
        if (this.curr_token._token === EToken.LBRACE) {
            this.getNext();
            term = this.parseExp();
            if (this.curr_token._token !== EToken.RBRACE) {
                throw new SyntaxError("Missing )");
            }
        } else if (this.curr_token._token == EToken.NUMBER) {
            term = new ASTLeaf(this.curr_token._value);
        }
        this.getNext();
        return term;
    }
}
