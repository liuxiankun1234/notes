/**
 *  名词解析
 *      identity    身份
 *      iteratee    迭代器
 *      shallow     浅
 *      match       n：比赛/火柴/相配的人  vt: 相同/适应/使较量/
 *      optimize    优化
**/
(function() {
    // 基础设置
    // -------------------------------------------------------------------------------------

    // underscore文档链接： https://www.html.cn/doc/underscore

    /**
     *  环境判断
     *      判断 self是一个对象类型 并且self.self === self 将self赋值给root(window对象)
     *      如果上条件false 则 
     *      判断 global是一个对象类型 并且global.global === global 将global赋值给root(node对象)
     *      如果上条件false 则 
     *      如果this 有值的情况 将this赋值给root
     *      如果上条件false 则 
     *      将{}赋值给root
     * 
    **/
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this || {};

    /** 
     *  使用变量存原生方法有什么好处呢？
     *      减少了访问层级 减少了代码的冗余
     *      使用变量存起来防止后面代码重写原型的方法，使框架内部出问题
     *          例子 _.trim = function(str){ return str.trim() } 
     *              框架后修改 String.protoype.trim = function(){return '大傻'}
     *              _.trim() // 使用变量存起来的话 后文被修改没有问题
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

    // if (typeof exports != 'undefined' && !exports.nodeType) {
    //     if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    //         exports = module.exports = _;
    //     }
    //     exports._ = _;
    // } else {
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
        argCount == null ? 3 : argCount
        switch(argCount) {
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
        // value的值是一个引用类型(非数组对象)
        if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
        // 数组类型处理
        return _.property(value)
    }

    // has 判断obj对象内是否含有path属性（不包括原型上的方法）
    var has = function(obj, path) {
        return obj != null && hasOwnProperty.call(obj, path);
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
        var length = obj.length;
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

    /**
     *  isArrayLike（判断是否是一个伪数组）
     *      判断条件 
     *          只要同数组 有length属性  并且length在 0 ～ (2^32 - 1) 之间就可以
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
        // 判断是否是 类数组对象 从而看是否可以使用for循环
        if(isArrayLike(obj)) {
            for(i = 0, length = obj.length; i < length; i++){
                iteratee(obj[i], i, obj)
            }
        }else{
            // 非数组对象 循环keys处理
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
         *  obj 是对象 keys是一个数组
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
            results = new Array(length);

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

    }


    // 数组的扩展方法
    // -------------------------------------------------------------------------------------

    var createPredicateIndexFinder = function(dir) {
        return function() {
            
        }
    }

    /**
     *  findIndex方法描述
     *      通过真值检查后，返回第一个索引值；否则返回-1
     * 
    **/
    _.findIndex = createPredicateIndexFinder(1)

    // 函数的扩展方法
    // -------------------------------------------------------------------------------------




    // 对象的扩展方法
    // -------------------------------------------------------------------------------------

    // 检索object拥有的所有可枚举属性的名称
    _.keys = function(obj) {
        // 兼容处理 处理非引用类型
        if(!_.isObject(obj)) return []
        // 支持原生方法 使用原生方法
        if(nativeKeys) return nativeKeys(obj)
        // 自定义方法实现_.keys
        var list = []
        for(var key in obj) {
            if(has(obj, key)) list.push(key)
        }
        return list
    }

    /**
     *  一个创建分配函数的内部函数
     *      keysFunc  _.allKeys or _.keys
     *      defaults Boolean类型 如果合并函数有的属性 不合并
     * 
     *      注： 函数没有必要对assign的对象进行 类型检测 如果是基本类型 直接添加属性 也不会报错 
     *      
     *      函数未完成
     * 
    **/
    var createAssigner = function(keysFunc, defaults) {
        return function(obj){
            // 容错处理 如果实参长度小于2 或者 obj == null 则返回当前对象
            var length = arguments.length;
            if(length < 2 || obj == null) return obj
            // 进行assign处理
            for(var index = 1; index < length; index++){
                var source = arguments[index],
                    keys = keysFunc[source],
                    l = keys.length;

                for(var i = 0; i < l; i++) {
                    var key = keys[i];
                    if(obj[key] === void 0) obj[key] = source[key]
                }
            }
            return obj;
        }
    }

    /**
     * 
     *  类似于 extend, 但只复制自己的属性覆盖到目标对象。 不包含原型上的属性
     * 
    **/
    _.extendOwn = _.assign = createAssigner(_.keys)

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
     *      typeof function() {} // 'function'  
     *      typeof /i/           // 'object'    new Regexp
     *      typeof null          // 'object'
     *      typeof []            // 'object'    new Array
     * 
    **/
    _.isObject = function(obj) {
        var type = typeof obj;
        // true条件 obj是一个函数 或者 obj是一个非null对象
        return type === 'function' || type === 'object' && !!obj;
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
    // 
    _.matcher = _.matches = function(attrs) {
        // 复制了非原型上的属性 同时也改变了引用
        attrs = _.extendOwn({}, attrs);
        return function(obj) {
            return _.isMatch(obj, attrs);
        };
    }
})();