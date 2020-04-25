/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/31/
 *  
 *  
**/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * 
 * 执行用时：56 ms
 * 内存消耗：33.7 MB
 * 
 * 解题思路：先让对角线上的元素保持一致 再处理其他元素
 */
var rotate = function(matrix) {
    // 翻转
    matrix.reverse();
    // 对位
    var length = matrix.length,
        i, j;
    for(i = 0; i < length; i++) {
        for(j = i + 1; j < length; j++) {
            var temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
};