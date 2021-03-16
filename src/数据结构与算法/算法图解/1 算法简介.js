/**
 *  算法简介
 *      二分法查找
 *          使用场景    数组必须是有序的
 *          时间复杂度  O(logn) 以2w为底，n的对数
 * 
 *      时间复杂度
 *          算法的速度指的并非时间，而是操作数的增速
**/

/**
 *  二分法
 *      操作的数组必须是有序的
 *      跟猜数字性质是一样的 
 *          1 ~ 100
 *          50  大了    1 ~ 49
 *          25  大了    1 ~ 24
 *          13  小了    13 ~ 24
 *          19  bingo
 *      就是双指针 缩小范围 修正指针
 *      
*/
function binarySearch(arr, item) {
    var low = 0,
        high = arr.length - 1,
        middle,
        guess;
    
    while(low < high) {
        middle = Math.ceil((high + low) / 2),
        guess = arr[middle];

        if(guess === item) {
            return middle;
        }

        if(guess > item) {
            high = middle - 1;
        }else{
            low = middle + 1;
        }
    }
    return -1;
}

