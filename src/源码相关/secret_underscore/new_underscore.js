//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

// 立即执行函数表达式
(function() {
    // 基础配置信息
    // --------------

    /**
     *  创建根对象
     *      浏览器环境是window或者self
     *      服务端(node环境)是global
     *      其他虚拟机是this
     *      我们使用self替换window在WebWorker
     * 
     *  强烈推荐：使用分组运算符来区分优先级
    **/

    var root = 
    (typeof self === 'object' && self.self === self && self) || 
    (typeof global === 'object' && global.global === global && global) || 
    this ||
    {};


    // 保存前一个_变量值
    // TODO previousUnderscore 解决冲突问题
    var previousUnderscore = root._;

    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype;
    var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

    // Create quick reference variables for speed access to core prototypes.
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;

    // Create a safe reference to the Underscore object for use below.
    var _ = function(obj) {
        if(obj instanceof _) return _;
    }

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility(向后兼容) for their old module API. If we're in
    // the browser, add `_` as a global object.
    // (`nodeType` is checked to ensure that `module`
    // and `exports` are not HTML elements.)
    // TODO 这块是未解之谜 
    if (false && typeof exports != "undefined" && !exports.nodeType) {
        if (
            typeof module != "undefined" &&
            !module.nodeType &&
            module.exports
        ) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    // 当前版本
    _.VERSION = '1.9.1'

    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
     /**
     *  optimizeCb函数
     *      对内部func进行绑定this处理
     *      通过使用call而不使用apply，优化绑定
     *  真正的问题是 为什么使用call而不是使用apply去处理参数？
     *      call的性能优于apply？
     **/
    var optimizeCb = function(func, context, argCount) {
        if(context === void 0) return func;

        switch(argCount == null ? 3 : argCount) {
            case 1:
                return function() {

                }
            case 3:
                return function(value, key, collection) {
                    return func.call(context, value, key, collection)
                }
            case 4:
                return function(accumulator, value, index, collection) {
                    return func.call(
                        context,
                        accumulator,
                        value,
                        index,
                        collection
                    );
                };
                break;
        }
        return function() {
            return func.apply(context, arguments);
        };
    }

    // 一个内部方法 可以生成可以应用到集合中每个元素的回调，返回期望的结果 
    // 即 dentity 任意回调 属性匹配器 属性访问器
    // TODO 待补充
    var cb = function(value, context, argCount) {
        // if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
        // undefined null 走默认迭代函数
        if (value == null) return _.identity;
        // 传入的是函数 直接走优化函数
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        // 如果是对象 非数组 走 matcher
        // if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
        // 非对象 函数 null undefined 
        // return _.property(value);
    
    }

    // 实际上仅兼容额 属性值为null的时候 返回undefined
    var shallowProperty = function(key) {
        return function(obj) {
            return obj[key] == null ? void 0 : obj[key];
        }
    }

    var has = function(obj, path) {
        return obj != null && hasOwnProperty.call(obj, path);
    };

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = shallowProperty('length');
    var isArrayLike = function(collection) {
        var length = getLength(collection);
        return typeof length === 'number'
            && length > 0
            && length < MAX_ARRAY_INDEX
    }
    // Collection Functions
    // --------------------
    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles raw objects in addition to array-likes. Treats all
    // sparse array-likes as if they were dense.
    // 处理了数组 类数组 对象
    /**
     *  each方法
     *      this绑定问题
     *      处理数组元素的同时，兼容处理了类数组，对象
    */
    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);

        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj)
            }
        }else{
            var keys = _.keys(obj);
            for(i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj)
            }
        }
    }
    
    // Return the results of applying the iteratee to each element.
    _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);

        var keys = !isArrayLike(obj) && _.keys(obj);
        var length = (keys || obj).length;
        var results = Array(length);

        for(var i = 0; i < length; i++) {
            var currentKey = keys ? keys[i] : i;
            results[i] = iteratee(obj[currentKey], currentKey, obj)
        }
        return results;
    }

    // Create a reducing function iterating left or right.
    var createReduce = function (dir) {
        var reducer = function(obj, iteratee, memo, initial) {
            // 只能处理 字符串 数组 类数组 对象
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;

            if(!initial) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }

            for(; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj)
            }
            
            return memo;
        }
        return function(obj, iteratee, memo, context) {
            var initial = arguments.length > 3;
            return reducer(
                obj,
                optimizeCb(iteratee, context, 4),
                memo,
                initial
            )
        }
    }

    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`.
    _.reduce = _.foldl = _.inject = createReduce(1)

    // The right-associative version of reduce, also known as `foldr`.
    _.reduceRight = _.foldr = createReduce(-1)

    // Return the first value which passes a truth test. Aliased as `detect`.
    _.find = _.detect = function(obj, predicate, context) {

    }
    /**
     *  创建 findIndex 和 findLastIndex 的生成函数
     *      getLength
     *          过滤了非数组、类数组、字符串元素
    **/
    var createPredicateIndexFinder = function (dir) {
        return function(array, predicate, context) {
            predicate = cb(predicate, context);

            var length = getLength(array),
                index = dir > 0 ? 0 : length - 1;
            for(; index >= 0 && index < length; index += dir) {
                if(predicate(array[index], index, array)) return index;
            }
            return -1;
        }
    }

    // Returns the first index on an array-like that passes a predicate test.
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);

    // Array Functions
    // ---------------


    // Function (ahem) Functions
    // ------------------


    // Object Functions
    // ----------------
    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`.
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (has(obj, key)) keys.push(key);
        return keys;
    };

    _.isArray = 
    nativeIsArray || 
    function(obj) {
        return toString.call(obj) === '[object Array]'
    }

    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || (type === 'object' && !!obj)
    }

    _.isFunction = function (obj) {
        return typeof obj === 'function';
    }

    // Returns the first key on an object that passes a predicate test.
    _.findKey = function (obj, predicate, context) {
        predicate = cb(predicate, context)
        var keys = _.keys(obj),
            key;

        for(var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if(predicate(obj[key], key, obj)) return key;
        }
    }

    // Utility Functions
    // -----------------

    // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
    // previous owner. Returns a reference to the Underscore object.
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };
    
    // Keep the identity function around for default iteratees.
    _.identity = function(value) {
        return value;
    };

    // OOP
    // ---------------

})();
/**
 *  underscore基础架构
 *      配置信息
 *      集合方法
 *      数组方法
 *      函数方法
 *      对象方法
 *      工具方法
 *      面向对象设计
 * 
 *  
 * 
 * 
 * 
 * 
**/

/**
 *  知识点文章
 *      1、为什么是立即执行函数表达式呢？而不是立即执行函数声明
 *      2、&& || 优先级问题??  扩展出来运算符的优先级问题
 *      3、模块化相关知识点
 *          ES6模块化和Node模块化基础使用
 *          为什么会有模块化这东西
 *      4、为什么优先使用call进行this绑定，而不是使用apply
 *      5、如何进行单元测试 
 *      6、for循环的语法规则
 *  最佳实践
 *      使用分组运算符来区分优先级 语义化更强
 * 
 * 
 * 
 * 
 * 
 * 
**/

