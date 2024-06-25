class Queue {
    constructor() {
        this.items = [];
    }

    /**
     * Add item to queue
     * @param {*} item
     * @return {Queue}
     */
    enQueue(item) {
        this.items.push(item);
        return this;
    }

    /**
     * get first item from queue & remove it
     * @return {undefined|*}
     */
    deQueue() {
        if (this.items.length === 0) return undefined;
        return this.items.shift()
    }

    /**
     * check first item of queue
     * @return {undefined|*}
     */
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[0]
    }

    /**
     * check queue is empty or not
     * @return {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }
}
