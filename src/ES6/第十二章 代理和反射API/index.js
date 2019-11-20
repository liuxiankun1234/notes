/**
 *  hasOwnProperty 和 in
 *      hasOwnProperty 会忽略掉从原型上继承来的属性
 *      in 属性可以来自原型链上
 *  第十二章 代理和反射API
 *      代理是一种可以拦截并改变底层JavaScript引擎操作的包装器
 *      
 * 
 * 
 * 
 * 
**/
(function() {
    console.log('******************  1  ******************');
    /**
     *  
     *  数组问题
     *      数组属性和length属性具有非标准行为，因而在ES6中数组被认为是奇异对象（与普通对象相对）
     * 
     * 
    **/
    let colors = ['red', 'green', 'blue'];

    console.log(colors.length)
    colors[3] = 'black'
    console.log(colors.length)
    console.log(colors[3])

    colors.length = 2



    /**
     *      代理陷阱
     *          
     * 
     * 
     * 
     *  创建一个简单的代理
     *      入参 
     *          目标（target）
     *          处理程序（handler） 是定义一个或者多个陷阱的对象 不使用任何陷阱的处理程序等价于简单的转发代理
     *      
     * 
     * 
    **/ 
    let target = {}
    let proxy = new Proxy(target, {})
    proxy.name = 'proxy'
    
    console.log(proxy.name);
    console.log(target.name);

    target.name = 'target'
    console.log(proxy.name);
    console.log(target.name);
    

    

})();
(function() {
    console.log('******************  2  ******************');
    /**
     *      使用set陷阱验证属性 
     *          拦截写入操作
     *          入参
     *              trapTarget      用于接受属性的对象（ 代理的目标 ）
     *              key             要写入的属性键（字符串或者Symbol类型）
     *              value           要写入的属性
     *              receiver        操作发生的对象（通常是代理对象）
     * 
    **/

   let target = {
        name: 'target'
    }

    let proxy = new Proxy(target, {
        set(trapTarget, key, value, receiver) {
            /**
             *          receiver === proxy // ture
             *          trapTarget === target // true
             * 
            **/


            console.log(`${trapTarget === target}`)
            // 忽略不希望影响的已有属性
            if(!target.hasOwnProperty(key)){
                if( isNaN(value) ){
                    throw new TypeError('属性必需是数字')
                }
            }
            return Reflect.set(target, key, value, receiver)
        } 
    })

    proxy.b = '12' // 报错 只能是Number类型

    /**
     *      使用get陷阱验证属性 
     *          拦截读取操作
     *          入参
     *              trapTarget      用于接受属性的对象（ 代理的目标 ）
     *              key             要写入的属性键（字符串或者Symbol类型）
     *              receiver        操作发生的对象（通常是代理对象）
    **/
   let proxy1 = new Proxy(target, {
       get(trapTarget, key, receiver) {
            console.log(`${trapTarget === target} ${receiver === proxy1}`)

            if(!(key in trapTarget)){
                throw new TypeError(`属性${key}不存在`)
            }
            return Reflect.get(trapTarget, key, receiver)
       }
   })
    // console.log(proxy1.c); // 报错 c不存在

   /**
    *       使用has陷阱隐藏已有属性
    *           可以拦截in操作并返回一个不同值
    *           入参
    *               trapTarget
    *               key
    * 
   **/ 
    let target2 = {
        value: 1
    }
    console.log(`'value' in target2 ------> ${'value' in target2}`);
    console.log(`'toString' in target2 ------> ${'toString' in target2}`);
    
    let proxy3 = new Proxy(target2, {
        has( trapTarget, key ){
            if(key === 'value') {
                return false
            }
            return Reflect.has( trapTarget, key );
        } 
    })
    // 通过代理改变返回值
    console.log(`'value' in proxy3 ------> ${'value' in proxy3}`);
    console.log(`'toString' in proxy3 ------> ${'toString' in proxy3}`); 
})();
(function() {
    console.log('******************  3  ******************');
    /**
     *       使用deleteProperty陷阱隐藏防止删除属性
     *           delete操作符 可以从对象中删除属性 成功返回true 失败返回false
     *           严格模式下删除一个不可配置的属性 导致报错 非严格模式下 返回fasle
     *          
     *          每当使用delete操作符时 deleteProperty陷阱就会被低哦啊用
     *              入参
     *                  trapTarget
     *                  key
     *              使用场景
     *                  希望保护的属性不被删除 在严格模式下不抛错
     * 
    **/
    let target = {
        name: 'target',
        value: 42
    }
    Object.defineProperty(target, 'value', {
        configurable: false
    })
    console.log( `value in target ------> ${'value' in target}` )
    // let result1 = delete target.value // 严格模式报错 非严格模式 返回false
    // console.log(result1);

    let target1 = {
        name: 'target',
        value: 42
    }
    let proxy = new Proxy(target1, {
        deleteProperty(trapTarget, key){
            if(key === 'value'){
                return false
            }
            return Reflect.deleteProperty(trapTarget, key)
            // return key === 'value' ? false : Reflect.deleteProperty(trapTarget, key)
        }
    })
    console.log(`value in proxy ----> ${'value' in proxy}`);
    // console.log(`delete proxy.value ----> ${delete proxy.value}`);
})();
(function() {
    console.log('******************  4  ******************');
    /**
     *      原型代理陷阱
     *          原型代理下面两个方法
     *          Object.setPrototypeOf(target, proto)
     *              设置target的原型为proto
     *              内部调用Reflect.setPrototypeOf方法设置原型
     *              没有调用Reflect.setPrototypeOf的话 就不会设置原型了
     *          Object.getPrototypeOf(target)
     *              获取target目标元素的原型
     *              
     *              
     *      
     * 
     *      原型代理陷阱限制
     *          getPrototypeOf陷阱必须返回对象或者null
     *              返回的对象是原型对象
     *          setPtototypeOf陷阱中 
     *              如果操作失败则一定返回false 然后setPtototypeOf抛错
     *              如果setPtototypeOf
     *                  返回了任何非false的值 那么假设成功 
     *                  return false 的话 则设置原型报错
     * 
     * 
     * 
     * 
     *      Object.getPrototypeOf() Reflect.getPrototypeOf() 区别
     *          Object.getPrototypeOf 会将传入的参数进行包装 传入1 会变成1的包装类
     *          Reflect.getPrototypeOf 则会报错
     * 
     *      Object.setPrototypeOf() Reflect.setPrototypeOf()区别
     *          Object.setPrototypeOf()方法一旦失败会抛错
     *          Reflect.setPrototypeOf() 方法成功 返回true  失败返回 false
     *      
    **/
    // 
    var obj = {name: 1}
    var obj1 = { age: 18}

    Object.setPrototypeOf(obj1, obj)
    console.log(obj, obj1)
    console.log(Object.getPrototypeOf(obj1));
    


    let target = {}
    let proxy = new Proxy(target, {
        getPrototypeOf(target) {
            // 如果返回 非对象则抛错
            return {b: 1111}
            return Reflect.getPrototypeOf(target)
        },
        setPrototypeOf(target, proto) {
            return {b: 12}
            return Reflect.setPrototypeOf(target, proto)
        }
    })
    let targetProto = Object.getPrototypeOf(target)
    let proxyProto = Object.getPrototypeOf(proxy) 

    console.log( targetProto === Object.prototype )
    console.log( proxyProto === Object.prototype )

    console.log( proxyProto ) // null

    Object.setPrototypeOf( proxy, {a: 1} )

    console.log(target)



    /**
     *       
     * 
     * 
    **/
    let target2 = {};
    let result2 = Object.setPrototypeOf(target2, {})
    target2 === result2 // true

    let target3 = {};
    let result3 = Object.setPrototypeOf(target3, {})
    result3 === result3 // false
    result3 // true
})();

(function() {
    console.log('******************  5  ******************');
    /**
     *      对象可扩展属性
     * 
     * 
    **/
    
})();