/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/32/
 * 
 *  
**/
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * 
 * 执行用时：164 ms
 * 内存消耗：47.2 MB
 * 
 */
var reverseString = function(s) {
    for(var i = 0, length = s.length; i < Math.floor(length / 2); i++) {
        var lastN = length - 1 - i;
        var temp = s[i];
        s[i] = s[lastN];
        s[lastN] = temp;
    }
    return s
};

// 执行用时：132 ms
// 内存消耗：46.7 MB

var reverseString = function(s) {
    return s.reverse();
};

