/**
 *  题目
 *      柱状图中最大的矩形
 *  地址
 *      https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
 *  解题思路
 *      1、暴力解法
 *          遍历每一个高度的柱子
 *              然后双指针向两侧扩散
 *              发现比当前柱子高并且没有到两端 则继续扩散
 *              否则则计算高度
 *      2、单调栈
 *          可以发现一个规律 每次如果柱子高度是增加的 那么面积也是扩大的 否则面积就是收敛的 
 *          所以遇到矮的柱子那么就可以确定之前的高柱子的最大面积 
 *          这个就可以通过一个栈来解决问题
 *          举例子
 *          [2,5,6,2] ----> [0, 2,5,6,2,0]
 *          2 5 6都是递增的 
 *          那么把把索引位置给记住 [0, 1, 2, 3]
 *          再遇到2的时候 高度比3小的  那么栈顶的面积就是可以计算出来的
*/


/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    function _getArea(width, height) {
        return width  * height
    }
    var _maxArea = 0;
    for(var i = 0, len = heights.length; i < len; i++) {
        var left = i - 1,
        right = i + 1;
    
        while(left >= 0 && heights[left] >=  heights[i]) {
            left--
        }

        while(right <= len - 1 && heights[right] >= heights[i]) {
            right++
        }
        _maxArea = Math.max(_maxArea, _getArea(right - left - 1, heights[i]))
    }
    return _maxArea;
};

// https://leetcode.com/problems/largest-rectangle-in-histogram/discuss/527399/Javascript-using-stack-(Detail-breakdown)
var largestRectangleArea = function(heights) {
    var _maxArea = 0,
        heights = [0, ...heights, 0],
        stack = [];

    for(var i = 0; i < heights.length; i++) {
        while(stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            // 计算栈内元素的最大高度
            var j = stack.pop();

            _maxArea = Math.max(_maxArea, heights[j] * (i - stack[stack.length -1] - 1))
        }
        stack.push(i)
    }
    
    return _maxArea;
};
console.log(
    largestRectangleArea(
        [2,1,5,6,2,3])

)