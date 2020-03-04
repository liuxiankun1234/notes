/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/36/
 * 
 *  
**/
/**
 * @param {string} s
 * @return {boolean}
 * 执行用时：84 ms
 * 内存消耗：36.9 MB
 */
var isPalindrome = function(s) {
    s = s.toLocaleLowerCase().replace(/[^a-z0-9]/g, '');
    for(var i = 0, length = s.length; i < Math.floor(length / 2); i++) {
        if(s[i] !== s[length - i - 1]) return false
    }
    return true;
};