/**
 *  第四章 队列
 *      先进先出（排队） 栈的规则是后进先出（落盘子）
 *      
 * 
 * 
**/

void function() {
    class Queue {
        constructor() {
            this.items = []
        }
        enqueue(el) {
            return this.items.push(el)
        }
        dequeue(el) {
            return this.items.shift();
        }
        front() {
            return this.items[0];
        }
        isEmpty() {
            return this.size() === 0;
        }
        size() {
            return this.items.length;
        }
    }
}();

void function() {
    /**
     *  设置可以设置优先级的队列
     *  QueueElement 
     *      这个构造函数抽的很好 它只负责处理数据 并且可以扩展行很强 
     *      
    **/
    class QueueElement {
        constructor(el, priority) {
            this.el = el;
            this.priority = priority;
        }
    }
    class PriorityQueue {
        constructor() {
            this.items = []
        }
        enqueue(el, priority) {
            const queueElement = new QueueElement(el, priority);
            let isAdd = false;

            for(var i = 0; i < this.items.length; i++){
                if(queueElement.priority < this.items[i].priority){
                    this.items.splice(i, 0, queueElement)
                    isAdd = true
                    break;
                }
            }
            if(!isAdd){
                this.items.push(queueElement)
            }
            console.log(this.items)
        }
        print() {
            this.items.forEach(item => {
                console.log(`${item.el}-${item.priority}`)
            })
        }
    }
}()