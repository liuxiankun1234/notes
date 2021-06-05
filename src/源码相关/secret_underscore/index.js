/**
 *  待解决问题
 *      1 为什么会有optimizeCb函数？
 *          内部使用了call 代替apply 性能问题 具体什么问题呢？
 * 
 *  比较好的处理方式
 *      || && 的使用 
 *      
 * 
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
 *     为什么好使用var array = Array(length); array[i] = i; 而非push
 *  规范
 *      函数和函数之间留空格
 *      函数内部逻辑不留空格
 *      公用的变量一定要提到作用域的最上端
 *          例： var i, length; if else里都用到了这个i length 就要放在if上面
 *      重复使用的项一定要抽取变量 这个习惯很重要 
**/

/**
 *
 *  小技巧
 *      1. for循环可以通过传入的方向进行 正反方向循环
 *          dir = [-1, 1]
 *          var index = dir > 0 ? 0 : length - 1;
 *          for (; index >= 0 && index < length; index += dir) {
 *      
 *      2. Math.random 取值范围 [0, 1)     
 *      
 *      3. 随机去一个范围内的值 对比AB方法有什么不同
 *          A ===> Math.ceil(Math.random() * (max - min))
 *          B ===> Math.floor(Math.random() * (max - min + 1))
 * 
 *          假设 max - min = 2
 *          A ===> [0, 2) ===> [0, 1, 2]
 *          B ===> [0, 3) ===> [0, 1, 2]
 *          注意虽然 A B 方法得到的结果都是 [1, 2, 3] 但是范围是不同的 
 *          A方法返回0的概率极小
 *          B方法返回的概率相对均衡 返回0的概率稍微大一些 因为Math.random取值范围问题
 *      
 *      4. 闭包可以很好的保存变量 值得借鉴
 * 
**/

// import './underscore.js';
import './my_underscore'
import './test.js';