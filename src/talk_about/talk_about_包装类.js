/**
 *  本期讨论问题 
 *      1 (1) 1.0  
 *      1..valueOf() 1.0.valueOf() (1).valueOf() 1.valueOf()
 *      
 *      透过问题看本质，我们要讨论的问题 也许是 基本Number类型 和 包装类的转换 问题
 *      又或许里面有一个 Number整型和浮点型 与包装类的关系
 *      接下来我们慢慢来看这个问题吧
 *      
 *      此题在 /高程3/第五章/引用类型中有详细说明
 * 
 * 
 * 
 *      
 *      Object(1) === new Object(1) === new Number(1)
 *          
 * 
**/
(function(){
    /**
     *  题外话
     *      Object(obj)
     *      Number(n)
     *      String(str)
     *      Boolean(boolean)
     *      上面的方法执行的时候都干了什么？？？
     *      
     *      1 Object()
     *          Object构造函数为给定值创建一个对象包装器,Object() 执行等同于 new Object()执行
     *          实参如果是 null or undefined 返回一个空对象
     *          实参如果是 数字类型           返回一个包装过的Number对象
     *          实参如果是 字符串类型         返回一个包装过的String对象
     *          实参如果是 布尔类型           返回一个包装过的Boolean对象
     *          
     *      2 Number()
     *          非构造函数调用，Number()方法用来执行 类型转换
     *          new调用，返回一个Number的包装类
     * 
     *          Number()是如何工作的呢？
     *              没有参数 返回 0
     *              有参数呢 调用toNumber()
     *                  undefined --> NaN
     *                  null      --> 0
     *                  Boolean   --> 1 or 0
     *                  String    --> n or NaN
     *                  Symbol    --> 异常错误
     *                  Object    --> 看valueOf()吧
     *                  
     *      3 String()
     *          非构造函数调用，等同于调用形参的toString()方法
     *          undefined   --> 'undefined'
     *          null        --> 'null'
     *          123         --> '123'
     *          {}          --> '[object Object]'
     *          []          --> ''
     *          Boolean     --> 'true' or 'false'
     *          Symbol()    --> 'Symbol'
     * 
     *      4 Boolean()
     *          falsy值都会返回false，其他返回true
     *          falsy值： 0 '' false undefined null NaN
     *          注意：
     *              new Boolean(true) !== true // 一个是对象 一个是基本类型值
    **/

    // Object
    Object(null) // {}
    Object(undefined) // {}
    Object({}) // {}
    Object(1) // Number对象，原始值是1
    Object('1') // String对象，原始值是字符串1

    // Number
    Number(true) // 1
    Number(false) // 0
    Number(12.2) // 12.2
    Number('12') // 12
    Number('12a') // NaN
    Number({}) // NaN
    Number({valueOf(){return 3}}) // 3

    // String

})();


