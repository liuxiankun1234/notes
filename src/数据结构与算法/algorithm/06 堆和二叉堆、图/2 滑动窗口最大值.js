/**
 *  题目
 *      滑动窗口最大值
 *  地址
 *      https://leetcode-cn.com/problems/sliding-window-maximum/
 *  解题思路
 *      1、单调队列
 *          时间复杂度 O(n)
 *      2、优先队列 大顶堆 暂未实现
 *      3、分块 + 预处理
 *          没理解
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 暴力解法 时间复杂度 Nlog(k) ???
var maxSlidingWindow = function(nums, k) {
    var queue = [],
        sliderMaxArr = [];

    for(var i = 0; i < nums.length; i++) {
        if(queue.length < k) {
            queue.push(nums[i])
        }

        if(queue.length !== k) continue;

        sliderMaxArr.push(Math.max(...queue));

        queue.shift();
    }

    return sliderMaxArr
};

// 单调队列
var maxSlidingWindow = function(nums, k) {
    // 双端队列 维护当前索引最大值
    const queue = [];

    for(var i = 0; i < k; i++) {
        while(queue.length && nums[i] > nums[queue[queue.length - 1]]) {
            queue.pop();
        }
        queue.push(i)
    }

    const maxSlideArr = [nums[queue[0]]];
    for(i = k; i < nums.length; i++) {
        while(queue.length && nums[i] > nums[queue[queue.length - 1]]) {
            queue.pop();
        }
        queue.push(i)
        while(queue[0] <= i - k) {
            queue.shift()
        }

        maxSlideArr.push(nums[queue[0]])
    }
    return maxSlideArr
};