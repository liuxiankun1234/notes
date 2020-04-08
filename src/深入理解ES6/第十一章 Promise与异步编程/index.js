/**
 *  第十一章 Promise与异步编程
 *  
 *  拒绝处理 没整明白 待观察
 *      unhandlerejection
 *      rejectionhandled
 *      
 *  创建已处理的Promise
 *      向Promise.resolve 或 Promise.reject 传入一个Promise 那么这个Promise会直接被返回
 *      Promise.resolve() 
 *          不表示fulfilled 表示已解决(不知道fulfilled or rejected)
 *          返回一个完成态的Promise
 *      Promise.reject()
 *          返回一个拒绝态的Promise
 *  执行器错误
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
})();
















// script start
// async1 start
// async2
// async1 end
// promise1
// script end
// promise2
// setTimeout
async function async1() {
    await async2();
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

setTimeout(function () {
    console.log('setTimeout')
}, 0)

new Promise(function (resolve) {
    resolve();
}).then(function () {
    console.log('promise2')
})
console.log('script end')