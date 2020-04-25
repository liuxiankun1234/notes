/**
 *      Symbol和Symbol属性
 *          一种新的基本类型: 符号(Symbol) 用于创建对象私有成员
 *          Symbol解决了 ES5对象属性重名冲突问题
 *          
 *          Symbol 可以做常量的值
 *      未完 待续 使用知名符号暴露内部方法 
**/

(function() {
    /**
     *      创建符号值
     *          let symbol =  Symbol('description')
     *              基本类型 不可以通过new创建实例
     *              传入的参数 是针对当前symbol的描述信息 所以参数相同不代表相同的Symbol
     *              创建的Symbol('foo') Symbol('foo') 是两个不同的symbol
     *      应用场景
     *          Symbol用作对象的key 不可以for枚举出来
     *          Symbol来替代常量
     *          Symbol用来定义类的私有属性/方法
     *          
     *      类型判断
     *          typeof symbol ---> 'symbol'
     *      使用符号值
     *          [symbol] 放在可计算属性内
     *      共享符号值
     *          Symbol提供一个全局符号注册表 Symbol.for('description')
     *          let uid  = Symbol.for('uid')
     *          let uid2 = Symbol.for('uid')
     *          uid和uid2包含一个符号值 
     *          uid是先检索Symbol全局注册表中没有uid，然后创建了一个uid，uid2是检索uid描述符，找到了就返回这个不再创建
     *          uid和uid2相当于指针副本 指向同一引用
     * 
     *          Symbol.for 和 Symbol 的不同
     *              Symbol.for 会先查看全局有没有当前描述符的一个symbol对象， 如果有就返回当前的引用
     *              Symbol 描述符相同也不会返回同一个symbol对象
     * 
     *              Symbol.for只会检索Symbol.for注册全局变量 不会检索Symbol注册的全局变量
     * 
     *          
     *          Symbol.keyFor() 与 Symbol.for() 匹配使用
     *          Symbol.keyFor 会从 Symbol.for 注册表中找到已经注册的symbol，然后返回symbol的描述符(不包括空字符串)，没有就返回'undeifned'
     *          共享符号值独有方法 用于 在全局符号注册表中根据符号值检索出对应的键值
     *          
     *      符号值转换
     *          符号值不能转换成 字符串类型 和 数字类型
     *      检索符号属性
     *          Object.getOwnPropertySymbols(obj) 
     *          获取obj对象的symbol属性值 返回一个数组
     *      使用知名符号暴露内部方法 
     *          Symbol.hasInstance  
     *              供 instanceof 运算符使用的一个方法，用于判断对象继承关系
     *              每一个函数都有一个 Symbol.hasInstance 方法 用于判断指定对象是否为本函数的一个实例
     *              obj instanceof Object === Array[ Symbol.hasInstanceof ](obj)
     * 
     *          Symbol.isConcatSpreadable
     *              一个布尔类型值 在集合对象作为参数传递给Array.prototype.concat()方法时 指示是否要将该集合扁平化
     *              是否将一个类似于Array的集合用于数组的concat方法
     *          Symbol.match
     *              供String.prototype.match函数使用的一个方法 用于比较字符串
     *          Symbol.replace
     *              供String.prototype.replace函数使用的一个方法 用于替换字符串
     *          Symbol.search
     *              供String.prototype.search函数使用的一个方法 用于定位子字符串
     *          Symbol.split
     *              供String.prototype.split函数使用的一个方法 用于分割字符串
     *          Symbol.iterator
     *              返回迭代器
     *          Symbol.species
     *              用于产生派生对象
     *          Symbol.toPrimitive
     *              返回对象对应的基本类型的一个方法
     *          Symbol.toStringTag
     *              供String.prototype.toString函数使用的一个方法 用于创建对象的描述信息
     *          Symbol.unscopables
     *              一个对象 该对象的属性指示了哪些属性名不允许出现在with语句中
     * 
     * 
     * 
    **/
    
   let firstName = Symbol('first Name');

    /**
     *  如何定义Symbol属性名
     *      可计算属性（点运算符只能用在字符串上）
     *      Object.defineProperty
    **/

    const a1 = {};
    a1[firstName] = 'first name'
    const a2 = {
        [firstName]: 'first name'
    }
    Object.defineProperty({}, firstName, {value: 'first name'})

    let person = {}
    person[firstName] = 'lxk';
    console.log(firstName, person[firstName])
    // Symbol.keyFor('firstName')
    console.log(Symbol.keyFor(firstName))

    // Symbol.hasInstance方法
    






    // Symbol.isConcatSpreadable
    var collection = {
        0: 'hello',
        1: 'value',
        length: 2,
        [Symbol.isConcatSpreadable]: true
    }

    var newArr = ['hi '].concat(collection)
    console.log(newArr)
})();