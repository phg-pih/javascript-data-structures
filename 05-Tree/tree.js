class Node {
    constructor(key, data, parent = null) {
        this.key = key
        this.data = data;
        this.parent = parent;
        this.children = [];
    }
}

class Tree {
    constructor() {
        this.root = null
    }

    add(key, value, parentKey) {
        // create a newNode:
        const newNode = new Node(key, value, parentKey)

        // if there is no root, root will be the newNode
        if (!this.root) {
            this.root = newNode
        } else {
            try {
                // find the parent node for attachment:
                const targetParent = this.find(parentKey)
                // make the new node point to parent:
                newNode.parent = targetParent
                // add the newNode to targetParents children array:
                targetParent.children.push(newNode)
            } catch (err) {
                // error will occur if the node with parentKey is not found at this step
                console.error(`Error on add() method: Node with given parentKey: "${parentKey}" is not found in the Tree.`)
            }
        }
    }

    remove(targetKey) {
        // if the Tree is empty, throw an error
        if (!this.root) throw new Error('Tree is empty')

        // initialize a variable for targetNode that is going to be returned:
        let targetNode

        // if targetKey === root key, directly remove without doing a traversal:
        if (targetKey === this.root.key) {
            // update targetNode value with root
            targetNode = this.root
            // reset the root:
            this.root = null
            // exit
            return targetNode
        } else {
            try {
                // find the target node:
                targetNode = this.find(targetKey)

                // pick the parent:
                const parent = targetNode.parent

                // initialize a new array for new children array
                const updatedChildren = []

                // to remove the node with targetKey, exclude from it's parents children array:
                for (let i = 0; i < parent.children.length; i++) {
                    if (targetKey !== parent.children[i].key) {
                        updatedChildren.push(parent.children[i])
                    }
                }

                // update the parent:
                parent.children = updatedChildren
                // exit:
                return targetNode
            } catch (err) {
                console.error(`Error on remove() method: Node with given targetKey: "${targetKey}" is not found in the Tree.`)
            }
        }
    }

    find(targetKey) {
        // if the Tree is empty, throw an error
        if (!this.root) throw new Error('Tree is empty')

        // if targetKey is root, return the root
        if (targetKey === this.root.key) {
            return this.root
            // else, do a depth first search:
        } else {
            return this.depthFirstSearch(targetKey, this.root)
        }
    }

    // using recursive Pre-order traversal with early exit (break) when it is found
    depthFirstSearch(targetKey, node = this.root) {
        // if the Tree is empty, throw an error
        if (!node) throw new Error('Tree is empty')

        let targetNode = false
        let found = false

        function recursiveDepthTraverse(currentNode) {
            // traverse over given node children elements
            for (let i = 0; i < currentNode.children.length; i++) {
                // if element matches targetKey, break here
                if (currentNode.children[i].key === targetKey) {
                    found = true
                    targetNode = currentNode.children[i]
                    break
                } else {
                    recursiveDepthTraverse(currentNode.children[i])
                    // signal condition to stop the original loop if it is found (goes to next step)
                    if (found) {
                        break
                    }
                }
            }
        }

        recursiveDepthTraverse(node)
        if (!targetNode) {
            throw new Error(`on depthFirstSearch(): Target node with given key: "${targetKey}" is not found in the tree`)
        } else {
            return targetNode
        }
    }

    printTreeAsString() {
        if (!this.root) throw new Error('Tree is empty')

        const getTreeString = (node = this.root, spaceCount = 0) => {
            let treeString = "\n";

            node.children.forEach((child) => {
                treeString += `${" ".repeat(spaceCount)}● node key: ${child.key} ${getTreeString(child, spaceCount + 4)}`
            })

            return treeString
        }

        return console.log(`\n ● node key: ${this.root.key} ${getTreeString(this.root, 4)}`)
    }
}