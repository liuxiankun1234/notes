/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/35/
 *  字母异位: 两个单词如果包含相同的字母，次序不同，则称为字母易位词(anagram)
 *      字母易位词
 *          silent listen
 *      非字母易位词
 *          apple aplee
 * 
 * 
**/

/**
 * 解题思路：变量存储
 * 执行用时：80 ms
 * 内存消耗：36.3 MB
**/
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
    var o = {};
    var i, length;
    for(i = 0, length = s.length; i < length; i++){
        if(o[s[i]]) {
            o[s[i]]++;
        }else{
            o[s[i]] = 1;
        }
    }
    for(i = 0, length = t.length; i < length; i++) {
        if(o[t[i]]) {
            o[t[i]]--;
            if(o[t[i]] === 0) delete o[t[i]];
        }else{
            return false;
        }
    }
    return !Object.keys(o).length
};

/**
 *  方法二
 *  执行用时：72 ms
 *  内存消耗：36 MB
**/
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
    var o = {};
    var i, length;
    for(i = 0, length = s.length; i < length; i++){
        o[s[i]] = (o[s[i]] || 0) + 1;
        o[t[i]] = (o[t[i]] || 0) - 1;
    }
    for(var k in o) {
        if(o.hasOwnProperty(k) && o[k] !== 0) {
            return false
        }
    }
    return true
};

