/**
 * @param {number[]} height
 * @return {number}
 * 前指针 后指针 区域最大值
 * 双指针法
 */
var maxArea = function(height) {
    var maxArea = 0,
        i = 0, 
        j = height.length - 1;

    maxArea = Math.min(height[i], height[j]) * (j - i);
    while(i < j) {
        if(height[i] > height[j]) {
            j--;
        }else{
            i++;
        }
        maxArea = Math.max(maxArea, Math.min(height[i], height[j]) * (j - i))
    }
    return maxArea
};