



class BinaryHeap {
    constructor() {
        this.d = 2
        this.heapSize = 0
        this.heap = []
    }

    insert (num) {
        this.heap.push(num)
        this.heapifyUp(this.heap.length - 1)
    }

    getParent(index) {
        return Math.floor(
            (index - 1) / 2
        )
    }

    heapifyUp (index) {
        const current = this.heap[index]
        let parentIndex = this.getParent(index)
        while(index > 0 && current > this.heap[parentIndex]) {
            this.heap[index] = this.heap[parentIndex]
            index = parentIndex
            parentIndex = this.getParent(index)
        }
        this.heap[index] = current
    }

    kthChild(i, k) {
        return i * this.d + k
    }

    maxChild(index) {
        var maxChildIndex = this.kthChild(index, 1),
            maxChild = this.heap[maxChildIndex]
        for(var i = 2; i < this.d; i++) {
            index = this.kthChild(index, i)

            maxChildIndex = 
                maxChild > this.heap[index]
                    ? maxChildIndex
                    : index
        }
        return maxChildIndex
    }

    /**
     * index: element pos
     * Complexity: O(log N)
    */
    delete(index) {
       const current = this.heap[index]
       this.heap[index] = this.heap[this.heap.length - 1]
       this.heap--
       this.heapDown(index)
       return current
    }

    heapDown(index) {
        const current = this.heap[index]
        if(this.heap[this.maxChild(index)] > current) {
            this.heap[index] = this.heap[this.maxChild(index)]
            index = this.maxChild(index)
        }
        this.heap[index] = current
    }
}
