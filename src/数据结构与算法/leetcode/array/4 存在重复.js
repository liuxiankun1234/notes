/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/24/
 *  
 *  sort 算法为啥快 ？ 应该做一个总结
 *  总结
 *      使用es6的Set是效率最高的
 *      循环嵌套会使程序运行时间复杂度大很多
 * 
 *      解法一 存在循环嵌套的问题 时间复杂度大
 *      解法二 两次循环 时间复杂度相对较小
 *      解法三 最优解
 *  
**/

/**
 * 解法一
 * 执行时间 1052ms
**/

var containsDuplicate = function(nums) {
    var length = nums.length,
        i, k;
    for(i = 0; i < length - 1; i++) {
        for(k = i + 1;  k < length; k++) {
            if(nums[i] === nums[k]) {
                return true
            }
        }
    }
    
    return false
};



/**
 * 解法二
 * 执行时间 92 ms
 * 
**/

var containsDuplicate = function(nums) {
    nums = nums.sort((a, b) => a - b);

    for(i = 1, length = nums.length; i < length; i++) {
        if(nums[i] === nums[i - 1]) {
            return true
        }
    }
    
    return false
};

/**
 * 解法三
 * 执行时间 60 ms
 * 
**/

var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};
