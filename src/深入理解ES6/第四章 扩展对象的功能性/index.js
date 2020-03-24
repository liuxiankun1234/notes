/**
 *      未解之谜
 *          Object.assign() 访问器属
 *          为什么es6的sayName方法没有prototype方法 而es5定义的sayName有原型方法
 *      对象类别
 *          普通(Ordinary)对象
 *              具有JS对象所有的默认内部行为
 *          特异(Exotic)对象
 *              具有某些与默认行为不符的内部行为
 *          标准(Standard)对象
 *              es6规范中定义的对象 Array Date 标准对象既可以是普通对象 也可是 特异对象 
 *          内建对象 
 *              脚本执行时存在于JS执行环境的对象，多有标准对象都是内置对象
 * 
 * 
 *      对象字面量语法扩展
 *          属性初始值的简写
 *              当对象的属性和本地变量同名 可以简写
 *          对象方法的简写语法
 *              sayName(){ return this.name } 
 *              与es5区别 可以使用super关键字
 *          可计算属性
 *              []表示 可以传入变量
 *  
 *      新增方法
 *          Object.is()
 *              方法大部分情况与 === 全等运算符相同
 *              特殊情况
 *                  Object.is(+0, -0)   --> false
 *                  Object.is(NaN, NaN) --> true
 *          Object.assign()
 *              浅复制 同 extends 方法
 *              Object.assign({}, common, {others: 'others'}) 这样common不会被修改
 *              同名后面的属性覆盖前面的属性
 *              访问器set属性会将值返回 给assign方法进行赋值
 * 
 *          重复的对象字面量属性
 *               取最后一个值的结果  同Object.assign()
 *               ES5严格模式下会有语法错误
 *          自有属性枚举顺序
 *              Object.getOwnPropertyNames()
 *              返回顺序 数字升序 字母加入时候顺序 Symbol加入时候顺序 
 *              不同 for in 这个循环按照顺序 各浏览器厂商不同
 * 
 *          增强对象的原型
 *              改变对象的原型
 *                  Object.create()
 *                      参数是要创建对象的原型对象 null-->创建一个没有原型的对象
 *                      friend --> 创建一个原型为friend的对象
 *                  Object.setPrototypeOf(A, B)
 *                      设置A对象的原型为B
 *                  Object.getPrototypeOf(person) --> 返回值 是 person的隐式原型 person.__proto__
 * 
 *          
 *          简化原型访问的super引用
 *              super  === Object.getPrototypeOf(this)
 *              super指向当前实例的原型 调用方法中的this指向当前对象
 *              super只可以用在 执行上下文中使用 sayName() {} 不能在 sayName: function() {}中使用
 *              为什么es6的sayName方法没有prototype方法 而es5定义的sayName有原型方法
 * 
 *          正式的方法定义
 *              方法  sayName() {} 
 *              函数  sayName: function()
 * 
 *              es6中正式将方法定义为一个函数 他会内部有一个 [[HomeObject]]的属性来容纳这个方法从属的对象
 *              super 会根据 HomeObejct 来定位当前方法所属的对象是谁 再通过原型链查找方法（等同于实例方法查找） 
**/



