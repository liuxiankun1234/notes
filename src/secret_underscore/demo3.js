/**
 *  学习_.each _.forEach 方法
 * 
 *  读书笔记 
 *      Object.prototype.hasOwnProperty
 *          检测当前实例是否含有特定的自身属性 与in操作符不同 不包含原型上的属性
 *          详情见 ../talk_about/talk_about_获取对象属性.js
 *      array.length
 *          length属性 是一个 0 ～ (Math.pow(2, 32) - 1) 之间的一个值
**/

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

// 使用变量存访问原生方法 减少了访问层级 减少了代码的冗余 
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
/**
*   optimizeCb干了啥？
*       对内部func进行绑定this处理
*   为什么不直接使用arguments而使用argCount？
*       根源是不使用apply而是使用call，在旧版本引擎里，使用call方法比apply方法快很多
*       在浏览器中，call确实比apply快很多 (应该在新引擎中会被优化)      
*       
**/
var optimizeCb = function(func, context, argCount) {
    // 如果没有指定this的值 返回当前传入的函数
    if(context === void 0) return func;
    argCount == null ? 3 : argCount
    switch(argCount) {
        case 3: return function(value, key, collection) {
            func.call(context, value, key, collection)
        }
    }
    return function() {
        return func.apply(context, arguments)
    }
}
// has 判断obj对象内是否含有path属性（不考虑原型上的方法）
var has = function(obj, path) {
    return obj != null && hasOwnProperty.call(obj, path);
}
// 最终返回的属性 包含原型上的属性 和 实例上的属性 同 in操作符
var shallowProperty = function(key) {
    return function(obj) {
        return obj === null ? void 0 : obj[key]
    }
}
/**
*  isArrayLike（判断是否是一个伪数组）
*      判断条件 
*          只要同数组 有length属性  并且length在 0 ～ (2^32 - 1) 之间就可以
**/
var MAX_ARRAY_INDEX = Math.pow(2, 32) - 1;
var getLength = shallowProperty('length');
var isArrayLike = function(collection) {
    var length = getLength(collection)
    return typeof length === 'number' && length > 0 && length < MAX_ARRAY_INDEX
}
/**
*  each方法描述
*      遍历list中的所有元素，按顺序用每个元素当参数调用 iteratee 函数， 如果绑定了context，则把iteratee绑定到context对象上
*      
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
// 检索object拥有的所有可枚举属性的名称
_.keys = function(obj) {
    if(!_.isObject(obj)) return []
    if(nativeKeys) return nativeKeys(obj)
    var list = []
    for(var key in obj) {
        if(has(obj, key)) list.push(key)
    }
    return list
}
// 判断是否是一个 非null对象 
_.isObject = function(obj) {
    var type = typeof obj;
    // true条件 obj是一个函数 或者 obj不是一个null对象
    return type === 'function' || type === 'object' && !!obj;
}   
console.log('*********************** START TEST ***********************')
function works() {}
for(var i = 0; i < 5; i++) {
    // console.time('call')
	// for(var j = 0; j < 1000000;j++) {
    //     (function(a, b, c, d) {
    //         works.call(document.body, a, b, c, d)
    //     })(1,2,3,4)
	// }
    // console.timeEnd('call') 
    
	console.time('apply')
	for(var j = 0; j < 1000000;j++) {
        (function() {
            works.apply(document.body, arguments)
        })()
	}
	console.timeEnd('apply')

	
}
console.log('*********************** END TEST ***********************')
