/**
 *  题目
 *      加一
 *  地址
 *      https://leetcode-cn.com/problems/plus-one/
 *  
 *  解题思路
 *      让尾部数字加1，如果不等于0 那么直接return出去
 *      如果等于0 则继续前一位加一 循环
 *      遍历完 还没返回则处理前置加一 [9] [9,9] 这种情况
 *          
*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    var len = digits.length;

    for(var i = len - 1; i >= 0; i--) {
        digits[i] = ++digits[i] % 10
        if(digits[i] !== 0) {
            return digits
        }
    }
    return [1, ...digits]
};