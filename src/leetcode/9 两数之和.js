/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/29/
 *  
 *  切记不要用嵌套循环
 *  空间复杂度可以降低时间复杂度
 *  
 *  
**/


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 
 * 很显然这个方式执行时间复杂度不好
 * 
 * 执行用时：188 ms
 * 内存消耗：33.8 MB
 */
var twoSum = function(nums, target) {
    for(var i = 0, length = nums.length; i < length; i++) {
        var index = nums.indexOf(target - nums[i])
        if(index > -1 && index !== i){
            return [i, index]
        }
    }
};

/**
 *  空间换时间
 *  执行用时：56 ms
 *  内存消耗：35.4 MB
**/
var twoSum = function(nums, target) {
    var result = {};
    for(var i = 0, length = nums.length; i < length; i++) {
        var alreadyNum  = result[nums[i]];
        if(alreadyNum !== void 0) {
            return [alreadyNum, i]
        } else{
            // 保存位置和位置对应的数值
            result[target - nums[i]] = i;
        }
    }
};

