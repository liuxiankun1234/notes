/**
 *  第五章 链表 
 *      原型链就是一种链表数据结构
 *      链表 像火车一个勾子挂着另一个车厢
 *      特点
 *          添加或者移除元素的时候不需要移动其他元素（链表需要使用指针）
 *          访问元素 需要从头迭代列表知道找到所需元素
 *          
 *      双向链表 
 *          链表一个节点只有链向下一个节点的链接
 *          双向链表链接，是双向的 一个链向前一个元素 一个链向下一个元素
 *      
 * 
 *      
 *      注
 *          理解引用类型很重要啊 
 *          
 *          数组和链表两种数据结构的特性
 *              数组 
 *                  JS数组被实现成了对象，与其他语言相比 效率很低
 *                  大多数变成语言中，数组的大小是固定的，当数组被数据填满 很难加新元素
 *                  从数组的起点或者中间插入或移除项的成本很高 因为需要移动  连续  的元素
 *                  JS数组不存在上面 插入移除的问题 splice()方法不需要访问其他元素
 *                  
 *              链表 
 *                  链表的元素在内存中不是连续存储的 
 *                  频繁插入 移除元素 首选链表结构
 *      
 * 
 * 
**/
void function() {
    /**
     *      LinkedNode这个构造函数很好
     *          因为是处理数据的 可扩展性很强
     *      链表结构是什么样
     *          默认有一个head元素 next指向null
     *          每一个元素都有一个next属性 指向下一个元素
     *  
     * 
    **/
    class LinkedNode{
        constructor(el) {
            this.el = el;
            this.next = null;
        }
    }
    class LinkedList{
        constructor() {
            this.head = null;
            this.length = 0;
        }
        append(el) {
            let node = new LinkedNode(el),
                current = this.head;

            if(this.head === null){
                this.head = node;
            }else{
                // 找到最后一项 append node
                while(current.next){
                    current = current.next
                }
                current.next = node;
            }
            this.length++
        }
        // 移除pos元素 从索引0开始
        removeAt(pos) {
            if(pos > this.length || pos < -1) return null;

            let previous,
                current = this.head,
                index = 0;

            if(pos === 0){
                this.head = current.next;
            }else{
                while(pos > index){
                    previous = current;
                    current = current.next;
                    index++
                }
                // 将你的 左手位置 握到 你的右手位置
                previous.next = current.next
            }
            this.length--;
            return current.el
        }
        insert(pos, el) {
            if(pos < -1 || pos > this.length) return false;

            const node = new LinkedNode(el);
            let current = this.head,
                index = 0,
                previous = null;

            if(pos === 0){
                this.head = node;
                node.next = current;
            }else{
                while(pos > index){
                    previous = current;
                    current = current.next;
                    index++;
                }
                previous.next = node;
                node.next = current;
            }
            this.length++;
            return true;
        }
        indexOf(el) {
            let current = this.head,
                index = 0;

            while(current.next && current.el !== el){
                current = current.next;
                index++
            }
            return index = index === this.length ? -1 : index
        }
        isEmpty() {
            // 这么容易被子类改写size方法
            return this.size() === 0
        }
        toString() {
            let current = this.head,
                string = '';

            while(current){
                string += current.el + (current.next ? '\n' : '')
                current = current.next;
            }
            return string;
        }
        size() {
            return this.length
        }
        getHead() {
            return this.head
        }
    }
    const linkList = new LinkedList();
    linkList.append('A');
    linkList.append('B');
    linkList.append('C');
    linkList.append('D');

    // linkList.removeAt(1)
    linkList.insert(2, 'F');

    // console.log(linkList.toString())

}();

void function() {
    /**
     *  双向链表
     *      双向链表提供两种迭代列表的方法
     *          从头到尾 
     *          从尾到头 
     *          也可以访问一个特定节点的下一个或者上一个节点
     * 
     *      单项链表迭代时错误了要找的元素，就需要回到列表的起点，重新迭代
     * 
    **/
    class DoublyLinkedNode {
        constructor(el){
            this.el = el;
            this.next = null;
            this.previous = null;
        }
    }
    class DoublyLinkedList{
        constructor() {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }

        append(el){
            const node = new DoublyLinkedNode(el);
            let current = this.head;

            if(current === null){
                this.head = node;
            }else{
                node.previous = this.tail;
                this.tail.next = node;
            }

            this.tail = node;
            this.length++
        }

        insert(pos, el) {
            if(pos < 0 || pos > this.length) return false;

            const node = new DoublyLinkedNode(el);
            let current = this.head,
                previous = null,
                index = 0;

            if(pos === 0){
                if(!this.head){
                    // 没有数据
                    this.head = node;
                    this.tail = node;
                }else{
                    node.next = current;
                    current.previous = node;
                    this.head = node;
                }
            }else if(pos === this.length){
                current = this.tail;
                current.next = node;
                node.previous = current;
                this.tail = node;
            }else{
                while(pos > index){
                    previous = current;
                    current = current.next;
                    index++;
                }
                previous.next = node;
                node.next = current;

                current.previous = node;
                node.previous = previous;
            }
            this.length++;
            return true;
        }
        removeAt(pos) {
            if(pos < 0 || pos > this.length) return false;

            let index = 0,
                previous = null,
                current = this.head;

            if(pos === 0){
                this.head = current.next;
                if(this.length === 1){
                    this.tail = null;
                }else{
                    this.head.previous = null;
                }
            }else if(pos === this.length - 1){
                this.tail = this.tail.previous;
                this.tail.next = null;
            }else{
                while(pos > index){
                    previous = current;
                    current = current.next;
                    index++
                }

                previous.next = current.next;
                current.next.previous = previous;
            }
            this.length--;

            return true;
        }
    }

    const linkedList = new DoublyLinkedList();
    linkedList.append('B')
    linkedList.insert(0, 'A')
    linkedList.insert(2, 'C')
    linkedList.append('D')
    linkedList.removeAt(3)
    
    console.log(linkedList)
}()

void function() {
    /**
     *  链表习题
     *      可以搞几道题来做一做
     * 
     * 
    **/
}();