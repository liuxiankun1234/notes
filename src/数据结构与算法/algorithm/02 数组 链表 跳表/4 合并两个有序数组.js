/**
 * 题目
 *      合并两个有序数组
 *  地址
 *      https://leetcode-cn.com/problems/merge-sorted-array/
 *  解题思路
 *      1
 *          新开一个数组，将小的值放入数组中
 *          如果某一个数组为空，则遍历另一个数组
 *      2
 *          不需要新开一个数组 直接在nums1上倒叙插入  把大的依次往nums1的数组内后插入
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


var merge = function(nums1, m, nums2, n) {
    var sortArr = new Array(),
        i = 0, 
        j = 0;
    
    while(i <= m - 1 || j <= n - 1) {
        if(i === m) {
            sortArr.push(nums2[j++])
        }else if(j === n) {
            sortArr.push(nums1[i++])
        }else if(nums1[i] > nums2[j]) {
            sortArr.push(nums2[j++])
        }else{
            sortArr.push(nums1[i++])
        }
    }
    sortArr.forEach((item, i) => {
        nums1[i] = item
    })
};

var merge = function(nums1, m, nums2, n) {
    var i = m - 1,
        j = n - 1,
        tail = m + n - 1,
        cur;

    while(i >= 0 || j >= 0) {
        if(i === -1) {
            cur = nums2[j--]
        }else if(j === -1) {
            cur = nums1[i--]
        }else if(nums1[i] > nums2[j]) {
            cur = nums1[i--]
        }else{
            cur = nums2[j--]
        }
        nums1[tail--] = cur
    }
};