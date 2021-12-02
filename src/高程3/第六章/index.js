/**
 *  面向对象的程序设计  
 *      对象
 *          无序属性的集合 名值对 属性值可以是数据或函数
 * 
 *      理解对象
 *          属性类型
 *              Object.defineProperty方法可以修改默认属性
 *              可以多次调用Object.defineProperty给对象属性设置值，configurable属性设置false之后configurable属性就不可以修改了(改为true会报错)
 *              调用Object.defineProperty 如果不设置 configurable writable enumerable 默认设置为false
 *              数据属性
 *                  包含一个数据值的位置 这个位置可以读取和写入值
 *                  [[Configurable]] 默认值 true
 *                      表示能够通过delete删除属性，能够修改属性的特性或者能否把属性修改为访问器属性 
 *                      设置成false 
 *                          属性不能被删除  严格模式delete属性会报错 
 *                          configurable 不能设置成true
 *                          enumerate不能被修改
 *                          writable可以将true修改false 其他都会报错
 *                  [[Enumerable]] 默认值 true
 *                      表示能否通过for-in循环返回属性 
 *                  [[Writable]] 默认 true
 *                      表示能够修改属性的值
 *                      设置成false 只读属性（const）被赋值会忽略 严格模式下赋值报错
 *                  [[Value]] 默认 undefined
 *                      数据值 从value读取/写入值
 *                      
 *              访问器属性
 *                  [[Configurable]] 默认值 true        
 *                  [[Enumerable]] 默认值 true
 *                  [[Get]] 默认值 undefined
 *                      在读取属性时调用的函数 
 *                      不指定该方法 表示不能读取 返回undefined
 *                  [[Set]] 默认值 undefined
 *                      在写入属性时调用的函数 
 *                      不指定该方法 表示该属性不可写 严格模式 强行写入 会报错
 * 
 *              定义多个属性
 *                  Object.defineProperties()
 * 
 *              读取属性的特性
 *                  Object.getOwnPropertyDescriptor(obj, property) 
 *                      获取obj对象的property属性的特性
 *                      不能获取原型上的属性特性
 * 
**/
void function() { 
    'use strict'
    var symbol = Symbol('symbol');
    var o = {
        a: 1,
        b: 2,
        symbol: 'Symbol'
    };

    delete o.a // 返回true 
    


    Object.defineProperty(o, 'c', {
        configurable: false,
        writable: true,
        value: 'c',
        enumerable: false
    })
    Object.defineProperty(o, 'c', {
        configurable: false,
        writable: false,
        value: 'csss',
        enumerable: false
    })
    for(var k in o){
        console.log(k)
    }
    console.log(o)

    var o1 = {
        _year: 2019,
        edtion: 1
    }
    Object.defineProperty(o1, 'year', {
        configurable: true,
        enumerable: true,
        // get: function() {
        //     return this._year
        // },
        set: function(year) {
            this._year = year
        }
    })
    
    o1.year = 2020
    console.log(o1.year)
    console.log(Object.getOwnPropertyDescriptor(o1, 'year'));
}();    

/**
 *  创建对象
 *      Object构造函数和对象字面量都可以用来创建单个对象 缺点 使用同一个接口创建很过对象 产生大量的重复代码
 *      工厂模式
 *          优点
 *              抽象了创建对象的过程 解决创建多个对象的问题
 *          缺点
 *              不能解决对象识别问题(没有constructor 不能知道当前构造函数是谁)
 * 
 *      构造函数模式
 *          不同于工厂模式
 *              没有显示的创建对象
 *              直接将属性和方法赋值给this  
 *              没有return
 *              构造函数名大写字母开头
 *              必须通过new来创建实例
 *          与普通函数的区别就是 调用方式的不同
 *          优点
 *              可以将构造函数的实例标识为一种特定的类型(p1.constructor === p2.constructor)
 *          缺点
 *              每个实例上的方法都是重新创建的（没有必要创建两个功能完全相同的方法） p1.sayName !== p2.sayName
 *              可以抽出公共方法 公共方法很多丝毫没有封装型可言(全局方法只供构造函数内部使用 全局方法名副其实)
 * 
 *          new操作经历步骤
 *              创建一个新对象
 *              将构造函数的作用域赋给新对象(因此this指向这个新对象)
 *              执行构造函数中的代码(为这个新对象添加属性)
 *              返回新对象
 *       
**/

void function() {
    /**
     *  工厂模式
     *      优点
     *          抽象了创建对象的过程 解决创建多个对象的问题
     *      缺点
     *          不能解决对象识别问题
    **/
    function createPerson(name, age) {
        var o = new Object;
        o.name = name;
        o.age = age;
        o.sayName = function() {
            return this.name;
        }
        return o;
    }
    var person1 = createPerson('lxk1', '18');
    var person2 = createPerson('lxk2', '18');
    console.log(person1, person2)


    /**
     *  构造函数
     * 
     * 
     * 
    **/
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.sayName = function() {
            return this.name;
        }
    }
    var p1 = new Person('lxk1', 18)
    var p2 = new Person('lxk2', 18)

    console.log(
        p1.constructor === p2.constructor, // true 解决对象识别问题
        p1.sayName     === p2.sayName, // false 每个实例的方法都是一个新的函数实例
    );

    /**
     * 
     *  通过创建 全局变量 sayName来解决每个实例的方法都是一个新的函数实例的问题
     *  全局变量很多 造成污染 无封装性可言
     *  全局变量仅供构造函数使用 全局变量有点名副其实
     * 
    **/
    // function sayName() {
    //     return this.name
    // }
    // function Person(name, age) {
    //     this.name = name;
    //     this.age = age;
    //     this.sayName = sayName;
    // }
}();    
/**
 *  原型模式
 *      每个函数都有一个prototype属性 让特定类型的实例共享属性和方法
 *      每个prototype对象自动获取一个constructor属性，包含一个指向prototype属性所在函数的指针
 *      手动定义的属性enumerable默认设定为true 原型上的constructor toString valueOf 的enumerable 默认设置false (不可for-in循环遍历出来)
 *      更简单的原型语法
 *          重写原型 原型对象自动获取的constructor属性找不到 重写constructor的话 注意enumerable属性置为false
 *      圆形的动态性
 *          原型对象做的任何修改 都能立刻从实例上反映出来 即使先创建了实例 后修改了原型
 *          注：
 *              先创建了实例 重写原型会有问题
 *              实例不能访问新原型的属性 实例的隐式原型指向之前的原型对象
 *      属性访问过程
 *          当前对象上寻找，没有的话 当前对象的隐式原型上查找 重复
 *          
 *      A.isPrototypeOf(B)
 *          A是B的原型吗
 *          查找原理 __proto__ prototype
 * 
 *      Object.getPrototypeOf(A)
 *          获取A的原型对象
 *          返回Ade构造函数原型对象
 * 
 *  
**/
void function() {
    /**
     *  原型模式 
    **/
    function Person () {

    }
    Person.prototype.name = 'lxk';
    Person.prototype.sayName = function() {
        return this.name
    };

    var p1 = new Person();
    var p2 = new Person();
    console.log(
        p1.name === p2.name, // true
        p1.sayName = p2.sayName // true
    );
    

}();