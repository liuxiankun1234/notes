/**
 *          尾调用优化了解一下
 * 
 *          Math.max.apply(Math, [1,2,3,4,4]) // 查找最大数
 *      默认参数
 *          ES6中使用了默认参数 函数会自动严格模式下执行 
 *          默认参数只可以引用前面的，不允许引用后面的(暂时性死区)
 *          ES5默认参数
 *              // falsy值都走默认值
 *              timeout = timeout || 2000;
 *              // 传入undefined走默认值
 *              timeout = typeof timeout !== 'undefined' ? timeout : 2000;
 *          ES6默认参数
 *              仅传入undefined(包括不传值 默认参数undefined)时候才会走默认值 (区别于flasy值)
 *              function f(timeout = 2000) {}
 *      
 *      非严格模式下 
 *          arguments同实参进行绑定(相当于同一个值的引用，互相关联 如果arguments重写脱离关系)
 *          arguments同未传入的实参不进行绑定(相当于不同值的引用，不做关联)
 * 
 *      严格模式下
 *          arguments不可以重写
 *          arguments不跟实参绑定 内部修改实参不改变arguments
 *      
 *      剩余参数 ...keys(将不定参数整合成数组)
 *          限制
 *              function.length的不包括不定参数
 *              不定参数只能在形参列表的最后
 *              不定参数最多只能声明一个
 *              不可以在对象字面量的setter中使用(set() {}参数只能有一个)
 *          
 *      展开运算符
 *          指定一个数组 将他们打散后作为各自独立的参数传入函数
 *          展开运算符同for-of一样 仅处理有[Symbol.iterator]属性的对象(迭代器对象)
 *          
 * 
 *      
 *      JS函数有两个不同的内部方法 [[call]] [[construct]]
 *      通过new关键字调用函数时 执行的是[[construct]]函数 它通常负责创建一个实例 执行函数体 绑定this 返回这个实例
 *      如果不是通过new关键字调用 则执行[[call]]函数 从而直接执行代码中的函数体
 *      箭头函数没有 [[construct]] 这个函数体
 *      如何判断函数是否被实例化
 *          es5解决方案 instanceof 关键字
 *          es6解决方案 new.target === Person
 *              元属性：指非对象的属性
 *              元属性的指针指向 当前this对应的构造函数(注意继承) 同 instanceof不同的是 instanceof 是可以原型链逐层查找 new.target 是指当前实例的构造函数
 *              当调用函数的[[Construct]]方法时 new.target 被赋值为new操作符的目标 新创建的实例对象的构造函数
 *              当调用函数的[[Call]]方法时 new.target 被赋值为undefined
**/

function a() {
    b();
}
function b() {
    c();
}
function c() {
    console.log(c)
}
// a();


;(function() {
    function mixArgs(first, second) {
        console.log(first === arguments[0])
        console.log(second === arguments[1])
    
        first = 'c'
        second = 'd'
    
        console.log(first, JSON.stringify(arguments))
        console.log(second, arguments[1])
    }
    
    mixArgs('a')
});


;(function() {
    function mixArgs(first, second = 'b') {
        console.log(`arguments.length: ${arguments.length}; arguments: ${JSON.stringify(arguments)}`)
        console.log(first === arguments[0])
        console.log(second === arguments[1])
    
        first = 'c'
        second = 'd'

        console.log(first === arguments[0])
        console.log(second === arguments[1])
    }
    
    mixArgs('a')
    // 1 true false (arguments[0] === undefined second === 'b') false false
});

(function() {
    // function add(first, second = first) {
    //     return first + second
    // }
    // console.log( add(1) )
    function add_v2(first = second, second) {
        console.log(first, second)
        return first + second
    }
    console.log( add_v2(undefined, 2) )
    // 浏览器会报错 暂时性死区 second在变量声明赋值之前被使用了  
    // 浏览器解析为
    //     let first = second;
    //     let second = 2
});

