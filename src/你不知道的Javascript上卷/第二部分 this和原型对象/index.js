/**
 *  来一期 bind call apply的方法实现
 *  来一期 深拷贝 浅拷贝
 * 
 * 
**/
(function() {
    /**
     *  第一章 关于this
     *      为什么要使用this？
     *          使用this相比较传递上下文环境来说 更简洁 传递上下文会让代码更复杂
     *          函数式编程则不推荐使用this 不是纯函数
     *  
     *      this到底是什么
     *          this的值是在运行时绑定的，并不是在编写时绑定，它的上下文取决于函数的调用方式
     *          不同于词法作用域，词法作用域是在代码编写的时候定义的
    **/
    (function() {
        // 使用this的场景
        function identify() {
            return this.name.toUpperCase();
        }

        function speak() {
            return `Hello I am ${ identify.call( this ) }`
        }
        var me = {
            name: 'me'
        }
        var you = {
            name: 'you'
        }
        console.log(
            identify.call( me ),'|',
            identify.call( you ),'|',
        
            speak.call( me ),'|',
            speak.call( you )
        );
    })();
    
    (function () {
        // 使用传递上下文
        function identify(context) {
            return context.name.toUpperCase();
        }

        function speak(context) {
            return `Hello I am ${ identify(context) }`
        }
        var me = {
            name: 'me'
        }
        var you = {
            name: 'you'
        }
        console.log(
            identify( me ),'|',
            identify( you ),'|',
        
            speak( me ),'|',
            speak( you )
        );

    })();
})();
(function() {
    /**
     *  第二章 this全面解析
     *      箭头函数的this由外层作用域的this决定
     *      绑定规则
     *          知道了绑定规则之后 我们要做的就是  找到函数的调用位置并判断应当应用哪条规则
     * 
     *          默认绑定
     *              独立函数调用 可以把这条规则看作是无法应用其他规则时的默认规则
     *              严格模式下 此规则this指定undefined， 
     *          隐式绑定
     *              调用位置是否有上下文对象，可以理解为是否被某个对象拥有或者包含
     *              对象属性引用链中只有最后一层调用位置起作用 a.b.c.d() this指向c
     *          隐式丢失
     *              参数传递 doFoo(obj.foo) // 参数传递就是隐式赋值
     *              赋值 f = obj.foo; f() f实际是对函数的引用 
     *              (a.b = obj.foo)() 间接引用 赋值的返回值是一个函数的引用 函数引用执行同上
     *          显示绑定
     *              call apply bind 
     *              传入参数 null undefined的时候this会指向window
     *              如果call apply传入原始值 会进行装箱处理（new String() new Number() new Boolean() 处理）
     *          new绑定
     *              创建一个新对象
     *              新对象执行prototype链接
     *              新对象绑定到函数调用的this
     *              如果函数没有返回其他对象，那么new自动返回新对象（返回基本类型忽略 ，返回引用类型 就不返回this了）
     *      
     *      优先级
     *          显示绑定 > 隐式绑定
     *          new绑定 > 隐式绑定
     *          new绑定 > 显示绑定 bind绑定在new时候this会被修改
     * 
     *      判断this顺序
     *          判断是否在new中调用
     *          判断是否显示绑定
     *          判断是是否对象调用
     *          是默认绑定
     * 
    **/

    function foo() {
        console.log('foo');

        bar();
    }
    function bar() {
        console.log('bar');

        baz();
    }
    function baz() {
        console.log('baz');
    }
    foo();

    // 隐式绑定
    function foo1() {
        console.log(this.a)
    }
    var obj = {
        a: 'obj',
        foo1: foo1
    }
    obj.foo1() // 理解为函数被调用时 是对obj.foo1这个属性执行了

    // 隐式丢失
    var a = obj.foo1;
    a() // a实际是函数本身的引用 


    function doFoo(fn) {
        fn();
    }

    doFoo(obj.foo1) // 参数传递 就是隐式赋值
})();
(function() {
    /**
     *  第三章 对象
     *      类型
     *          基本类型
     *              number
     *              string
     *              boolean
     *              undefined
     *              null
     *              Symbol
     *          引用类型
     *              Object
     *      内置对象
     *          String 
     *          Number
     *          Function
     *          Date
     *          Array
     *          Regexp
     *          Object
     *          Error
     *          有声明（文字）形式首选使用声明形式，有额外选项时使用构造形式
     *      内容
     *          . 和 [] 属性访问的区别
     *              . 操作符要求属性名满足标识符的命名规范
     *              [] 语法可以接受任意UTF-8/Unicode字符串作为属性名 a ['super-fun!'] a['空 格']
     *          在对象中属性名永远都是字符串,如果使用string（字面量）以外的值作为属性名，那它首先会被转换成一个字符串（数字 对象都会转为字符串）
     *      
     *          可计算属性
     *          属性和方法
     *          数组
     *              索引值为非负数
     *              如果向数组添加一个像数字的属性，就会变成一个数值下标
     *                  arr = []; arr['4'] = 4; arr.length // --> 4 
     *          复制对象
     *          属性描述符
     *              Object.getOwnpropertyDescriptor(obj, prop)
     * 
     *          对象常量
     *              Object
    **/

    const strPrimitive = 'I am a string';
    typeof strPrimitive; // 'string'
    strPrimitive instanceof String // false instanceof 适用于引用类型的检测

    var myObject = {};
    Object.defineProperty(myObject, 'FAV_NUMBER', {
        writable: false,
        enumerable: true,
        configurable: false,
        value: 12
    });
})();
(function() {
    /**
     *  第四章 混合对象 类
     *      类理论
     *          类/继承描述了一种代码的组织结构形式
     *          面向对象编程强调数据和操作数据的行为本质上是互相关联的，好的设计就是把数据和它的相关行为打包起来（数据结构的定义）
     * 
     * 
    **/
})();