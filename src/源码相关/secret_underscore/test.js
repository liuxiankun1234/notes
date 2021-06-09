// import _ from './underscore.js';
import './new_underscore.js'

function isEven(n) {
    return n > 0
}  

console.log(
    _.some([0,1,2,], isEven)
)

// void function() {
//     /**
//      *  _.each
//      *  类型处理
//      *      Number      不处理
//      *      Boolean     不处理
//      *      null        不处理
//      *      undefined   不处理
//      *      function    不处理
//      *      正则         不处理     
//      * 
//      *      String      迭代处理
//      *      Array       迭代处理
//      *      Object      迭代处理
//      *      
//     **/
//     // _.each([1,2,3], function(...arg) {
//     //     console.log(...arg, '---------')
//     // })
//     // _.each({a: 1, b: 2}, console.log, {})

//     // _.each(/12/, function() {
//     //     console.log('sdfasdkfasdjfksajfdk')
//     // })
// };

// void function() {
//     console.log(
//         // _.max([{a: 1}, {a :2}], (v) => {
//         //     return v.a
//         // }),

//         // _.max([{a: -Infinity}], (v) => {
//         //     return v.a
//         // })

//         // _.flatten({0: 1, length: 1});
//         // _.difference([1,2,3,4,5], [1], [2])
//         // _.each(true, alert)
//         // _.contains([{a: 1}], 1)
//         // _.lastIndexOf([1,2,3], 3, -2)
//         _.sortedIndex([10, 20, 30, 40], {a: 30}, function(x) {
//             return x.a
//         })
//     )
// }();

function shallowProperty(prop) {
    return function (obj) {
        return typeof obj != void 0 ? obj[prop] : void 0;
    }
}

var MAX_ARRAY_INDEX = Math.max(2, 53) - 1;
var getLength = shallowProperty('length')
function isArrayLike(collection) {
    var length = getLength(collection);

    return typeof length === 'number' 
        && length > 0 
        && length < MAX_ARRAY_INDEX
}

function  optimizeCb(func, context) {
    if(context == void 0) return func;

    return function() {
        func.apply(context, arguments)
    }
}

function each(collection, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);

    var i = 0, length;
    if(isArrayLike(collection)) {
        length = getLength(collection)
        for (; i < length; i++) {
            iteratee(collection[i], i, collection)
        }
    }else{
        var keys = Object.keys(collection);
        length = keys.length;
        for (; i < length; i++) {
            iteratee(collection[keys[i]], keys[i], collection)
        }
    }
}