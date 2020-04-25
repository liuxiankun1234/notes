/**
 *      set与map
 *          set
 *              参数是一个可以迭代对象(具有 iterable接口的数据结构)
 *              不包含重复值的列表 常用于检测某个值是否是存在
 *          weakSet
 *              成员只能是对象，不能是其他值
 *              成员都是若引用，垃圾回收不考虑WeakSet对该对象的引用
 *              
 *          map 键与相应值的集合
 *              键可以是各种类型，JS对象的键只能是字符串类型
 *              key值为引用类型时，相同是通过 引用地址相同来判断的
 *              初始化 数组可以作为初始参数 [[key, value], [key, value]]
 *              如果一个键多次赋值， 后面会覆盖前面的值（如果是 参数呢？严格模式下不可以重复）
 * 
 *          
 *              Map 转为数组
 *                  const myMap = new Map([ [true, true], [{a: 1}, {a: 1}] ])
 *                  [...myMap] // 展开运算符 可以展开一个二维数组
 *              数组转Map
 *                  const myMap = new Map([ [true, true], [{a: 1}, {a: 1}] ])
 *              Map转对象
 *                  如果所有 Map 的键都是字符串，它可以无损地转为对象
 *                  如果所有 Map 的键有非字符串类型，需要转为字符串类型再作为对象的属性
 *                
 * 
 *          JS 检验B对象身上是否有A属性 
 *              A in B 运算符 可以查询 A属性是否在B对象身上（包含原型）
 *              一般使用in运算符号 Object.create(null) 创建一个原型为null的空对象
 *          
 *          set集合转换为数组
 *          数组去重   [...new Set([1,2,3,4,3,2,1])]
 *          字符串去重 [...new Set('ababbc')].join('')
 * 
**/
(function() {
    console.log('******************  1  ******************');
    /**
     *      ES5中的map多用来提取数据
     * 
     * 
     * 
     * 
    **/
    // ES5中的set
    let set = Object.create(null);
    set.foo = true;
    // 检测属性的存在
    if(set.foo){
    }

    // ES5中的map 
    let map = Object.create(null);
    map.foo = 'bar'
    // 提取一个值
    let value = map.foo;
    console.log(value)
})();

(function() {
    console.log('******************  2  ******************');
    /**
     *      ES6中的set
     *          接受所有可迭代对象作为参数来初始化set集合
     *          无重复值的有序列表
     *          不会对加入的值进行类型转换
     *          set通过Object.is()进行判断(NaN只能存在一次) 不同点是set认为 +0 === -0
     *          重复添加同一个变量 会忽略掉(去重)
     *          不能通过索引访问set
     *      
     *          将set集合转成数组
     *              展开运算符 ... 原理是set有默认迭代器 展开运算符会调用默认迭代器
     * 
     *          创建 new Set() 
     *          追加 add()
     *          长度 size
     *          检测是否存在某个值 has()
     *          移除某个值 delete()
     *          清除所有值 clear()
     * 
     * 
     * 
     * 
    **/
    let set1 = new Set('small');
    // set1 {"s", "m", "a", "l"}
   let set = new Set(),
       small = Symbol('small')
   set.add(1);
   set.add('1');
   set.add(true);
   set.add(undefined);
   set.add(null);
   set.add({});
   set.add(small);
   set.add([1]);
   set.add([1]);
   set.add(NaN);
   set.add(NaN);
   set.add(NaN);
    
   console.log(set)
})();
(function() {
    console.log('******************  3  ******************');
    /**
     *      Set的forEach方法
     *          set不能通过索引操作
     *          forEach的index值是下一次循环的索引
     * 
     * 
     * 
    **/

    const set = new Set([1,2,3,4,5]);
    set.add(6);
    set[1]
    console.log(set[0])
    set.forEach((item, index) => {
        // console.log(item, index)
    })
    const list = [1,2,3,4,5]
    list.push(6);
    list.forEach((item, index) => {
        // console.log(item, index)
    })
})();
(function(){
    console.log('******************  4  ******************');
    /** 
     *  Set集合和Weak Set集合区别
     *      将对象存储在Set的实例与存储在变量中一样 只要Set实例中的引用存在 垃圾回收机制就不能释放该对象的内存
     *      Weak Set集合 只存储对象的弱引用 并且不可以存储原始值 集合中的弱引用如果是对象的唯一引用 则会被回收并释放相应内存
     *  Weak Set集合(弱引用Set集合) 
     *      仅支持三个方法
     *      add()
     *      has()
     *      delete()
     *      
     *      不支持size 初始化赋值 之类的操作
     *      WeakSet 和 set区别
     *      主要的区别在于 set是强引用 weakSet是弱类型引用 如果引用的值清空 则weakSet的应用也销毁
     *      WeakSet仅支持传入对象 不支持基本类型 
     *      不支持迭代器接口 不能被 for-of ... forEach 
     *      不支持size属性
    **/

    const weakSet = new WeakSet(),
        set = new Set();
    let key = {};
    weakSet.add(key);
    set.add(key);
    console.log(weakSet, set);
    key = null;
    console.log(weakSet, set);
})();
(function() {
    console.log('******************  5  ******************');
    /**
     *  WeakMap同Map选择
     *      仅用引用类型做key时候，首选WeakMap
     *      其他使用Map
     *  Map
     *      键名/键值支持所有类型
     *      键名相等比较是通过 Object.is()实现的
     *      可以用数组初始化Map [['key', 'value'], ['name', 'nicholas']] 因为数组不会将元素类型转换
     *  支持方法
     *      has(key)    // 检测指定键是否存在
     *      delete(key) // 删除指定键/值
     *      set(key, value) // 设置键值
     *      clear() // 移除所有键值对
     *  支持forEach方法
    **/
    let map = new Map();
    map.set('title', 'es6');
    map.set(1,1)
    map.set('1',1)
    map.set({}, {});
    console.log(map.get({}));
    // 初始化
    let map1 = new Map([['key', 'value'], ['age', 15]]);
    console.log(map1)
})();
(function() {
    console.log('******************  6  ******************');
    /**
     *  WeakMap
     *      键名必需是一个对象
     *      集合中保存的是这些对象的弱引用 如果弱引用之外不存在其他的强引用，引擎的垃圾回收机制自动回收这个对象
     *      同Map相同支持数组初始化 
     *      不支持clear()方法
     *      
     *      
    **/

    /**
     *  私有对象数据
     *      容易被改写
    **/ 
    class Person{
        constructor() {
            this._name = name;
        }
        getName() {
            return this._name
        }
    }
    // 闭包实现私有变量
    var Person1 = function() {
        var privateData = {},
            privateId = 0;

        function Person1(name) {
            Object.defineProperty(this, '_id', {value: privateId++});
            privateData[this._id] = {
                name: name
            }
        }
        Person1.prototype.getName = function() {
            return privateData[this._id].name;
        }
        return Person1;
    }();
    /**
     *  WeakMap 实现私有变量
     *  this被销毁 相关消息也被销毁 保证信息隐私
    **/
    var Person2 = function() {
        var privateData = new WeakMap();

        function Person2(name) {
            privateData.set(this, {
                name: name
            })
        }
        Person1.prototype.getName = function() {
            return privateData.get(this).name;
        }
        return Person1;
    }();
})();