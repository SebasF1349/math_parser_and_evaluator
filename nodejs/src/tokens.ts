export enum EToken {
    NUMBER,

    ADD,
    MINUS,
    MULTIPLY,
    DIVISION,

    RBRACE,
    LBRACE,

    EOF,
}

export class Tokens {
    _token: EToken;
    _value: number;

    constructor(token: EToken, value: number) {
        this._token = token;
        this._value = value;
    }

    stringify() {
        return ` ${this._token}:${this._value}`;
    }
}
