var shallowProperty = function(key) {
    return function(obj) {
        return obj == null ? void 0 :  obj[key];
    }
}
var getLength = shallowProperty('length');

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var isArrayLike = function(obj) {
    var length = getLength(obj);
    return (
        typeof length === 'number' && 
               length >= 0 &&
               length <= MAX_ARRAY_INDEX
    )
}
var optimizeCb = function(func, context, argCount) {
    if(context === void 0) return func;
    switch(argCount) {
        case 3:
            return function(value, key, collection) {
                return func.call(context, value, key, collection)
            }
            break;
    }
    return function() {
        return func.apply(context, arguments)
    }
}
var keys = function(obj) {
    if(!isObject(obj)) return []
    if(Object.keys) return Object.keys(obj);

    var list = [];
    for(var k in obj){
        if(obj.hasOwnProperty(k)){
            list.push(k)
        }
    }
    return list;
}
var each = function(obj, iteratee, context) {
    // ?��context
    iteratee = optimizeCb(iteratee, context);

    var i, length;
    // ?�q?�^ �Llength������if
    if(isArrayLike(obj)){
        for(i = 0, length = obj.length; i< length; i++){
            iteratee(obj[i], i, obj)
        }
    }else{
        var keys = keys(obj);
        for(i = 0, length = keys.length; i< length; i++){
            iteratee(obj[keys[i]], keys[i], obj)
        }
    }
}







var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
        var length = arguments.length;
        if (defaults) obj = Object(obj);
        if (obj == null || length < 2 ) return obj;
        for(var index = 1; index < length; index++){
            var source = arguments[index],
                keys = keysFunc(source),
                l = keys.length;
            
            for(var i = 0; i < l; i++){
                var key = obj[i];
                if(!defaults || key === void 0){
                    key = source[i];
                }
            }
        }
        return obj;
    }
}