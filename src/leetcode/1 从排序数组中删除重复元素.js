/**
 *  题目 从排序数组中删除重复元素
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/21/
 * 
**/

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    /**
     *  i-- 会重新指定i的值
     *  注意length是一个变量 没有跟随nums.length变化而变化
     *  如果不处理length的话 nums[i] 和 nums[i - 1] 可能会是void 0 而进入死循环
     * 
    **/
    var i, length = nums.length;
    for(i = 1; i < length; i++) {
        if(nums[i] === nums[i - 1]) {
            nums.splice(i, 1)
            i--
            length--
        }
    }
    return length
};