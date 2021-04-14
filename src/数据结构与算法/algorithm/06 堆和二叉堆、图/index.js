/**
 *  堆和二叉堆的实现和特性
 *      堆 heap
 *          可以迅速找到一堆数中的最大或最小值的数据结构
 *          将根节点最大的堆叫大顶堆，将根节点最小的堆叫小顶堆
 *          常见的堆
 *              二叉堆、斐波那契堆
 *          时间复杂度
 *              find-max        O(1)
 *              delete-max      O(logN)
 *              insert(create)  O(1) or O(logN)
 *      二叉堆性质
 *          通过完全二叉树来实现(除了根节点其他都是满的节点)
 *          二叉堆满足性质：
 *              是一颗完全树
 *              树中任意节点的值总是大于其子节点的值
 *      二叉堆的实现
 *          一般通过数组来实现
 *          假设二叉堆的第一个元素的索引为0的话，则父节点和子节点的位置关系如下：
 *              索引为i的左孩子的索引是(2*i + 1)
 *              索引为i的右孩子的索引是(2*i + 2)
 *              索引为i的父节点的索引是(Math.floor((i - 1) / 2))
 *          获取最大值
 *              返回数组的第0个元素
 *          插入操作
 *              1、向数组尾部追加一个元素
 *              2、向上浮动如果父节点的数比当前小 则交换两个节点 while循环到根节点
 *          删除操作
 *              1、将堆尾元素替换到根（堆顶被替换掉）
 *              2、将堆顶元素依次向下浮动 浮动到最后一层节点停止
 *      注意
 *          二叉堆是堆的一种形式，由于实现简单而常见，并不是最优解
 *          工程上使用严格斐波那契堆更优
 *          https://en.wikipedia.org/wiki/Heap_(data_structure)
 *          
**/

class BinaryHeap {
    constructor() {
        /**
         *  d           n叉堆
         *  head        堆的实现
         *  headSize    堆的容积
        */
        this.d = 2;
        this.heap = [];
        this.heapSize = 0;
    }

    getParent(i) {
        return Math.floor((i - 1) / this.d)
    }

    kthChild(i, k) {
        return this.d * i + k
    }

    insert(x) {
        this.heap[this.headSize++] = x;
        this.heapifyUp(this.headSize - 1)
    }

    heapifyUp(index) {
        let current = this.heap[index];
        let parentIndex = this.getParent(index);
        let parent = this.head[parentIndex];

        while(parentIndex >= 0 && parent < current) {
            this.heap[index] = parent

            parentIndex = this.getParent(parentIndex);
            parent = this.head[parentIndex];
        }

        this.head[parentIndex] = current
    }
}

var heap = new BinaryHeap();

for(var i = 16; i > 9; i--) {
    heap.insert(i)
}
console.log(heap)