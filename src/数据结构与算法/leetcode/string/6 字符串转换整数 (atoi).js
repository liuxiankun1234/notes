/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/37/
 * 
 *  
**/
/**
 *  执行用时：80 ms
 *  内存消耗：36.8 MB
**/
var myAtoi = function(str) {
    var MIN_SAFE_INTEGER = Math.pow(-2, 31),
        MAX_SAFE_INTEGER = Math.pow(2, 31) - 1;
        var s = '', symbol = 1;
      
    str = str.replace(/^\s+/g, '');
    for(var i = 0, length = str.length; i < length; i++) {
        var n = str[i];
        if(i === 0) {
            if(!/[0-9\+\-]/.test(n)) return 0;
            if(/\d/.test(n)){
                 s += n;
                 continue
            };
            symbol = n === '+' ? 1 : -1
        }else{
            if(!/\d/.test(n)) break;
            s += n;
        }
    }
    s = s * symbol;
    return symbol === 1 ? Math.min(MAX_SAFE_INTEGER, s) : Math.max(MIN_SAFE_INTEGER, s);
};