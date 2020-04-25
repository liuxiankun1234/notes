/**
 *  问题
 *      ajax('http://someurl.com', callback) 这个callback一定是异步的吗？
 *         如果这个请求被缓存了呢？应该是同不的吧
 *      
 *  异步：现在与未来
 *      JS异步变为同步有什么问题？  ajax变成同步
 *          浏览器就会等待结果，等待的同时锁定UI（滚动 按钮），并且阻塞所有的用户交互。为什么会这样呢？因为JS是单线程，一次只能做一件事
 *      部分浏览器会异步处理控制台I/O(console.log)

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
 *  Promise.all 
 *      返回值是一个传入promise完成消息的数组，与指定的顺序一致（与完成顺序无关）
 *      传入空数组 会立即完成 返回值是空数组
 *  Promise.race
 *      传入一个空数组 会挂住 且永远不会决议
 *  
 * 
 *      new Promise(executor)
 *          executor里报错,promise状态被置为rejected 忽略函数返回值
 * 
 *      promise.then()
 *          返回一个值(return 12)  等同于 resolve(12)
 *          没有返回值 等同于 resolve(undefined)
 *          抛出一个错误(throw new Error('cry')) 等同于 reject(throw new Error('cry'))
 *          返回一个promise对象的话 等同于Promise.then()操作 
 *              如果返回promise是接受状态 那么then返回的也会成为接受状态，并且将promise的接受状态的回调函数的参数作为返回值作为该promise的参数
 *              如果返回promise是拒绝状态 同上
 *              如果返回promise是pending then的状态也是pending，并且终态和返回promise终态相同
**/
void function () {
    // 异步处理控制台I/O
    var a = {
        index: 1
    }
    console.log(a); // ??
    a.index++;
    // a不会立即打印一个快照，而是会异步处理输出 如果想强制执行快照 可以使用JSON.stringify(a)
}();
void function() {
    // 回调问题
    /**
     *  A 避免回调函数未被调用问题
     *      如果超时函数未被调用执行超时方法 
     *
     *
     *
    **/
    // A
    function timeoutify(fn, delay) {
        var timer = setTimeout(() => {
            timer = null;
            fn(new Error('timeout！'))
        }, delay);

        return function() {
            console.log('in')
            if(timer){
                clearTimeout(timer);
                fn.apply(this, ...arguments)
            }
        }
    }
    function foo() {
        console.log(1)
    }

    setTimeout(timeoutify(foo, 500), 2000)


    // B





}();
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
     *          如果是鸭子类型 对象有then方法 则包装成真正的promise传入
     *          如果向Promise传入一个真正的promise 就会返回这个promise
     *              var p = new Promise(() => {}) Promise.resolve(p) === p
     *          
     *          Promise.reject不会对传入的Promise/thenable进行处理，而是直接将值传出
     * 
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




 var p1 = new Promise(resolve => {
        resolve(42)
    }) 

 p1.then(() =>  {
    p1.then(() =>  {
        console.log(2)
    })
    console.log(1)
 })
 p1.then(() =>  {
        console.log(3)
 })
}();

    alert(1)

void function() {
    function getY(x) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3 * x - 1)
            }, 100)
        })
    }
    // foo返回的Promise对象不是单一值
    function foo(bar, baz){
        var x = bar * baz;

        return getY(x)
        .then((y) => {
            return [x, y]
        })
    }

    foo(10, 20).then((total) => {
        const [x, y] = total;

        console.log(x, y)
    })


    // foo方法修改为 
    function foo (bar, baz) {
        var x = bar * baz;

        return [
            Promise.resolve(x),
            getY(x)
        ]
    }

    function spread() {
        return Function.apply.bind(fn, null)
    }
    Promise.all(
        foo(10, 20)
    ).then(
        spread(function(x, y){
            console.log(x, y)
        })
    )


    // 解构版本
    // Promise.all(
    //     foo(10, 20)
    // ).then([x, y] => {
    //     console.log(x, y)
    // })

    
    function foo(x, y) {
        const URL = 'https://someurl.com/?x=' + x + '&y=' + y;
        return new Promise((resolve) => {
            console.log(URL)
            setTimeout(() => {
                const data = {a: 1}
                resolve(data)
            }, 3000)
        })
    }

    foo(1,2).then((res) => {
        console.log(res)
    })
    
}();