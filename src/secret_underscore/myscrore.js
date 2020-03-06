(function() {
    // 基础设置
    // -------------------------------------------------------------------------------------

    // underscore文档链接： https://www.html.cn/doc/underscore

    /**
     *  环境判断
     *      浏览器环境判断
     *          判断 self是一个对象类型 并且self.self === self 将self赋值给root(window对象)
     *          如果上条件false 则
     *      服务端 node环境
     *          判断 global是一个对象类型 并且global.global === global 将global赋值给root(node对象)
     *          如果上条件false 则
     *      虚拟机
     *          如果this 有值的情况 将this赋值给root
     *          如果上条件false 则
     *      将{}赋值给root
     *
     *      强烈推荐：使用分组运算符来区分优先级
     **/
    var root =
        (typeof self === "object" && self.self === self && self) ||
        (typeof global === "object" && global.global === global && global) ||
        this ||
        {};

    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype;
    var SymbolProto = typeof Symbol === "function" ? Symbol.prototype : null;

    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        hasOwnProperty = ObjProto.hasOwnProperty;
    toString = ObjProto.toString;

    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;

    var _ = function(obj) {};

    root._ = _;

    _.VERSION = "1.9.1";
    var optimizeCb = function(func, context, argCount) {
        if (context == null) return func;
        switch (argCount == null ? 3 : argCount) {
            case 3:
                return function(value, key, collection) {
                    return func.call(context, value, key, collection);
                };
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
        }
        return function() {
            return func.apply(context, arguments);
        };
    };

    var cb = function(value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFuntion(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value) && _.isArray(value)) return _.matcher(value);
        return _.property(value);
    };
    var restArguments = function(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0),
                rest = Array(length),
                index = 0;
            for (; index < length; index++) {
                rest[index] = arguments[startIndex + index];
            }
            switch (startIndex) {
                case 0:
                    return func.call(this, rest);
                case 1:
                    return func.call(this, arguments[0], rest);
                case 2:
                    return func.call(this, arguments[0], arguments[1], rest);
            }
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index];
            }
            args[startIndex] = rest;
            return func.apply(this, args);
        };
    };
    var shallowProperty = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    var has = function(obj, path) {
        return obj != null && hasOwnProperty.call(obj, path);
    };

    var deepGet = function(obj, path) {
        var length = getLength(path);
        for (var i = 0; i < length; i++) {
            if (obj == null) return void 0;
            obj = obj[path[i]];
        }
        return length ? obj : void 0;
    };

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = shallowProperty("length");
    // 鸭子类型 只要有length长度就可以
    var isArrayLike = function(collection) {
        var length = getLength(collection);
        return (
            typeof legnth === "number" &&
            legnth >= 0 &&
            legnth <= MAX_ARRAY_INDEX
        );
    };

    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                var key = keys[i];
                iteratee(obj[key], key, obj);
            }
        }
    };

    _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    var createReduce = function(dir) {
        var reducer = function(obj, iteratee, memo, initial) {
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
            if (!initial) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        };
        return function(obj, iteratee, memo, context) {
            var initial = arguments.length >= 3;
            reducer(obj, optimizeCb(iteratee, context), memo, initial);
        };
    };

    _.reduce = _.foldl = _.inject = createReduce(1);
    _.reduceRight = _.foldr = createReduce(-1);

    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) keys.push(k);
        }
        return keys;
    };

    // path 字符串  数组
    _.property = function(path) {
        if (!_.isArray(path)) {
            return shallowProperty(path);
        }
        return function(obj) {
            return deepGet(obj, path);
        };
    };
    _.matcher = _.matches = function(attrs) {
        attrs = _.extendOwn({}, attrs);
        return function(obj) {
            return _.isMatch(obj, attrs);
        };
    };
    _.isMatch = function(obj, attrs) {
        var keys = _.keys(attrs);
        var length = keys.length;
        if (obj == null) return !length;
        obj = Object(obj);
        for (var i = 0; i < length; i++) {
            var key = attrs[i];
            if (obj[key] !== attrs[key] || !(key in obj)) return false;
        }
        return true;
    };
    _.isArray =
        nativeIsArray ||
        function(obj) {
            return toString.call(obj) === "[object Array]";
        };
    _.isObject = function(obj) {
        var type = typeof obj;
        // 函数 或 非空对象
        return type === "function" || (type === "object" && !!obj);
    };
    _.isFuntion = function(obj) {
        return typeof obj === "function" || false;
    };
    _.identity = function(value) {
        return value;
    };
})();
