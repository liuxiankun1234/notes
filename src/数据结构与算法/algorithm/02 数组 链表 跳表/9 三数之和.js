/**
 *  题目
 *      三数之和
 *  地址
 *      https://leetcode-cn.com/problems/3sum/
 *  
 *  解题思路
 *      1、暴力解法
 *          三层循环查找    
 *          必须排序 然后需要去重
 *              [-1, -1, 0, 0, 0, 0, 1, 1]  
 *              这种循环如果i从0开始循环 循环到1的时候 如果发现nums[0] === nums[1] 则跳过这次循环
 *              每层循环都需要去去重 
 *                  跳过 nums[i] === nums[i -1]
 *                  跳过 nums[j] === nums[j -1]
 *                  跳过 nums[k] === nums[k -1]
 *          二层循环需要从 i + 1开始
 *          三层循环需要从 j + 1开始
 *      2、hashmap
 *          两层循环 a + b = -c 的方式来判断
 *      3、夹逼法
 *          先排序数组 
 *          然后双指针查找 a + b = -c
 *         
*/

/**
 *  1、暴力法
 */
var threeSum = function(nums) {
    var selectedArr = [],
        len = nums.length;
    nums = nums.sort()
    for(var i = 0; i < len - 2; i++) {
        if((i > 0) && nums[i] === nums[i - 1]) continue
        for(var j = i + 1; j < len - 1; j++) {
            if((j > i + 1) && nums[j] === nums[j - 1]) continue
            for(var k = j + 1; k < len; k++) {
                if((k > j + 1) && nums[k] === nums[k - 1]) continue
                const n1 = nums[i],
                    n2 = nums[j],
                    n3 = nums[k];
                if(n1 + n2 + n3 === 0) {
                    selectedArr.push([
                        n1, n2, n3
                    ])
                }
            }
        }
    }

    return selectedArr; 
};


/**
 *  1、hashmap方法
 */
var threeSum = function(nums) {
    var selectedArr = [],
        len = nums.length;
    var selectMap = {};
    nums = nums.sort((a, b) => a - b);

    for(var i = 0; i < len - 1; i++) {
        if(nums[i] > 0) break;
        if(i !== 0 && nums[i] === nums[i - 1]) continue;
        for(var j = i + 1; j < len; j++) {
            // if((j > i + 1) && nums[j] === nums[j - 1]) continue;

            if(typeof selectMap[nums[j]] === 'undefined') { 
                var total = nums[i] + nums[j];
                selectMap[-total] = nums[j]
            }else{
                if(typeof selectMap[nums[j]] === 'number') {
                    selectedArr.push([
                        nums[i],
                        nums[j],
                        selectMap[nums[j]]
                    ])
                    selectMap[nums[j]] = false
                }
            }
        }
        selectMap = {}
    }
    return selectedArr; 
};


/**
 *  3、双指针
 */
// var threeSum = function(nums) {
//     debugger
//     nums = nums.sort((a,b) => a - b);

//     const indexArr = [];
//     for (let i = 0; i < nums.length; i++) {
//         if(nums[i] > 0) break;
//         if((i !== 0) && (nums[i] === nums[i - 1])) continue;
        
//         let j = i + 1,
//             k = nums.length - 1;
        
//         while(j < k) {
//             const sum = nums[i] + nums[j] + nums[k];
//             if(sum === 0) {
//                 indexArr.push([
//                     nums[i],
//                     nums[j],
//                     nums[k]
//                 ])

//                 while(j < k && nums[j] === nums[j + 1]) j++
//                 while(j < k && nums[k] === nums[k - 1]) k--
//                 j++
//                 k--
//             }else if(sum < 0) {
//                 j++
//             }else{
//                 k--
//             }
//         }
//     }

//     return indexArr;
// };
threeSum([1,2,-2,-1])