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
    var root = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global) ||
        this || {};

    var ArrayProto = Array.prototype,
        ObjProto   = Object.prototype;
    var SymbolProto = typeof Symbol === 'function' ? Symbol.prototype : null;

    var push            = ArrayProto.push,
        slice           = ArrayProto.slice,
        hasOwnProperty  = ObjProto.hasOwnProperty
        toString        = ObjProto.toString;

    var nativeIsArray   = Array.isArray,
        nativeKeys      = Object.keys,
        nativeCreate    = Object.create;


    var _ = function(obj) {
        
    };

    root._ = _;
   
    _.VERSION = "1.9.1"

    var shallowProperty = function(key) {
        return function(collection) {
            return collection == null ? void 0 : collection[key];
        }
    }
    var getLength = shallowProperty('length');
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var isArrayLike = function(collection) {
        var length = getLength(collection);

        return (
            typeof length === 'number' &&
            length > 0 &&
            length < MAX_ARRAY_INDEX
        )
    }

})();