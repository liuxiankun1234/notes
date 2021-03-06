/**
 *  数组
 *      定义了一个数组 计算机在内存中申请了一个连续的地址
 *      注： 频繁的插入和删除操作不适合使用数组数据结构
 *      
 *  链表
 *      占用非连续的内存
 *  
 *  跳表 
 *      升维 空间换时间
 *      只能用于链表元素有序的情况下使用
 *      用于取代的是平衡树和二分查找，是一种 插入/删除/搜索都是O(logn)的数据结构
 *      在一些热门项目中代替平衡树如 Redis LevelDB
 * 
 *  时间复杂度对比
 *      method              array           LinkedList              skipList
 *      prepend             O(1)            O(1)                    O(1)
 *      append              O(1)            O(1)                    O(1)
 *      lookup              O(1)            O(n)                    O(logn)
 *      insert              O(n)            O(1)                    O(logn)
 *      delete              O(n)            O(1)                    O(logn)
 *  
 *  数组和链表的区别
 *      大多数语言的数组是开一块固定的连续内存 链表是占用非连续内存 
 *          这就导致了 数组的查询、前增、后增 是O(1)时间复杂度
 *          链表的前增、后增、删除、插入是O(1)时间复杂度，查询是O(n)    
 *      
 *  注意
 *      链表的删除 插入真的是O(1)的时间复杂度吗
 *      单链表的前插入 
 *      量表的删除都需要查找一遍元素啊 
 *      数组和链表的基础知识没啥了 
 *      做一下具体区分吧 看
 *      sort 为啥要传 a - b呢
 *     
 *  二刷卡壳题目
 *      数组
 *      https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 *      https://leetcode-cn.com/problems/merge-sorted-array/
 *      https://leetcode-cn.com/problems/rotate-array/
 *      https://leetcode-cn.com/problems/3sum/submissions/
 * 
 *      链表
 *      https://leetcode-cn.com/problems/swap-nodes-in-pairs
 *      https://leetcode-cn.com/problems/reverse-linked-list/
 *  
 *  三刷卡壳题目
 *      https://leetcode-cn.com/problems/rotate-array/
 *      https://leetcode-cn.com/problems/3sum/
 * 
 *      https://leetcode-cn.com/problems/reverse-linked-list/
 *      https://leetcode-cn.com/problems/linked-list-cycle/submissions/
 *      
*/

// 实现一个单链表
class Node{
    constructor(element) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }
}
class LinkedList{
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(element) {
        const node = new Node(element);


        if(this.head == null) {
            this.head = node;
        }else{
            let current = this.head;

            while(current.next) {
                current = current.next
            }
            current.next = node
        }

        this.length++
    }

    removeAt(position) {
        if(position < 0 || position >= this.length) {
            return null;
        }

        let previous = null,
            current = null;

        if(position === 0) {
            current = this.head;
            this.head = this.head.next
        }else{
            // position === 0 表示找到目标元素 
            // position === 0 表示找到目标元素前一个节点的元素 
            while(position > 0) {
                if(previous === null) {
                    previous = this.head
                }else{
                    previous = previous.next;
                }
                position--;
                
            }
            current = previous.next;
            previous.next = previous.next.next
        }

        this.length--
        return current.element;
    }

    insert(position, element) {
        if(position < 0 || position > this.length) {
            return false;
        }
        const node = new Node(element)
        if(position === 0) {
            current = this.head;
            this.head = node;
            this.head.next = current;
        }else{
            let previous = null;
            while(position > 0) {
                if(previous === null) {
                    previous = this.head
                }else{
                    previous = previous.next;
                }
                position--;   
            }
            node.next = previous.next;
            previous.next = node;
        }

        this.length++
        return true;
    }
}

class DoubleLinkedList{
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0
    }

    append(element) {
        const lastNode = new Node(element);

        if(this.head === null) {
            this.tail = this.head = lastNode;
        } else {
            let prevNode = this.head;
            
            while(prevNode.next) {
                prevNode = prevNode.next
            }
            lastNode.prev = prevNode;
            prevNode.next = lastNode;
            this.tail = lastNode
        }

        this.length++;
    }

    insert(position, element) {
        if(position < 0 || position > this.length) {
            return false;
        }

        const node = new Node(element);

        if(position === 0) {
            let current = this.head;

            current.prev = node;
            node.next = current;
            this.tail = this.head = node;
        }else{
            let previous = null,
                next = null;

            while(position > 0) {
                if(previous === null) {
                    previous = this.head
                }else{
                    previous = previous.next;
                }
                position--;
            }
            /**
             *  previous 插入位置的前一个节点
             *  previous 插入位置的后一个节点
             *      node的前指针指向前节点
             *      node的后指针指向后节点
             *      前节点的next指针指向node
             *      后节点的prev指针指向node
             * 
             *      如果next === null 证明是尾指针 不需要进行 next.prev = node;
            */
            next = previous.next;
            node.prev = previous
            node.next = next;
            if(next) {
                next.prev = node
            }else{
                this.tail = node
            }
            previous.next = node;
        }
        this.length++;
        return true;
    }

    removeAt(position) {
        if(position < 0 || position >= this.length) {
            return null;
        }

        let current = null;

        if(position === 0) {
            current = this.head;
            
            this.head = this.head.next;
            this.head.prev = null;
            this.head.next === null && (this.tail = null)
        }else{
            let previous = null;
            while(position > 0) {
                if(previous === null) {
                    previous = this.head
                }else{
                    previous = previous.next
                }
                position--;
            }
            current = previous.next;
            let next = current.next;

            previous.next = next;
            if(next) {
                next.prev = previous
                next.next === null && (this.tail = current)
            }else{
                this.tail = previous
            }
        }

        this.length--;
        return current.element;
    }
}

const doubleLinkedList = new DoubleLinkedList();

doubleLinkedList.append(1);
doubleLinkedList.append(2);
doubleLinkedList.append(3);
console.log(doubleLinkedList)

// doubleLinkedList.insert(0, 0)

// doubleLinkedList.insert(4, 4)
// doubleLinkedList.insert(4, 5)

console.log(doubleLinkedList.removeAt(0))
console.log(doubleLinkedList.removeAt(1))

const linkedList = new LinkedList();
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)
linkedList.append(5)


console.log(linkedList)


var swapPairs = function(head) {
    if(head === null || head.next === null) {
        return head;
    }
    const newHead = head.next;

    head.next = swapPairs(newHead.next)
    newHead.next = head;

    return newHead;
    
};

swapPairs(linkedList.head)