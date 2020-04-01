/**
 *  你肯定不知道这段代码执行了啥
 *  Function.apply.bind(fn, null)
 *      重点：理解bind和apply
 *
 * 
 *      杂谈
 *          call apply bind
 *          Object.prototype.toString.call(12) 
 *              // 强制将Object.prototype.toString的this指向12
 *              // (12).toString() 这个方法是Number类重写了Object类上的方法 所以不会返回 "[object Number]"
 *          
 *
 *
 *
 *
 **/

void (function() {
    // 模拟arguments被解构的过程
    Function.apply.bind(function(x, y) {
        console.log(x, y);
    }, null)({ 0: 1, 1: 2, length: 2 });
})();

void (function() {
    /**
     *      MDN给出的bind的Polyfill
     *      
     *
     **/

    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError(
                    "Function.prototype.bind - what is trying to be bound is not callable"
                );
            }

            var aArgs = Array.prototype.slice.call(arguments, 1), // 获取参数数组
                fToBind = this, // 调用bind的对象（Function实例）
                fNOP = function() {}, // 为了原型链绑定
                fBound = function() {
                    // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
                    return fToBind.apply(
                        this instanceof fBound ? this : oThis,
                        // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                        aArgs.concat(Array.prototype.slice.call(arguments))
                    );
                };

            // 维护原型关系
            if (this.prototype) {
                // 当执行Function.prototype.bind()时, this为Function.prototype
                // this.prototype(即Function.prototype.prototype)为undefined
                fNOP.prototype = this.prototype;
            }
            // 下行的代码使fBound.prototype是fNOP的实例,因此
            // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
})();
