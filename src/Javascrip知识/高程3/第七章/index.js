/**
 *  函数表达式
 *      定义函数的两种方式
 *          函数声明
 *              以function关键字开头 
 *              必须有函数名
 *              函数声明提升(JS执行流进入环境时 已经将函数声明 变量 注册到变量对象里)
 *          函数表达式
 *              以非function关键字开头的函数 都是函数表达式
 *              可以立即执行
 *              必须先赋值 再调用
 *  递归
 *      可以使用 arguments.callee 调用自身
 *      也可以使用命名函数表达式代替arguments.callee
 *  
 *  闭包
 *      使用闭包注意释放内存
 *      将变量置为null，释放内存
**/

void function() {
    // f是一个全局变量
    if(f = function() {}) {}
    console.log(f) // function 

    // 这个是一个函数表达式，而非函数声明 所以function.name 只能在内部可以访问
    if(function ff() {}) {}
    console.log(ff); // ReferenceError 



    var factorial = (function f(num) {
        if(num <= 1) return 1;
        return num * f(num - 1);
    });

    var  factorial = function (num) {
        if(num <= 1) return 1;
        return num * arguments.callee(num - 1);
    };





}();