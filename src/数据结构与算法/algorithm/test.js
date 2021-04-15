var maxSlidingWindow = function(nums, k) {
    const n = nums.length;
    const prefixMax = new Array(n).fill(0);
    const suffixMax = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (i % k === 0) {
            prefixMax[i] = nums[i];
        } else {
            prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
        }
    }
    for (let i = n - 1; i >= 0; --i) {
        if (i === n || (i + 1) % k === 0) {
            suffixMax[i] = nums[i];
        } else {
            suffixMax[i] = Math.max(suffixMax[i + 1], nums[i]);
        }
    }
    const ans = [];
    for (let i = 0; i < n - k + 1; i++) {
        ans.push(Math.max(suffixMax[i], prefixMax[i + k - 1]));
    }
    return ans;
};  

nums = [1,3,-1,-3,5,3,6,7]
k = 3
maxSlidingWindow(nums, k)
