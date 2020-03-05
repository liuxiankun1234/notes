/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/24/design/58/
 * 
 *  更优解 underscore _.shuffle()
 * 
**/
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.nums = nums;
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.nums;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    var nums = this.nums.slice(0);
    
    // [min, max]
    var random = function(min, max) {
        if(max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    
    var sample = function (array, n) {
        if(n == null){
            return array[random(array.length -1)];
        }
        // n 取值范围 [0, array.length]
        n = Math.max(Math.min(array.length, n), 0);
        var last = array.length - 1;
        for(var i = 0; i < n; i++) {
            var rand = random(i, last);
            var temp = array[rand];
            array[rand] = array[i];
            array[i] = temp;
        }
        return array.slice(0, n)
    }
    
    return sample(nums, Infinity);
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */