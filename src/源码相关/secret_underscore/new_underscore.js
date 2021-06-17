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
                return function(value) {
                    return func.call(context, value);
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
        // 如果是对象 非数组 返回一个检验函数
        if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
        // 非对象 函数 null undefined 
        return _.property(value);
    }

    // Some functions take a variable number of arguments, or a few expected
    // arguments at the beginning and then a variable number of values to operate
    // on. This helper accumulates all remaining arguments past the function’s
    // argument length (or an explicit `startIndex`), into an array that becomes
    // the last argument. Similar to ES6’s "rest parameter".
    var restArguments = function(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0),
                index = 0,
                rest = Array(length);
            for (; index < length; index++) {
                rest[index] = arguments[index + startIndex]
            }

            switch(startIndex) {
                case 0:
                    return func.call(this, rest)
                case 1:
                    return func.call(this, arguments[0], rest)
                case 2:
                    return func.call(this, arguments[0], arguments[1], rest)
            }
            var args = Array(startIndex + 1)
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index]
            }
            args[startIndex] = rest
            func.apply(this, args)
        }
    };
    
    // 实际上仅兼容额 属性值为null的时候 返回undefined
    var shallowProperty = function(key) {
        return function(obj) {
            return obj[key] == null ? void 0 : obj[key];
        }
    }

    var has = function(obj, path) {
        return obj != null && hasOwnProperty.call(obj, path);
    };

    var deepGet = function(obj, path) {
        var length = path.length;
        for(var i = 0; i < length; i++) {
            if(obj == null) return void 0;
            obj = obj[path[i]]
        }
        return length ? obj : void 0;
    }

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
    /**
     *  实现思路
     *      确定支持find类数组和find对象
     *          find对象key
     *              findKey
     *          find类数组key
     *              findIndex
     *              findLastIndex
     *      容错处理
     *          处理key为undefined和-1情况
     */
    _.find = _.detect = function(obj, predicate, context) {
        var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
        var key = keyFinder(obj, predicate, context)
        if(key !== void 0 && key !== -1) return obj[key]
    }
    // Return all the elements that pass a truth test.
    // Aliased as `select`.
    _.filter = _.select = function(array, predicate, context) {
        var results = []
        predicate = cb(predicate, context);
        _.each(array, function(value, index, list) {
            if(predicate(value, index, list)) results.push(value)
        })
        return results;
    }

    // Return all the elements for which a truth test fails.
    _.reject = function(array, predicate, context) {
        return _.filter(array, cb(_.negate(predicate)), context)
    }

    // Determine whether all of the elements match a truth test.
    // Aliased as `all`.
    _.every = _.all = function(obj, predicate, context) {
        var keys = !isArrayLike(obj) && _.keys(obj);
        var length = (keys || obj).length;

        predicate = cb(predicate, context)
        for(var i = 0; i < length; i++) {
            var key = keys ? keys[i] : i;
            if(!predicate(obj[key], key, obj)) return false;
        }
        return true;
    }

    // Determine if at least one element in the object matches a truth test.
    // Aliased as `any`.
    _.some = _.any = function(obj, predicate, context) {
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;

        predicate = cb(predicate, context);
        for(var i = 0; i < length; i++) {
            var key = keys ? keys[i] : i;
            if(predicate(obj[key], key, obj)) return true;
        }
        return false
    }

    // Determine if the array or object contains a given item (using `===`).
    // Aliased as `includes` and `include`.
    _.contains = _.includes = _.include = function(obj, item, fromIndex) {
        if(!isArrayLike(obj)) obj = _.values(obj)
        if(typeof fromIndex !== 'number') fromIndex = 0;
        return ~_.indexOf(obj, item, fromIndex)
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

    // Use a comparator function to figure out the smallest index at which
    // an object should be inserted so as to maintain order. Uses binary search.

    _.sortedIndex = function(array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1)
        var value = iteratee(obj),
            low = 0,
            high = getLength(array);
        while (low < high) {
            var mid = Math.floor((low + high) / 2)
            if (iteratee(array[mid]) > value) {
                low = mid
            } else {
                high = mid + 1;
            }
        }
        return low;
    }

    // Generator function to create the indexOf and lastIndexOf functions.
    var createIndexFinder = function(dir, predicateFind, sortedIndex) {
        return function(array, item, idx) {
            var i = 0,
                length = getLength(array);

            // 传入有效的索引
            if(typeof idx === 'number') {
                if (dir > 0) {
                    // 大于0认为传入的有效值 不做校验处理
                    // 小于0 并且小于数组长度 将0默认为有效值
                    i = idx >= 0 ? idx : Math.max(idx + length, i)
                } else {
                    length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1
                }
            } else if (sortedIndex && idx && length) {
                idx = sortedIndex(array, item)
                return array[idx] === item ? idx : -1;
            }
            // NaN处理
            if(item !== item) {
                idx = predicateFind(slice.call(array, i, length), _.isNaN)
                return idx > 0 ? idx + 1 : -1;
            }
            // 处理正常数据
            for (
                idx = dir > 0 ? i : length - 1;
                idx > 0 && idx < length;
                idx += dir
            ) {
                if(array[idx] === item) return idx;
            }
            return -1;
        }
    }

    // Return the position of the first occurrence of an item in an array,
    // or -1 if the item is not included in the array.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

    // Array Functions
    // ---------------


    // Function (ahem) Functions
    // ------------------
    // Returns a negated version of the passed-in predicate.
    _.negate = function(predicate, context) {
        return function() {
            return !predicate.apply(context, arguments);
        };
    };

    _.restArguments = restArguments;
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

    // Retrieve all the property names of an object.
    _.allKeys = function(obj) {
        if(!_.isObject(obj)) return []
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys;
    }

    // Retrieve the values of an object's properties.
    _.values = function(obj) {
        var keys = _.keys(obj),
            length = getLength(keys),
            results = new Array(length);

        for(var i = 0, length = keys.length; i < length; i++) {
            results[i] = obj[keys[i]]
        }
        return results;
    }

    _.isArray = 
    nativeIsArray || 
    function(obj) {
        return toString.call(obj) === '[object Array]'
    }

    // Is a given variable an object?
    /**
     *  返回一个函数对象或者非null对象
    **/
    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || (type === 'object' && !!obj)
    }

    _.isFunction = function (obj) {
        return typeof obj === 'function';
    }

    // An internal function for creating assigner functions.
    var createAssigner = function(keyFunc, defaults) {
        return function(obj) {
            var length = arguments.length;
            if(length < 2 || obj == null) return obj;
            /**
             *  数据兼容处理
             *  将基本数据类型进行包装
             *      Number 
             *      String 
             *      Boolean 
            **/
            obj = Object(obj);
            for(var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keyFunc(source),
                    len = getLength(keys);
                for(var j = 0; j < len; j++) {
                    var key = keys[j]
                    if (!defaults || obj[key] === void 0)
                    obj[key] = source[key]
                }
            }
            return obj;  
        }
    }

    // Extend a given object with all the properties in passed-in object(s).
    _.extend = createAssigner(_.allKeys);

    // Assigns a given object with all the own properties in the passed-in object(s).
    // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    _.extendOwn = _.assign = createAssigner(_.keys);

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

    // Returns whether an object has a given set of `key:value` pairs.
    _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs),
            length = getLength(keys);
        // 如果attrs是空对象、null、void 0 ...会返回true
        if(object == null) return !length;
        var obj = Object(object)
        for(var i = 0; i < length; i++) {
            var key = keys[i];
            /**
             *  源码中是这么写的 
             *      if (attrs[key] !== obj[key] || !(key in obj)) return false;
             *      什么情况下 attrs的可以和obj的key属性值相等 但是 key不是obj的属性呢
             *      我觉得反过来写更合理一点
             *      if (!(key in obj) || obj[key] !== attrs[key]) return false
            **/
            if (!(key in obj) || obj[key] !== attrs[key]) return false
        }
        return true
    }

    // Utility Functions
    // -----------------
    // Returns a predicate for checking whether an object has a given set of
    // `key:value` pairs.
    _.matcher = function(attrs) {
        attrs = _.extendOwn({}, attrs)
        return function(obj) {
            return _.isMatch(obj, attrs);
        }
    }


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
    
    // Creates a function that, when passed an object, will traverse that object’s
    // properties down the given `path`, specified as an array of keys or indexes.s
    _.property = function(path) {
        if(!_.isArray(path)) {
            return shallowProperty(path);
        }
        return function(obj) {
            return deepGet(obj, path)
        }
    }

    

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
 *      7、var obj = Object(object)  Object 的行为等同于 new Object()
 *          包装类问题
 *  最佳实践
 *      使用分组运算符来区分优先级 语义化更强
 * 
 * 
 * 
 * 
 * 
 * 
**/

