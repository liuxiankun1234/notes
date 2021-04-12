/**
 *  题目
 *      删除有序数组中的重复项
 *  地址
 *      https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 *  解题思路
 *      1、暴力解法
 *          新开一个数组 然后将不重复的数据塞到这个数组内 然后再重新赋值这个数组
 *          时间复杂度 O(n) 
 *      2、数组去重
 *          [...new Set(n)]
 *      3、使用快慢指针
 *          使用快慢指针j、i，如果遇到nums[j] === nums[i]，则移动快指针 
 *          如果nums[j] !== nums[i] 则将nums[++i] = nums[j]
 * 
***/


/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if(nums.length < 1) return nums;
    var i = 0;
    for(var j = 1; j < nums.length; j++) {
        if(nums[j] !== nums[i]) {
            nums[++i] = nums[j]
        }
    }
    return i + 1
};