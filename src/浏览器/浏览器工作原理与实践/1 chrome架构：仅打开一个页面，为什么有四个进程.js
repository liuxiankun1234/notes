/**
 *  仅打开一个页面，为什么有四个进程？
 * 
 *  进程和线程
 *      什么是并行处理？
 *          同一时刻处理多个任务 进而提升性能
 *      进程和线程
 *          进程：一个程序的运行实例，详细解释就是，启动一个程序的时候，操作系统会为该程序创建一块内存，
 *              用来存放代码、运行中的数据和一个执行任务的主线程，我们把这样一个运行环境叫做进程
 *          进程用来启动和管理线程
 *          线程是依附于进程的，而进程中使用多线程并行能提升运算效率
 * 
 *      进程和线程的关系
 *          进程中的任意线程执行出错，都会导致整个进程的崩溃 例见 E1
 *          线程之间共享进程的数据 线程中写入进程的数据其他线程可以访问
 *          当一个进程关闭之后，操作系统会回收进程锁占用的内存
 *              IE浏览器支持很多插件，这些插件有时会导致内存泄漏。只要浏览器开着，内存就会越来越多，
 *              但是关闭浏览器的进程时，这些内存就会被系统回收掉
 *          进程之间的内容相互隔离
 *              进程隔离是保护操作系统中进程互不干扰的技术，每个进程只能访问自己占有的数据，
 *              进程之间是严格隔离的，所以一个进程崩溃或者挂起 不会影响其他进程
 *              进程之间数据通信有单独的 进程间通信的机制（IPC）
 *  单进程浏览器时代(已经是历史了)
 *      单进程浏览器是指浏览器的所有功能模块都运行在同一个进程里
 *          所有模块包括 网络 插件 JS运行环境 渲染引擎 页面等
 *      如此多功能模块运行在一个进程里导致不稳定 不流畅 不安全
 *          不稳定
 *              早期浏览器需要借助插件来实诸如Web视频 Web游戏等各种强大功能，但是插件很容易出问题，一个插件崩溃导致整个浏览器进程的崩溃
 *              渲染引擎也是不稳定的，通常一些复杂的JS代码就可能引起渲染引擎的崩溃，导致整个浏览器进程的崩溃
 *          不流畅
 *              从图(./i/单进程的浏览器.png)可以看出，所有页面的渲染模块、JS执行环境以及插件都是运行在同一个线程中的，意味着同一时刻只能有一个模块可以执行 例见 E2
 *              页面的内存泄漏也是单进程变慢的重要原因（使用时间长 内存占用越高 浏览器变得越慢）
 *          不安全（插件和页面脚本）
 *              插件可以使用c++等代码编写，通过插件可以获取操作系统的任意资源，当页面运行一个插件时，以为着插件能完全控制你的电脑。
 *              恶意插件可以释放病毒，获取账号密码，引发安全性问题
 *              
 *              页面脚本可以通过浏览器漏洞来获取操作系统权限，这些脚本获取权限之后可以对电脑进行操作，引发安全问题
 *  多进程浏览器时代(图 ./i/早期chrome进程架构.png)
 *      Chrome的页面是单独的渲染进程
 *      插件也是运行在单独的进程中
 *      进程之间通过IPC通信
 * 
 *      解决不稳定问题
 *          进程简相互隔离，一个页面或插件崩溃，不不影响其他页面
 *      解决不流畅问题
 *          JS运行在渲染进程中，及时JS阻塞了渲染进程，影响的知识当前的渲染页面，并不影响其他页面，其他页面的脚本是运行在他们自己的渲染进程中
 *          在chrome里运行死循环脚本时，没有响应的也只是当前页面
 *          内存泄漏问题 关闭当前页面，整个渲染进程也会被关闭，之后的该进程所占用的内存都会被系统回收，这样就解决了浏览器页面的内存泄漏问题
**/

(function() {
    /**
     *  编写代码可以把这个过程拆分为4个任务
     *      任务一是计算 a = 1 + 2
     *      任务二是计算 b = 20 / 5
     *      任务三是计算c = 7 * 8
     *      任务三是打印计算结果
     *  
     *  单线程处理是分布执行四个任务
     *  多线程会分两步 第一步使用三个线程同时执行前三个任务 第二步执行第四个任务
     * 
     *  E1: 
     *      假设 b = 20 / 0 0不能做分母出错情况
     *      线程执行出错，会导致整个进程的崩溃，另外线程中的结果也都没有了
     * 
    **/
    var a = 1 + 2;
    var b = 20 / 5;
    var c = 7 * 8;
    console.log(a, b, c)


    /**
     *  E2: 这个脚本是无限循环的，当脚本执行时，JS执行模块会独占整个线程，导致其他运行在改线程中的模块就没有机会被执行，
     *  所以这些页面都没有机会执行任务，导致整个浏览器失去响应
    **/
    function freeze() {
        while(1)  {
            console.log('freeze');
        }
    }
    freeze();
})();