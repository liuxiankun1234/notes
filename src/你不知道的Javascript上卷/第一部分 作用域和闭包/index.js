(function() {
    /**
     *  第一章 作用域是什么 
     *      ReferenceError 引用错误 作用域判别失败相关 找不到未定义的引用
     *      TypeError      类型错误 作用域判断正确，但是对结果的操作是非法的
     *      
     *      作用域是一套规则，用于确定在何处以及如何查找变量，如果查找目标是对变量进行赋值，进行 LHS 查找，如果为了获取变量的值，则使用 RHS 查找
     *      
     *      传统编译语言的流程
     *          分词/词法分析
     *              将由字符组成的字符串分解成有意义的代码块，这些代码块叫做词法单元。例如 var a = 3; 这段程序会被
     *              分解成为 var, a, =, 3, ; 这些个词法单元  
     *          解析/语法分析
     *              这个过程将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树，这个树被称为 抽象语法树 （Abstract Syntax Tree, AST）
     *              var a = 3; 的抽象语法树中可能会有一个VariableDeclaration的顶级节点，接下来是一个叫做Identifier(他的值是a)的子节点，以及一个叫作AssignmentExpression的
     *              子节点。AssignmentExpression节点有一个叫作NumericLiteral(他的值是2)的子节点
     *          代码生成
     *              将AST转换成为可执行代码的过程叫做代码生成， 简单的讲 var a = 3; 的AST转化为一组机器指令，用来创建一个叫做a的变量（包括分配内存等），并将一个值储存在a中
     *  
     *      理解作用域
     *          引擎
     *              从头到尾负责整个Javascript程序的编译及执行过程
     *          编译器
     *              负责语法分析及代码生成等脏活累活
     *              LHS 赋值操作的左侧 隐式赋值也算（实参 形参）查找无结果 会要求作用域创建一个全局变量，将其返回给引擎
     *              RHS 赋值操作的右侧  查找无结果  会报引用错误（ReferenceError）
     *          作用域
     *              负责收集并维护由所有生命的标识符（变量）组成的一些列查询，并实施一套严格的规则，确定当前执行环境有权访问到所有变量的有序访问
     *      
     *          var a = 3; 这个程序引擎会认为这里是两个完全不同的声明 一个由编译器编译时处理，另一个由引擎运行时处理
     *          编译器执行过程（就是变量生命提升的过程）
     *              遇到 var a; 编译器会询问作用域是否已经有一个该名称的变量存在于同一个作用域中，如果有 则忽略该声明，否则在要求作用域在当前作用域集合中声明一个新的变量，并命名为a     
     *              接下来 编译器会为引擎生成运行时所需的代码，这些代码被用来处理a = 2这个赋值操作，引擎运行时会首先询问作用域，在当前环境是否存在一个叫a的变量，
     *              如果是则使用这个变量。否则引擎会继续查找该变量，如果找到则将2赋值给a，否则举手抛异常
     * 
    **/
}());
(function() {
    /**
     *  第二章 词法作用域
     *      作用域的工作模式分为两种
     *          词法作用域（静态作用域）
     *          动态作用域
     *      
     *      词法阶段
     *          词法化的过程会对源代码中的字符进行检查，如果是有状态的解析过程，还会赋予单词语意？？？？
     *          词法作用域 代码的作用域在代码写下来的时候就确定了 而不是在代码执行的时候确定的（它的词法作用域都只由函数声明时所处的位置决定）
     * 
     *      欺骗词法
     *          欺骗词法作用域有很严重的性能问题 不要使用
     *          eval
     *              可以接受一个字符串为参数，通过代码欺骗和假装书写时代码就在那
     *              参考demo1
     *          with
    **/
    // demo1
    function foo(str, b) {
        eval(str) // 欺骗
        console.log(a, b)
    }
    var a = 'a';
    foo('var a = 1', 'b')
})();
(function() {
    /**
     *  第三章 函数作用域和块级作用域
     *      JS只有函数域 没有块级作用域（非ES6 let const）
     *      函数可以创建自己的作用域 隐藏内部实现
     *      
     *      避免冲突
     *          全局命名空间
     *              库类通常在全局作用域中声明一个变量，这个变量被用作库的命名空间，
     *              所有需要暴露给外界的功能都会成为这个对象的属性
     *          模块管理
     *              使用模块机制来避免冲突
     *      
     *      函数作用域
     *          
     * 
    **/
})();
(function() {
    /**
     *  第四章 提升
     *      变量提升 函数提升 是编译器编译的产物（编译器在编译阶段 会）
     *      
     *      var a = 2; 被解析为 var a; a = 2; 两部分 一部分是编译阶段进行的 一部分是代码执行阶段进行的
     *      
     *      每个作用域都会进行提升操作
    **/
})();
(function() {
    /**
     *  第五章 作用域闭包
     *      实质问题
     *          什么是闭包？
     *          当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行
     *          函数在词法作用域之外执行，依然可以记住并访问所在的此法作用域，就产生了闭包
     * 
     *      模块化
     *          模块化解决的问题
     *              命名空间冲突
     *              文件依赖管理 
     *          
    **/

    // 古老的模块化
    // let foo = (function() {
    //     function getName() {

    //     }
    //     function getAge() {

    //     }
    //     return {
    //         getName,
    //         getAge
    //     }
    // })();

    // let foo = {
    //     getName() {

    //     },
    //     getAge() {

    //     }
    // }


    // 现代模块化系统 AMD CMD管理
    let myModules = (function manager() {
        var modules = {}

        function define(name, deps, impl) {
            for(var i = 0, len = deps.length; i < len; i++){
                // 通过name获取函数的引用
                deps[i] = modules[deps[i]]
            }
            modules[name] = impl.apply(impl, deps);
        }

        function get(name) {
            return modules[name]
        }

        return {
            define,
            get
        }
    })();

    myModules.define('bar', [], function() {
        function hello(who) {
            return `Let me introduce: ${who}` 
        }
        return {
            hello
        }
    })
    myModules.define('foo', ['bar'], function(bar) {
        const hungry = 'hippo';

        function awesome() {
            console.log( bar.hello( hungry ).toUpperCase() );
        }
        return {
            awesome
        }
    });
    myModules.define('baz', ['bar', 'foo'], function(bar, foo) {
        console.log('deps', bar, foo)
        const hungry = 'hippo';

        function awesome() {
            console.log( bar.hello( hungry ).toUpperCase() );
        }
        return {
            awesome
        }
    });

    


    var bar = myModules.get('bar'),
        foo = myModules.get('foo');

    console.log(
        bar.hello('hippo')
    );
    foo.awesome();
})();