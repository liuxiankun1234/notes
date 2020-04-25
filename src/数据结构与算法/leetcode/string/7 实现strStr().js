/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/38/
 * 
 *  
**/
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 * 执行用时：72 ms
 * 内存消耗：33.6 MB
 */

var strStr = function(haystack, needle) {
    var haystackLen = haystack.length,
        needleLen = needle.length; 
    if(haystackLen < needleLen) return -1;
    for(var i = 0, length = haystackLen - needleLen; i <= length; i++) {
        if(haystack.slice(i, i + needleLen) === needle){
            return i;
        }
    }
    return -1;
};


var strStr = function(haystack, needle) {
    return haystack.indexOf(needle);
};
