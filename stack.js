class Stack {
    constructor() {
        this.items = [];
    }
    
    /**
     * Add an item to the stack
     * @param {*} item
     */
    push(item) {
        this.items.push(item);
    }
    
    /**
     * Take the top item off the stack
     * @returns {undefined|*}
     */
    pop() {
        if (this.items.length === 0)
            return undefined;
        return this.items.pop();
    }

    /**
     * See what the top item is
     * @returns {*}
     */
    peek() {
        return this.items[this.items.length - 1];
    }

    /**
     * Check if the stack is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Find out how many items are in the stack
     * @returns {number}
     */
    size() {
        return this.items.length;
    }
}
