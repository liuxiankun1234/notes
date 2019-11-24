/**
 *  第九章 JS中的类 未读 生成器方法 Symbol.species属性
 *      未解之谜？
 *           类的所有方法内部都没有[[Construct]] 因此使用new来调用的时候会抛错 怎么模拟没有Construct呢？     
 *               
 * 
 *      类中支持可以算成员名称
 * 
 * 
 *      tips:
 *          Object() 等同于 new Object()
 *          new Object()
 *              传参 null 或者 undefined 创建一个空对象
 *              传入一个对象值 则返回这个对象值
 * 
**/
(function() {
    console.log('******************  1  ******************');

    /**
     *      基本的类声明
     *          class关键字开始 后跟类名 剩余部分的语法看起来像是对象字面量中的方法的简写
     *          let PersonClass = class {}
     *      this.name name 是类的自有属性
     *      
     *      class 是ES5的语法糖 typeof PersonClass === 'function'
     *      class的prototype不可以改写，只可以添加属性 等同于cosnt定义
     *      
     *      为什么要使用类声明？
     *          类的prototype是一个只读属性，不可被修改
     *          类声明不会被提升，同let声明 会存在暂时性死区（函数声明会声明提升）
     *          类声明中的所有代码都自动运行在严格模式下 并且也无法退出严格模式
     *          在类中不能修改类名 因为内部是const定义的常量，外部是let声明，内部是const声明
     *          类的所有方法都是不可以枚举的 es5中的方法都是可以枚举的（除非使用Object.defineProperty定义一个不可以枚举的方法）
     *          类的所有方法内部都没有[[Construct]] 因此使用new来调用的时候会抛错
     *          调用类构造器时不使用new 会抛错
     *          试图在类的方法内部重写类名 会抛错
     *              class Foo{
     *                  constructor() {
     *                      Foo = 'foo'
     *                  }
     *              } // new Foo() 报错 内部的是一个常量
     * 
    **/
    class PersonType {
        constructor(name) {
            this.name = name
        }

        sayName() {
            return this.name
        }
    }
    const person = new PersonType('lxk')
    console.log(
        person instanceof PersonType,
        person instanceof Object
    )

    // ES5中模拟类
    let PersonType2 = (function() {
        // 1 类代码是执行在严格模式下
        'use strict'
        // 2 类内部不能修改类名
        const PersonType2 = function(name) {
            // 3 只能通过new调用
            if(new.target !== PersonType2) {
                throw new Error('大傻 使用new操作符试试呀')
            }
            this.name = name
        }
        // 4 方法不能枚举出来
        Object.defineProperty(PersonType2.prototype, 'sayName', {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function() {
                // 5 方法不能通过new调用
                if(typeof new.target !== 'undefined') {
                    // 证明通过new调用的
                    throw new Error('大傻 你是不是通过new调用这个函数啦')
                }
                return this.name
            }
        })
        return PersonType2
    })();

})();
(function() {
    console.log('******************  2  ******************');
    /**
     *      类表达式
     *      与类声明的功能一样 都不会变量声明提升
     * 
     *      命名类表达式
     *          命名不能改写  PersonClass2 不能被改写
     * 
    **/
    // 基本的类语法表达式
    // let PersonClass = class {}
    // 命名类表达式
    let PersonClass0 = class PersonClass2 {}

    // ES5模拟命名类表达式
    let PersonClass = (function() {
        'use strict'
        const PersonClass2 = function(name) {
            if(typeof new.target === 'undefined'){
                throw new Error('大傻 试试new操作符')
            }
            this.name = name
        }
        Object.defineProperty(PersonClass2.prototype, 'sayName', {
            writable: true,
            enumerable: false,
            configurable: true,
            value:function() {
                if(typeof new.target !== 'undefined'){
                    throw new Error('大傻 不能使用new操作符')
                }
                return this.name
            }
        })
        return PersonClass2
    })();
})();
(function() {
    console.log('******************  3  ******************');
    /**
     *      作为一等公民的类
     *          一等公民： 一个可以传入函数 可以从函数返回 并且可以赋值给变量的值
     *          类也可以当作参数 传递
     *  
     *      可以通过 立即调用类构造函数可以创建单例
    **/
   let person = new class {
        constructor(name) {
            this.name = name;
        }
        sayName() {
            return this.name
        }
   }('lxk');
   // 等同于 new Person('lxk')
})();
(function() {
    console.log('******************  4  ******************');
    /**
     *      访问器属性
    **/
    // class CustomHTMLElement{
    //     constructor(element) {
    //         this.element = element
    //     }

    //     get html() {
    //         return this.element.innerHTML
    //     }

    //     set html(innerHTML) {
    //         this.element.innerHTML = innerHTML
    //     }
    // }
    // 等同于ES5
    let CustomHTMLElement = (function() {
        'use strict'
        const CustomHTMLElement = function(element) {
            if(new.target !== CustomHTMLElement){
                throw new Error('error')
            }
            this.element = element
        }

        Object.defineProperty(CustomHTMLElement.prototype, 'html', {
            set: function(innerHTML) {
                this.element.innerHTML = innerHTML
            },
            get: function() {
                return this.element.innerHTML
            },
            enumerable: false,
            configurable: true
        })

        return CustomHTMLElement
    })();
})();
(function() {
    console.log('******************  5  ******************');
    /**
     *      可计算成员名称
     * 
     *      静态成员
     *          static
    **/
    let methodName = 'sayName';

    class PersonClass {
        [ methodName ]() {
            return this.name
        }
    }
    
    class PersonClass2 {
        get [ methodName ]() {
            return this.name
        }
        set [ methodName ](name) {
            this.name = name
        }
    }

    /**
     *      静态成员
     *      只能在类中访问静态方法
     *      不可以在实例中访问静态方法
    **/
    class PersonClass3 {
        constructor(name) {
            this.name = name
        }
        // 静态成员
        static create(name) {
            return new PersonClass3(name)
        }
    }
    // PersonClass3.create 来访问
})();
(function() {
    console.log('******************  6  ******************');
    /**
     *       ES5继承 
     * 
     *       
     * 
     * 
    **/
    /********** 组合继承 **********/
    // 父类声明
    function SuperType(age) {
        this.property = '父类'
        this.age = age
    }
    SuperType.prototype.getSuperValue = function() {
        return this.property
    }
    // 子类声明
    function SubType(age, propertyName) {
        SuperType.call(this, age)
        this.subProperty = propertyName || '子类'
    }
    // 继承
    SubType.prototype = new SuperType();
    SubType.prototype.constructor = SubType;
    SubType.prototype.getSubValue = function() {
        return this.subProperty
    }

    /********** 寄生组合继承  最优解继承 **********/
    // 父类声明
    function SuperType(age) {
        this.property = '父类'
        this.age = age
    }
    SuperType.prototype.getSuperValue = function() {
        return this.property
    }
    // 子类声明
    function SubType(age, propertyName) {
        SuperType.call(this, age)
        this.subProperty = propertyName || '子类'
    }
    function object(o) {
        function F(){};
        F.prototype = o;
        return new F();
    }
    function inhertPrototype(SuperType, SubType) {
        var prototype = object(SuperType.prototype);
        prototype.constructor = SuperType;
        SubType.prototype = prototype;
    }
    inhertPrototype(SuperType, SubType)

    /**
     *  ES6继承
     *      派生类：继承了其他类的类 （可以理解为子类）       
     *      派生类指定了构造器 就必需使用super() 否则会造成错误
     *      如果不实用构造器 则默认调用super()方法
     *      
     * 
     * 
     *  派生类如果不使用 constructor
     *      等同于  constructor(...args) {
     *                 super(...args)
     *             }
     *      
     *      第一个...args 是将参数作为不定参数 将args变成一个数组
     *      第二个...args 是展开运算符 将数组打散后作为各自独立的参数传入函数
     *      这两步的思想就是 将参数-->数组-->数组变成独立参数
     *      在es5中的实现方式  super.apply(this, arguments)
     * 
     * 
     *      super注意事项
     *          只能在派生类中使用super 在非派生类 或函数中使用 抛错
     *          构造器中必需在使用this之前调用super() super负责初始化this 因此先调用this会 抛错
     *          唯一能避免调用super() 的方法 是从类构造器中返回一个对象
    **/
   class Rectangle {
        constructor(width, length) {
            this.width = width;
            this.length = length;
        }
        getArea() {
            return this.width * this.length
        }
   }
    class Square extends Rectangle {
        // constructor(args) {
        //     super.apply(null, arguments)
        // }
        constructor(width) {
           // 创建了构造器 但是不使用super()会报错
           super()
        }
        getPerimeter() {
            return this.width * 3
        }
    }
    const square = new Square(4);
})();
(function() {
    console.log('******************  7  ******************');
    /**
     *  屏蔽类方法
     *      原理就是 原形链查找 找到了就返回 找不到就沿着原型链查找
     *  
     *  方法中使用了 super 同第四章super    
     *      super会根据[[homeObject]]来定位当前方法所属的对象 再通过原型链查找所属对象及其原型上是否有改方法
     * 
     *  继承静态成员
     *      正常的extends就能使派生类继承父类的静态方法
    **/
   class Rectangle {
        constructor(width, length) {
            this.width = width;
            this.length = length;
        }
        getArea() {
            return this.width * this.length
        }
    }
    class Square extends Rectangle {
        constructor(width) {
            super(width, width)
        }
        getArea() {
            return super.getArea()
        }
    }
    const square = new Square(4);

    // 继承静态成员
    // class Rectangle {
    //     constructor(width, length) {
    //         this.width = width;
    //         this.length = length;
    //     }
    //     getArea() {
    //         return this.width * this.length
    //     }
	// 	static create(width, length) {
	// 		return new Rectangle(width, length)
	// 	}
    // }
    // class Square extends Rectangle {
    //     constructor(width) {
    //         super(width, width)
    //     }
    //     getArea() {
    //         return super.getArea()
    //     }
    // }
    // var rectangle = Square.create(3, 4);
})();
(function() {
    console.log('******************  7  ******************');
    /**
     *  在类构造器中使用new.target(元属性)
     *      new.target指向当前this的指向 仅能指 当前构造器 不同于 instanceof是父级就可以
     *      new.target 在class中不能为 undefined 因为 class只能通过new调用
    **/
    class Rectangle {
        constructor(width, length) {
            console.log(new.target === Rectangle)
            this.width = width;
            this.length = length;
        }
    }
    class Square extends Rectangle {
        
    }
    // new.target 指向Rectangle
    var rectangle = new Rectangle(3, 4);
    // new.target 指向Square  等同于 Rectangle.apply(this, 3, 4) //通过apply改变了this的指针
    var square = new Square(3, 4);

    // 这样的话就可以创建一个 基类不能被实例化的类
    class Base {
        constructor(width, length) {
            if(new.target === Base){
                throw new Error('大傻 我只能被继承 不能被实例化')
            }
            this.width = width;
            this.length = length;
        }
    }
})();
(function() {
    console.log('******************  8  ******************');
    /**
     *      内建对象的继承 
     * 
     * 
     * 
    **/
    // 内建数组行为
    // var colors = [];
    // colors[0] = 'red';
    // console.log(colors.length)
    // colors.length = 0
    // console.log(colors[0])

    // 尝试通过ES5语法继承数组
    // function MyArray() {
    //     Array.apply(this, arguments)
    // }
    // MyArray.prototype = Object.create(Array.prototype, {
    //     constructor: {
    //         value: MyArray,
    //         writable: true,
    //         configurable: true,
    //         enumerable: true
    //     }
    // })
    // var colors = new MyArray();
    // colors[0] = 'red';
    // console.log(colors.length)

    // colors.length = 0
    // console.log(colors[0])
    
    // MyArray就会有是Array了
    class MyArray extends Array{
    }
})();
(function() {
    console.log('******************  9  ******************');
    /**
     *  派生自表达式的类
     *      只要表达式可以被解析为一个函数并且具有[[construct]]属性和原型 就可以使用extends       
     * 
     *      经过测试 原型通过es5来写同类写法原型指向相同 同 console.log(7) 中实现相同
    **/
    function Rectangle(length, width) {
        this.length = length
        this.width = width
    }
    Rectangle.prototype.getArea = function() {
        return this.length * this.width
    }
    class Square extends Rectangle {
        constructor(length) {
            super(length, length)
        }
    }
    var x = new Square(4);
    console.log(x);
    console.log(x instanceof Rectangle);

    /**
     *  动态确定类的目标 
     *  可以创建mixin
     *  如果使用null或生成器函数 类在这些情况下没有[[Constructor]]属性 尝试创建实例会导致调用[[Constructor]]报错
     * 
    **/
    function getBase() {
        return Rectangle
    }
    class Square1 extends getBase() {
        constructor(length) {
            super(length, length)
        }
    }
    // 创建mixin 动态确定目标
    function mixin(...mixin) {
        console.log(mixin instanceof Array)
        var base = function() {}
        Object.assign(base.prototype, ...mixin);
        return base
    }
    let AreaMixin = {
        getArea() {
            return this.length * this.width
        }
    }
    let SerializableMixin = {
        serialize() {
            return JSON.stringify(this)
        }
    }

    class Square2 extends mixin(AreaMixin, SerializableMixin) {
        constructor(width, length) {
            super();
            this.length = length;
            this.width = width;
        }
    }
})();
