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

    // Naked function reference for surrogate-prototype-swapping.
    var Ctor = function() {};

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
    
    /**
     *  一个内部方法 可以生成可以应用到集合中每个元素的回调，返回期望的结果
     *  场景（value值）
     *      null、undefined
     *          返回默认迭代器 _.identity(保证默认迭代 吃啥吐啥)
     *      function
     *          返回optimizeCb函数，绑定上下文，执行call方法优化
     *      对象非数组
     *          返回一个matcher验证器，校验传入的数据中是否包含一系列的key:value键值对(当前value对象所包含的)
     *      数组 字符串
     *          返回一个property函数，用于返回对象的指定路径下的属性
    **/
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

    // An internal function for creating a new object that inherits from another.
    var baseCreate = function(prototype) {
        if(!_.isObject(prototype)) return {};
        if(nativeCreate) return nativeCreate(prototype)
        Ctor.prototype = prototype
        var result = new Ctor();
        Ctor.prototype = null;
        return result
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
    _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
        if(!isArrayLike(obj)) obj = _.values(obj)
        if(typeof fromIndex !== 'number' || guard) fromIndex = 0;
        return ~_.indexOf(obj, item, fromIndex)
    }
    
    // Invoke a method (with arguments) on every item in a collection.
    // TODO 可以通过测试用例看下方法的作用
    _.invoke = restArguments(function(obj, path, args) {

    })

    // Convenience version of a common use case of `map`: fetching a property.
    _.pluck = function(obj, key) {
        return _.map(obj, _.property(key))
    }

    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs))
    }
    
    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matcher(attrs))
    }

    // Return the maximum element (or element-based computation).
    _.max = function(obj, iteratee, context) {
        var result = -Infinity,
        lastComputed = -Infinity,
        value,
        computed;
        /**
         *  typeof iteratee == "number" && typeof obj[0] != "object" && obj != null
         *  同理 不知道这块处理的是什么情况的数据
        **/
        if (
            iteratee == null ||
            (typeof iteratee == "number" &&
                typeof obj[0] != "object" &&
                obj != null)
        ) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                // 记得处理null
                if (value != null && value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(v, index, list) {
                computed = iteratee(v, index, list);
                /**
                 *  (computed === -Infinity && result === -Infinity)
                 *  处理computed值为-Infinity情况
                **/
                if (
                    computed > lastComputed ||
                    (computed === -Infinity && result === -Infinity)
                ) {
                    result = v;
                    lastComputed = computed;
                }
            });
        }
        return result;
    }

    // Return the minimum element (or element-based computation).
    _.min = function(obj, iteratee, context) {
        var result = Infinity,
            lastComputed = Infinity,
            value,
            computed;
        if (
            iteratee == null ||
            (typeof iteratee == "number" &&
                typeof obj[0] != "object" &&
                obj != null)
        ) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value != null && value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(v, index, list) {
                computed = iteratee(v, index, list);
                if (
                    computed < lastComputed ||
                    (computed === Infinity && result === Infinity)
                ) {
                    result = v;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Shuffle a collection.
    _.shuffle = function(obj) {
        return _.sample(obj, Infinity)
    }
    
    // Sample **n** random values from a collection using the modern version of the
    // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `map`.
    _.sample = function(obj, n, guard) {
        if (n == null || guard) {
            if (!isArrayLike(obj)) obj = _.values(obj);
            // obj是一个对象 n == null
            return obj[_.random(obj.length - 1)];
        }

        var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
        var length = getLength(sample);
        // 兼容处理 保证n的范围 [0, length]
        n = Math.max(Math.min(n, length), 0);
        var last = length - 1;
        for (var index = 0; index < n; index++) {
            var rand = _.random(index, last);
            var temp = sample[index];
            sample[index] = sample[rand];
            sample[rand] = temp;
        }
        return sample.slice(0, n);
    };

    // Sort the object's values by a criterion produced by an iteratee.
    _.sortBy = function(obj, iteratee, context) {
        var index = 0;
        iteratee = cb(iteratee, context)
        return _.pluck(
            _.map(obj, function(value, i, list) {
                return {
                    index: index++,
                    value: value,
                    criteria: iteratee(value, i, list)
                }
            }).sort(function(left, right) {
                var a = left.criteria,
                    b = right.criteria;
                if (a !== b) {
                    if(a > b || a === void 0) return 1
                    if(a < b || b === void 0) return -1
                }
                
                return left.index > left.index;
            }),
            'value'
        )
    }

    // An internal function used for aggregate "group by" operations.
    var group = function(behavior, partition) {
        return function(obj, iteratee, context) {
            var result = partition ? [[], []] : {};
            iteratee = cb(iteratee, context)
            _.each(obj, function(value, index, list) {
                var key = iteratee(value, index, list)
                behavior(result, value, key)
            })
        }
    }

    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    _.groupBy = group(function(result, value, key) {
        if (has(result, key)) result[key].push(value);
        else result[key] = [value];
    });
    
    // Indexes the object's values by a criterion, similar to `groupBy`, but for
    // when you know that your index values will be unique.
    _.indexBy = group(function(result, value, key) {
        result[key] = value
    })

    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    _.countBy = group(function(result, value, key) {
        if (has(result, key)) result[key]++
        else result[key] = 1
    })

    var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    // Safely create a real, live array from anything iterable.
    _.toArray = function(obj) {
        if(!obj) return [];
        if(_.isArray(obj)) return obj.slice()
        if (_.isString(obj)) {
            return obj.match(reStrSymbol);
        }
        if(isArrayLike(obj)) return _.map(obj, _.identity)
        return _.values(obj);
    }

    // Return the number of elements in an object.
    _.size = function(obj) {
        if(obj == null) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length
    }

    // Split a collection into two arrays: one whose elements all satisfy the given
    // predicate, and one whose elements all do not satisfy the predicate.
    _.partition = group(function(result, value, pass) {
        result[pass ? 0 : 1].push(value)
    }, true)

    // Array Functions
    // ---------------
    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. Aliased as `head` and `take`. The **guard** check
    // allows it to work with `_.map`.
    _.first = _.head = _.take = function(array, n, guard) {
        if (array == null || array.length < 1) return n == null ? void 0 : [];
        if(n == null || guard) return array[0]
        return _.initial(array, array.length - n)
    }

    // Returns everything but the last entry of the array. Especially useful on
    // the arguments object. Passing **n** will return all the values in
    // the array, excluding the last N.
    // 排除数组后面N个元素
    _.initial = function(array, n, guard) {
        return slice.call(
            array,
            0,
            Math.max(0, array.length - (n == null || guard ? 1 : n))
        )
    }

    // Get the last element of an array. Passing **n** will return the last N
    // values in the array.
    _.last = function(array, n, guard) {
        if(array == null || array.length < 1) return n == null ? void 0 : [];
        if(n == null || guard) return array[array.length - 1];
        
        return _.rest(array, Math.max(0, array.length - n));
    }

    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array.
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n)
    };

    // Trim out all falsy values from an array.
    _.compact = function(array) {
        return _.filter(array, Boolean)
    }

    // Internal implementation of a recursive `flatten` function.
    var flatten = function(input, shallow, strict, output) {
        output = output || [];
        var idx = output.length;
        var length = getLength(input);
        for(var i = 0; i < length; i++) {
            var value = input[i];
            if(
                isArrayLike(value) &&
                (_.isArray(value) || _.isArguments(value))
            ) {
                if(shallow) {
                    var j = 0,
                    len = value.length;

                    while(j < len) output[idx++] = value[j++]
                }else{
                    flatten(value, shallow, strict, output)
                    // 需更新idx索引 
                    idx = output.length;
                }
            }else if (!strict) {
                output[idx++] = value
            }
        }
        return output
    }

    // Flatten out an array, either recursively (by default), or just one level.
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, false)
    }

    // Return a version of the array that does not contain the specified value(s).
    _.without = restArguments(function(array, otherArrays) {
        return _.difference(array, otherArrays);
    })

    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // The faster algorithm will not work with an iteratee if the iteratee
    // is not a one-to-one function, so providing an iteratee will disable
    // the faster algorithm.
    // Aliased as `unique`.
    _.uniq = _.unique = function(array, isSorted, iteratee, context) {
        if(!_.isBoolean(isSorted)) {
            context = iteratee
            iteratee = isSorted
            isSorted = false
        }
        if(iteratee != null) iteratee = cb(iteratee, context)
        var result = [];
        var seen = []
        for(var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            var computed = iteratee ? iteratee(value, i, array) : value;
            if(isSorted && !iteratee) {
                if(!i || seen !== computed) result.push(value)
                seen = computed
            }else if(iteratee) {
                if(!_.contains(seen, computed)) {
                    seen.push(computed) 
                    result.push(value)
                }
            }else if(!_.contains(result, value)) {
                result.push(value)
            }
        }
        return result;
    }

    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    _.union = restArguments(function(arrays) {
        return _.uniq(flatten(arrays, true, true))
    })

    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    _.intersection = function(array) {
        var result = [];
        var argCount = arguments.length;
        for(var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            if(_.contains(result, value)) continue;
            for(var j = 1; j < argCount; j++) {
                if(!_.contains(arguments[j], value)) break;
            }
            if(j === argCount) result.push(value)
        }
        return result
    }

    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = restArguments(function(array, rest) {
        rest = flatten(rest, true, true)
        return _.filter(array, function(value) {
            return !_.contains(rest, value)
        })
    })

    // Complement of _.zip. Unzip accepts an array of arrays and groups
    // each array's elements on shared indices.
    _.unzip = function(array) {
        var length = (array && _.max(array, getLength).length) || 0,
            result = Array(length);
        for(var i = 0; i < length; i++) {
            result[i] = _.pluck(array, i)
        }
        return result;
    }

    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    // TODO
    _.zip = restArguments(_.unzip);

    // Converts lists into objects. Pass either a single array of `[key, value]`
    // pairs, or two parallel arrays of the same length -- one of keys, and one of
    // the corresponding values. Passing by pairs is the reverse of _.pairs.
    _.object = function(list, values) {
        var result = {};
        for(var i = 0, length = list.length; i < length; i++) {
            var pairs = list[i]
            if(values) {
                result[pairs] = values[i]
            }else{
                result[pairs[0]] = pairs[1]
            }
        }
        return result;
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

    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](http://docs.python.org/library/functions.html#range).
    _.range = function(start, stop, step) {
        if(stop == null) {
            stop = start
            start = 0
        }
        if(!step) {
            step = stop < start ? -1 : 1;
        }  
        /**
         *  这块并没有使用start、stop作为循环的对象
         *  而是通过 start、stop、step计算出来需要循环的次数，对次数进行遍历，然后动态修改start的值
         * 
         *  这块如果用start、stop来做循环就比较麻烦了 还要考虑正负数情况
         *  这块的for循环也比较好   
        **/
        var length = Math.max(Math.ceil((stop - start) / step), 0)
        var range = Array(length);
        for(var i = 0; i < length; i++, start += step) {
            range[i] = start
        }
        return range;
    }

    _.range = function(start, stop, step) {
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        if (!step) {
            step = stop < start ? -1 : 1;
        }

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }

        return range;
    };

    // Chunk a single array into multiple arrays, each containing `count` or fewer
    // items.
    _.chunk = function(array, count) {
        if(count == null || count < 1) return [];
        var result = [];
        var i = 0,
            length = array.length;
        while(i < length) {
            result.push(
                slice.call(array, i, i+= count)
            )
        }
        return result
    }
    // Function (ahem) Functions
    // ------------------
    // TODO bind

    // Memoize an expensive function by storing its results.
    _.memoize = function(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key)
            if(!has(cache, address)) {
                cache[address] = func.apply(this, arguments)
            }
            return cache[address]
        }
        memoize.cache = {};
        return memoize;
    }
    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    _.delay = restArguments(function(func, wait, args) {
        return setTimeout(function() {
            func.apply(null, rest)
        }, wait)
    })

    // Returns a negated version of the passed-in predicate.
    _.negate = function(predicate, context) {
        return function() {
            return !predicate.apply(context, arguments);
        };
    };

    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    _.compose = function() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
            var i = start;
            var result = args[i].apply(this, arguments);
            while(i--) result = args[i].apply(this, result);
            return result
        }
    }

    // Returns a function that will only be executed on and after the Nth call.
    _.after = function(times, func) {
        return function() {
            if(--times < 1) {
                return func.apply(this, arguments)
            }
        }
    }

    // Returns a function that will only be executed up to (but not including) the Nth call.
    _.before = function(times, func) {
        var memo;
        return function() {
            if(--times > 0) {
                memo = func.apply(this, arguments)
            }
            if (times <= 1) func = null;
            return memo
        }
    }

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

    _.each([
        'Arguments',
        'Boolean',
        'String'
    ], function(type) {
        _['is' + type] = function(obj) {
            return toString.call(obj) === '[object ' + type + ']'
        }
    })

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

    // Create a (shallow-cloned) duplicate of an object.
    _.clone = function(obj) {
        if(!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj)
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
             * 
             *      判断场景
             *      attrs = {a: undefined} 但是 obj没有a属性 则需要这么判断
            **/
            if (!(key in obj) || obj[key] !== attrs[key]) return false
        }
        return true
    }

    // Utility Functions
    // -----------------
    // Returns a predicate for checking whether an object has a given set of
    // `key:value` pairs.
    _.matcher = _.matches = function(attrs) {
        attrs = _.extendOwn({}, attrs)
        return function(obj) {
            return _.isMatch(obj, attrs);
        }
    }

    // Return a random integer between min and max (inclusive). [min, max]
    _.random = function(min, max) {
        if(max == null) {
            max = min
            min = 0
        }
        return min + Math.floor(Math.random() * (max - min + 1))
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
 *          for(var i = 0; i < length; i++, start += step) {
 *      7、var obj = Object(object)  Object 的行为等同于 new Object()
 *          包装类问题
 *  
 *      8 var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
 *      9  [].slice.call('1234567') 等于 [1,2,3,4,5,6,7]
 * 
 * 
 *  最佳实践
 *      使用分组运算符来区分优先级 语义化更强
 * 
 * 
 * 
 * 
 * 
 * 
**/

