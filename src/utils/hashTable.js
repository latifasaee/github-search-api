class HashTable {
    constructor(size) {
        this.size = size;
        this.table = new Array(size).fill(null).map(() => []);
    }

    _hashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    insert(key, value) {
        const index = this._hashFunction(key);
        this.table[index].push({ key, value });
    }

    get(key) {
        const index = this._hashFunction(key);
        const bucket = this.table[index];
        for (const entry of bucket) {
            if (entry.key === key) {
                return entry.value;
            }
        }
        return null;
    }

    delete(key) {
        const index = this._hashFunction(key);
        const bucket = this.table[index];
        const entryIndex = bucket.findIndex(entry => entry.key === key);
        if (entryIndex !== -1) {
            bucket.splice(entryIndex, 1);
        }
    }
}

module.exports = HashTable;