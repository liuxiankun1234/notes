/**
 *  第十一章 Promise与异步编程
 * 
 * 
 * 
 * 
**/
(function() {
    console.log('******************  1  ******************');
    /**
     *  异步编程的背景
     *      JS是建立在单线程事件循环的概念上的
     *      单线程意味着同一时刻只能执行一段代码
     *      
     * 
     * 
     *  解决异步编程问题
     *      事件模型
     *          绑定点击事件之类
     *      回调模式
     *         node读文件
     *         回调地狱
     * 
     *      promise
    **/


    /**
     *      Promise 基础
     *          Promise是为异步操作的结果所准备的占位符，promise承诺将来在某个时刻完成
     *     
     *      Promise 生命周期
     *         初始挂起态（pending state） 表示异步操作尚未结束
     *         已经完成（fulfilled）       表示异步操作已成功结束
     *         已决绝（rejected）          表示异步操作未成功结束 可能是一个错误或其他原因导致
     * 
     * 
     *      thenable是一个拥有then方法的对象或者方法
     *      所有的promise对象都是thenable 反之未必成立
     * 
    **/

    /**
     *      创建未完成的promise对象 
     *          promise使用Promise构造器来创建 改构造器接受一个执行器函数 包含初始化代码
     *          该执行器会被传入两个名为 resolve 和 reject的函数作为参数
     *          resove表示执行器成功时被回调 reject表示执行器失败后被回调
     * 
     *      创建已处理的promise对象
     *          创建未处理的Promise的最好方法是使用Promise的构造函数，Promise执行器具有动态性
     *          想用Promise表示一个已知值
     *              Promise.resolve()
     *                  接收一个参数 返回一个完成态的Promise 
     *                  
     *              Promise.reject()
     *  
    **/

    /**
     *      Promise.resolve
     *          接收一个参数 返回一个完成态度的Primise 不会有任务编排的过程 需要向promise添加一个完成处理程序来获取值
     *          该处理程序永远不会调用拒绝处理程序
     * 
     *      Promise.reject
     *          同Promise.resolve
     * 
     *      向Promise.resolve 或 Promise.reject 传入一个Promise 那么这个Promise会直接被返回
     * 
    **/
    let promise = Promise.resolve('over')
    promise.then(res => {
        console.log(res)
    })

    // 非Promise的thenable对象 
    const thenable = {
        then(resolve, reject) {
            resolve(12)
        }
    }
    /**
     *      执行器错误
     *          执行器抛错 走catch
     *          执行器会捕获所有的抛出的错误 处理程序存在时 才会记录执行器中抛出的错误 否则错误会被忽略掉
     * 
     **/ 
    let p1 = new Promise((resolve, reject) => {
        throw new Error('哈哈')
    })
    p1.catch(err => {
        console.log(err);
    })
})();
(function() {
    console.log('******************  2  ******************');
    /**
     *      Promise.all
     *      入参 一个含有多个受监视的promise的可迭代的对象
     *      
     *      当所有的promise都完成时候 返回一个 数组里面是 resolve的数组 按照入参的顺讯 排列
     *      如果报错的话 直接就catch 不继续执行
     * 
    **/
    let p1 = new Promise((resolve, reject) => {
        resolve(42)
    });
    let p2 = new Promise((resolve, reject) => {
        reject(43)
    });
    let p3 = new Promise((resolve, reject) => {
        resolve(44)
    });
    
    let p4 = Promise.all(new Set([p1, p2, p3]))
    p4.catch(err => {
        // console.log(err);
    })

    /**
     *      Promise.race()
     *          入参同上
     *          看哪个跑的快 跑的快的就返回
     * 
     * 
    **/
    let p5 = Promise.race(new Set([p2, p1, p3]))
    p5.then((value) => {
        console.log(`value: ${value}`)
    }).then(() => {

    }).catch()
})();



