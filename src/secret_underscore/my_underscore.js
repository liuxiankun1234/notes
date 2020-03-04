(function() {
    console.log('hello! guy')
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
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global) ||
        this || {};

    // 保存上一个 '_' 值
    var previousUnderscore = root._;

    /** 
     *  使用变量存原生方法有什么好处呢？
     *      减少了访问层级 减少了代码的冗余
     *      使用局部变量缓存 减少了作用域链查找 提升性能
     *      使用变量存起来防止后面代码重写原型的方法，使框架内部出问题
     *          例子 _.trim = function(str){ return String.prototype.trim.call() } 
     *              框架后修改 String.protoype.trim = function(){return '大傻'}
     *              _.trim() // 使用变量存起来的话 后文被修改没有问题 StrProto.trim.call()
     * 
    **/
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        SymbolProto = typeof Symbol === 'function' ? Symbol.prototype : null;

    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnproperty = ObjProto.hasOwnProperty;

    // 所有的ES5原生方法实现 我们需要用到的都在这声明
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;

    // 创建underscore引用
    var _ = function(obj) {
        // 传入的obj对象是当前underscore的实例 返回当前实例
        if(obj instanceof _){
            return obj
        };
        // 不是new操作 返回当前对象的实例
        if(!(this instanceof _)){
            return new _(obj)
        };
        // new操作 将对象挂载到_wrapped属性上
        this._wrapped = obj;
    }

    // 暂时手动挂在到window上
    root._ = _;

    // //这里这个if else是为了确定当前环境是node环境还是浏览器环境
    // //typeof exports的结果必然是String类型，因此不使用严格不等于也可以
    // //至于为什么不使用隐式转换，应该是为了代码语义更明确，就是想判断不是undefined类型（存疑）
    // if (typeof exports != 'undefined' && !exports.nodeType) { 
    //     //nodeType是为了确定该值不是html dom元素
    //     if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    //     //node环境下exports = module.exports = {}，exports是对module.exports的引用
    //     //module.exports = _ ,注意到_其实是个函数（这段代码上面定义了）
    //     //这切断了exports和module.exports的联系，只能被module.exports输出，不能被exports输出
    //     //所以需要exports = module.exports，重新建立起 exports 对 module.exports 的引用
    //     exports = module.exports = _;
    //     } 
    //     //兼容对module.exports支持不好的旧的commonJS规范
    //     //引用的时候可以 var _ = require("underscore")._
    //     exports._ = _;
    // } else { 
    //     //浏览器环境，_方法挂载到window上
    //     root._ = _;
    // }
    
    /**
     *  optimizeCb函数
     *      对内部func进行绑定this处理
     *      通过使用call而不使用apply，优化绑定
     *  为什么不直接使用arguments而使用argCount？
     *  真正的问题是 为什么使用call而不是使用apply去处理参数？
     *      call的性能优于apply，节省性能
     *      节省性能
    **/
    var optimizeCb = function(func, context, argCount) {
        // 如果没有指定this的值 返回当前传入的函数
        if(context === void 0) return func;
        switch(argCount == null ? 3 : argCount) {
            case 3: return function(value, key, collection) {
                func.call(context, value, key, collection)
            };
            case 4: return function(accumulator, value, index, collection) {
              return func.call(context, accumulator, value, index, collection);
            }
        }
        return function() {
            return func.apply(context, arguments)
        }
    }

    /**
     *  cb函数
     *      对传进来的值进行处理
     *      如果实参是空，则返回一个默认的函数（传入传出值一样）
     *      如果实参是一个函数，则返回optimizeCb函数
     *      
    **/
    var cb = function(value, context, argCount) {
        // value的值为null/undefined
        if(value == null) return _.identity
        // value的值是一个函数 
        if(_.isFunction(value)) return optimizeCb(value, context, argCount)
        // value的值是一个引用类型(非数组对象) 返回一个断言函数
        if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
        // 处理数组类型 value = ['curly', 'fears'] 返回 obj['curly']['fears']属性值
        return _.property(value)
    }
    /**
     *  返回 function 的一个版本，该函数版本在调用时接收来自 startIndex 的所有参数，并将其收集到单个数组中。 如果未传递显式的 startIndex ，则将通过查看 function 本身的参数数来确定。 与 ES6 的 rest参数语法类似
     *  
     *  function.length
     *      返回函数形参的数量
     *      形参数量不包括剩余参数(a,b,...rest ---> length = 2)个数，仅包括第一个具有默认值(a,b = 2 --> length = 1)之前的参数个数
     *  arguments.length
     *      返回实参的数量
     * 
    **/
    var restArguments = function(func, startIndex) {
        /**
         *  为啥 startIndex 默认等于 func.length - 1 ?
         * 
         *  因为调用参数问题 调用时最后一个参数为rest
        **/
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            // length 等于 当前参数减去之前传入函数的形参
            var length = Math.max(arguments.length - startIndex, 0),
                rest = Array(length),
                index = 0;
            for(; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            // 优化处理 call性能优于apply
            switch(startIndex) {
                case 0:
                    return func.call(this, rest);
                case 1:
                    return func.call(this, arguments[0], rest);
                case 2:
                    return func.call(this, arguments[0], arguments[1], rest);
            }
            // 长度加一 给rest留空间
            var args = Array[startIndex + 1];
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index];
            }
            args[startIndex] = rest;
            return func.apply(this, args);
        }
    }

    /**
     * 
     *  deepGet方法
     *      path 数组 ['curly', 'fears', 'worst']
     *      obj 对象
     *  返回值  obj['curly']['fears']['worst'] 属性
     * 
    **/
    var deepGet = function(obj, path) {
        var length = path.length;
        for(var i = 0; i < length; i++){
            if(obj == null) return void 0;
            obj = obj[path[i]];
        }
        return length ? obj : void 0;
    };
    
    // 最终返回的属性 包含原型上的属性 和 实例上的属性 同 in操作符
    var shallowProperty = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key]
        }
    }

    // has方法判断当前对象（非null 非原型）上是否包含path属性
    var has = function(obj, path) {
        return obj != null && hasOwnProperty.call(obj, path);
    }

    /**
     *  isArrayLike（判断是否是一个伪数组）
     *      判断条件 
     *          只要有length属性  并且length在 0 ～ (2^32 - 1) 之间就可以
     * 
     *      适用于
     *          {0: 1, length: 1}
     *          'abcdefg'
     *          [1,2,3,4]
     *          HTMLCollection等
    **/
    var MAX_ARRAY_INDEX = Math.pow(2, 32) - 1;
    var getLength = shallowProperty('length');
    var isArrayLike = function(collection) {
        var length = getLength(collection)
        return typeof length === 'number' && length > 0 && length < MAX_ARRAY_INDEX
    }

    // 集合方法
    // -------------------------------------------------------------------------------------

    /**
     *  each方法描述
     *      遍历list中的所有元素，按顺序用每个元素当参数调用 iteratee 函数
     *      如果绑定了context，则把iteratee绑定到context对象上
     * 
    **/
    _.each = _.forEach = function(obj, iteratee, context) {
        // 统一使用optimizeCb方法处理iteratee函数
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        // 鸭子类型 判断有length属性 执行if 
        if(isArrayLike(obj)) {
            for(i = 0, length = obj.length; i < length; i++){
                iteratee(obj[i], i, obj)
            }
        }else{
            // 没有length属性 执行else 
            var keys = _.keys(obj);
            for(i = 0, length = keys.length; i < length; i++){
                iteratee(obj[ keys[i] ], keys[i], obj)
            }
        }
    }

    /**
     * 
     *  map方法描述
     *      返回迭代(iteratee)方法应用到每个元素之后的集合
     * 
    **/
    _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context); 
        /**
         *  小技巧
         * 
         *  obj 是类数组 keys是false值
         *      keys = false                length = obj.length
         *  obj 非类数组 keys是一个数组
         *      keys = true && _.keys(obj)  length = keys.length
         *  length 等于 keys = false       --->  obj.length
         *             keys = _.keys(obj)  ---> keys.length
         *  
         *  results = new Array(length) --> [] && [].length = length   
         * 
         *  obj类型
         *      number undefined null boolean RegExp Date 在_.keys方法内部做处理 返回[]
         *      只对 string [] arrayLike 做处理
        **/
        
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);

        for(var i = 0; i < length; i++){
            var sourceKey = keys ? keys[i] : i
            results[i] = iteratee(obj[sourceKey], sourceKey, obj)
        }
        return results
    };

    var createReduce = function(dir) {
        var reducer = function(obj, iteratee, memo, initial) {
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;

            // 如果没有初始化的值 手动设置
            if(!initial){
                memo = obj[keys ? keys[index] : index];
                index += dir
            }
            for(; index > 0 && index < length; i += dir){
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo
        }
        return function(obj, iteratee, memo, context) {
            var initial = arguments.length >= 3
            return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial)

            // 以下操作不可以 不可以在return函数内部执行代码
            // return function(obj, optimizeCb(iteratee, context, 4), memo, initial) {}
        }
    }
    /**
     * reduce方法描述
     *      做累加工作 适用于 字符串 数组 类数组 对象
     * reduceRight方法描述
     *      反向累加
    **/ 
    _.reduce = _.foldl = _.inject = createReduce(1);
    _.reduceRight = _.foldr = createReduce(-1);

    /**
     *  find方法描述
     *      通过真值检验返回一个值
     * 
    **/
    _.find = _.detect = function(obj, predicate, context) {
        var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
        var key = keyFinder(obj, predicate, context);
        if (key !== void 0 && key !== -1) return obj[key];
    }

    // 返回一个的数组 值为符合过滤条件
    _.filter = _.select = function(obj, predicate, context) {
        var results = [];
        // 为啥这块用了cb函数 find方法没有用cb函数
        predicate = cb(predicate, context);
        _.each(obj, function(value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    }

    // 检测list是否包含value 使用 ===
    _.contains = _.includes = _.include = function(
        obj,
        item,
        fromIndex,
        guard
    ) {
        if (!isArrayLike(obj)) obj = _.values(obj);
        if (typeof fromIndex != "number" || guard) fromIndex = 0;
        return _.indexOf(obj, item, fromIndex) >= 0;
    };

    _.max = function(obj, iteratee, context) {
        var result = -Infinity,
            lastComputed = -Infinity,
            value,
            computed;
        // 这个typeof iteratee === 'number' && typeof obj[0] !== 'object' && obj != null 情况表示不懂
        if(
            iteratee == null || 
            (typeof iteratee === 'number' && 
             typeof obj[0] !== 'object' &&
             obj != null)
        ) {
            var obj = isArrayLike(obj) ? obj : _.values(obj);
            for(var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                // 记得处理null
                if(value != null && value > result) {
                    result = value;
                }
            }
        }else{
            iteratee = cb(iteratee, context);
            _.each(obj, function(v, index, list) {
                computed = iteratee(v, index, list);
                /**
                 *  (computed === -Infinity && result === -Infinity)
                 *  处理computed值为-Infinity情况
                **/
                if(
                    computed > lastComputed ||
                    (computed === -Infinity && result === -Infinity)
                )  {
                    result = v;
                    lastComputed = computed;
                }
            })
        }
    }

    // 随机洗牌 返回一个乱序的list副本
    _.shuffle = function(list) {
        return _.sample(list, Infinity);
    };

    /** 
     *  使用现代版本的shuffle
     *  [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
     *  从集合中抽取n个随机值 如果未指定n返回一个随机元素 内部的guard参数允许它与map一起使用
     * 
     *  还是不懂 guard参数什么用
    **/
    _.sample = function(obj, n, guard) {
        if (n == null || guard) {
            // _.values --> _.keys --> _.isObject 非引用类型返回[]
            if(!isArrayLike(obj)) obj = _.values(obj);
            return obj[_.random(length - 1)]
        }
        var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
        var length = getLength(sample);
        // 兼容处理 保证n的范围 [0, length]
        n = Math.max(Math.min(n, length), 0);
        var last = length - 1;
        for (var index = 0; index < n; index++) {
            var rand = _.random(index, last);
            var temp = sample[rand];
            sample[rand] = sample[index];
            sample[index] = temp;
        }
    }

    _.clone = function(obj) {
        // 基本类型 直接返回
        if (!_.isObject(obj)) return obj;
        // 数组或对象 返回一个新引用
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    }

    // 数组的扩展方法
    // -------------------------------------------------------------------------------------
    
    // 排除数组中最后n个元素 n默认值为1
    _.initial = function(array, n, guard) {
        // 处理 n 默认值
        n = n == null || guard ? 1 : n;
        return slice.call(array, 0, Math.max(0,  array.length - n))
    }

    // 排除数组前面的n个元素 n默认值为1
    _.rest = _.tail = _.drop = function(array, n, guard) {
        n = n == null || guard ? 1 : n;
        return slice.call(array, n)
    }

    // 返回数组的前n个元素 n默认值为1
    _.first = _.head = _.take = function(array, n) {
        // 注意first([]) || first([], 1) 返回值不同
        if(array == null || array.length < 1) return n == null ? void 0 : []; 
        // 兼容处理
        if(n == null) return array[1];
        return _.initial(array, array.length - n);
    }
    
    // 返回数组后n个元素 n默认值为1
    _.last = function(array, n) {
        if (array == null || array.length < 1) return n == null ? void 0 : [];
        if (n == null) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    }
    
    // 返回一个除去了所有 falsy(假) 值的 array 副本
    _.compact = function(array) {
        // Boolean 构造函数 等同于 !!
        return _.filter(array, Boolean)
    }

    var flatten = function(input, shallow, strict, output) {
        output = output || [];
        var idx = output.length;
        for (var i = 0, length = getLength(input); i < length; i++) {
            var value = input[i];
            // 只有数组/类数组才会处理嵌套问题
            if(isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                if (shallow) {
                    var j = 0,
                        len = value.length;
                    while(j < len) output[idx++] = value[j++];
                }else{
                    flatten(value, shallow, strict, output);
                    // 更新计算之后的output索引
                    idx = output.length;
                }
            } else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    }

    // 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组 如果你传递 shallow参数，数组将只减少一维的嵌套
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, false);
    };

    // 返回的值来自array参数数组，并且不存在于other数组
    _.difference = restArguments(function(array, rest) {
        // 扁平化一层数组
        rest = flatten(rest, true, true);
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    });

    var createPredicateIndexFinder = function(dir) {
        return function(array, predicate, context) {
            predicate = optimizeCb(predicate, context);

            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for(; index >= 0 && index < length; index += dir) {
                if(predicate(array[index], index, context)) return index;
            }
            return -1;
        }
    }

    /**
     *  findIndex方法描述
     *      通过真值检查后，返回第一个索引值；否则返回-1
     * 
    **/
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);

    // 
    _.sortedIndex = function(){

    }
    
    var createIndexFinder = function(dir, predicateFind, sortedIndex) {
        
    }
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
    // 函数的扩展方法
    // -------------------------------------------------------------------------------------




    // 对象的扩展方法
    // -------------------------------------------------------------------------------------

    /**
     *  _.keys
     *      获取当前对象上所有可枚举的字符串属性（不包括原型 不可枚举 Symbol属性）
     *  
     * 
    **/
    _.keys = function(obj) {
        // 兼容处理 处理非引用类型
        if(!_.isObject(obj)) return []
        // 支持原生方法 使用原生方法
        if(nativeKeys) return nativeKeys(obj)
        // 自定义方法实现_.keys
        var list = [];
        // for in 返回当前对象及原型上的所有可枚举的字符串属性
        for(var key in obj) {
            // 过滤掉原型上的可枚举字符串属性
            if(has(obj, key)) list.push(key)
        }
        return list
    }
    /**
     *  _.allKeys
     *      获取当前对象及原型上的可枚举字符串属性（不包括 不可枚举 Symbol属性）
     * 
    **/
    _.allKeys = function(obj) {
        if (!_.isObject(obj)) return [];

        var keys = [];
        for(var key in obj) keys.push(key);
        return keys;
    }

    _.values = function(obj) {
        var keys = _.keys(obj),
            length = keys.length,
            // 这块创建一个长度length的空数组
            values = Array(length);
        for(var i = 0; i < length; i++) {
            /**
             *  项赋值 
             * 
             *      console.time("timer");
             *      var result = Array(1000000);
             *      for(var i=0;i<1000000;i++){
             *          result[i] = i
             *      }
             *      console.timeEnd("timer"); // 6.865966796875ms
             *      
             *      console.time("timer");
             *      var result = Array();
             *      for(var i=0;i<1000000;i++){
             *          result.push(i);
             *      }
             *      console.timeEnd("timer"); // 13ms左右
             *      
             *  跟push相比性能确实更好 百万级差别不大
             * 
             * 
            **/
            values[i] = obj[keys[i]];
        }
        return values
    }

    /**
     *  一个创建分配函数的内部函数
     *      keysFunc 获取属性方法
     *          _.allKeys   获取所有可枚举的字符串属性（对象及原型属性）
     *          _.keys      获取当前对象上可枚举的字符串属性
     *      defaults Boolean类型 
     *          true    仅合并自身不存在属性
     *          false   合并所有属性
     * 
     *      注： 函数没有必要对assign的对象进行 类型检测 如果是基本类型 直接添加属性 也不会报错 
     *      
    **/
    var createAssigner = function(keysFunc, defaults) {
        return function(obj){
            var length = arguments.length;
            if (defaults) obj = Object(obj);
            // 容错处理 如果实参长度小于2 或者 obj == null 则返回当前对象
            if (length < 2 || obj == null) return obj
            // 进行assign处理
            for(var index = 1; index < length; index++){
                var source = arguments[index],
                    keys = keysFunc[source],
                    l = keys.length;

                for(var i = 0; i < l; i++) {
                    var key = keys[i];
                    /**
                     *  defaults
                     *      false   默认合并自身属性
                     *      true    合并自身不存在的属性
                    **/
                    if(!defaults || obj[key] === void 0) {
                        obj[key] = source[key]
                    }
                }
            }
            return obj;
        }
    }

    _.extend = createAssigner(_.allKeys);

    /**
     * 
     *  类似于 extend, 但只复制自己的属性覆盖到目标对象。 不包含原型上的属性
     * 
    **/
    _.extendOwn = _.assign = createAssigner(_.keys)

    // 使用默认属性填充给定的对象
    _.defaults = createAssigner(_.allKeys, true);

    _.findKey = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj),
            key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key
        }
    }
    /**
     *  _.isMatch(object, properties) 
     *      返回值布尔类型，告诉你properties中的键和值是否包含在object中
     *  
     *      var stooge = {name: 'lxk', age: 24, sex: 'male'}
     *      _.isMatch(stooge, {sex: 'male', name: 'lxk'}) 
     *  
     * 
     *  Object() 返回一个对象包装器
     *      string      --> new String('str')
     *      Boolean     --> new Boolean(boolean)
     *      Number      --> new Number(nums)
     * 
    **/
    _.isMatch = function(object, attrs) {
        // 处理 attrs 参数，类型处理在_.keys函数内部完成
        var keys = _.keys(attrs), length = keys.length;
        // 如果object = null attrs = {} 返回true不太好吧
        if (object == null) return !length;
        // 将基本类型处理成一个函数包装类
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            /**
             *  判断条件
             *      值不相等 或者 key不在obj中 返回false
             *      注意值为引用类型时候 都不相等
             *      检索原型上的key
            **/
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    }

    _.isFunction = function(obj) {
        return typeof obj === 'function'
    }

    // 判断是否是一个数组
    // 委派给ES5原生方法 没有的话 写兼容
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };

    /**
     *  判断是否是一个引用类型
     *      JS中 数组 函数 对象 都是对象 一般场景下 null是一个无效的对象
     * 
     *      typeof function() {} // 'function'  
     *      typeof /i/           // 'object'    new Regexp
     *      typeof null          // 'object'
     *      typeof []            // 'object'    new Array
     * 
    **/
    _.isObject = function(obj) {
        var type = typeof obj; 
        // true条件 obj是一个函数 或者 obj是一个非null对象
        return type === "function" || (type === "object" && !!obj);
    }

    _.each(
        [
            "Arguments",
            "Function",
            "String",
            "Number",
            "Date",
            "RegExp",
            "Error",
            "Symbol",
            "Map",
            "WeakMap",
            "Set",
            "WeakSet"
        ],
        function(name) {
            _['is' + name] = function(obj) {
                return toString.call(obj) === '[object ' + name + ']';
            };
        }
    );

    // IE9以下兼容处理
    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
            return has(obj, "callee");
        };
    }

    // 工具方法
    // -------------------------------------------------------------------------------------

    // 保证最少迭代次数
    _.identity = function(value) {
        return value
    }

    /**
     *  返回一个函数，该函数将返回任何传入对象的指定属性。 path 可以指定为简单 key（键），或者指定为对象键或数组索引的数组，用于深度属性提取
     *  _.property()
     *      path 可以是一个数组 或者 简单key 用于提取或者深度提取
     * 
    **/
    _.property = function(path) {
        // 非数组情况
        if (!_.isArray(path)) {
            return shallowProperty(path);
        };
        // 数组情况
        return function(obj) {
            // 返回循环数组得到的value obj[path[0]][path[1]][path[2]]
            return deepGet(obj, path);
        };
    }
    /**
     *  返回一个断言函数 用于检测是否含有给定的key:value键值对
     *      var ready = _.matcher({selected: true, visible: true});
     *      ready({selected: true, visible: true}) // true
     *      var readyToGoList = _.filter(list, ready);
     **/
    _.matcher = _.matches = function(attrs) {
        // 复制了非原型上的属性 同时也改变了引用
        attrs = _.extendOwn({}, attrs);
        return function(obj) {
            return _.isMatch(obj, attrs);
        };
    }

    // 取值范围 [min, max]
    _.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        /**
         *  Math.random 取值范围 [0, 1)
         * 
         *  A ===> Math.ceil(Math.random() * (max - min))
         *  B ===> Math.floor(Math.random() * (max - min + 1))
         *  
         *  假设 max - min = 2
         *  A ===> [0, 2) ===> [0, 1, 2]
         *  B ===> [0, 3) ===> [0, 1, 2]
         * 
         *  注意虽然 A B 方法得到的结果都是 [1, 2, 3] 但是范围是不同的 
         *  A方法返回0的概率极小
         *  B方法返回的概率均衡
        **/
        return min + Math.floor(Math.random() * (max - min + 1));
    };
})();