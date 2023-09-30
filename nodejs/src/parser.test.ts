import assert from "node:assert/strict";
import test from "node:test";
import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";

test("Test AST String", () => {
    let expected = "((56 - (64 / 8)) + 4)";
    let lexer = new Lexer("56    - 64/8 +4");
    let tokens = lexer.getTokens();
    assert.notEqual(tokens, "");
    let parser = new Parser(tokens);
    let astObj = parser.parseExp();
    assert.notEqual(astObj, null);
    if (astObj) {
        let actual = astObj.stringify();
        assert.equal(actual, expected);
    }
});

test("Test AST Term Operations", () => {
    let expected = 45;
    let lexer = new Lexer("25+25 -5");
    let tokens = lexer.getTokens();
    assert.notEqual(tokens, "");
    let parser = new Parser(tokens);
    let astObj = parser.parseExp();
    assert.notEqual(astObj, null);
    if (astObj) {
        let actual = astObj.eval();
        assert.equal(actual, expected);
    }
});

test("Test AST Factor Operations", () => {
    let expected = 5.5;
    let lexer = new Lexer("121/11*0.5");
    let tokens = lexer.getTokens();
    assert.notEqual(tokens, "");
    let parser = new Parser(tokens);
    let astObj = parser.parseExp();
    assert.notEqual(astObj, null);
    if (astObj) {
        let actual = astObj.eval();
        assert.equal(actual, expected);
    }
});

test("Test AST Braces", () => {
    let expected = 0;
    let lexer = new Lexer("10-5*(25/5)+15");
    let tokens = lexer.getTokens();
    assert.notEqual(tokens, "");
    let parser = new Parser(tokens);
    let astObj = parser.parseExp();
    assert.notEqual(astObj, null);
    if (astObj) {
        let actual = astObj.eval();
        assert.equal(actual, expected);
    }
});

test("Test AST Braces", () => {
    let lexer = new Lexer("(25/5");
    let tokens = lexer.getTokens();
    assert.notEqual(tokens, "");
    let parser = new Parser(tokens);
    assert.throws(() => parser.parseExp(), /Missing \)$/);
});
