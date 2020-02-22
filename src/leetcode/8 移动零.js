/**
 *  题目 移动零
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/28/
 *  
 *  有时候倒序处理数组是一个好办法
**/


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 
 * 执行用时：72 ms
 * 内存消耗：35.8 MB
 */
var moveZeroes = function(nums) {
    for(var i = 0, length = nums.length; i < length; i++) {
        var num = nums[i];
        if(nums[i] === 0) {
            nums.push(...nums.splice(i, 1));
            length--;
            i--;
        }
    }
    return nums
};

// 倒叙
var moveZeroes = function(nums) {
    let i, length = nums.length - 1;
    for(i = length; i >= 0; i--){
        if(nums[i] === 0) {
            nums.push(nums.splice(i, 1)[0]);
        }
    }
};