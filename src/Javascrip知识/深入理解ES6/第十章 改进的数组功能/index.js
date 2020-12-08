/**
 * 
 *  第十章 改进的数组功能
 *      ES5数组方法地址
 *          ../../talk_about_数组方法.js
 * 
 *      未读定型数组
 * 
 * 
 * 
**/
(function() {
    console.log('******************  1  ******************');

    /**
     *  es5数组问题
     *      传入一个数值类型的值 表示创建一个长度为数值的数组
     *      传入其他参数 表示创建一个数组元素为参数的数组，长度为参数的长度
     *      这样的表现不一致 有风险
     * 
    **/
    let items = new Array(2); // 长度为2
    let items1 = new Array('2'); // 唯一的元素 是'2'
    let items2 = new Array(2, '1'); // 传入的两个元素是 2 和 '1'
    

    /**
     *      ES6 创建数组
     *          Array.of()
     *              参数是初始化数组的值 即使是一个数值类型 也当作初始化的元素
     *              Array.of()方法不通过Symbol.species属性确定返回值的类型，他使用当前构造函数（也就是of()方法中的this值）来确定正确的返回数据的类型
     *          Array.from() 代替es5中将arguments对象转为数组对象 
     *              将类数组/可迭代对象转为数组(类数组对象又是可迭代对象 则按照可迭代对象转换)
     *              第二个参数 是一个函数 同map方法
     *              Array.form(new Set([1,2,3])) 
     *              Array.prototype.slice.call(arguments)
     *             
    **/
    //  Array.of()   参数是初始化数组的值 即使是一个数值类型 也当作初始化的元素
    let items4 = Array.of(4); // items4.length === 1 &&  items[0] === 4
    
    /**
     *      es5中将arguments对象转为数组对象 
     *          Array.prototype.slice.call(arguments)
     *          为什么slice可以将likeArray转换为Array?
     *              第一 slice返回的是一个数组 
     *                      slice是数组的方法 返回一个当前数组的片段包含开始位置 不包含结束位置
     *              第二 为什么数组的方法可以用在arguments上
     *                      slice接受的对象是一个 只要是索引值是数字 有length属性就可以操作 不一定是数组类型
     *                      Array.prototype.slice({0: 'a', 1: 'b', '2': 'c, d: 'd', 4: 'e', length: 9}) --> ["a", "b", "c", empty, "e", empty × 4]
     *                          length的长度决定数组的长度
     *                          索引类型 == 数字类型的都可以被slice抓到
     * 
     *          
     *              arguments就是一个{0: 'a', 1: 'b', length: 2} 这样的类数组对象
     *          
     *      es6中Array.from() 将对象转为数组对象
     *          
     *              
    **/
    function foo() {
        console.log(`arguments instanceof Array ${arguments instanceof Array}`)
        console.log(arguments)
        console.log(Array.prototype.slice.call(arguments), Array.prototype.slice.call(arguments) instanceof Array)
        console.log( Array.from(arguments), Array.from(arguments) instanceof Array  )
    }
    // foo(1, 2, 3, 4);

    let arrayFromLikeArray = Array.prototype.slice.call({0: 'a', 1: 'b', '2': 'c', d: 'd', 4: 'e', length: 9})
    console.log( arrayFromLikeArray )

    // Array.from传入第二个参数 是一个方法 对每一个值进行操作，同map
    Array.from({
        0: 'a',
        1: 'b',
        length: 2
    }, item => 'd' + item)

    //  Array.from传入第三个参数 是this的指向
    var value = 'window value'
    var data = {
        value: 1
    }


    /**
     *      下面这个案例是错误的 
     *          1 因为箭头函数绑定了声明时候的作用域 this指向window不会被修改 只能使用正常的函数来做
     *          2 严格模式下this的值不被手动绑定的话 默认指向undefined 所以拿不到undefined.value
     * 
     * 
     * 
     * 
    **/
    // Array.from({
    //     0: 'a',
    //     1: 'b',
    //     length: 2
    // }, (item) => {
    //     console.log(this)
    //     return item + this.value
    // }, data)
    var arr = Array.from({
        0: 'a',
        1: 'b',
        length: 2
    },function (item){
        console.log(this)
        return item + this.value
    }, window)
    console.log(arr); //  ['a1', 'b1']
})();
(function(){
    console.log('******************  2  ******************');
    /**
     *      数组添加新方法
     * 
     * 
     *      find() findIndex() 方法
     *          接收两个参数
     *              回调函数
     *                  传入的参数 元素 对应索引 当前数组
     *              可选参数 指定回调函数中this的值
     * 
     *      fill()方法 填充
     *          第一个参数
     *              用当前元素填充整个数组
     *          第两个参数
     *              指定填充的位置  包含开始 不包含结束
     *              可以接受负数 (-1 === length - 1)
     *              
     *          example 
     *              numbers1.fill(0, 1) 用0填充数组，填充的位置从数组的第一个开始到结尾
     *              numbers1.fill(0, 1, 2) 用0填充数组，填充的位置是数组的第一个元素
     *     
     *      copyWithin()方法
     *          接收三个参数  
     *              要粘贴的索引值
     *              要复制的索引值 start (相对粘贴的索引值独立)
     *              要复制的索引值 end（可选）默认重写至数组末尾
     *              
     *          
    **/
    // find() findIndex() 方法

    let numbers = [1, 10, 15, 21, 35, 46, 53, 77]
    // 找到数组中比33大的第一个数
    let numisGreater33 = numbers.find(value => value > 33)
    // 找到数组中比33大的第一个数对应的索引
    let nuIndexmisGreater33 = numbers.findIndex(value => value > 33)
    
    console.log( numisGreater33, nuIndexmisGreater33 )

    // fill()方法 填充
    let numbers1 = [1, 2, 3, 4];
    numbers1.fill(1) //  [1, 1, 1, 1]
    numbers1.fill(0, 1, 3) // [1, 0, 0, 1]
    
    // copyWithin()方法
    let numbers2 = [1, 2, 3, 4];
    // 从numbers2的第0位开始拷贝 粘贴到数组的第一位 ...到结束
    numbers2.copyWithin(1, 0)   // [1, 1, 2, 3]
    numbers2.copyWithin(2, 1, 1) // [1, 2, 2, 3]
})();