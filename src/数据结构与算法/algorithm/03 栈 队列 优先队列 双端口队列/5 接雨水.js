/**
 *  题目
 *      接雨水
 *  地址
 *      https://leetcode-cn.com/problems/trapping-rain-water/
 *  解题思路
 *      1、单调递减栈
*/
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    var len = height.length,
    area = 0,
    stack = [];

    for(var i = 0; i < len; i++) {
        while(stack.length && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();

            if(stack.length === 0) {
                break;
            }

            const left = stack[stack.length - 1]
            const currWidth = i - left - 1;

            const currHeight = Math.min(height[left], height[i]) - height[top];
            area += currWidth * currHeight;
        }
        stack.push(i)
    }
    return area;
};


var trap = function(height) {
    var stack = [],
         sum = 0;
 
    for(var i = 0; i < height.length; i++) {
        while(stack.length && height[i] > height[stack[stack.length - 1]]) {
            var top = stack.pop();
             if(stack.length === 0 ) break;
            var left = stack[stack.length - 1];
            var width = i - left - 1;
            var curHeight = Math.min(height[left], height[i]) - height[top];
            sum += width * curHeight
        }
        stack.push(i)
    }
 
    return sum; 
 };


trap([0,1,0,2,1,0,1,3,2,1,2,1])