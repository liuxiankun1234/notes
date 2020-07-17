/**
 *
 * 爬楼器问题
 *     地址：https://leetcode-cn.com/problems/climbing-stairs/
 * 
 * @param {number} n
 * @return {number}
 * 
 */

var cache = (function() {
    var cache = {};

    return function(key, value) {
        if(value !== undefined) {
            cache[key] = value;
            return value
        }else{
            return cache[key]
        }
    }
})();

 var cache = {};
var climbStairs = function(n) {
    if(cache[n] == null) {
        cache[n] = 
    }

    if(n === 1) return 1;
    if(n === 2) return 2;

    return climbStairs(n - 1) + climbStairs(n - 2)
};
