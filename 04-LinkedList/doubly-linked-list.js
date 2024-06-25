class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList {
    constructor(value) {
        this.head = {
            value: value,
            next: null,
            previous: null
        };
        this.length = 1;
        this.tail = this.head;
    }

    /**
     * Insert node at end of the list
     *
     * @param {*} value
     */
    append(value) {
        let newNode = new Node(value);

        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;

        this.length++;
    }

    /**
     * Insert node at the start of the list
     *
     * @param {*} value
     */
    prepend(value) {
        let newNode = new Node(value);

        newNode.next = this.head;
        this.head.previous = newNode;
        this.head = newNode;

        this.length++;
    }

    /**
     * Insert node at a given index
     *
     * @param {number} index
     * @param {*} value
     * @return {DoublyLinkedList|boolean}
     */
    insert(index, value) {
        if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
            return false;
        }

        // If index is 0, prepend
        if (index === 0) {
            this.prepend(value);
            return this;
        }

        // If index is equal to this.length, append
        if (index === this.length) {
            this.append(value);
            return this;
        }

        // Reach the node at that index
        let newNode = new Node(value);
        let previousNode = this.head;

        for (let k = 0; k < index - 1; k++) {
            previousNode = previousNode.next;
        }

        let nextNode = previousNode.next;

        newNode.next = nextNode;
        previousNode.next = newNode;
        newNode.previous = previousNode;
        nextNode.previous = newNode;

        this.length++;
    }

    /**
     * Remove a node
     *
     * @param {number} index
     * @return {DoublyLinkedList|boolean}
     */
    remove(index) {
        if (!Number.isInteger(index) || index < 0 || index > this.length) {
            return false;
        }

        // Remove head
        if (index === 0) {
            this.head = this.head.next;
            this.head.previous = null;

            this.length--;
            return this;
        }

        // Remove tail
        if (index === this.length - 1) {
            this.tail = this.tail.previous;
            this.tail.next = null;

            this.length--;
            return this;
        }

        // Remove node at an index
        let previousNode = this.head;

        for (let k = 0; k < index - 1; k++) {
            previousNode = previousNode.next;
        }
        let deleteNode = previousNode.next;
        let nextNode = deleteNode.next;

        previousNode.next = nextNode;
        nextNode.previous = previousNode;

        this.length--;
        return this;
    }
}