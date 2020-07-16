/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    for (var i = nums.length - 1; i >= 0; i--) {
        if(nums[i] === 0) {
            nums.splice(i, 1)
            nums.push(0)
        }
        
    };
};


/**
 *  时间复杂度 O(n)
 *  解题思路
 *      单指针查找非零元素，再补零
 * 
 */
var moveZeroes = function(nums) {
    if(nums == null || nums.length === 0) return;

    var index = 0,
        length = nums.length,
        insert = 0;

    for(; index < length; index++) {
        if(nums[index] !== 0) {
            nums[insert++] = nums[index]
        }
    }
    while(insert < length) {
        nums[insert++] = 0
    }
}