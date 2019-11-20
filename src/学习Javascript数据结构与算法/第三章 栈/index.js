void function() {
    /**
     *  栈是一种后进先出的有序集合（洗盘子，拿盘子）
     *      
     *  缺点
     *      我们希望Stack类用户只访问暴露给类的方法（不希望访问或篡改stacks属性）
     * 
     * 
    **/ 
    class Stack {
        constructor() {
            this.stacks = []
        }
        push(el) {
            this.stacks.push(el)
        }
        pop() {
            return this.stacks.pop()
        }
        peek() {
            return this.stacks[this.stacks.length - 1]
        }
        isEmpty() {
            return this.stacks.length === 0
        }
        clear() {
            this.stacks = []
        }
        size() {
            return this.stacks.length
        }
        log() {
            console.log(JSON.stringify(this.stacks))
        }
    }

    const stack1 = new Stack();


    console.log(stack1.isEmpty())
    stack1.push(5)
    stack1.push(8)
    console.log(stack1.peek())
    stack1.push(11)
    console.log(stack1.size())

}();


void function() {
    /**
     *  相对安全的方法
     * 
     *  使用Symbol模拟私有变量 不可以在外界修改
     *  
     *  不过不可靠
     *      Object.getOwnPropertySymbols(stack)可以获取对象的Symbol属性
     *      stack[Object.getOwnPropertySymbols(stack)[0]].push(1)
     * 
    **/
    const _stacks = Symbol();
    class Stack {
        constructor() {
            this[_stacks] = []
        }
        push(el) {
            this[_stacks].push(el)
        }
        pop() {
            return this[_stacks].pop()
        }
        peek() {
            return this[_stacks][this[_stacks].length - 1]
        }
        isEmpty() {
            return this[_stacks].length === 0
        }
        clear() {
            this[_stacks] = []
        }
        size() {
            return this[_stacks].length
        }
        log() {
            console.log(JSON.stringify(this[_stacks]))
        }
    }
    const stack = new Stack();
    stack.push(1)
}();
void function() {
    // 解决方案二
    const dataStore = new WeakMap()
    class Stack {
        constructor() {
            dataStore.set(this, [])
        }
        push(element) {
            let s = dataStore.get(this);
            s.push(element)
        }
        pop() {
            let s = dataStore.get(this);
            return s.pop()
        }
    }   
}();
void function() {
    /**
     *  10进制转换成2进制
     *      进制转换规则 
     *          10 / 2 === 5    0
     *          5  / 2 === 2    1
     *          2  / 2 === 1    0
     *          1  / 2 === 0    1
     * 
     *  扩展成任意进制
    **/

    function divideBy2(decNumber, binary = 2) {
        let arr = [],
            binaryString = '',
            diagits = '0123456789ABCDEF';

        while( decNumber / binary ){
            arr.push(decNumber % binary)
            decNumber = Math.floor(decNumber / binary)
        }
        while(arr.length){
            binaryString += diagits[arr.pop()]
        }
        return binaryString;
    }
}();


// function divideBy2(decNumber) {
//     var remStack = new Stack(),
//         rem,
//         binaryString = '';
    
//     while(decNumber > 0) {
//         rem = Math.floor(decNumber % 2)
//         remStack.push(rem)
//         decNumber = decNumber / 2
//     }

//     while(!remStack.isEmpty()) {
//         binaryString += remStack.pop().toString()
//     }
//     return binaryString
// }