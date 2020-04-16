void function() {
    /**
     *  为什么是 void 0
     *      1 某些浏览器undefined可以被改写（在函数内部undefined可以被声明定义 改写）
     *      2 void 运算符 对给定的表达式进行求值，然后返回 undefined。      
     * 
     *  undefined 和 null 有什么相同 不同
     *      undefined == null 比较时 不能将null和undefined转成任何值
     *      永远都没有必要将一个变量初始化为undefined,但是引用类型初始化为null有必要
     *      
     *      null 
     *          是一个关键字 不可以被改写或当做变量/函数/参数名称(可以当做属性名称)
     *          表示一个空指针 
     *              typoef null 'object'
     *              一般定义一个引用类型的值，会用null来初始化
     *          链表数据结构的尽头是 null
     *          Number(null) --> 0
     *      undefined 
     *          是一个全局变量（全局中不可以修改，在函数内部可以重新定义undefined为一个值 此时undefined可以被改写）
     *          表示一个声明但未定义的变量
     *              函数返回值
     *              数组空元素
     *              声明未定义的变量
     *              void 0
     *          typeof undefined  'undefined'
     *          Number(undefined) --> NaN
     * 
    **/
}();