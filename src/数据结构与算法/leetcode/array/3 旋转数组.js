/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/23/
 * 
**/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 可以考虑splice
var rotate = function(nums, k) {
    var length = nums.length;
    k = k % length;
    
    while(k) {
        var num = nums.pop();
        nums.unshift(num)
        k--
    }
};