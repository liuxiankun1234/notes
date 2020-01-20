import _ from './underscore.js';


void function() {
    /**
     *  _.each
     *  类型处理
     *      Number      不处理
     *      Boolean     不处理
     *      null        不处理
     *      undefined   不处理
     *      function    不处理
     *      正则         不处理     
     * 
     *      String      迭代处理
     *      Array       迭代处理
     *      Object      迭代处理
     *      
    **/
    _.each([1,2,3], function(...arg) {
        console.log(...arg, '---------')
    })
    _.each({a: 1, b: 2}, console.log, {})

    _.each(/12/, function() {
        console.log('sdfasdkfasdjfksajfdk')
    })
};

void function() {
    console.log(
        _.extend('123', {a: 1}),
        _.defaults('123', {a: 1})
    )
    
}();