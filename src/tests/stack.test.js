const Stack = require('../utils/stack');

describe('Stack', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it('should push elements onto the stack', () => {
        stack.push(10);
        stack.push(20);
        expect(stack.peek()).toBe(20);
    });

    it('should pop elements from the stack', () => {
        stack.push(10);
        stack.push(20);
        const popped = stack.pop();
        expect(popped).toBe(20);
        expect(stack.peek()).toBe(10);
    });

    it('should throw an error while popping from an empty stack', () => {
        expect(() => stack.pop()).toThrow('Stack is empty.');
    });

    it('should peek at the top element without removing it', () => {
        stack.push(10);
        stack.push(20);
        const peeked = stack.peek();
        expect(peeked).toBe(20);
        expect(stack.peek()).toBe(20);
    });

    it('should return true if the stack is empty, false otherwise.', () => {
        expect(stack.is_empty()).toBe(true);
        stack.push(10);
        expect(stack.is_empty()).toBe(false);
    });
});
