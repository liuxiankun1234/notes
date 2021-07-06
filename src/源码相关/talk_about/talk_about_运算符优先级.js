(function() {
    /**
     *  JS运算符号优先级问题
     *      https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
     *  关联性 
     *      不相关  
     *          圆括号（分组操作符） ()
     *      左关联
     *          成员访问 . [] 
     *          函数调用 x.()
     *          ...
     *      右关联 
     *          一元操作符
     *          ...
     * 
    **/
    
    // demo
    // ----------------------

    class A{
        Say() {

        }
    }
    /**
     *  new有参数 和 函数执行的优先级一样高
     *  new无参数 比 点的优先级低
     * 
     *  new A.Say()
     *      当函数走到new A这个时候去访问Say方法吗，new当成无参数列表的话 优先级会低于.,所以会继续访问Say方法 然后执行
    **/
    new A().Say();
    new A.Say();

    /**
     *  new 的关联性是从右往走的
     *  所以会执行第二个new，之后再执行第一个new
    **/
    new new A().Say()
    


    /**
     *  后置加 > 前置加 >  加 
    **/
    var a = 1;
    a+++a; // 3 因为上面的规则，所以分解为 (a++)+a 而非 a+(++a)

    // a+++++a; // 意外的标识符解析 根据上面规则，会优先解析出a++,后面又跟++,造成困扰不知道怎么解析 挂掉
    a+++ ++a; // 正常执行



    /**
     *  前置加 === typeof > 加
     *  前置加 和 typeof 优先级从右往左执行
    **/
    var a = 1;
    typeof a + 1; // 'number1'


    /**
     *  成员访问 === 需计算的成员访问 === new(带参数括号) === 函数调用 > new无参数列表无括号
     * 
     *  new a() 可以将new 和 a()分开理解， new优先级大于函数调用 所以先 new a,然后new a() 
     *  new a.b() 上面规则， new a无参数列表，new a.b()有参数列表，依次执行 
     *  
    **/

    var a = function() {
        this.b = function() {
            return 'b'
        }
    }
    a.prototype.c = function() {};
    
    new a().b() // 解析成 new a() ===> a.b()
    // new a.b() // 解析成 new (a.b)(); 因为new无参数列表（没有括号）优先级小于成员访问 所以a.b是一个整体
    new new a().c() // 根据上面规则 new 优先级是从右往左的，new a() ==> new a.c() ==>


    /**
     * 
     *  && > || > ?三目运算
     *  
     *  强烈推荐：使用分组运算符来区分优先级
     * 
    **/
    
    var  a = 42,
	b = 'foo',
    c = false;
    
    a && b || c ? c || b ? a : c && b : a

    'foo' || false ? (c || b ? a : c && b) : a


    step = step || stop > 0 ? 1 : -1


    step = step || (stop > 0 ? 1 : -1)

})();