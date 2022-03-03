/**
s *  题目
 *      移动零
 *  地址
 *      https://leetcode-cn.com/problems/move-zeroes/
 *  
 *  解题思路
 *      1、通过一个索引取出全部非0元素，然后再补0
 *      2、快慢指针方式
 *          将慢指针左侧都放置整数
 *          将快指针左侧到慢指针右侧都放置0
 *          循环完快指针结束
*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {   
    var k = 0;
    for(var i = 0; i < nums.length; i++) {
        var n = nums[i];
        if(n !== 0) {
            nums[k++] = n
        }
    }
    for(k; k < nums.length; k++) {
        nums[k] = 0;
    }
};

// 快慢指针
var moveZeroes = function(nums) {   
    var i = 0,
        j = 0;

    for(j; j < nums.length; j++) {
        if(nums[j] !== 0) {
            var temp = nums[j]
            nums[j] = 0;
            nums[i++] = temp
        }
    }
};


// 快慢指针
var moveZeroes = function(nums) {   
    let slow = 0
    for(let fast = 0; fast < nums.length; fast++) {
        const current = nums[fast]
        if(current !== 0) {
            nums[slow++] = current
            nums[fast] = 0
        }
    }
    return nums
};