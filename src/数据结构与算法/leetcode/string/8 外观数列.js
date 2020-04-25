
/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/39/
 *  正则还是挺有优势的 
 *  
**/
/**
 * 方法一 正则
 * @param {number} n
 * @return {string}
 * 执行用时：52 ms
 * 内存消耗：35.4 MB
**/
var countAndSay = function(n) {
    var ret = '1';
    for(var i = 1; i < n; i++) {
        // \1取第一个分组 * [0,+正无穷] 递归思想
        ret = ret.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`);
    };
    return ret;
};

/**
 *  方法二 循环 
 *  执行用时：68 ms
 *  内存消耗：35.7 MB
**/ 
var countAndSay = function(n) {
    if(n === 1) return '1';
    var count = 1,
        str = '',
        ret = '1';
    for(var i = 1; i < n; i++) {
        str = '';
        for(var j = 0; j < ret.length; j ++) {
            if(ret[j + 1] === ret[j]) {
                count++
            }else{
                str = str + count + ret[j];
                count = 1;
            }
        }
        ret = str;
    }
    return ret
};