import { expect, test } from "vitest";
import { Lexer } from "./lexer.js";

test("Test all tokens", () => {
    let expected = " 6:null 5:null 0:4646 1:null 2:null 3:null 4:null 0:565.788 7:null";
    let lexer = new Lexer("( ) 4646 + - * / 565.788");
    lexer.getTokens();
    let actual = lexer.stringify();
    expect(actual).not.empty;
    expect(actual).toBe(expected);
});

test("Test invalid characters", () => {
    let lexer = new Lexer("Wabebe");
    expect(() => lexer.getTokens()).toThrowError("W is an unsupported character");
});

test("Test invalid decimal number", () => {
    let lexer = new Lexer("35.4533.4546");
    expect(() => lexer.getTokens()).toThrowError("35.4533.4546 is an unsupported number");
});
