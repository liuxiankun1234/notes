/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/5/strings/33/
 * 
 *  
**/

/**
 * @param {number} x
 * @return {number}
 * 执行用时：88 ms
 * 内存消耗：36.1 MB
 */
var reverse = function(x) {
    var first = x.toString()[0],
        isNumber = /\d/g.test(first),
        last = x.toString().slice(1).split('').reverse().join(''),
        delZeroLast = last.replace(/^\s/g, ''),
        result;
    
    result = isNumber ? +(delZeroLast + first) : -delZeroLast;
    if(result >= Math.pow(-2, 31) && result <= Math.pow(2, 31) - 1) {
        return result
    }
    return 0
};

// 更优解 单独处理number的方式
var reverse = function(x) {
    var result = 0;
        MAX_SAFE_NUMBER = 2147483647,
        MIN_SAFW_NUMBRE = -2147483648,
        a = Math.pow(2, 32),
        b = Math.pow(-2, 31),
        c = Math.pow(2, 23)
        // 判断正负数
        sign = x > 0 ? 1 : -1;
        // 变整数
        x = x * sign;
    
    while(x) {
        // 右侧位元素
        var left = x % 10; 
        x = Math.floor(x / 10);

        result = result * 10 + left;
        if(result > MAX_SAFE_NUMBER || result < MIN_SAFW_NUMBRE) return 0
    }
    return sign * result
};
