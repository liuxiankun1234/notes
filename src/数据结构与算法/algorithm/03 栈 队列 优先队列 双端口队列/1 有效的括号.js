/**
 *  题目
 *      有效的括号
 *  地址
 *      https://leetcode-cn.com/problems/valid-parentheses/solution/you-xiao-de-gua-hao-by-leetcode-solution/
 *  解题思路
 *      让尾部数字加1，如果不等于0 那么直接return出去
 *      如果等于0 则继续前一位加一 循环
 *      遍历完 还没返回则处理前置加一 [9] [9,9] 这种情况
 *          
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(s.length % 2 === 1) {
        return false;
    }

    const paris = new Map([
        [')', '('],
        [']', '['],
        ['}', '{'],
    ]),
    arr = [];
    for(var i = 0; i < s.length; i++) {
        const ch = s[i];
        if(paris.has(ch)) {
            if(arr.length === 0 ||  arr[arr.length - 1] !== paris.get(ch)) {
                return false
            }
            arr.pop()
        }else{
            arr.push(ch)
        }
    }
    return arr.length === 0
};


var isValid = function(s) {
    if(s.length % 2 !== 0) return false
    var stack = [],
     keys = {
         '(': ')',
         '{': '}',
         "[": ']'
     }
 
     for(let char of s) {
         if(keys[char]) {
             stack.push(keys[char])
         }else{
             if(stack.pop() !== char) {
                 return false
             }
         }
     }
 
    return stack.length === 0
 };
 
isValid('(]]]]]')