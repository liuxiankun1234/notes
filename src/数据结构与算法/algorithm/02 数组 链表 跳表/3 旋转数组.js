/**
 *  注
 *      最大公约数
 *          12 15 最大公约数是 3
 *          可以被两个数同时整除的数,最大的一个就是最大公约数
 *      最小公倍数
 *          4 倍数 4 8 12 16
 *          6 倍数 6 12 18
 *          4和6的最小公倍数 就是12
 *          2 * 2 * 3
 *  题目
 *      旋转数组
 *  地址
 *      https://leetcode-cn.com/problems/rotate-array/
 *  解题思路
 *      1、暴力解法
 *          新开一个数组，然后将 (i+k) % n的位置赋值上新的数组
 *      2、环状替换
 *          我们用一个变量就可以存下来移动k个位置要替换的元素，每次都替换这个值，直到回到原点 就结束这一圈 循环下一圈
 *          [1,2,3,4,5] 长度n是5 移动步数是k
 *              k = 1 
 *                  [1,2,3,4,5]
 *                      移动1步 遍历了5个元素 1圈完成 依次遍历元素1,2,3,4,5
 *              k = 2
 *                  [1,2,3,4,5,1,2,3,4,5] 
 *                      移动2步 遍历了5个元素 1圈完成 依次遍历元素1,3,5,2,4
 *              k = 3
 *                  [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5] 
 *                      移动3步 遍历了5个元素 1圈完成 依次遍历元素1,4,2,5,3
 *              k = 4
 *                  [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5] 
 *                      移动4步 遍历了5个元素 1圈完成 依次遍历元素1,5,4,3,2
 *          [1,2,3,4,5,6] 长度n是6 移动步数是k
 *              k = 1 
 *                  [1,2,3,4,5,6]
 *                      移动1步 遍历了6个元素 1圈完成 依次遍历元素1,2,3,4,5,6
 *              k = 2 
 *                  [1,2,3,4,5,6,1,2,3,4,5,6]
 *                      移动2步 遍历了3个元素 2圈完成 依次遍历元素1,3,5,2,4,6
 *              k = 3
 *                  [1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]
 *                      移动3步 遍历了2个元素 3圈完成 依次遍历元素1,4,2,5,3,6
 *              k = 4
 *                  [1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]
 *                      移动4步 遍历了3个元素 2圈完成 依次遍历元素1,5,3,2,6,4
 *              k = 5
 *                  [1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]
 *                      移动5步 遍历了6个元素 1圈完成 依次遍历元素1,6,5,4,3,2
 *          所以能看出来 只要遍历 k 和 n的最大公约数圈数 就可以完成
 *      3、数组翻转
 *          [1,2,3,4,5] 长度n是5 移动步数是k
 *              k = 2   结果是 [4,5,1,2,3]
 *              整体翻转数组 [5,4,3,2,1]
 *              翻转0-2     [4,5,3,2,1]
 *              翻转2-5     [4,5,1,2,3]
 *                  
 * 
*/

// 最大公约数
const gcd = (x, y) => y ? gcd(y, x % y) : x;
// [1,2,3,4,5] 2
// 环状替换法
var rotate = function(nums, k) {
    let n = nums.length,
        // 遍历的圈数
        count = gcd(n, k);

    for(var i = 0; i < count; i++) {
        let currentIndex = i,
            prev = nums[i]; // 1 3 5
        do{
            currentIndex = (currentIndex + k) % n; // 2 4
            const temp = nums[currentIndex]; // 3 // 5
            nums[currentIndex] = prev; // 1 
            prev = temp;
        }while(i !== currentIndex)
    }
};

// 翻转数组方法
var rotate = function(nums, k) {
    var n = nums.length;
    k %= n;
    const _reverse = function(nums, start, end) {
        while(start < end) {
            const temp = nums[start];
            nums[start] = nums[end]
            nums[end] = temp;
            start++
            end--
        }
    }
    _reverse(nums, 0, n - 1)
    _reverse(nums, 0, k - 1)
    _reverse(nums, k, n - 1)
};


var rotate = function(nums, k) {
    var prevNum = nums[0],
        curIndex = 0;

    k %= nums.length;
    for(var i = 0; i < nums.length; i++) {
        do{
            curIndex = (curIndex + k) % nums.length;
            var temp = nums[curIndex]
            nums[curIndex] = prevNum
            prevNum = temp
        }while(i !== curIndex)
    }
};

rotate([1,2,3,4,5,6,7], 3)