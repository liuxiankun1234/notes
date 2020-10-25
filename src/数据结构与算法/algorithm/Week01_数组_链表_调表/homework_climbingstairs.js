/**
 *
 * 爬楼器问题
 *     地址：https://leetcode-cn.com/problems/climbing-stairs/
 * 
 * @param {number} n
 * @return {number}
 * 
 */
var cache = {};
var climbStairs = function(n) {
    debugger
    if(cache[n] != null) {
        return cache[n] 
    }

    if(n === 1 || n === 2) {
        return cache[n] = n
    };

    return cache[n] = climbStairs(n - 1) + climbStairs(n - 2)
};