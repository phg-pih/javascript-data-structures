class PriorityQueue {
    constructor() {
        this.items = [];
    }

    /**
     * @param {*} item
     * @param {number} priority
     */
    enqueue(item, priority) {
        let flag = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > priority) {
                this.items.splice(i, 0, {item, priority})
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.items.push({item, priority})
        }
    }

    /**
     * @return {*}
     */
    dequeue() {
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
     * @return {number}
     */
    size() {
        return this.items.length;
    }

    /**
     * check queue is empty or not
     * @return {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }
}