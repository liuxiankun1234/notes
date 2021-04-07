/**
 *  题目
 *      有效的字母异位词
 *  地址
 *      https://leetcode-cn.com/problems/valid-anagram/
 *  解题思路
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    return s.split('').sort().join('') === t.split('').sort().join('')
};


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    debugger
    if(s.length !== t.length) return false;

    const map = new Map();

    s.split('').forEach((str) => {
        if(map.has(str)) {
            let v = map.get(str);
            map.set(str, ++v)
            return 
        }
        map.set(str, 1)
    })

    const tt = t.split('');
    for(let k of tt) {
        if(map.has(k)) {
            let v = map.get(k);
            map.set(k, --v)
            continue
        }
        return false;
    }

    return [...map.values()].every(v => v === 0);
};
console.log(
    isAnagram(
        "anagram" ,
    "nagaram"
    )
)