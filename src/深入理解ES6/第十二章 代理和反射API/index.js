/**
 *  严格模式下 deleteProperty报错 看下 delete proxy.name 又返回值为啥还报错？？？
 *   
 *  Object.preventExtensions(obj)
 *      将obj对象变为不可扩展对象 不能给自身添加属性
 *      原型不可重写
 *      可以删除自身属性
 *      可以给原型添加属性     
 *  Object.isExtensible(obj)
 *      返回obj对象是否是可扩展属性
 *  代理(Proxy)和反射(Reflection)API
 *      拦截器内部一定要返回反射方法 Reflect[property]
 * 
 * 
 *      数组问题
 *          给数组特定元素赋值时，影响该数组的长度，相反，通过改变length属性也可修改数组元素
 *      代理程序
 *          参数(target, handler)
 *              target 代理的目标对象
 *              handler 定义一个/多个陷阱对象
 *      使用set陷阱验证属性
 *          拦截写入的操作
 *          参数(trapTarget, key, value, receiver)
 *              trapTarget 代理的目标对象
 *              key 写入键
 *              value 写入值
 *              receiver 代理对象
 *      使用deleteProperty陷阱防止删除属性
 *          delete操作符删除属性
 *              尝试删除不可配置属性(configurable: false) 非严格模式 返回false 严格模式报错
 *      setPrototypeOf/getPrototypeOf
 *          Object.setPrototypeOf/Object.getPrototypeOf 方法底层 是 Reflect.setPrototypeOf/Reflect.getPrototypeOf
 *          在内部做了一层数据兼容处理
 *          Reflect.getPrototypeOf(1) // 报错
 *          Object.getPrototypeOf(1) // 做了一个包装操作 不会报错
 *      defineProperty
 *          会忽略传入的非法描述符 
**/
(function() {
    // 'use strict'
    /**
     *  通过改变数组元素 影响数组长度
     *  通过该改变数组长度 改变数组元素
    **/
    var arr = [1, 2, 3, 4];
    arr[4] = 5;
    console.log(arr) // [1, 2, 3, 4, 5];
    arr.length = 2;
    console.log(arr) // [1, 2]


    var target = {
        name: 'target'
    }
    var proxy = new Proxy(target, {
        //  拦截写入操作
        set(target, key, value, receiver) {
            // 非自身属性 如果设置的值是非数字类型 则报错
            if(!target.hasOwnProperty(key)) {
                if(typeof value !== 'number') {
                    throw new Error(`属性${key}必须是个Number类型`)
                }
            }
            return Reflect.set(target, key, value, receiver);
        },
        // 拦截读取操作
        get(target, key, receiver) {
            // 读取对象及原型上没有的属性 则报错
            if(!(key in target)) {
                throw new Error(`属性${key}不存在`)
            }
            return Reflect.get(target, key, receiver);
        },
        // 拦截 in 检测 (prop in object)
        has(target, key) {
            // 隐藏某种类型属性
            if(typeof target[key] !== 'number') {
                return false;
            }
            return Reflect.has(target, key);
        },
        // 拦截delete属性
        deleteProperty(target, key) {
            if(key === 'name') {
                return false;
            }
            return Reflect.deleteProperty(target, key); 
        },
        getPrototypeOf(target) {
            return null
        },
        setPrototypeOf(target, proto) {
            // return false // 报错 不可修改原型
            if(proto == null) {
                throw new Error('原型不能为${proto}');
            }
            return Reflect.setPrototypeOf(target, proto);
        },
        isExtensible(target) {
            return Reflect.isExtensible(target);
        },
        preventExtensions(target) {
            // return false // 表示未调用 Reflect.preventExtensions 没有效果
            return Reflect.preventExtensions(target);
        },
        defineProperty(target, key, descriptor) {
            // 拦截Symbol属性
            if(typeof key === 'symbol') {
                return false
            }
            return Reflect.defineProperty(target, key, descriptor)
        },
        getOwnPropertyDescriptor(target, key) {
            return Reflect.getOwnPropertyDescriptor(target, key);
        },
        /**
         *  ownKeys拦截的方法有
         *      Object.keys()
         *      Object.getOwnPropertyNames()
         *      Object.getOwnPropertySymbols()
         *      Object.assign()
         * 
        **/
        ownKeys(target) {
            return Reflect.ownKeys(target).filter(key => {
                // 可以用于过滤私有属性
                return typeof key === 'string' && key[0] !== '_'
            })
        }
    });

    /**
     *  函数的代理 apply和construct
     *      函数有两个内部方法 [[call]] [[constuct]]
     *      apply拦截 [[call]] 方法
     *      construct拦截 [[constuct]] 方法
     * 
     *  不用new调用构造函数
     *      要绕过new操作 并且还不能控修改行为的函数 可以用代理
     *      可以通过在 apply代理函数里调用construct代理 来
     *  可调用的类构造函数
     *      // 重写[[call]]方法
     *      apply: function(target, thisArgs, argumentList) { return new target(...argumentList) }
     *      
    **/
    var target = function(...values) {
        values.reduce((prev, current) => prev + current, 0);
    };
    var proxy = new proxy(target, {
        apply: function(target, thisArgs, argumentList) {
            // 验证函数参数
            argumentList.forEach(num => {
                if(typeof num !== 'number') {
                    throw new Error('参数必须全部是数字啊 同学!')
                }
            })
            return Reflect.apply(target, thisArgs, argumentList)
        },
        construct: function(target, argumentList) {
            // 可以做拦截不可以使用new调用
            return Reflect.construct(target, argumentList)
        }
    })


    // proxy.age = 18; // 报错 
    // proxy[Symbol('AAAA')] = 12; 
    console.log(
        // delete proxy.name // 为啥报错了
        // Object.getPrototypeOf(proxy),
        // Object.setPrototypeOf(proxy, {a: 2})
        // Object.preventExtensions(proxy),
        // Object.isExtensible(proxy),
        // proxy
    )  
    // Object.defineProperty(proxy, 'sayName', {
    //     value: Symbol('哈哈')
    // })
})();





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
    

    

});
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
});
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
});
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
});

(function() {
    console.log('******************  5  ******************');
    /**
     *      对象可扩展属性
     * 
     * 
    **/
    
});