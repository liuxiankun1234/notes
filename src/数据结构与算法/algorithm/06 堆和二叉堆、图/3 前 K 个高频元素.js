/**
 *  题目
 *      前 K 个高频元素
 *  地址
 *      https://leetcode-cn.com/problems/top-k-frequent-elements/
 *  解题思路
 *      1、快排   这个到时候可以看下
 *      2、大顶堆
*/
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    arr = arr.sort((a, b) => a - b);
    return arr.slice(0, k)
};

