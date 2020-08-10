/**
 * @param {number[]} nums
 * @return {number[][]}
 * 解法一：暴力解决
 * 解法二：两数之和
 */
var threeSum = function(nums) {
    if(nums == null || nums.length === 0) return 0;

    var ret = {};
    for(var index = 0, length = nums.length; index < length; index++) {
        var key = nums[index];

        if(ret[key]) {
            return
        }

        ret[key]
    }
};