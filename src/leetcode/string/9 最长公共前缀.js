
/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/40/
 * 
 *  
**/
/**
 * @param {string[]} strs
 * @return {string}
 * 执行用时：64 ms
 * 内存消耗：36 MB
 */
var longestCommonPrefix = function(strs) {
    if(strs == null || strs.length === 0) return '';

    var result = '';
    var minLenStr = strs[0];
    for(let i = 1, length = strs.length; i < length; i++) {
        if(strs[i].length < minLenStr.length) minLenStr = strs[i];
    }

    for(let i = 0, len = minLenStr.length; i < len; i++) {
        let j = i + 1;
        var left = minLenStr.slice(0, j);
        
        for(var index = 0, length = strs.length; index < length; index++) {
            let s = strs[index].slice(0, j);
            if(s !== left) break;
            if(index === length - 1) {
                result = left
            }
        }
    }
    return result
};