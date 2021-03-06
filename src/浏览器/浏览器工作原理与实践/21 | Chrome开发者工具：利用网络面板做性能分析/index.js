/**
 *  21 | Chrome开发者工具：利用网络面板做性能分析
 * 
 *  Chrome开发工具
 *      Elements
 *          可以查看DOM结构，编辑CSS样式，用于测试页面布局和设计页面
 *      Console
 *          可以看成是JS Shell，能执行JS脚本，通过Console能和页面中的JS对象进行交互
 *      Sources
 *          查看web应用加载的所有文件
 *          编辑CSS和JS文件内容
 *          将打乱的CSS和JS格式化
 *          支持JS调试功能
 *          设置工作区，将更改的文件保存到本地文件夹中
 *      NetWork面板
 *          展示了页面中所有的请求内容列表，能查看每行请求的请求行，请求头，请求体，时间线以及网络请求瀑布图等信息         
 *      Performance
 *          记录和查看Web应用生命周期内的各种事件，并用来分析在执行过程中一些影响性能的要点
 *      Memory
 *          用于查看运行过程中的JS占用堆内存的情况，追踪是否存在内存泄漏的情况
 *      Appplication
 *          查看Web页面的数据存储情况
 *          PWA的基础数据，indexedDB;Web SQL；本地会话与存储；Cookie;应用程序缓存;图像;字体和样式表等
 *      Security
 *          显示当前页面的一些基础安全信息
 *      Audits
 *          会对当前页面进行网络利用情况、网页性能方面的诊断，并给出一些优化建议
 *      Layers
 *          展示一些渲染过程中分层的基础信息
 *   
 *  NetWork网络面板(图 ./i/网络面板概要图.png)
 *      控制器(图 ./i/控制器概要图.png)
 *          红色原点按钮        ：开始/停止抓包
 *          全局搜索按钮        ：可以在所有下载资源中，快速定位某个想要找到的文件
 *          Disable cache     ：禁止从缓存中加载资源
 *          Online            ：模拟2G/3G功能，可以限制带宽，模拟弱网情况下页面的展示情况，
 *      过滤器
 *          查看特定类型文件 JS/CSS/img
 *      抓图信息
 *      时间线
 *          主要用来展示HTTP、HTTPS、WebSocket加载的状态和时间的一个关系，用于直观感受页面的加载过程
 *          如果多条竖线堆叠在一起，那说明这些资源被同时加载
 *      详细列表
 *      下载信息摘要
 *          可以看到DOMContentLoaded、Load所花费时间
 *          DOMContentLoaded
 *              事件发生说明页面已经构建好DOM了，HTML、CSS、JS加载完成
 *          Loaded
 *              浏览器已经加载完所有资源
 *      网络面板中的详细列表
 *          列表属性
 *          详细信息
 *          单个资源的时间线
 *              Queuing（排队）
 *                  页面中的资源是有优先级的，HTML、CSS、JS的优先级高于图片
 *                  浏览器为每个域名最多维护6个TCP连接，如果发起一个HTTP请求时，这6个TCP连接都处于忙碌状态，那么就会排队
 *                  网络进程为数据分配磁盘空间时，新的HTTP请求也需要短暂的等待磁盘分配结束
 *              Stalled（停滞）
 *                  发起连接之前还有可能其他原因导致连接被推迟，这个推迟表现在面板上为 Stalled
 *              Waiting（TTFB 第一字节时间）
 *                  TTFB是反映服务端响应速度的重要指标，对服务器来说，TTFB时间越短，响应越快
 *              Content Download
 *                  从接收第一个字节到全部相应数据所用的的时间    
 *      优化时间线的耗时项
 *          排队（Queuing）时间过久
 *            大概率是浏览器为每个域名最多维护6个TCP连接导致的
 *              域名分片技术：可以将资源放在不同的服务器下面
 *              HTTP2：HTTP2已经没有每个域名最多维护6个TCP连接的限制
 *          第一字节时间（TTFB）过久
 *              服务器生成页面数据的是过久
 *              网络原因 
 *                  CDN静态资源文件
 *              发送请求时候带上了多余的用户信息
 *                  减少不必要的Cookie
 *                 带上不必要的Cookie信息，服务器接受到这些Cookie信息之后可能需要对每一项进行处理，加长了服务器的处理时长
 *          Content Download时间过久
 *              单个Content Download时间过久，可能是字节数过多，可以通过压缩、去掉源码注释等减少文件大小
 *          
**/