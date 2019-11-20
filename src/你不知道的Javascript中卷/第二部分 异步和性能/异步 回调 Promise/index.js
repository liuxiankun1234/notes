/**
 *  异步：现在与未来
 *      JS异步变为同步有什么问题？  ajax变成同步
 *          浏览器就会等待结果，等待的同时锁定UI（滚动 按钮），并且阻塞所有的用户交互。为什么会这样呢？因为JS是单线程，一次只能做一件事
 *      
 *      
 *  事件循环
 *      主线程 异步队列 （微任务 宏任务）
 * 
 *      主线程执行代码，执行完毕之后，去微任务看是否有待处理的程序，然后有的话 让程序丢到主线程执行
 *      *********注意浏览器会将所有的微任务处理完成才会执行到宏任务（在微任务里再创建微任务还是会优先执行）
 *      执行完毕之后，主线程去看宏任务有没有待处理的程序，有的话丢到主线程处理
 *      执行完毕之后 重复
 *  
 *  回调地狱问题 
 *      信任问题
 *          你写了一个用户付款的回调函数，然后通知回调的代码执行了五遍，那么回调就行了五次  用户很生气 
 *          如果不调用回调函数 那么就不能付款  老板很生气
 *      控制反转
 *          回调函数会延迟发生，并且是在第三方的控制下
 * 
 *  
 *      
 *  
**/

void function() {
    // 事件循环
    setTimeout(function(){
        console.log(9)
    },0); 
    new Promise(function(resolve){ 
        console.log(1) 
        for( var i=0 ; i<10000 ; i++ ){ 
            i==9999 && resolve() 
        } 
        console.log(2) 
    }).then(function(){ 
        console.log(4)
        Promise.resolve(6).then(res => {
            console.log(res)
    
            Promise.resolve(7).then(res => {
                console.log(res)
    
                Promise.resolve(8).then(res => {
                    console.log(res)
                })
            })
        })
        console.log(5) 
    }); 
    console.log(3);
}();

void function() {
    /**
     *  Promise
     *      一旦Promise决议，他就永远保持在这个状态，此时他就是不变值
     * 
     *      鸭子类型来判定then方法（也不是最稳妥的）
     * 
     *      p instance Promise 不准确
     *          其他窗口的Promise（iframe），在当前浏览器窗口的Promise不同
     *      
     * 
     *  回调信任问题
     *      调用回调过早/过晚
     *          Promise会将所有的代码转换成异步调用
     *      回调未调用
     *          Promise 提供了竟态的高级抽象机制
     *      调用回调次数过多或过少 
     *          Promise 只接受一次决议 只能执行一次resolve()或者reject() 重复出现选第一次执行
     *      未能传递所需的环境和参数
     *          没有显示决议 则返回undefined  resolve() --> 返回undefined
     *          resolve()只接受第一个参数， 其余都会被省略（多参数建议对象/数组传递）
     *      吞掉可能出现的错误和异常
     *          拒绝一个Promise，并给定理由，这个决议会被传递给拒绝回调
     *          在Promise创建过程中出现TypeError或ReferenceError这个异常会被捕捉，传递给拒绝回调
     *          解决了Zalgo风险（不出错是同步，出错是异步）
     *      是可以信任的Promise吗
     *          向Promise.resolve() 传递一个非promise 非thenable的立即值，就会得到一个用这个值填充的promie值
     *          如果向Promise传入一个真正的promise 就会返回这个promise
     * 
     *  链式流
     *      每次调用then()，他都会返回一个新的Promise对象
     *      在完成或者拒绝处理函数内部，如果返回一个值或者抛出一个异常，新返回的Promise就相应被决议
     *      如果完成或者拒绝处理函数返回一个Promise，他将会被展开，这样一来
    **/

    // 调用过早或者过晚 一个函数有可能是同步代码 有可能是异步代码
    function login(callback) {
        if(!name){
            callback();
            return
        }
        request('post', name, callback)
    }
    var a = 1;

    function zalgoFunction() {
        a = 2;
    }
    console.log('a====', a); // 谁敢说这个a是多少 同步的话就会调用过早 / 异步的话调用过晚
    
    
    /**
     *  Promise 解决回调未调用
     *      竞态机制 Promise.race([])
     *      
    **/
    function timeoutPromise(delay) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject('timeout')
            }, delay)
        })
    }
    function foo() {
    }
    Promise.race([
        foo(),
        timeoutPromise(3000)
    ]).then((res) => {
        // foo及时完成
    }).catch(err => {
        console.log('haha', err)
        // 超时或 foo错误
    })

    // 吞掉错误或异常
    // p已经决议了 状态是正确 值是42 不可以被改变
    var p = new Promise(function(resolve, reject) {
        resolve(42)
    })
    /**
     *  p决议有一个正确值 
     *  foo.bar() // 报错 ReferenceError
     *  
     *  promise处理异常会进行 reject() 操作
     *  但是 err 处不会执行（因为promise一旦决议 就不会再被改变）
     *  这个错误会被 p.then() 返回的一个新promise对象所接收
    **/
    p.then((res) => {
        foo.bar();
        console.log(res)
    }, (err) => {
        console.log(err);
    })


    /**
     *  是可以信任的Promise吗
     *      
     * 
     * 
     * 
     **/
    var p1 = new Promise(resolve => {
        resolve(42)
    }) 
    var p2 = Promise.resolve(42)
    // p1 和 p2 的行为是完全一样的

    // 如果向Promise传入一个真正的promise 就会返回这个promise
    var p1 = Promise.resolve(42)
    var p2 = Promise.resolve(p1)

    p1 === p2 // true

    var p3 = {
        then(cb, errcb) {
            cb( 421 )
            errcb( 'evil laugh' )
        }
    }
    // 不会执行errcb的回调 Promise.resolve() 会对thenable对象进行封装
    Promise.resolve(p3)
    .then(
        (res) => console.log('res', res), 
        (err) => console.log('err', err)
    )
    // p.then((res) => console.log('res', res), (err) => console.log('err', err));

}();