/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/25/
 *  
**/
/**
 * @param {number[]} nums
 * @return {number}
 * 执行用时：400 ms
 * 内存消耗：35.3 MB
 */
var singleNumber = function(nums) {
    var singleNum;
    for(var i = 0, length = nums.length; i < length; i++) {
        var n = nums[i];
        if(nums.indexOf(n) === nums.lastIndexOf(n)) {
            return n
        }
    }
};

/**
 * 异或 ^
 * 0 ^ x --> x
 * a ^ a --> 0
 * 
 * 执行用时：72 ms
 * 内存消耗：35.2 MB
**/
var singleNumber = function(nums) {
    return nums.reduce((prev, next) => {
        return prev ^ next;
    })
};
