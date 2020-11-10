/**
 * 24 最佳实践
 *  可维护性
 *      什么是可维护代码
 *          可理解性    其他人接收代码并理解它的意图和一般途径，无需开发人员完全解析
 *          直观性      代码一看就明白了，不管操作有多复杂
 *          可适应性    代码以一种数据上的变化不要求完全重写的方法撰写
 *          可扩展性    在代码架构上已考虑到未来允许对核心功能进行扩展
 *          可调试性    有地方出错，diamante可以给你足够的信息尽可能直接的确定问题所在
 *      代码约定
 *          可读性
 *              缩进
 *              注释
 *                  函数方法    每一个函数和方法都应该包含一个注释，描述其用于完成任务所可能使用的算法
 *                  大段代码    用于完成单个任务单的代码应该在前面放个描述任务的注释
 *                  复杂算法    如果使用了独特的方法解决问题，则需要告知你是如何做的 
 *                  Hack       因为浏览器存在差异，JS代码一般包含一些Hack,要为这些Hack作出相关解释
 *          变量和函数命名
 *              适当给变量和函数命名会增加代码的可理解性和可维护性
 *              命名规则
 *                  变量名应该是名词如 car person
 *                  函数名应该以动词开始 getName 
 *                  返回布尔类型的函数一般以is开头 isEnable()
 *                  变量和函数都应使用合乎逻辑的名字，不要担心长度。长度问题可以通过压缩代码来解决
 *          变量类型透明
 *              JS变量是松散类型的，很容易忘记最开始定义的数据类型，合适的命名方式可以一定程度的缓解这个问题
 *              指定类型的类型注释
 *                   eg: demo1 这种不可以进行多行注释
 *      松散耦合
 *          1 解耦HTML/JavaScript
 *          2 解耦CSS/JavaScript
 *              // CSS对JavaScript紧密耦合
 *              dom.style.color = 'red'
 *              可以改写为
 *              dom.className = 'redClass'
 *          3 解耦应用逻辑/事件处理程序
 *          解耦原则
 *              误将event对象传给其他方法；只传来自event事件中所需的数据
 *              任何可以在应用层面的动作都应该可以在不执行任何事件处理程序的情况下进行
 *              任何事件处理程序都应该处理事件，然后将处理转交给应用逻辑
 *      编程实践
 *          尊重对象所有权
 *              不要重新定义已存在的方法
 *              不要为实例或者原型添加属性
 *              不要为实例或者原型添加方法
 *          避免全局变量
 *              可以在对象上创建全局变量
 *          避免与null进行比较
 *          使用常量
 *  性能
 *      注意作用域
 *          避免全局查找
 *              var doc = document;
 *          避免使用with语句
 *      选择正确方法
 *          避免不必要的属性查找
 *              var query = window.location.href.substring(window.location.href.indexOf('?'))
 *              查找了6次
 *              var url = window.location.href;
 *              var query = url.substring(url.indexOf('?'))
 *              优化后查找了4次
 *          优化循环
 *              减值迭代
 *                  大多数循环使用从0开始、增加到某个特定值的迭代器。很多情况下，从最大值开始，在循环中不断减值迭代器更高效
 *              简化终止条件
 *                  每次循环过程都会计算终止条件，所以必须保证尽可能快，也就是说避免属性查找、其他O(n)操作
 *              简化循环体
 *                  循环体是执行最多的，所以确保其最大程度的优化。确保没有某些可以被移除循环体的密集计算
 *              使用后测试循环
 *          展开循环
 *          避免双重解释
 *              eval('alert("hello world")')
 *              new Function('alert("hello world")')
 *              setTimeout('alert("hello world")', 10)
 *              这些例子都解析包含了JS代码中的字符串，这个操作是不能在初始的解析过程中完成的，JS运行时会启动一个解析器来完成。实例化一个解析器的开销不小
 *          性能的其他注意事项
 *              原生方法较快
 *              Switch语句较快
 *              位运算符较快
 *      最小化语句
 *          多个变量声明
 *              var a,b,c,d;这种优于 var a; var b; var c; var d;
 *          插入迭代值
 *              var name = [value++]; 
 *          使用数组和对象字面量
 *              var arr = [1,2,3];
 *              优于
 *              var arr = new Array();
 *              arr.push(1);
 *              arr.push(2);
 *              arr.push(3);
 * 
 *              var person = {a: 1, b: 2}
 *              优于
 *              var person = new Object();
 *              person.a = 1;
 *              person.b = 2;
 *      优化DOM交互
 *          最小化现场更新
 *              文档碎片 document.createDocumentFragment();
 *          使用innerHTML
 *              一次性插入html
 *          使用事件代理
 *              事件冒泡机制绑定事件处理程序
 *          注意HTMLCollection
 *              dom.length 存一个变量
 *              dom = doms[i] 存一个变量用于访问
 *
 *          
 *          
 *                    
*/
// demo1
var count   /*: int*/ = 10;