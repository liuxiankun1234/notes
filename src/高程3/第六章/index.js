/**
 *  待解决问题
 *      寄生构造函数模式创建对象 new调用跟正常调用有什么区别吗？一定要new调用吗？
 * 
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
 *                      获取obj对象实例上(不支持原型上)的property属性的特性
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
 *      new操作经历步骤
 *          创建一个新对象
 *          将构造函数的作用域赋给新对象(因此this指向这个新对象)
 *          执行构造函数中的代码(为这个新对象添加属性)
 *          返回新对象
 *          调用构造函数会为实例添加一个指向最最初原型的[[prototype]]指针
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
 *      我们创建的每个函数都有一个prototype属性，这个属性是一个指针 指向当前构造函数的原型对象 
 *      默认情况下所有的原型对象都自动获得一个constructor属性，指向prototype所属的函数
 *      原型对象包含可以由特定类型的所有实例共享的属性和方法
 *      
 *      A.isPrototypeOf(B) // A对象是B实例的原型吗
 *      Object.getPrototypeOf(A) // 获取A的原型对象
 * 
 *      更简单的原型语法
 *          使用对象字面量重写原型
 *          每个函数都有一个prototype对象，自动获取一个constructor属性 原型被重写之后 会造成constructor丢失 会继续沿着原型链向上查找       
 *          {} ===> new Object() ===> Object.prototype.constructor === Object
 *          手动创建注意constructor的enumerable属性是false
 *      
 *      原型的动态性
 *          先创建实例 后为原型添加属性 也能在实例上访问到该属性？
 *              原型与实例间松散的连接 在实例中未找到属性 会搜索原型链 实例与原型间是一个指针 所以会访问修改之后原型属性
 *          重写原型就不同了
 *              调用构造函数会为实例添加一个指向最最初原型的[[prototype]]指针，重写原型切断了构造函数与最初原型之间的联系
 *              实例中的指针仅指向原型，而不是构造函数
 * 
 *      原生对象的原型
 *          原生的引用类型也是通过原型模式创建的 所以可以通过给原生对象的prototype添加新属性来增加方法
 *          但是不推荐
 * 
 *      原型对象的问题
 *          不支持传递参数
 *          原型上的属性共享（引用类型会有问题）
 * 
 *      注意：
 *          手动修改 constructor prototype toString() valueOf() hasOwnProperty() 时候要注意
 *          手动创建的属性默认configurable enumerable writable 都是true
 *          原型上的属性 enumerable特性默认设置为false
 * 
**/
void function() {
    function Person() {

    }
    Person.prototype.name = '原型name';
    Person.prototype.sayName = function() {
        return this.name
    }
    var p1 = new Person();
    var p2 = new Person();

    // console.log(
    //     p1.name === p2.name, // true
    //     p1.sayName === p2.sayName // true
    // )

    /**
     *  prototype被重写后
     *      constructor属性丢失 会继续沿着原型链向上查找
     *          {} ===> new Object() ===> Object.prototype.constructor === Object
     *      添加constructor属性注意 enumerable属性是false
     *      
     * 
    **/
    function Person2() {
    }
    Person2.prototype = {
        name: '原型 p2',
        friends: [],
        sayName() {
            return this.name
        }
    }

    var p3 = new Person2();
    var p4 = new Person2();

    console.log(
        p3 instanceof Person2,
        p4 instanceof Person2,
        p3.constructor === Person2,
        p3.constructor === Object 
    )

    p3.friends.push('C');
    p4.friends.push('B');   
    console.log(p3.friends)

    

}();
/**
 *  组合使用构造函数和原型模式
 *      构造函数模式用于定义实例属性
 *      原型模式用于定义方法和共享属性
 * 
 *  动态原型模式
 *      解决问题
 *          其他oo语言经验的开发人员 看到独立的构造函数和原型会困惑
 *      通过判断原型上是否存在某个方法来保证只初始化一次原型
 *      注意不能重写原型 创建了实例的情况下重写原型 会切断现有实例与新原型间联系
 * 
 *  寄生构造函数模式
 *      依赖于已有的构造函数来创建对象
 *      
 *      返回的对象跟构造函数原型没有任何关系 不能通过instanceOf操作符来判断对象类型
 *  
 *  稳妥构造函数模式
 *      没有公共属性 方法内部也不使用this 
 *      适合安全生产环境中
 *      
 *      与寄生构造函数模式不同
 *          新创建的实例方法不引用this
 *          不使用new操作符号调用构造函数
 * 
 *  
**/
void function() {
    // 组合使用构造函数和原型模式
    function Person(name, age) {
        this.name = name;
        this.age  = age;
    }
    Person.prototype = {    
        //  需要注意 ES5默认 constructor 是不可枚举的 这么写会变成可枚举的值
        constructor: Person,
        sayName() {
            return this.name
        }
    }

    var p1 = new Person('lxk', 18);
    var p2 = new Person('lxk2', 22);


    // 动态原型模式
    function Person2(name, age) {
        this.name = name;
        this.age  = age;

        if(typeof this.sayName !== 'function'){
            // 通过判断 this.sayName 来初始化原型 保证仅初始化一次原型
            Person2.prototype.sayName = function() {
                return this.name
            }
        }
    }

    var p3 = new Person2('lxk', 18);
    var p4 = new Person2('lxk2', 22);


    // 寄生构造函数模式
    function Person3(name, age) {
        var o = new Object();

        o.name = name;
        o.age = age;
        o.sayName = function() {
            return this.name;
        }

        return o;
    }

    var p5 = new Person3('lxk', 23);

    // 寄生构造函数模式
    function SpecialArray() {
        var values = new Array();

        values.push.apply(values, arguments);
        values.toPipedString = function() {
            return this.join('|')
        }
        return values;
    }
    var arr = new SpecialArray('A', 'B', 'C');
    console.log(arr.toPipedString());
    


    // 稳妥构造函数模式
    function Person5(name, age) {
        var o = new Object();
        // 可以定义一些私有变量或者函数
        o.sayName = function() {
            return name
        }
        return o;
    }
}(); 