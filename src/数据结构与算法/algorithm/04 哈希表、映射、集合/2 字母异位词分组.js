/**
 *  题目
 *      字母异位词分组
 *  地址
 *      https://leetcode-cn.com/problems/group-anagrams/
 *  解题思路
*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let map = new Map();

    for(let str of strs) {
        // 转成排序的字符串key
        let key = Array.from(str).sort().toString();

        if(map.has(key)) {
            map.get(key).push(str)
        }else{
            map.set(key, [str])
        }
    }
    return [...map.values()]
};
