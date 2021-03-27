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
 *  注意
 *      数组和链表的基础知识没啥了 
 *      做一下具体区分吧 看
*/

// 实现一个单链表
class Node{
    constructor(element) {
        this.node = element;
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
        if(position < -1 || position >= this.length) {
            return null;
        }

        let previous = null;

        if(position === 0) {
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
            previous.next = previous.next.next
        }

        this.length--
        return 
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


