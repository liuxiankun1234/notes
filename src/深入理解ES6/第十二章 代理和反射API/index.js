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
    // 实现MyArray类
    function isArrayIndex(key) {
        const numericKey = toUint32(key),
              MAX_ARRAY_INDEX = Math.pow(2, 32) - 1;
        return String(numericKey) === key && numericKey < MAX_ARRAY_INDEX;
    }
    class MyClass{
        constructor(length) {
            return new Proxy({length}, {
                set(target, key, value) {
                    var currentLength = Reflect.get(target, 'length');
                    if(isArrayIndex(key)) {
                        const numericKey = +key;
                        // 当索引大于length 修正length
                        if(numericKey > currentLength) {
                            Reflect.set(target, 'length', numericKey + 1);
                        }
                    }else if(key === 'length') {
                        if(value < currentLength) {
                            // 修正多余元素
                            for(var i = currentLength - 1; i >= value; i--) {
                                Reflect.deleteProperty(target, i);
                            }
                        }
                    }
    
                    return Reflect.set(target, key, value);  
                }
            })
        }
    }

    /**
     *  将代理用作原型
     *      当操作不涉及到原型时 不触发代理
     *      原型链查找 找到原型时才触发
    **/
    let target = {};
    let newTarget = Object.create(new Proxy(target, {
        defineProperty(target, name, descriptor) {
            return false;
        },
        get(target, key, receiver) {
            throw new Error(`${key} doesn't exist`)
        },
        set()
    }))
    // 给对象赋值 不会给原型赋值 所以不涉及到原型
    Object.defineProperty(newTarget, 'name', {
        value: 'not a prototype`s property'
    })
    newTarget.hasOwnProperty('name') // true
})();