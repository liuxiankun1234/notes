/**
 *  题目
 *      爬楼梯
 *  地址
 *      https://leetcode-cn.com/problems/climbing-stairs/submissions/
 *  
 *  解题思路
 *     1、暴力解法
 *          爬1层楼梯 需要1步 
 *          爬2层楼梯 需要2步 一层一层 两层
 *          爬3层楼梯 需要3步 一层一层一层 一层两层 两层一层
 *          爬4层楼梯 需要5步 ...
 *          能发现规律 爬第n节台阶时，只能从n-1和n-2台阶爬上来 
 *          climbStairs(n) = climbStairs(n - 1) + climbStairs(n - 2)
 *          递归函数时间复杂度 2的n次方
 *      2、数组缓存变量
 *          使用数组缓存下上每层台阶的步数
 *      3、使用变量缓存
 *          仅需要维护最后一步 和 最后两步需要的次数即可
*/
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n === 1) return 1;
    if(n === 2) return 2;
    return climbStairs(n - 1) + climbStairs(n - 2);
};

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    var stairs = [0, 1, 2]
    if(n === 0) return 0;
    if(n === 1) return 1;
    if(n === 2) return 2;
    
    for(var i = 3; i <= n; i++) {
        stairs[i] = stairs[i - 1] + stairs[i - 2]
    }
    return stairs[n]
};

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    var stairs = [0, 1, 2]
    if(n === 0) return 0;
    if(n === 1) return 1;
    if(n === 2) return 2;
    
    for(var i = 3; i <= n; i++) {
        stairs[i] = stairs[i - 1] + stairs[i - 2]
    }
    return stairs[n]
};


/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    var a = 0,
    b = 1,
    c;
    /**
     *  维护最近两个台阶的次数即可 
     *  c中间变量
     *  b 爬倒数第一个台阶需要的步数
     *  a 爬倒数第二个台阶需要的步数
    */
    for(var i = 0; i < n; i++) {
        c = a + b;
        a = b;
        b = c;
    }

    return c;
};


climbStairs(0)