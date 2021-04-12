var merge = function(nums1, m, nums2, n) {
    var i = 0,
        j = 0,
        nums = new Array()

    while(i < m || j < n) {
        if(i === m) {
            nums.push(nums2[j++])
        }else if(j === n) {
            nums.push(nums1[i++])
        }else if(nums1[i] > nums2[j]) {
            nums.push(nums2[j++])
        }else{
            nums.push(nums1[i++])
        }
    }
    nums.forEach((item, i) => {
        nums1[i] = item
    })
    return nums1
};

merge([1,2,3,0,0,0], 3, [2,5,6], 3)