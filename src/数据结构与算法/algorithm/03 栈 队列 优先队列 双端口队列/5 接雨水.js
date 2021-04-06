/**
 *  题目
 *      接雨水
 *  地址
 *      https://leetcode-cn.com/problems/trapping-rain-water/
 *  解题思路
 *      1、
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    var len = height.length,
    area = 0,
    stack  =[];

    for(var i = 0; i < len; i++) {
        while(stack.length && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();
            if (!stack.length) {
                break;
            }
            
        }
        stack.push(i)
    }
    return area;
};