/**
 *  未解之谜
 *      createCombinedIterator1 搜索这个方法瞧一瞧
 *      主要是return 这个方法
 * 
 *      var iterator = function *createItreator() { yield 1; yield 2; yield 3; }
 *      [...iterator]
 *          展开运算符同for-of一样 仅处理有[Symbol.iterator]属性的对象
 *         ... 展开 iterator 的[Symbol.iterator]方法
 *              iterator是Set Array      默认[Symbol.iterator]是 values()
 *              iterator是Map            默认[Symbol.iterator]是 entries()
 *              其它迭代器没有默认[Symbol.iterator]
 * 
 *  第八章 迭代器与生成器
 *      迭代器
 *          为什么会有迭代器出现呢？
 *              多个for循环嵌套问题，追踪变量会很复杂，迭代器消除了这种复杂性减少循环中的错误
 *          是一个特殊的对象 具有next()方法
 *      生成器 
 *          是一个返回迭代器对象的函数
 *          通过关键字 function 后面的*来表示 *可以紧挨着function关键字
 *      注意事项
 *          yield first + 2 中yield优先级 比 加号优先级低 所以等同于 yield (first + 2)
 *          yield 只能在生成器内部使用，不能穿透函数边界（同 return）即便是生成器函数作用域中的function也不行
 *          不能用箭头函数来创建生成器
 *          yield value 和 iterator.next(value) 可以双向传递value
 *   
**/
(function() {
    console.log('******************  1  ******************');
    /**
     * 
     *  什么是迭代器？
     *      是一个特殊的对象 所有迭代器对象都有一个next()方法 每次调用返回一个结果对象
     *      结果对象都两个属性
     *          value 表示下一个将要返回的值
     *          done Boolean类型 表示是否完成 没有更多可返回的数据时候 返回true
     * 
     *      感觉createIterator函数就是利用闭包封装一个变量
     *  
     **/
    function createIterator(items){ 
        let i = 0;
        
        return {
            next: function() {
                let value, done;
                done = i >= items.length
                value = done ? 'undefined' : items[i]
                i++
                // 简写
                // value = done ? 'undefined' : items[i++]
                return {
                    value,
                    done
                }
            }
        }
    }
    var iterators = createIterator([1, 2, 3])
    console.log(iterators.next())
    console.log(iterators.next())
    console.log(iterators.next())
    console.log(iterators.next())
    console.log(iterators.next())
})();
(function() {
    console.log('******************  2  ******************');
    /**
     * 
     *  什么是生成器？
     *      是一种返回迭代器的函数 
     *      通过function关键字后面的*符号来表示 
     *      函数中会用到新的关键字 yield
     *  生成器的函数表达式 function关键字后的括号前加一个*
     *  生成器的对象的方法
     *      ES5 let o = { createIterator: function *() {}}
     *      ES6 let o = { *createIterator() {} }
     *  不能使用箭头函数来创建生成器
     * 
     * 
     *   特性
     *      生成器函数每执行完一条yield语句后函数就会停止执行 知道再次调用next()方法才会继续执行
     *      yield关键字可以返回任何值或者表达式
     *      可以在循环中使用yield关键字
     *   限制
     *      yield关键字只可以在生成器内部使用 在其他地方使用抛错 即使在生成器内部的函数内部使用也会抛错
     *      同 return关键字一样 二者都不能穿透 函数边界
     *      不能使用箭头函数来创建生成器
     *  
    **/
    function* createIterator() {
        console.log(1)
        yield 1;
        console.log(2)
        yield 2;
        console.log(3)
        yield 3;
    }
    let iterators = createIterator();
    console.log(iterators.next());
    

    function* createIterator1(items) {
        for(let i = 0; i < items.length; i++){
            yield items[i]
        }
    }
    let iterators1 = createIterator1([1, 2, 3])
    console.log( iterators1.next() )
    console.log( iterators1.next() )
    console.log( iterators1.next() )
    console.log( iterators1.next() )
 
    // 错误示范 抛错
    function* createIterator2(items) {
        // yield 只能在生成器函数内部使用 不能穿透函数边界
        items.forEach(item => {
            yield i + 1
        })
    }

    // 生成器的函数表达式 function关键字后的括号前加一个*
    let createIterator3 = function *() {}
})();
(function() {
    console.log('******************  3  ******************');
     /**
     *  for-of 同迭代器一样 解决循环内部索引追踪问题
     * 
     *  可迭代对象和for-of循环
     *      可迭代对象具有 Symbol.iterator 属性 
     *          是一种与迭代器密切相关的对象
     *          理解为返回一个生成迭代器对象的生成器
     *      Symbol.iterator 通过指定的函数可以返回一个作用于附属对象的迭代器
     *      ES6中所有集合对象（数组 Set集合以及Map结合）和 字符串都是可迭代对象 都有默认的迭代器
     *          
     *      for-of循环通过调用[Symbol.itreator]方法来获取迭代器，多次调用next方法获取value值，循环至done为true为止
     *      具有 Symbol.iterator 属性的对象都有默认的迭代器 则可以使用for-of循环
     *
     *  特性
     *      由于生成器默认会为Symbol.iterator属性赋值，因此所有通过生成器创建的迭代器都是可迭代对象
     *      可以通过Symbol.iterator来访问对象默认的迭代器
     *  警告
     *      如果将 for-of 语句用于不可迭代对象 null undefined将会导致程序抛错
     * 
     * 
     *  建议
     *      如果只需迭代数组或集合中的值 用for-of循环代替for循环是一个不错的选择
     * 
     * 
     * 
     * 不同集合类型的默认迭代器
     *      array 和 set 集合默认迭代器是values
     *      Map集合默认迭代器是entries
    **/

    /**
     *      访问默认迭代器  
     *          for-of方法执行JS内部对调用 迭代器方法
     *          
     *  
     *          
     *      ******** 访问到 数组的 生成器函数 生成器函数执行 ********
    **/
    let values = [1, 2, 3]
    
    console.dir( values[ Symbol.iterator ] ) // 访问到 数组的 生成器函数
    let iterator = values[ Symbol.iterator ](); // 生成器函数执行 产生迭代器对象
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

    // 判断是否具有 Symbol.iterator对象
    function isIterable(object) {
        return typeof object[ Symbol.iterator ] === 'function'
    }
    console.log(
        isIterable( [1, 2, 3] ), // true
        isIterable( 'hello' ), // true
        isIterable( new Map() ), // true
        isIterable( new Set() ), // true
        isIterable( new WeakSet() ), // false
        isIterable( new WeakMap() ), // false
    );
    
    /**
     *  创建可迭代对象 
     *      默认情况下 开发者定义的对象都是不可迭代对象 
     *      给Symbol.iterator属性加一个生成器 则可以变成可迭代对象 可以使用for-of循环
     *      
     * 
     * 
    **/
    let collection = {
        items: [],
        *[ Symbol.iterator ]() {
            for( let item of this.items) {
                yield item
            }
        }
    }
    collection.items.push(1)
    collection.items.push(2)
    collection.items.push(3)
    for( let item of collection) {
        console.log(item);
    }

    /**
     *  内建迭代器 
     *      集合对象迭代器 
     *          ES6中的3种集合对象 array Map Set
     *          集合对象内建迭代器 返回的都是迭代器
     *              entries() 返回一个迭代器方法 值为多个键值对
     *              values()  返回一个迭代器方法 值为集合的值
     *              keys()    返回一个迭代器方法 值为集合中的所有键名
    **/
    
    /**
     *  entries()
     *      entries() 返回一个迭代器方法
     *          可以使用for-of方法循环这个集合
     *          也可以 使用next()方法 循环这个结合
     *  
     *  values() 返回一个值
     *  keys()   返回一个键  
     *              数组 返回数字类型的键 数组本身的其它属性不会被返回
     *              Set 由于键与值相同 所以返回值与 values()相同 
     *              Map 返回独立的键
    **/ 
    let colors = ['red', 'green'];
    let tracking = new Set([123, 456, 789])
    let data = new Map();
    data.set('title', 'ES6')
    data.set('format', 'ebook')

    console.log(colors.entries().next().value);
    

    console.log(colors.entries().next().value);
    console.log(colors.entries().next().value);
    

    for( let entry of colors.entries()){
        console.log(entry);
    }
    for( let entry of tracking.entries()){
        console.log(entry);
    }
    for( let entry of data.entries()){
        console.log(entry);
    }
    // 解构
    for( let [key, value] of data ){
        console.log(`解构出的 key：${key}, value：${value}`);
    }
})();
(function() {
    console.log('******************  4  ******************');
     /**
     * 
     *  字符串迭代器
     *      for循环不能准确的打印
     *      for-of可以
     * 
     *  NodeList迭代器
     *      ES5 循环NodeList forEach在移动端方法有问题（伪数组不支持NodeList循环）
     *      ES5 Array.prototype.slice.call(nodeList)
     *      ES6 for-of
     *      
    **/

    let str = "A 𠮷 B"
    for(let i = 0; i < str.length; i++ ){
        console.log(str[i])
    }
    // log A 空 空 空 空 B
    for(let value of str){
        console.log(value);
    }
    // log A 空 𠮷 空 B
})();
(function() {
    console.log('******************  5  ******************');
     /**
     *  高级迭代器功能
     *      如果给迭代器的next()方法传递参数 
     *          这个参数值会替代生成器内部  上一条  yeild语句的返回值     
     *          第一次调用无意义  
     *   
     *    
     *      
    **/
    function *createIterator() {
        let first = yield 1;
        console.log(first)
        let second = yield first + 2;
        yield second + 3
    }
    const iterators = createIterator();

    // 第一次调用传入的参数无意义 因为没有上一次yield  
    //      这个时候执行yield 1;即给当前迭代器返回的值是1
    // 第二次调用next()参数是2 替换 上一次yield 1 所以first的值是2 yield 4
    // 第三次调用next()参数是3 替换 上一次yield 4 所以second的值是3 yield 6
    console.log(
        iterators.next(1).value, // 1
        iterators.next(2).value, // 4
        iterators.next(3).value // 6
    );
})();
(function() {
    console.log('******************  6  ******************');
     /**
     *  生成器返回语句 
     *      生成器也是函数 可以通过return语句提前退出函数执行
     *      return语句可以提前退出函数执行 
     *      
     *      注意
     *          return 返回之后 通知done为true 不执行之后的yield
     *          return 一个值的时候 只在第一次done为ture的时候返回 之后再调用next() value还是undefined
     *          展开运算符和for-of会直接忽略return语句指定的任何返回值
     *    
     *      
    **/
    // 生成器返回语句
    function *createIterator() {
        yield 1;
        yield 2;
        return 12
        yield 3;
    }
    const iterators = createIterator();
    // console.log(
    //     iterators.next(),
    //     iterators.next(),
    //     iterators.next(),
    //     iterators.next()
    // )

    /**
     *  委托生成器
     *      将两个迭代器合二为一 可以执行复杂的任务
     *      可以创建一个生成器 再给yeild语句添加星符号 就  可以将生成数据的过程委托给其他迭代器
     *  
     *  yield * 也可以用在 字符串上 委托给 字符串默认迭代器
     *  yield *'HELLO' 
    **/
    // 例子一
    function *createNumberIterator() {
        yield 1;
        yield 2;
    }
    function *createColorsIterator() {
        yield 'red'
        yield 'green'
    }
    function *createCombinedIterator() {
        yield *createNumberIterator()
        yield *createColorsIterator()
        yield true
    }
    var iterators1 = createCombinedIterator()
    // console.log(
    //     iterators1.next().value, // 1
    //     iterators1.next().value, // 2
    //     iterators1.next().value, // 'red'
    //     iterators1.next().value, // 'green'
    //     iterators1.next(), // true
    //     iterators1.next(), // {value: undefined, done: true}
    // );
    
    // 例子二
    function *createNumberIterator1() {
        console.log('yield 1')
        yield 1;
        console.log('yield 2')
        yield 2;
        console.log('return 3')
        return 3;
    }
    function *createRepeatingIterator(count) {
        for(let i = 0; i < count; i++){
            yield 'repeat'
        }
    }
    function *createCombinedIterator1(){
        // yield * 将生成数据的过程委托给 createNumberIterator1 这个生成器函数
        // createNumberIterator1函数内部 第一步 yield 1 第二步 yield 2
        // 第三步 函数内部没有yield 值 而是return 所以result 被return的值赋值

        let result = yield *createNumberIterator1()
        console.log(result)
        yield *'HELLO'
        yield *createRepeatingIterator(result)
    }
    var iterators2 = createCombinedIterator1()
    console.log(
        iterators2.next().value, // 1
        iterators2.next().value, // 2
        iterators2.next(), // 'repeat'
        // iterators2.next(), // 'repeat'
        // iterators2.next(), // repeat
        // iterators2.next(), // {value: undefined, done: true}
    );
})();
(function(){
    console.log('******************  7  ******************');
    /**
     *  简单任务执行器
     *      函数run接受一个生成器函数作为参数
     *      通过 task.next(result.value) 传递参数 就可以实现异步传值了
    **/
    function run(taskDef){
        // 创建一个无限使用限制的迭代器
        let task = taskDef()

        // 开始执行任务
        let result = task.next()
        console.log(result);
        

        function step() {
            // 如果任务未完成 则继续执行
            if(!result.done){
                result = task.next(result.value)
                step()
            }
        }

        // 开始迭代执行
        step()  
    }

    run(function *() {
        let value = yield 12
        console.log(value)
        
        value = yield value + 3
        console.log(value)
    })
})();
(function() {
    console.log('******************  8  ******************');
    /**
    *      异步任务执行器
    *               
    * 
    * 
    * 
   **/
    // 定义一个异步操作
    function fetchData() {
        return function(callback) {
            setTimeout(res => {
                callback(null, 'Hi')
            }, 500)
        }
    }
    /**
     *      run方法接受一个生成器作为参数
     *  
    **/
    function run(taskDef) {
        let tasks = taskDef();

        let result = tasks.next()

        function step() {
            if(!result.done){
                if( typeof result.value === 'function' ){
                    result.value((err, data) => {
                        if(err) {
                            result = tasks.throw(err)
                            return
                        }
                        result = tasks.next(data)
                        step()
                    })
                }else{
                    result = tasks.next(result.value)
                    step()
                }
            }
        }
        step()
    }
    run(function *() {
        let str = yield function(callback) {
            setTimeout(res => {
                callback(null, 'Hi')
            }, 2000)
        }
        console.log(str)
    })
})();