(function() {
    /**
     *      不定参数 ...keys
     *          不定参数keys是一个数组
     *          不定参数必需在参数列表的最后
     *          不可以在对象字面量的setter中使用
     **/ 
    
    function pick(object, ...keys) {
        console.log('keys ------->', Object.prototype.toString.call(keys), keys)
        console.log('pick', arguments.length)
        console.log(`arguments: ${JSON.stringify(arguments)}; arguments.length: ${arguments.length}`)
        let result = Object.create(null);

        for( let i =0; i < keys.length; i++){
            result[ keys[i] ] = object[ keys[i] ]
        }

        return result
    }
    var obj = pick({
        author: 'lxk',
        name: '刘先坤',
        age: '18'
    }, 'author', 'age')

    console.log(obj)


    // 不定参数不能用于对象字面量setter中
    // 因为setter参数有且只有一个
    var obj = {
        _name: 'defalut',
        set name(value){
            this._name = value
        },
        get name() {
            return this._name
        }
    }
});

(function() {
    /**
     *      展开运算符
     *          指定一个数组 将他们打散后作为各自独立的参数传入函数
     *          代替apply方法
     *          只能展开含有iterator迭代器的参数
     *         
     **/ 
    let value1 = 100,
        value2 = 200,
        values = [-1,-2,-3,-4,-5,-6]
    console.log( Math.max(value1, value2) ) 

    //Math.max 想取一个数组内的最大值
    // es5时期
    console.log( Math.max.apply(Math, values) ) 
    // es6时期
    console.log( Math.max(...values) ) 
    // 设置最小限制 防止混入负数
    console.log( Math.max(...values, 0) ) 


    function f(){
        console.log(...'1212313')
    }
    f(1,2,3,4,5)
});
(function(){
    /**
     *  name属性 
     *  
     *  tips: 
     *      函数name属性的值不一定是引用同名变量 只是协调测试用的额外信息 不能使用name属性获取函数的引用
    **/
    function doSomething() {
    }
    var doAnotherThing = function () {
    }
    console.log(
        doSomething.name, // doSomething
        doAnotherThing.name, // doAnotherThing
    )

    /**
     *  name属性的特殊情况
     *      通过name访问函数名时 函数functionName权重 比 函数被赋值给一个变量的权重高 
     *      setter函数的名称中 有前缀 set
     *      getter函数的名称中 有前缀 get
     *      bind()绑定的函数中 有前缀 bound
     *      通过new Function创建的函数名称是 anonymous（匿名）
     * 
    **/
    var doSomething = function doSomethingElse() {}
    var person = {
        get firstName() {
            return 'lxk'
        },
        sayName() {
            console.log(this.name)
        }
    }
    console.log(
        doSomething.name, // doSomethingElse
        person.firstName.name, // get firstName
        person.sayName.name, // sayName
        doSomething.bind(this).name, // bound doSomethingElse
        new Function().name, // anonymous
        new Function('...keys', 'console.log(...keys)').name
    )
});
(function() {
    /**
     *  明确函数的多重用途
     *      JS函数有两个不同的内部方法 [[call]] [[construct]]
     *      通过new关键字调用函数时 执行的是[[construct]]函数 它通常负责创建一个实例 执行函数体 绑定this 返回这个实例
     *      如果不是通过new关键字调用 则执行[[call]]函数 从而直接执行代码中的函数体
     *      箭头函数没有 [[construct]] 这个函数体
     * 
     *  如何判断函数是否被实例化
     *      instanceof 关键字
     *      
     * 
     **/
    /**
     *  es5解决方案
     *      存在问题： Person.call(person) 也可以调用
     *      函数内部无法区分 是通过 call/apply调用 还是 new 调用的 
     * 
    **/
    function Person(name) {
        if(this instanceof Person){
            this.name = name
            return
        }
        throw new Error('必需通过new关键字调用！')
    }
    function AnPerson(name) {
        // 报错 this不是Person构造函数实例
        Person.call(this, name)
    }
    var person = new Person('lxk');
    var notAPerson = new AnPerson('lxk');
    /**
     *      es6解决方案
     *          new.target 元属性
     *          元属性：指非对象的属性  
     *          必须在函数内部使用
     *          当调用函数的[[Construct]]方法时 new.target 被赋值为new操作符的目标 通常是新创建的实例对象
     *          当调用函数的[[Call]]方法时 new.target 被赋值为undefined 
     *          函数外使用new.target语法错误
     *          new.target === Person
     **/
    function Person(name) {
        if(new.target === Person){ // typeof new.target !== 'undefined'
            this.name = name
            return
        }
        throw new Error('必需通过new关键字调用！')
    }
    function AnPerson(name) {
        // 报错 this不是Person构造函数实例
        Person.call(this, name)
    }
    new AnPerson()
});
(function() {
    /**
     *  块级函数 
     *      ES3版本中，在代码块中声明一个函数声明是一个语法错误 （但是各个浏览器厂商支持这个特性，支持不同）
     *      ES5中 也会抛出错误
     * 
     *      ES6中
     *          严格模式    函数在块级作用域内部提升
     *          非严格模式  函数在上一函数域中
    **/
    /**
     *  ES5报错
     *  ES6 严格模式下 在块作用域中声明函数
     *      非严格模式下 在上一函数域中声明函数
     * 
    **/
    'use strict'
    if(true){
        function f() {
            console.log(f)
        }
        // 打印函数
        console.log(`f---------------->${f}`)
    }
    // ReferenceError
    console.log(`f---------------->${f}`)
});

