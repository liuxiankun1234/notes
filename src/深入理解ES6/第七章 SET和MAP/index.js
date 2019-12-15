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
     *          无重复值的有序列表
     *          不会使用强制类型转换来判断是否重复（ 字符串的5和数字类型的5是不同的）
     *          set 认为 +0 === -0 NaN只能存在一次 其他同Object.is()判断标准相同，
     *          可以使用数组初始化一个set列表
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
     *      weak Set集合
     *      仅支持三个方法
     *      add()
     *      has()
     *      delete()
     *      
     *      不支持size 初始化赋值 之类的操作
     *      WeakSet 和 set区别
     *      主要的区别在于 set是强引用 weakSet是弱类型引用 如果引用的值清空 则weakSet的应用也销毁
     *      WeakSet仅支持传入对象 不支持基本类型 
     *      不支持迭代 for-of forEach 
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
     *      Map
     *      存储着许多键值对的有序列表 键名和键值支持所有类型
     *      键名的等价是通过Object.is()实现的 === 全等
     *      
     * 
     * 
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
     *      WeakMap
     *          键值必需是一个对象
     *          集合中保存的是这些对象的弱引用 如果弱引用之外不存在其他的强引用，引擎的垃圾回收机制自动回收这个对象
     *          
     * 
     * 
    **/
})();