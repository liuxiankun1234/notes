/**
 * 题目
 *      合并两个有序数组
 *  地址
 *      https://leetcode-cn.com/problems/merge-sorted-array/
 *  解题思路
 *      新开一个数组，将小的值放入数组中
 *      如果某一个数组为空，则遍历另一个数组
 * 
**/

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge = function(nums1, m, nums2, n) {
    var sorted = new Array(m + n).fill(0),
        p1 = 0, 
        p2 = 0;

    while(p1 < m || p2 < n) {
        let current = 0;
        if(p1 === m) {
            current = nums2[p2++]
        }else if(p2 === n) {
            current = nums1[p1++]
        }else if(nums1[p1] < nums2[p2]) {
            current = nums1[p1++]
        }else{
            current = nums2[p2++]
        }
        sorted[p1 + p2 - 1] = current; 
    }
    for(var i = 0; i < m + n; i++) {
        nums1[i] = sorted[i]
    }
};