/**
 *  引用类型
 *  
 *  Object类型
 *      创建对象方式
 *          new Object()
 *          对象字面量 {}
 *      对象属性都是字符串/Symbol 
 *          Number Boolean undefined null Object 类型会转成字符串类型(toString)
 *      对象字面量也是参数的首选类型
 *          必需值使用命名参数 非必须值使用对象字面量封装
 *      访问
 *          .  只能是字符串类型
 *          [] 可以传变量/字符串 非标准标识符(属性)
 *              数字属性
 *              带空格属性
 *              关键字/保留字属性 都需要括号访问
 *  Array类型
 *      同其他语言不同
 *          每项可以保存不同类型数据
 *          数组的长度是可以动态调整的
 *      创建数组方式
 *          new Array(length) === Array(length) 一些源码库就这么创建数组
 *              传递参数为一个数值(n) 表示创建一个长度n的数组
 *              传递其他参数 表示创建一个包含初始项的数组
 *          对象字面量 []
 *      数组最大长度 Math.pow(2, 32) - 1 
 *      检测数组
 *          instanceof
 *              页面中有其他iframe 存在两个Array构造函数 就有问题了 不同的引用
 *          Array.isArray()
 *      
 *  提示：
 *      {(左花括号)出现在一个语句上下文中 表示一个代码块的开始
 *      {} + {} // "[object Object][object Object]"
 *      {} + [] // 0
 *      [] + {} // "[object Object]"
 *      null + undefined // NaN
 *      null + '' // "null"
 *      undefined + '' // "undefined"
 * 
 *  Date类型
 *      略
 *  RegExp类型
 *      详情：/talk_about/talk_about_正则表达式迷你书.js
 *           /talk_about/talk_about_正则表达式.js
 *  Function类型
 *      函数是对象，函数名是指针
 *      没有重载   
 *          其他语言定义两个签名不同即可定义两个同名函数
 *          JS不支持 可以通过传入参数类型 数量作出不同反应 模仿重载
 *      函数内部属性
 *          arguments.callee 一个指向当前arguments所属函数的指针
 *          arguments.callee.caller 保存着调用当前函数的引用 全局调用指向null
 *      函数属性和方法         
 *          call/apply/bind
 *              改变函数作用域
 *          
**/