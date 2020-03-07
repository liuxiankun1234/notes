import _ from 'underscore'
(function() {
    /**
     *  读书笔记 
     *      underscore的环境判断
     * 
     *  短路表达式
     *      && 运算符号优先级大于 || 
     *      a && b 当a为真的时候返回b， a为假 b不执行
     *      a || b 当a为假的时候返回b， a为真 b不执行
     * 
     *  self指的是window，为什么使用self而不使用window呢？
     *      服务于更多场景 web Workers
     * 
     *  为什么使用void 0 代替 undefined？
     *      undefined是一个全局变量，防止被其他人重写
     *          低版本IE浏览器中 undefined 可以被重写 
     *          在函数内部通过var声明一个局部变量会改变作用域查找 返回重新定义的值 如 var undefined = 1; console.log(undefined) // 1
     *      节省字节
     *      void 对给定的表达式进行求值 然后返回undefined    
     *  null 是一个关键字 undefined是一个全局变量
     *      JS不允许将关键字作为标识符使用 但是可以作为对象的属性名使用
     *      var null = 12;// JS语法错误
     *      var o = {null: 1} // 符合语法 不推荐
     *  
     *  正确获取undefined的方式
     *      jquery 不传实参  
     *      underscore void 0
    **/
    var root = typeof self === 'object' && self.self === self && self ||
                typeof global === 'object' && global.global === global && global ||
                this || {};
            
    /**
     *  underscore的环境判断
     * 
     *  短路表达式
     *      && 符号优先级大于 || 
     *      a && b 当a为真的时候返回b， a为假 b不执行
     *      a || b 当a为假的时候返回b， a为真 b不执行
     * 
     *  self指的是window，为什么使用self而不使用window呢？
     *      服务于更多场景 web Workers
     * 
    **/
    // console.dir(_)
    // console.dir(typeof _())
    
    // const fun = _.iteratee(null)
    // console.log(fun);
    _.each([1, 2, 3], function(item){
        console.log(item)
    });
    _.each({
        a: 'value_a',
        b: 'value_b'
    }, (value, key, data) => {
        console.log(key, value, data)
    })
})();