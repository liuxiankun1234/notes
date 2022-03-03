/**
 * 题目
 *      两数之和
 *  地址
 *      https://leetcode-cn.com/problems/two-sum/submissions/
 *  解题思路
 *      用一个map存储对应的
 *      循环整个数组，然后记录当前的数字对应和是target的数字 并且记录索引
 *      如果在后续数组中遇到这个数字 那就将两个索引返回
**/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var keys = {};

    for(var i = 0; i < nums.length; i++) {
        var n = nums[i]
        if(typeof keys[n] === 'number') {

            return [i, keys[n]]
        }
        keys[target - n] = i; 
    }
};

var twoSum = function(nums, target) {
    var map = new Map();

    for(let i = 0; i < nums.length; i++) {
        if(map.has(nums[i])) {
            return [map.get(nums[i]), i]
        }
        map.set(target - nums[i], i)
    }
};


var twoSum = function(nums, target) {
    const map = {}

    for(let i = 0; i < nums.length; i++) {
        const current = nums[i]
        if(map[current] === undefined) {
            map[target - current] = i
            continue
        }
        return [i, map[current]]
    }
}