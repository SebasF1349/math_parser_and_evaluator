export class AST {
    eval(): number {
        return 0;
    }
    stringify() {
        return "";
    }
}

export class ASTLeaf extends AST {
    _num: number;
    constructor(num: number) {
        super();
        this._num = num;
    }
    eval() {
        return this._num;
    }
    stringify() {
        return this._num.toString();
    }
}

export class ASTPlus extends AST {
    _leftNode: AST;
    _rightNode: AST;

    constructor(leftNode: AST, rightNode: AST) {
        super();
        this._leftNode = leftNode;
        this._rightNode = rightNode;
    }
    eval() {
        return this._leftNode.eval() + this._rightNode.eval();
    }
    stringify() {
        return `(${this._leftNode.stringify()} + ${this._rightNode.stringify()})`;
    }
}

export class ASTMinus extends AST {
    _leftNode: AST;
    _rightNode: AST;

    constructor(leftNode: AST, rightNode: AST) {
        super();
        this._leftNode = leftNode;
        this._rightNode = rightNode;
    }
    eval() {
        return this._leftNode.eval() - this._rightNode.eval();
    }
    stringify() {
        return `(${this._leftNode.stringify()} - ${this._rightNode.stringify()})`;
    }
}

export class ASTMultiply extends AST {
    _leftNode: AST;
    _rightNode: AST;

    constructor(leftNode: AST, rightNode: AST) {
        super();
        this._leftNode = leftNode;
        this._rightNode = rightNode;
    }
    eval() {
        return this._leftNode.eval() * this._rightNode.eval();
    }
    stringify() {
        return `$({this._leftNode.stringify()} * ${this._rightNode.stringify()})`;
    }
}

export class ASTDivide extends AST {
    _leftNode: AST;
    _rightNode: AST;

    constructor(leftNode: AST, rightNode: AST) {
        super();
        this._leftNode = leftNode;
        this._rightNode = rightNode;
    }
    eval() {
        return this._leftNode.eval() / this._rightNode.eval();
    }
    stringify() {
        return `(${this._leftNode.stringify()} / ${this._rightNode.stringify()})`;
    }
}
