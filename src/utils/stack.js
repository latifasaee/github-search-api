class Stack {
    constructor() {
        this.items = [];
    }

    push(value) {
        this.items.push(value);
    }

    pop() {
        if (!this.is_empty()) {
            return this.items.pop();
        } else {
            throw new Error('Stack is empty.');
        }
    }

    peek() {
        if (!this.is_empty()) {
            return this.items[this.items.length - 1];
        } else {
            throw new Error('Stack is empty.');
        }
    }

    is_empty() {
        return this.items.length === 0;
    }
}

module.exports = Stack;
