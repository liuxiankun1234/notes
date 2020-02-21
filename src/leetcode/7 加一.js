/**
 *  题目三
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/27/
 *  
 *  变量少 内存消耗少
 * 
**/

/**
 * 解法一
 * 执行用时：92 ms
 * 内存消耗：33.9 MB
 * 
**/
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    var MAX_SINGLE_NUM = 9,
        FIRST_INDEX = 0,
        last;
    
    for(var length = digits.length, i = length - 1; i >= 0; i--){
        last =  digits[i];
            
        if(last === MAX_SINGLE_NUM) {
            if(i === FIRST_INDEX) {
                digits[i] = 0;
                digits.unshift(1)
                break
            }
            digits[i] = 0;
        }else{
            digits[i] = ++last
            break;
        }
    }
    
    return digits
};