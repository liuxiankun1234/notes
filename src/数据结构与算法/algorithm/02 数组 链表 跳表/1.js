/**
 * 解题思路
 *      5-10分钟 读题和思考
 *      有思路 自己开始做和写代码 不然 马上看题解
 *      默写背诵 熟练
 *      开始自己写
 * 
 * 
 * 
*/


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    if(nums.length <= 1) return nums;
    for(var i = nums.length - 2; i >= 0; i--) {
        if(nums[i] === 0) {
            nums.push(nums.splice(i, 1)[0])
        }
    }
};


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    var k = 0;
    for(var i = 0; i < nums.length; i++) {
        if(nums[i] !== 0) {
            nums[k] = nums[i];
            if(k !== i) {
                nums[i] = 0
            }
            k++
        }
    }
};


/**
 * 一维数组 维护i,j
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    var k = 0;
    for(var i = 0; i < nums.length; i++) {
        if(nums[i] !== 0) {
            nums[k++] = nums[i];
        }
    }
    for(k; k < nums.length; k++) {
        nums[k] = 0
    }

};