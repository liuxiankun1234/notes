/**
 *  题目
 *      最小的k个数
 *  地址
 *      https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/
 *  解题思路
 *      1、sort slice
 *      2、快排
 *      3、小顶堆
 *  辅助网站
 *      https://visualgo.net/zh/bst
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

