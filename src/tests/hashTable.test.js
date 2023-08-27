const HashTable = require('../utils/hashTable');

describe('HashTable', () => {
    let hashTable;

    beforeEach(() => {
        hashTable = new HashTable(10);
    });

    it('should insert and retrieve values', () => {
        hashTable.insert('apple', 5);
        expect(hashTable.get('apple')).toBe(5);
    });

    it('should handle collision and retrieve values', () => {
        hashTable.insert('apple', 5);
        hashTable.insert('banana', 10);
        expect(hashTable.get('apple')).toBe(5);
        expect(hashTable.get('banana')).toBe(10);
    });

    it('should return null for non-existent keys', () => {
        expect(hashTable.get('orange')).toBeNull();
    });

    it('should delete values', () => {
        hashTable.insert('apple', 5);
        hashTable.delete('apple');
        expect(hashTable.get('apple')).toBeNull();
    });

    it('should delete values without affect others', () => {
        hashTable.insert('apple', 5);
        hashTable.insert('banana', 10);
        hashTable.delete('apple');
        expect(hashTable.get('apple')).toBeNull();
        expect(hashTable.get('banana')).toBe(10);
    });
});
