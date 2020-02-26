/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/34/
 * 
 *  
**/

/**
 * @param {string} s
 * @return {number}
 * 执行用时：104 ms
 * 内存消耗：37.6 MB
 */
var firstUniqChar = function(s) {
    for(var i = 0, length = s.length; i < length; i++) {
        var v = s[i]
        if(s.indexOf(v) === s.lastIndexOf(v)) {
            return i
        }
    } 
    return -1;
};