(function() {
    /**
     *      箭头函数
     *          不可以改变this的指向 
     *              箭头函数的this值不受bind call apply 的影响
     *              call/apply/bind 绑定值会被忽略
     *          不支持arguments对象 必需通过命名参数和不定参数这两种形式访问函数的参数
     *          没有this super arguments new.target 绑定 这些值由外围最近一层非箭头函数决定
     *          没有[[construct]]方法 不能被用作构造函数 new调用会报错
     *          没有原型 不存在prototype
     *          不支持重复的命名参数 传统函数中 只有在严格模式下才不能有重复的命名参数
     * 
     *          箭头函数name属性同其他函数规则相同
     *          
    **/ 
    var reflect = () => {
        // console.log(arguments.length) // 0
        console.log(this)
    };
    reflect();

    // 箭头函数语法
    // 不支持重复的命名参数 
    let reflect1 = (value) => { // value, value 就挂了
        console.log(value)
        // arguments 是外层的arguments 可能是undefined
        console.log(arguments)
        // this 是外层的arguments 严格模式下 默认undefined 需要bind
        console.log('this---->',this)
        // 是外层的super 内部没有自己的super
        // 是外层的new.target 内部没有自己的super
        console.log('new.target', new.target)
    };
    // 等同于
    let reflect2 = function(value) {
        console.log(arguments)
        return value
    }
    reflect1()
    // 不支持new调用
    // new reflect1()

    //没有原型   reflect1.prototype === undefined
    console.log('reflect1.prototype', reflect1.prototype)

    // 不可以改变this的绑定 this没有改变指向
    reflect1.bind({name: 1})()

});
(function() {
    // 创建立即执行函数表达式
    let person = function(){}('name');
    let person1 = (function(){})('name');
    let person2 = (function(){}('name'));

    // 箭头函数只支持这一种写法
    let person3 = (() => {})('name');
});
(function() {
    /** 
     *  尾部调用优化
     *      循环调用中，一个未完成的栈帧都会被保存在内存中，当调用栈变得过大时候会造成程序的问题
     *      尾部调用： 函数作为另一函数的最后一条语句被调用
     *      
     *      ES6中的尾调用优化
     *          缩减了严格模式下的尾调用栈的大小(非严格模式不受影响) 满足一下条件 尾调用不再创建新的栈帧，而是清除并重用当前栈帧
     *              尾调用不再访问当前栈的变量（也就是说不是一个闭包）
     *              函数内部尾调用是最后一条语句
     *              尾调用的结果作为函数值返回
     *      应用场景 
     *          递归函数
    **/

    // 尾调用不能在程序上表现出来 
    function ff() {
        console.log(1);
    }
    function f() {
        return ff();
    }
    f();


    function factorial(n) {
        if(n  <= 1) {
            return 1;
        }else{
            return n * factorial(n - 1);
        }
    }
    // n足够大存在栈溢出风险

    // 尾部优化 性能更好
    function factorial(n, p = 1) {
        if(n  <= 1) {
            return n * p;
        }else{
            let result = n * p;
            return factorial(n - 1, result)
        }
    }

})();