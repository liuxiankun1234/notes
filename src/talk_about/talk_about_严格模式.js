/**
 *  严格模式总结
 *      调用严格模式
 *          为整个脚本开启严格模式
 *          为函数开启严格模式
 * 
 *      严格模式发生的变化
 *          将拼写错误转为异常
 *          简化变量的使用
 *      
 *      安全的Javascript
 * 
 *  tips:
 *      delete操作符 只能删除对象的属性 不可以删除一个变量
 *      
 *      严格模式下 
 *          未声明变量赋值会报错
 *          不支持数字八进制字面量(报错) 
 *              var a = 077; // 报错 
 *              支持 parseInt('077', 8)
 *          不能把函数命名为eval/arguments
 *          不能把参数命名为eval/arguments
 *          不能出现两个参数同名
 *          函数给arguments[x]赋值 不同步实参
 *          函数重写arguments语法错误
 *          访问arguments.callee会导致错误
 *          访问arguments.caller（ES5定义的）属性会导致错误
 *          不能为函数的caller属性赋值
 *          this在未指定情况下指向undefined
 *          eval()中创建的变量和函数不会被外部访问到
 *          为eval赋值会导致错误
 *          删除Configurable：false的属性会报错
**/

(function() {
    console.log('******************  1  ******************');
    /**
     *  将拼写错误转为异常
     * 
     *      在非严格模式下 会作用域链查找 直到window 如果window没有这个全局的属性 创建一个全局属性 挂载到window上 并且赋值
     *      在严格模式下   会认为这个是一个错误的拼写 会报错  
     * 
     *      给（数据属性writable值置为false）的对象的属性 赋值的  会报错
     *      给只读属性赋值 会报错
     *      ES5会忽略
     * 
     *      删除不可删除的属性 会报错
     *      ES5会忽略
     *      
     *      arguments命名重复 会报错
     * 
     *      给基本类型值添加属性 会报错
     *          const str = ''; str.name = '字符串' // 严格模式下会报错
     * 
     *      禁止删除声明变量
     * 
    **/
    // mistypedVaraible = 12 // 报错
    const obj = {}
    Object.defineProperty(obj, 'a', {
        writable: false,
        configurable: true,
        enumerbale: true,
        value: 'a'
    })
    // obj.a = 12 // 报错 因为obj的a在声明的时候 定义为不可修改的属性 所以赋值会报错
    var obj1 = { get x() { return 17; } };
    // obj1.x = 12 // 报错  给只读属性赋值 报错

    window.a = 12;
    delete window.a
})();
(function() {
    console.log('******************  2  ******************');
    /**
     * 
     *  简化变量的使用
     * 
     *      禁用with
     * 
     *      禁止删除声明变量
     * 
     *      传入的参数 与 arguments 不进行绑定  arguments不会被修改 一直是传入的参数
     *      ES5的arguments会对传入的参数和arguments进行绑定
     * 
     *      不支持 arguments.callee 
     *         
    **/
})();
(function() {
    console.log('******************  3  ******************');
    /**
     *      安全的Javascript  
     * 
     *          严格模式   this必需被指定值才有意义  没有指定值的话 默认指向undefiend
     *          非严格模式 this任何情况都有值 在bind call apply 一个 null undefind 也会有值
     * 
    **/

    console.log(this); // 严格模式指向undefined

    // 严格模式指定 this的值 为 true
    (function() {
        console.log(this)
    }).call(true);

    // 严格模式指定 this的值 为 window
    (function() {
        console.log(this)
    }).call(window)
})();