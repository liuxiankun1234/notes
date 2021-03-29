/**
 *  题目
 *      盛最多水的容器
 *  地址
 *      https://leetcode-cn.com/problems/container-with-most-water/submissions/
 *  
 *  解题思路
 *      1、暴力解法
 *          两层循环 穷举所有可能 对比每一个面积 取最大的
 *      2、夹逼法 双指针夹逼
 *          仅移动两根指针中较短的一个 
 *          
 *          
*/
/**
 * 1、暴力解法
 */
var maxArea = function(height) {
    function _getArea(i, j, arr) {
        return Math.min(arr[i], arr[j]) * Math.abs(i - j)
    }

    var maxArea = 0;
    for(var i = 0; i < height.length - 1; i++) {
        for(var j = i + 1; j < height.length; j++) {
            var area = _getArea(i, j, height);
            maxArea = Math.max(area, maxArea)
        }   
    }
    return maxArea;
};



/**
 * 2、双指针
 */
var maxArea = function(height) {
    function _getArea(i, j, arr) {
        return Math.min(arr[i], arr[j]) * Math.abs(i - j)
    }

    let maxArea = 0;

    let i = 0,
        j = height.length - 1;

    while(i < j) {
        maxArea = Math.max(maxArea, _getArea(i, j, arr));

        height[i] > height[j] ? j-- : i++;
    }

    return maxArea;
};


/**
 * 3、双指针
 */
var maxArea = function(height) {
    debugger
    function _getArea(i, j, arr) {
        return Math.min(arr[i], arr[j]) * Math.abs(i - j)
    }

    let maxArea = 0;
    for(var i = 0, j = height.length - 1; i < j;) {
        maxArea = Math.max(maxArea, _getArea(i, j, height));
        height[i] > height[j] ? j-- : i++
    }
    return maxArea;
};

maxArea([1,1])