/**
 *  题目
 *      最小栈
 *  地址
 *      https://leetcode-cn.com/problems/min-stack/solution/zui-xiao-zhan-by-leetcode-solution/
 *  解题思路
 *      push pop top这些方法用现有的逻辑即可 
 *      主要是怎么维护住最小栈
 *          可以新建一个最小栈(minStack) 分段维护某一段的最小值 
 *      因为入口只有push 删除操作只有pop
 *      所以push的时候不需要将所有的数据进行最小排序
 *          每次push时候 仅push (minStack的最小值和value对比的最小值)进入minStack即可
 *          每次pop时候 更新minStack 这样就能维护住最小栈的栈顶永远是当前的最小值
*/
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = []
    this.minStack = [Infinity]
};

MinStack.prototype.push = function(x) {
    this.stack.push(x)
    this.minStack.push(Math.min(x, this.minStack[this.minStack.length - 1]))
};

MinStack.prototype.pop = function() {
    this.minStack.pop()
    return this.stack.pop();
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1]
};

const stack = new MinStack();
stack.push(3)
stack.push(1)
stack.push(2)
stack.pop()
console.log(stack.getMin())

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */