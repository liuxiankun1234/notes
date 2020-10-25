/**
 *  题目地址：https://leetcode-cn.com/problems/first-unique-character-in-a-string/solution/ 
**/


/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    var ret = {},
        j = -1;
    for(var i = 0, len = s.length; i < len; i++) {
        var key = s[i],
            value = ret[key];
        if(value != null) {
            ret[key] = ++value
        }else{
            ret[key] = 1
        }
    }
    for(var k in ret) {
        var v = ret[k];
        if(v === 1) {
            j = s.indexOf(k)
            break;
        }
    }
    return j
};