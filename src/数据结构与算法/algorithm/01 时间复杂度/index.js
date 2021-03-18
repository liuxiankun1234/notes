/**
 *  时间复杂度
 *  Big O notation
 *      O(1)                Constant Complexity         常数复杂度
 *      O(log n)            Logarithmic Complexity      对数复杂度
 *      O(n)                Linear Complexity           线性时间复杂度
 *      O(n^2)              N square Complexity         平方
 *      O(n^3)              N cubic Complexity          立方
 *      O(2^n)              Exponential Complexity      指数
 *      O(n!)               Factorial                   阶乘
 *      
 *  空间复杂度
 *      开了一个数组 
 *          数组的长度就是数组的空间复杂度
 *          二维数组 那数组的长度的平方就是空间复杂度
 *      递归
 *          递归的深度就是空间复杂度
 * 
 *  注
 *      时间复杂度只看情况最糟糕的复杂度运算
 *      不考虑前面的常数系数
 *  
 * 
 * 
 * 
 * 
**/

(function() {
    /**
     * 常数时间复杂度 O(1)
     * 
     * 
     */
    function f(n = 1000) {
        console.log(n)
    }
    // 时间复杂度为常数O(1)， 不管n是多少都打印一次 
    f(100000);

    function f1(n = 1000) {
        console.log(n)
        console.log(n)
        console.log(n)
    }
    // 时间复杂度为常数O(1)， 不管n是多少都打印3次  不考虑系数
    f1(100000);




    /**
     * 对数复杂度 O(n^2)
     */
    function f2(n) {
        for(var i = 0; i < n; i++) {
            for(var k = 0; k < n; k++) {
                console.log(n)
            }
        }
    }
    // 执行n^2次
    f2(10000)



    /**
     * 对数复杂度 O(logn)
     */
    function f2(n) {
        for(var i = 0; i < n; i*=2) {
            console.log(n)
        }
    }
    // 执行n次
    f2(10000)
})()