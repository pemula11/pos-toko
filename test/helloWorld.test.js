const assert = require('assert');
const helloWorld = () => 'Hello, World!';

describe('helloWorld function', () => {
    it('should return "Hello, World!"', () => {
        assert.strictEqual(helloWorld(), 'Hello, World!');
    });
});