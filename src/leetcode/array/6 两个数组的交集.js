/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/26/
 *  
**/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 解题思路：排序 遍历短数组 长数组 找对应元素 
 * 执行用时：84 ms
 * 内存消耗：35 MB
 */
var intersect = function(nums1, nums2) {
    nums1 = nums1.sort((n1, n2) => n1 - n2);
    nums2 = nums2.sort((n1, n2) => n1 - n2);
    var ret = [];
    if(nums1.length > nums2.length) {
        var temp = nums2;
        nums2 = nums1;
        nums1 = temp;
    }
    for(var i = 0, length = nums1.length; i < length; i++) {
        var n = nums1[i];
        for(var j = 0, len = nums2.length; j < len; j++) {
            if(nums2[j] === n) {
                ret.push(n);
                nums2.splice(j--, 1);
                break
            }
        }
    }
    return ret;
};


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 解题思路 hashMap 
 * 执行用时：60 ms
 * 内存消耗：33.8 MB
 */
var intersect = function(nums1, nums2) {
    var map = {};
    var ret = [];
    nums1.forEach((item) => {
        if(map[item]) {
            map[item]++;
        }else{
            map[item] = 1;
        }
    });
    nums2.forEach((item) => {
        if(map[item]) {
            ret.push(item);
            map[item]--;
        }else{
        }
    });
    return ret;
};