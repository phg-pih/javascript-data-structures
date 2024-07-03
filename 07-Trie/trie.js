class TrieNode {
    constructor() {
        // Initialize the childNode array with 26 nulls
        this.childNode = Array(26).fill(null);
        // Initialize wordEnd to the false indicating that no word ends here yet
        this.wordEnd = false;
    }
}

let ALPHABET_SIZE = 26;
class Trie {
    constructor() {
        // Initialize the root node of the Trie
        this.root = new TrieNode();
    }

    // Function to insert a key into the Trie
    insert(key) {
        // Start from the root node
        let currentNode = this.root;
        for (let i = 0; i < key.length; i++) {
            const index = key.charCodeAt(i) - 'a'.charCodeAt(0);
            if (currentNode.childNode[index] === null) {
                currentNode.childNode[index] = new TrieNode();
            }
            // Move to the next node in the Trie
            currentNode = currentNode.childNode[index];
        }
        // Mark the end of the word
        currentNode.wordEnd = true;
    }

    // Function to search for a key in the Trie
    search(key) {
        // Start from the root node
        let currentNode = this.root;
        // Iterate through each character in the key
        for (let i = 0; i < key.length; i++) {
            const index = key.charCodeAt(i) - 'a'.charCodeAt(0);
            if (currentNode.childNode[index] === null) {
                return false;
            }
            // Move to the next node in the Trie
            currentNode = currentNode.childNode[index];
        }
        // Return true if the end of the word is marked otherwise false
        return currentNode.wordEnd;
    }

    // Returns true if root has no children, else false
    isEmpty(root) {
        for (let i = 0; i < ALPHABET_SIZE; i++)
            if (root.children[i] !== null)
                return false;
        return true;
    }

    // Recursive function to delete a key from given Trie
    remove(root, key, depth) {
        // If tree is empty
        if (root === null)
            return null;

        // If last character of key is being processed
        if (depth === key.length) {

            // This node is no more end of word after
            // removal of given key
            if (root.isEndOfWord)
                root.isEndOfWord = false;

            // If given is not prefix of any other word
            if (this.isEmpty(root)) {
                root = null;
            }

            return root;
        }

        // If not last character, recur for the child
        // obtained using ASCII value
        let index = key[depth].charCodeAt(0) - 'a'.charCodeAt(0);
        root.children[index] =
            this.remove(root.children[index], key, depth + 1);

        // If root does not have any child (its only child got
        // deleted), and it is not end of another word.
        if (this.isEmpty(root) && root.isEndOfWord === false) {
            root = null;
        }

        return root;
    }
}