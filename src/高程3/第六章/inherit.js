/**
 *  继承
 *      继承方式
 *          接口继承 只继承方法签名
 *          实现继承 继承实际的方法
 *          ES仅支持实现继承 主要是依靠原型链来实现 
 * 
 *      原型链继承
 *          原型链是一个链表结构
 *          原型链继承实现的本质是重写原型
 *          本质重写原型来 让一个引用类型继承另一个引用类型的属性和方法
 *          构造函数 原型 实例关系？
 *              每个构造函数都有一个原型对象 每个原型对象都自动获取一个constructor属性 指向当前构造函数 每个实例都有一个隐式原型 指向当前构造函数的原型
 *          别忘记默认原型
 *              所有函数的默认原型都是Object的实例 [[prototype]] ---> Object.prototype
 *          确定原型和实例的关系
 *              A instanceOf B    // A是B的实例吗
 *              A.prototype.isPropertyOf(B) // A.prototype是B的原型吗
 *          谨慎的定义方法
 *              给原型添加方法一定要放到继承(重写原型)之后 否则断开连接
 *              不能使用字面量添加方法 会重写原型
 *          原型链的缺点
 *              包含引用类型的原型
 *              不能向超类型传递参数
 *      借用构造函数继承
 *          传递参数
 *              可以向超类传递参数
 *          借用构造函数的缺点
 *              方法都在构造函数内部定义 无法复用
 *              在超类上原型上定义的方法 实例不能访问
 *      组合继承(伪经典继承)
 *          使用原型链实现对原型属性和方法的继承，借用构造函数来实现实例属性的继承
 *          完美融合了 借用构造函数 和 原型继承 的优点
 *          缺点
 *              超类被调用了两遍
 *      原型式继承
 *          下 object()方法
 *          ES5 的Object.create()规范了原型式继承
 *          注意原型上使用引用类型值 赋值指针的副本
 *          在没有必要兴师动众的使用构造函数，而只想让一个对象与另一个对象保持引用关系 可以使用原型式继承
 *          
 *          Object.create()
 *               使用规范链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 *      寄生式继承
 *          
 *      寄生组合式继承(最优解)
 *          Object() 方法等同与 new Object() 包装器
 *              参数为 null undefined 时候 返回一个 {}
**/

void function() {
    // 原型链继承
    function SuperType() {
        this.property = 'parent proerty'
    }
    SuperType.prototype.getSuperValue = function() {
        return this.property;
    }

    function SubType() {
        this.subProperty = 'sub property'
    }
    SubType.prototype = new SuperType();
    SubType.prototype.constructor = SubType
    SubType.prototype.getSubValue = function() {
        return this.subProperty
    }
    var instance = new SubType();
    console.log(instance)


    // 构造函数式继承
    function SuperType1(name) {
        this.name = name
    }
    SuperType1.prototype.sayName = function() {
        return this.name
    }
    function SubType1(name, age) {
        SuperType1.call(this, name)
        this.age = age
    }
    // 不能访问 SuperType1.prototype 上的方法
    var instance2 = new SubType1('who', '18');
    console.log('instance2', instance2)


    // 原型式继承
    function object(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    }
    var obj = {
        name: 'A',
        friends: ['B', 'C']
    }
    var anotherPerson = object(obj);
    console.log('anotherPerson', anotherPerson)
    
    // 寄生式继承
    function createAnthoer(origin) {
        var clone = object(origin);
        clone.sayHello = function() {
            return 'hi!'
        }
        return clone;
    }
    var p = createAnthoer(obj); //返回一个新对象 有obj的属性和方法也有自己的方法

    /**
     *      寄生组合式继承
     *      SubType     子类
     *      SuperType   超类
     *      
     *      步骤
     *          创建对象 （创建一个超类的副本 同一个指针引用）
     *          增强对象  （修正constructor指针）
     *          指定对象 
     *          Object(SuperType.prototype) === SuperType.prototype 指针相同
    **/
    function inheritPrototype(subType, superType) {
        var prototype = Object(superType.prototype); //创建对象
        prototype.constructor = subType; // 增强对象
        subType.prototype = prototype // 指定对象
    }
}();
