/**
 *  名词解析
 *      identity    身份
 *      iteratee    迭代器
 *      shallow     浅
 *      match       n：比赛/火柴/相配的人  vt: 相同/适应/使较量/
 *      optimize    优化
 *      establish   建立
 *      reference   参考
 *      cornerstone 基石
 *      
 * 
**/ 

/**
 *  疑惑
 *      为什么字符串的某个属性不能被修改 
 *          var str = new String('123');
 *          Object.getOwnPropertyDescriptor(str, '0') // {value: "1", writable: false, enumerable: true, configurable: false}
 *          因为字符串的属性是不可修改的 writable false
 *          var str = '123'; str[0] = 9; console.log(str) // 123
 *          str.a =  'a' // 不同这个
 * 
 *  代码规范
 *      公用的变量一定要提到作用域的最上端
 *          例： var i, length; if else里都用到了这个i length 就要放在if上面
**/


/**
 *
 *  小技巧
 *      1. for循环可以通过传入的方向进行 正反方向循环
 *          dir = [-1, 1]
 *          var index = dir > 0 ? 0 : length - 1;
 *          for (; index >= 0 && index < length; index += dir) {
 * 
 * 
**/