(function() {
    console.log('******************  1  ******************');
    /**
     *      对象字面量语法扩展
     *          属性初始值的简写
     *              当对象的属性和本地变量同名 可以简写
     *          对象方法的简写语法
     *              sayName(){ return this.name } 同es5区别 可以使用super关键字
     *          可计算属性
     *              []表示 可以传入变量
    **/
    // 属性初始值的简写
    function createPerson(name = '', age = 18) {
        return {
            name,
            age
        }
    }
    var person = console.log( createPerson('lxk') )

    /**
     *  对象方法的简写语法
     *      下面两种是有区别的 第一个是sayName函数的简写 第二个说sayName是一个箭头函数
     *      区别的话就是 箭头函数和函数的区别 
     *      箭头函数
     *          内部没有this，arguments，new.target, super
     *          没有内部[Construct]构造器方法 不能new调用
     *          不能修改this指向 包括call bind apply
     *          没有arguments 只能通过命名参数和不定参数访问
     *          不支持重复命名参数
     *          没有原型
     *  
    **/
   
    var person = {
        name: 'lxk',
        sayName() {
            return this.name
        }
    }
    var person1 = {
        name: 'lxk',
        sayName: () => {
            return this.name
        }
    }
    person.sayName('刘先坤')
    person1.sayName();
})();
(function() {
    console.log('******************  2  ******************');
    /**
     *      新增方法
     *      Object.is()
     *      方法大部分情况与 === 全等运算符相同
     *      特殊情况
     *          Object.is(+0, -0)   --> false
     *          Object.is(NaN, NaN) --> true
     * 
     * 
     *      Object.assign()
     *          就是extends方法
     *          Object.assign({}, common, {others: 'others'}) 这样common不会被修改
     *          同名后面的属性覆盖前面的属性
    **/
    function diff(){
        console.log('************ diff +0 -0 ************')
        console.log(+0 == -0);
        console.log(+0 === -0);
        console.log(Object.is(+0, -0));

        console.log('************ diff NaN ************')
        console.log(NaN == NaN);
        console.log(NaN === NaN);
        console.log(Object.is(NaN, NaN));
    }
    diff();
});
(function() {
    console.log('******************  3  ******************');
    /**
     *      重复的对象字面量属性
     *          取最后一个值的结果  同Object.assign()
     * 
     *      自有属性枚举顺序
     *          Object.getOwnPropertyNames()
     *          返回顺序 数字提前生序排序 剩下字母和Symbol按照加入的顺序来
     *          不同 for in 这个循环按照顺序 各浏览器厂商不同‘
    **/
    var obj = {
        a: 1,
        0: 1,
        c: 1,
        2: 1,
        b: 1,
        1: 1
    }
    obj.d = 1;
    for(var k in obj){
        console.log(k)
    }
    console.log(Object.getOwnPropertyNames(obj))
});
(function() {
    console.log('******************  4  ******************');
    /**
    *       增强对象的原型
    *           改变对象的原型
    *               Object.create()
    *                   参数是要创建对象的原型对象 null-->创建一个没有原型的对象
    *                   friend --> 创建一个原型为friend的对象
    *               Object.setPrototypeOf(A, B)
    *                   设置A对象的原型为B
    *                   兼容性不好 移动端 不兼容
    * 
    *               Object.getPrototypeOf(person)
    *                   返回值 是 person的隐式原型 person.__proto__
    *                   兼容性 移动端 除了firefox4以下都兼容
    * 
    **/
    let p = {
        getGeeting() {
            return '人类的祖先'
        }
    }
    let person = {
        getGeeting() {
            // console.log(super.getGeeting())
            return 'Hello'
        }
    }
    let dog = {
        getGeeting() {
            return 'Woof'
        }
    }

    let friend = Object.create(person);
    console.log(
        friend.getGeeting(),
        Object.getPrototypeOf(friend) === person
    );

    Object.setPrototypeOf(friend, dog);


    console.log(
        friend.getGeeting(),
        Object.getPrototypeOf(friend) === dog
    );
});
(function() {
    console.log('******************  5  ******************');
    /**
     *      简化原型访问的super引用
     *          super 当前实例的原型对象
     *          可以记住当前对象的原型是谁 
     *          super只可以用在 执行上下文中使用 sayName() {} 不能在 sayName: function() {}中使用
     *          为什么es6的sayName方法没有prototype方法 而es5定义的sayName有原型方法
     *          
     * 
     * 
    **/

   let person1 = {
        name: 'person1',
        getGeeting() {
            console.log(22222)
            return this.name;
        }
    }

    let person = {
        name: 'person',
        getGeeting() {
            return this.name;
        }
    }
    
    Object.setPrototypeOf(person, person1)

    let friend = {
        name: 'friend',
        getGeeting() {
            // friend hi
            // 注意 this指向调用当前方法的实例 死循环
            return Object.getPrototypeOf(this).getGeeting.call(this) + ' hi'
            // super指向当前对象的原型 this指向当前对象
            return super.getGeeting() + ' hi'
        }
    }
    Object.setPrototypeOf(friend, person)

    console.log(
        friend.getGeeting(), // friend hi
    )


    var p = Object.create(friend)
    console.log(
        p.getGeeting(), // friend hi
    )

    // 解决方案
    // super super 可以清楚的知道 当前对象的原型是谁

    
    
})();

(function() {
    console.log('******************  6  ******************');
    /**
     *      正式的方法定义
     *      es6中正式将方法定义为一个函数 他会内部有一个 [[HomeObject]]的属性来容纳这个方法从属的对象
     *      super 会根据 HomeObejct 调用getPrototypeOf()方法来检索原型的引用 然后搜索同名函数  
     *      
    **/

    let person = {
        // 是方法
        getGeeting() {
            // 此方法的[[homeObject]] 属性值是person 调用Object.getPrototypeOf(person).getGeeting.call(this);
            return super.getGeeting() + 'hi'
        }
    }
    // 不是方法
    function getGeeting() {
        return 'getGeeting'
    }
});



