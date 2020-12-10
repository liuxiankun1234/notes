/**
 *  第十一章 Promise与异步编程
 *      重要
 *          事件循环机制很重要
 *          如果向Promise.resolve()和Promise.reject()方法传入一个Promise，那么这个Promise会直接被返回
 *  异步编程知识背景
 *      事件模型
 *          遇到错误不主动触发
 *      回调模式
 *          必须每次都检查错误参数
 * Promise基础知识
 *      Promise生命周期
 *          每个Promise都会经历一个短暂的生命周期
 *              运行中状态(pending)，此时操作尚未完成，所以它是未处理的(unsettled)
 *              一旦异步操作执行结束，Promise则变为已处理(setted)状态
 *              操作结束之后Promise可能进入到以下两个状态中的一个
 *                  Fulfilled   Promise异步操作成功完成
 *                  Rejected    由于程序错误或其他原因，Promise异步操作未能成功完成
 *          内部属性[[PromiseState]]被用来表示Promise的3种状态
 *              pending
 *              fulfilled
 *              rejected
 *          Promise的then方法 
 *              接收两个参数 参数可选择传递
 *                  第一个参数是Promise状态变为fulfilled状态时候的回调函数
 *                  第二个参数是Promise状态变为rejected状态时候的回调函数
 *              如果一个对象实现了then方法，那么这个对象我们称为thenable对象
 *              所有的promise对象都是thenable对象，但是并非所有的thenable对象都是promise
 *          Promise的catch方法
 *              相当于then方法传递的第二个回调函数
 *          如果一个Promise处于已处理状态，在这之后添加到任务队列里的处理程序仍然执行 无论何时你都可以添加新的处理程序，并且保证这些处理程序会被调用
 *      创建未完成的Promise
 *          通过构造函数的方式创建未完成的Promise
 *              new Prmoise
 *              接收一个执行器函数为参数，执行器函数接收两个参数 resolve reject 完成时调用resolve函数 失败时调用reject函数
 *              执行器函数立即执行 并且返回一个promise对象
 *      创建已处理的Promise    
 *          如果想用Promise表示一个已知值，可以用已处理的Promise来表示
 *              Promise.resolve()
 *                  仅接收一个参数并返回一个完成态的Promise
 *              Promise.reject()
 *                  仅接收一个参数并返回一个拒绝态的Promise
 *              如果向Promise.resolve()和Promise.reject()方法传入一个Promise，那么这个Promise会直接被返回
 *              非Promise的thenable对象
 *                  thenable对象会被包装成一个已处理的Promise对象返回
 *                  Promise.resolve()和resolve.reject()方法接收非Promise的thenable对象并且返回一个已处理的Promise对象
 *      执行器错误
 *          执行器内部报错，则会调用Promise的拒绝程序来处理
 *          每个执行器中都隐含一个try-catch 捕获异常则调用reject处理程序处理
 *      全局的Promise拒绝处理
 *          Promise争议问题是如果没有拒绝处理程序的情况下拒绝一个Promise，那么不会提示失败信息
 *          Promise的特性决定了很难检测一个Promise是否被处理过              
 *          Node.js环境的拒绝处理
 *              处理Promise拒绝时会触发process对象上的两个事件
 *                  unhandledRejection
 *                      在一个事件循环中，当Promise被拒绝，并且没有提供拒绝处理程序时，触发该事件
 *                  rejectionHandled
 *                      在一个事件循环后，当Promise被拒绝，若拒绝处理程序被调用，触发该事件
 *          浏览器环境的拒绝处理
 *              通过监听两个事件来识别未处理的决绝 （safari浏览器支持 部分chrome浏览器不支持）
 *                  unhandledrejection 
 *                      在一个事件循环中，当Promise被拒绝，并且没有提供拒绝处理程序时 触发该事件
 *                  rejectionhandled
 *                      在一个事件循环后，当Promise被拒绝，如拒绝处理程序被调用，触发该事件
 *                      在一个事件循环中 拒绝处理程序被调用的话就不会触发该事件
 *              事件处理程序接受一个有以下属性的事件对象作为参数
 *                  type        事件名称 unhandledrejection或rejectionhandled
 *                  promise     被拒绝的Promise对象
 *                  reason      来自Promise的拒绝值
 *      
 *  创建已处理的Promise
 *      向Promise.resolve 或 Promise.reject 传入一个Promise 那么这个Promise会直接被返回
 *      Promise.resolve() 
 *          不表示fulfilled 表示已解决(不知道fulfilled or rejected)
 *          返回一个完成态的Promise
 *      Promise.reject()
 *          返回一个拒绝态的Promise
 *  执行器错误
 *      then() catch() executor() 函数内部执行错误 都会返回一个拒绝的promise 等同于 Promise.reject()
 *      Promise.reject()拒绝程序被调用 等价于catch捕获异常执行Promise.reject()
 *  
 *  务必在promise链尾留有一个拒绝处理程序保证能够正确处理所有可能发生错误
 *  Promise链的返回值
 *      return 可以将值传递给下一个then函数
 *      返回promise 同Promise.resolve/Promise.reject中传入promise
 *  响应多个Promise
 *      Promise.all()
 *          返回值是一个数组 返回值按传入顺序返回
 *          如果失败 catch返回第一个失败的原因 返回值不是数组
 *      Promise.race() 
 *          看哪个fulfilled的函数执行的快
 *          如果失败 catch返回第一个失败的原因
**/
(function () {
    /**
     *  模拟同步
     *      yield之后的代码 必须通过调用task.next()才能执行
     *      通过注册函数 resolve/reject 等待完成之后 在run函数内部监听完成之后 调用task.next()函数 模拟同步
    **/
    function run(taskDef) {
        let task = taskDef(),
            result = task.next();

        function step() {
            if (!result.done) {
                var p = Promise.resolve(result.value);
                p.then(data => {
                    result = task.next(data);
                    step();
                }).catch(err => {
                    result = task.throw(err)
                    step();
                })
            }
        }
        step();
    }
    function readFile() {
        return new Promise((resolve, reject) => {
            var n = Math.random();
            if (n > .1) {
                resolve({ code: 0, data: [1, 2, 3, 4] })
            } else {
                reject({ code: 1, message: 'err' })
            }
        })
    }
    run(function* () {
        const data = yield readFile();
        // 模拟同步
        console.log(data);
        console.log(1);
    })


    var p = readFile();
    // promise变成已处理状态依然可以添加事件处理程序，并且保证程序能被调用
    p.then(res => {
        console.log(res);
        p.then(res => {
            console.log(res);
        })
    }, err => {
        console.log(err);
        p.catch(err => {
            console.log(err);
        })
    })

    // Promise.resolve()和resolve.reject()方法接收非Promise的thenable对象并且返回一个已处理的Promise对象
    var o = {
        then: function(resolve, reject) {
            resolve(42)
        }
    }
    var o1 = {
        then: function(resolve, reject) {
            reject(42)
        }
    }

    var p2 = Promise.resolve(o)
    var p3 = Promise.resolve(o1)


    window.addEventListener('unhandledrejection', function(e) {
        console.log(e.type)
        console.log(e.reason)
        console.log(e.promise === p4)
    })
    window.addEventListener('rejectionhandled', function(e) {
        console.log(e.type)
        console.log(e.reason)
        console.log(e.promise === p4)
    })

    var p4 = Promise.reject(new Error('12'))
    p4.catch(e=>e)
})();
(function () {
    // 测试题
    async function async1() {
        console.log('async1 start')
        await async2();
        console.log('async1 end')
    }

    async function async2() {
        console.log('async2')
    }

    console.log('script start')

    setTimeout(function () {
        console.log('setTimeout')
    }, 0)

    async1();

    new Promise(function (resolve) {
        console.log('promise1')
        resolve();
    }).then(function () {
        console.log('promise2')
    })
    console.log('script end')
})();