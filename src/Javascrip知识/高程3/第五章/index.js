/**
 *  引用类型
 *  
 *  Object类型
 *      创建对象方式
 *          new Object()
 *          对象字面量 {}
 *      花括号出现在一个语句的上下文中，例如跟在一个if语句后面、或者代码块的开头，则表示则表示一个语句块的开始
 *          {console.log(1)} + [] ---> {console.log(1)}; + [] ---> 此处{}当做一个代码块解析 打印1并且执行数组的隐式转换
 *          [] + {console.log(1)} --> 报错 此处{}当做一个对象解析出错
 *      对象属性都是字符串/Symbol 
 *          Number Boolean undefined null Object 类型会转成字符串类型(toString)
 *          var a = {a: 1}, b = {b: 1}, o = null;
 *          o = {[a]: 'a', [b]: 'b', a: 'str a', b: 'str b'};
 *          [a] 和 [b]在当成对象o的属性的时，做了一次隐式转换，Object -> String
 *          a.valueOf().toString() === b.valueOf().toString() ---> '[object Object]'
 *          所以[a]、[b]属性值都是'[object Object]'
 *      对象字面量也是参数的首选类型
 *          必需值使用命名参数 非必须值使用对象字面量封装
 *      访问
 *          .  只能是字符串类型
 *          [] 可以传变量/字符串 非标准标识符(属性)
 *              数字属性
 *              带空格属性
 *              关键字/保留字属性 都需要括号访问
 *  Array类型
 *      同其他语言不同
 *          每项可以保存不同类型数据
 *          数组的长度是可以动态调整的
 *      创建数组方式
 *          new Array(length) === Array(length) 一些源码库就这么创建数组
 *              传递参数为一个数值(n) 表示创建一个长度n的数组
 *              传递其他参数 表示创建一个包含初始项的数组
 *          对象字面量 []
 *      数组最大长度 Math.pow(2, 32) - 1 
 *      检测数组
 *          instanceof
 *              页面中有其他iframe 存在两个Array构造函数,将数组从一个页面传到另一个页面，instanceof检测就会出现问题
 *          Array.isArray()
 *      
 *  提示：
 *      {(左花括号)出现在一个语句上下文中 表示一个代码块的开始
 *      {} + {} // "[object Object][object Object]"
 *      {} + [] // 0
 *      [] + {} // "[object Object]"
 *      null + undefined // NaN
 *      null + '' // "null"
 *      undefined + '' // "undefined"
 * 
 *  Date类型
 *      略
 *  RegExp类型
 *      详情：/talk_about/talk_about_正则表达式迷你书.js
 *           /talk_about/talk_about_正则表达式.js
 *  Function类型
 *      函数是对象，函数名是指向函数对象的指针
 *      没有重载   
 *          其他语言定义两个签名不同即可定义两个同名函数
 *          JS不支持 可以通过传入参数类型 数量作出不同反应 模仿重载
 *      函数内部属性
 *          arguments.callee 一个指向当前arguments所属函数的指针
 *          arguments.callee.caller 保存着调用当前函数的引用 全局调用指向null
 *      函数属性和方法   
 *          length
 *              返回函数形参的数量
 *              形参数量不包括剩余参数(a,b,...rest ---> length = 2)个数，仅包括第一个具有默认值(a,b = 2 --> length = 1)之前的参数个数     
 *          call/apply/bind
 *              改变函数作用域
 *  基本包装类型
 *      引用类型与基本包装类型的主要区别就是对象的生存期
 *          new操作符创建的实例在执行流离开当前作用域前一直保存在内存中
 *          基本包装类型对象，则只存在代码的执行瞬间，然后立即被销毁 这就意味着不能在运行时添加属性和方法     
 *              var s = 'string';
 *              s.trim()
 *              s.color = 'red';
 *              console.log(s.color) // undefined
 *              为什么可以调用trim方法？
 *                  从内存中读取字符串值后台会进行处理
 *                      1 创建一个String实例
 *                      2 在实例上调用指定的方法
 *                      3 销毁这个实例
 *              为什么不能访问color?
 *                  执行第二行 调用基本包装类 为当前String对象添加color属性 随后删除该属性
 *                  执行第三行 重新创建String对象 所以找不到color属性
 *      Boolean类型
 *      Number类型
 *      String类型
 *  单体内置对象
 *      定义：由ECMAScript实现提供的 不依赖于宿主环境的对象
 *      Object Array String Global Math...
 *      Global对象
 *          不属于其他对象的属性和方法都是Global对象的属性和方法
 *              isNaN parseInt paeseFloat
 *          encodeURI() / encodeURIComponent()
 *              有效的URI不能包含某些字符如空格 所以需要这两个方法进行编码替换无效字符 以便发送给浏览器
 *              区别
 *                 encodeURI 
 *                      通常用于整个URI进行编码
 *                      不会对本身属于URI的特殊字符进行编码 如 : / ? #
 *                 encodeURIComponent 常用
 *                      通常对于URI中的某一段进行编码   
 *                      对发现的非标准字符进行编码
 *          eval()
 *              eval中创建的变量或对象不会被提升
 *              影响性能/改变作用域 不建议使用
 *          Math对象
 *              Math.max/Math.min
 *                  Math.max.apply(null, [1,2,3,4,5, {valueOf: () => 10}]) // 10 调用Number()方法 
 *              Math.ceil 取高
 *              Math.floor 取低
 *              Math.round 四色五人
 *              Math.random 
 *              
**/