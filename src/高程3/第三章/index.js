/**
 *  已有知识点
 *      严格模式 import '../../talk_about/talk_about_严格模式'
 * 
 *  
 * 
 *  undefined 和 null 有什么相同 不同
 *      undefined == null 比较时 不能将null和undefined转成任何值
 *      
 *      null 
 *          是一个关键字
 *          表示一个空指针 
 *              typoef null 'object'
 *              一般定义一个引用类型的值，会用null来初始化
 *          链表数据结构的尽头是 null
 *          Number(null) --> 0
 *      undefined 
 *          是一个全局变量（全局中不可以修改，在函数内部可以自定义undefined为一个值）
 *          表示一个声明但未定义的变量
 *              函数返回值
 *              数组空元素
 *              声明未定义的变量
 *              void 0
 *          typeof undefined  'undefined'
 *          Number(undefined) --> NaN
 * 
 *  注释中的**表示 tips
**/

/**
 *  基本概念
 *  
 *  语法
 *      区分大小写
 *      关键字不能当作函数名
 *      标识符
 *          什么是标识符?
 *              变量 函数 属性的名字 或者函数的参数
 *          标识符规则
 *              第一个字母必须是一个字母 下划线 或者一个美元符
 *              其它字符可以是字母 下划线 美元符 数字
 *              标识符的字母包含 ASCII 或 unicode字母字符（不推荐）
 *              ** 推荐驼峰式写法 doSomething
 *              ** 不能把关键字 保留字 true false null 用作标识符 
 *      严格模式
 *      语句
 *      关键字和保留字  
 *          用途
 *              用于表示控制语句的开始或者结束，或者用于执行特定操作
 *          规定 
 *              关键字也是语言保留的 不能用作标识符
 *          **
 *              ES3 与 ES5 的保留字不同 
 *              ES3可以将ES5的保留字当成标识符 （及其不推荐）
 *  变量
 *      特性
 *          松散类型（可以用来保存任何类型的数据）
 *          使用var定义的变量将成为定义在该变量作用域中的局部变量 在函数退出后会被销毁
 *          ** 不推荐修改定义之后的类型
 *  数据类型
 *      基本数据类型
 *          Number
 *          String
 *          Boolean
 *          undefined
 *          null
 *          Symbol
 *      复杂数据类型
 *          Object
 * 
 *      typeof 操作符
 *          监测基本数据类型
 *              'number' 'string' 'boolean' 'undefined' 'null' 'object' 'function'
 *              ** 函数在ES中是对象 不是一种数据类型 但是函数也有一定的特殊性 因此typeof操作符区分函数和对象是有必要的 
 * 
 *          typeof 是一个操作符 不是一个函数 所以不必须使用括号 typeof('string')
 * 
 *      Undefined类型
 *          仅有一个值  undefined
 *          产生undefiend值
 *              声明但未赋值的变量 
 *              数组中空元素
 *              未定义的属性
 *              函数的默认返回值    
 *              void 0
 *          对于变量右查找来说 定义了undefined的值和尚未定义的变量 浏览器的查找规则是不同的
 *              var message; 
 *                  message // message is undefined
 *                  notDefined // throw new ReferenceError('${} is not defined')
 *          对于尚未声明的变量只能使用typeof操作符
 *              typeof notDefined // 'undefiend'
 * 
 *          ** 无论如何没有必要将变量初始化成 'undefiend'
 * 
 *      Null类型
 *          含义
 *              表示空指针
 *          在哪里会产生null呢
 *              链表数据结构的尽头 null(原型链是一种链表数据结构)
 *              
 *          ** 定义变量准备将来保存对象，最好将该变量初始化为null(推荐)
 *          
 *      Booleanl类型
 *          所有数据类型都有与之等价的值（理解流程控制语句非常重要）
 *          
 *          false值 0 NaN     ''       false   undefined null 
 *          true值   非零    非空字符    true    任何对象
 * 
 *      Number类型
 *          JS使用 IEEE754 格式来表示整数和浮点数（双精度数值）
 *          基本字面量格式
 *              十进制
 *          其他字面量格式
 *              八进制
 *                  第一位有效数字必须是0 然后是（0~7） 
 *                  如果字面值超出范围，那么前导零将被忽略 后面数值被解析为十进制
 *              十六进制
 *                  前两位必须是0x，后跟任何十六进制数字（0~9 A-F）字母不区分大小写
 *              二进制
 * 
 *          浮点数值
 *              IEEE754格式的浮点数存在精度丢失问题
 *          数值范围
 *              Number.MIN_VALUE 最小值
 *              Number.MAX_VALUE 最大值
 *          NaN
 *              Not a number
 *                  表示一个本来要返回数值的操作数未返回数值的情况
 *              特点
 *                  传染性 凡是涉及到NaN操作都会返回NaN
 *                  NaN 不等于任何值 包括自己
 *                      NaN === NaN // false
 *                      Object.is(NaN, NaN) // true 
 *              检测NaN
 *                  isNaN()
 *                  Object.is()
 *                  自定义函数 var isNaN = number => typeof number === 'number' && number !== number
 *          数值转换
 *              非数值转成数值
 *                  用于任何数据类型
 *                      **  + 操作符等同于Number()
 * 
 *                      Number()  
 *                          Number(true) --> 1 Number(false) --> 0
 *                          Number(number) 简单的传入传出
 *                          Number(null) --> 0 
 *                          Number(undefined) --> NaN
 *                          字符串
 *                              仅包含有效数值 转为十进制数值
 *                              数值是十六进制格式 转为十进制数值
 *                              空字符串 转为 0
 *                              其他 NaN
 *                          引用类型
 *                              调用对象的valueOf(),依照上面规则返回，如果转换结果是NaN
 *                              调用对象的toString(),再次依照规则转换返回字符串
 *                  用于字符串转换
 *                      parseInt(number, binary) 
 *                          binary： 表示进制 默认十进制 推荐使用时加上默认值
 * 
 *                          处理整数
 *                          忽略字符串前的空格，知道找到第一个非空格字符 如果第一个字符不是数字字符或者负号返回NaN
 *                          处理其他进制数值 ES3或ES5有区别
 *                          parseInt('070') // ES3 --> 56  ES5 --> 70
 *                      parseFloat()  
 *                          处理浮点数
 *                          一直解析到无效的浮点数值格式（包括 . ）为止
 *                      
 *      String类型
 *          表示由零个或者多个16位Unicode字符组成的字符序列
 *          单引号或者双引号表示                
 *          字面量字符
 *              \n 换行符  \t 制表符 \b 退格 \r 回车  \\斜杠
 *              字符串不可变 创建之后值不能被改变
 *                  var lang = 'java'; lang = java + ' script' // 销毁原来字符串 然后用新的值填充该变量
 *          转换成字符串    
 *              toString(binary) 方法
 *                  binary 表示输出二进制 八进制 十六进制的值
 *                  除了 undefined 和 null 其他数据都有toString方法
 *              String()
 *                  如果不知道是不是undefined 或是null的时候使用
 *                  由toString方法调用toString null 返回 'null' undefined 返回 'undefined'
 *              拼接空字符串
 *      
 *      Object类型
 *          数据和功能的集合
 *              var o = new Object; // 不推荐 不传递参数可以不加括号          
 *              var o = new a.b; // 优先级问题 .优先级高于new无参数的优先级
**/ 

/**
 *  操作符  
 *      算术操作符 位操作符 关系操作符 相等操作符
 *      可以适用多种类型值 字符串 数字 布尔 对象（转为基本类型）
 * 
 *      一元操作符
 *          定义
 *              只能操作一个值的操作符
 *          递增/递减操作符
 *              前置型
 *                  位于要操作的对象之前执行(先返回 再执行)
 *              后置型
 *                  位于要操作的对象之后执行(先执行 再返回)
 *              适用于任何类型数据
 *                  但是先转换为数字 再执行操作
 *          一元加减操作符
 *              可以使用任何数据类型 等同于Number() 执行相加减
 *              字符串除外
 *      位操作
 *          NaN infinity null当做零来处理
 *          按位非(NOT) ~
 *              返回数值的反码(本质 操作数的负值减1)
 *          按位与(AND) &
 *              将操作数的每一位对其,执行AND操作 
 *              规则：有一假为假 (1当做真 0当做假)
 *                  0000 0000 0000 0000 0000 0000 0001 1001
 *                  0000 0000 0000 0000 0000 0000 0000 0011
 *
 *                  0000 0000 0000 0000 0000 0000 0000 0001
 *          按位或(OR) | 
 *              规则：有一真为真 (1当做真 0当做假)
 *                  0000 0000 0000 0000 0000 0000 0001 1001
 *                  0000 0000 0000 0000 0000 0000 0000 0011
 *
 *                  0000 0000 0000 0000 0000 0000 0001 1011
 *          按位异或(XOR)
 *              规则： 1 1 0
 *                    1 0 1
 *                    0 1 1
 *                    0 0 0
 * 
 *                  0000 0000 0000 0000 0000 0000 0001 1001
 *                  0000 0000 0000 0000 0000 0000 0000 0011
 *                  0000 0000 0000 0000 0000 0000 0001 1010
 *          左移(<<)
 *              位做移动n位，用零补充
 *          有符号的右移(>>) 
 *              忽略符号 其他无影响
 *              ？？？
 *          无符号的右移动(>>>)
 *              正数规则同>>相同
 *              负数将位右移，剩余使用零填充 会产生很大的数
 * 
 *      布尔操作符
 *          逻辑非(!)
 *              false值： 0 NaN '' false undefined null 转成true
 *              其他真值 转成false
 *              ** !! === Boolean() 表示转换成布尔类型值
 *              
 * 
 *          逻辑与
 *          逻辑或
**/
void function() {
    // JS区分大小写
    const a = 'a';
    const A = 'A';

    console.log(a, A)

    var o = {
        a: 'a',
        A: 'A',
        '有效unicode字符': '有效unicode字符'
    }
    console.log(
        o.a, // 区分大小写
        o.A,
        o['有效unicode字符'] // 有效 不推荐
    )


    var message = 'hi';
    message = 12; // 不推荐 JS变量是松散类型的 可以保存任何类型数据

    console.log(
        typeof 1, // 'number'
        typeof '1', // 'string'
        typeof true, // 'boolean'
        typeof void 0, // 'undefined'
        typeof null, // 'object'
        typeof /a/, // 'object'
        typeof RegExp, // 'function'
        typeof {}, // 'object'
    )

    var intNum = 55; // 表示十进制的整数 55
}();




// JS语法
//     区分大小写
//         js中一切都区分大小写 (变量 函数名 操作符 属性 方法)
//     标识符 （变量 函数名 属性名 函数参数） 命名规则
//         第一个字符必须是 字母 _ $ 
//         其他字符可以是 字母 $ _ 数字
//         关键字 保留字 eval arguments 不能作为标识符 否则会报错

// 变量
//     ECMAScript的变量是松散类型的  松散：在特定时间内保存一个特定值的的一个名字
//     用var定义的变量将成为定义该变量的作用域中的局部变量 函数退出后销毁


// 数据类型
//     基本类型
//         Number String Boolean Undefined Null Symbol
//     复杂类型
//         Object 本质： 一组无序的名值对

//     typeof 操作符
//         返回值
//             'undefined' 值是 未定义
//             'boolean'   值是 布尔值
//             'string'    值是 字符串
//             'number'    值是 数值
//             'object'    值是 对象 或者 null
//             'function'  值是 函数

//     Undefined 类型
//         值 只有undefined

//         什么情况是undefined呢？ 
//             未初始化的变量 
//             数组的空元素 
//             void n
//             没有传递值的命名参数


//         为什么是 void 0
//             1 某些浏览器undefined可以被改写
//             2 void 运算符 对给定的表达式进行求值，然后返回 undefined。
            

//         对于未声明的变量 typeof unName ---> return 'undefined'

//     Null 类型
//         本质：一个空对象指针
//         适用于 某个变量未来被定义一个对象 可以使用null来初始化

//     Boolean 类型
//         注 Boolean类型的值 建议使用is + 值来定义 增加可读性 例： isLogin
//         可以使用Boolean() 或 !!value 方法来转化成Boolean类型 
//         true值 非false
//         false值 0 NaN '' false undefined null

//     Number 类型
//         基本的数值字面量格式是十进制整数
//         整数进制 10 8 2 16
//             八进制 
//                 规则 
//                     第一位必须是0 然后是0～7的数字
//                     在'use strict'模式下 八进制无效
//                 示例
//                     var octalNumber = 079 // 被解析为十进制
//                     var octalNumber = 071 // 返回 57

//             十六进制
//                 规则
//                     前两位必须是 0x 后跟（0~9 及 A~F） A~F不区分大小写

//         浮点数值
//             var floatNumber = .5 不推荐使用
//             var floatNumber = 0.5 推荐使用 

//             精度丢失 0.1 + 0.2 !== .3

//         NaN
//             一个不是数字的数值类型
//             特性
//                 传染 凡是涉及到NaN的操作都会返回NaN NaN + 12 // NaN
//                 NaN 不等于任何值 包括本身 NaN !== NaN // true

//             isNaN 函数
//                 任何不能转换为数值的值都将返回true
//                 isNaN(NaN) // true
//                 isNaN('10') // false
//                 isNaN('boolean') // true
//                 isNaN(true) // false

//                 isNaN() 也适用于对象 只不过要调用对象的 valueOf toString方法

//         数值转换
//             tips： 加号 等同于 Number()  + === Number()

//             Number()
//             parseInt()
//             parseFloat()

//             Number转型函数 可以用于任何数据类型
//             parseInt 和 parseFloat 只适用于 字符串

//             Number函数转化规则
//                 Boolean类型 true --> 1 false --> 0
//                 Number类型 简单的传入传出
//                 null --> 0
//                 undefined --> NaN

//                 针对字符串规则
//                     字符串 只包含数字 
//                         Number('-012') // -12
//                     字符串 包含有效的浮点
//                         Number('-012.1') // -12.1
//                     字符串 包含有效的十六进制格式
//                         Number('oxf') // 15
//                     字符串 空
//                         Number('') // 0
//                     others
//                         return NaN

//                 对象
//                     调用valueOf方法 返回NaN 继续调用toString方法

//             parseInt 将字符串转为整数类型
//                 接受两个参数
//                     parseInt('1212', 8) // 将字符串1212解析为一个八进制的数值
//                     最好传进制参数
//                 规则
//                     忽略前置空格 知道遇到第一个非空字符开始解析
//                     第一个字符不是数字或者负号 返回NaN
//                     parseInt('') // NaN

//             parseFloat 
//                 将字符串转为浮点类型 
//                 没有第二个参数

//     String 类型
//         字符串特点
//             字符串是不可变的 一旦创建 值就不能改变
//             var lang = 'Java'
//             lang = lang + ' Script'
//             操作过程
//                 创建一个可以容纳拼接之后的字符串的新字符串 然后填充java sciprt 然后销毁之前的

//         转换为字符串
//             toString方法
//                 参数 基数（进制基数）
//                 var num = 10
//                     num.toString(2) // '1010'
//                 除了 null 和 undefined 其他都有toString方法

//             String方法
//                 如果值有toString 方法 则调用 toString（没有参数）方法
//                 如果值是null --> 'null'
//                 如果值是undefined --> 'undefined'

//     Object 类型

// 操作符
//     应用于对象的操作符 都会调用对象的valueOf()或者toString()方法

//     一元操作符
//         含义： 只能操作一个值的操作符

//         递增/递减操作符

//         前置递增/递减操作
//         var age = 23
//         ++age // 返回24 等同于 age = age + 24

//         前置递增/递减操作
//             先相加再返回
//         后置递增/递减操作
//             先返回再相加

//     位操作符
//         按内存中表示数值的位来操作数值


//         ～按位非
//             ～25 // -26
//                         二进制 
//             25       00000000000000000000000000011001
//             ～25      11111111111111111111111111100110

//         按位与  &
//             规则： 有一假则假

//             25 & 3
//             0000 0000 0000 0000 0000 0000 0001 1001
//             0000 0000 0000 0000 0000 0000 0000 0011

//             0000 0000 0000 0000 0000 0000 0000 0001

//         按位或  |
//             规则： 有一真则真

//             25 | 3
//             有一假则假
//             0000 0000 0000 0000 0000 0000 0001 1001
//             0000 0000 0000 0000 0000 0000 0000 0011

//             0000 0000 0000 0000 0000 0000 0001 1011

//         按位异或  ^  
//             规则
//                 1   1   0
//                 0   0   0
//                 1   0   1
//                 0   1   1

//             0000 0000 0000 0000 0000 0000 0001 1001
//             0000 0000 0000 0000 0000 0000 0000 0011
//             0000 0000 0000 0000 0000 0000 0001 1010

//         左移
//             << 
//         右移动
//             >>

//     布尔操作符

//         逻辑非 !
//             取反  关联真值

//         逻辑与 &&
//             有一假则假
//             规则
//                 第一个操作数 是真 返回第二个操作数
                
//                 如果有一个操作数是 null 则返回null
//                 如果有一个操作数是 NaN 则返回NaN
//                 如果有一个操作数是 undefined 则返回undefined



//         逻辑或 ||
//             有一真则真
//         null NaN undefined 都可认为是false
//         对象可以认为是 true

//     加性操作符
//         加法
//             规则
//                 如果一个操作数 是NaN 返回NaN（NaN有传染性）
//                 null === 0 undefined === NaN
        
//         减法
//             规则
//                 如果一个操作数 是NaN 返回NaN（NaN有传染性）
//                 如果有一个操作数是字符串、布尔值、null 或 undefined，则先在后台调用 Number()函数将其转换为数值，然后再根据前面的规则执行减法计算。如果转换的结果是 NaN，则减法的结果就是 NaN

//                 如果有一个操作数是对象，则调用对象的 valueOf()方法以取得表示该对象的数值。如果得到的值是 NaN，则减法的结果就是 NaN。如果对象没有 valueOf()方法，则调用其 toString()方法并将得到的字符串转换为数值

//                 1 - true // 0
//                 1 - undefined // NaN
//                 1 - null // 1

//     关系操作符号
//         > < >= <=
//             规则
//                 数值类型 比较
//                 字符串类型 进行编码比较 
//                 如果有一个是数值 将另一个操作数转成数值 进行比较
//                 如果一个操作数是对象，则调用这个对象的 valueOf()方法，用得到的结果按照前面的规则执行比较。如果对象没有 valueOf()方法，则调用 toString()方法，并用得到的结果根据前面的规则执行比较
//                 如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较

//         == !==
//             规则
//                 null == undefined
//                 布尔值 true 转成 1 false 转成 0
//                 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值
//                 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类型值按照前面的规则进行比较

//         逗号
//             规则
//                 可以用于赋值
//                     var num = (5, 1, 4, 8, 0); // num的值为0

// 语句
//     if语句
//         if (condition) statement1 else statement2

//         condition 可以是任意表达式 如果非布尔值 调用 Boolean(condition) 将结果转成一个布尔值

//     do while 语句
//         do {
//             statement
//         } while (expression)

//         后测试循环语句 先执行一次

//     break continue
//         break 终止整个单层循环 双层for循环 只能终止 最里层
//         continue 跳过此次循环

//     switch
//         比较时 使用的是 === 

// 函数
//     严格模式下规定
//         函数名不能命名为 eval 和 arguments
//         不能把参数命名为 eval 和 arguments
//         不能出现两个命名参数同名的情况

//     理解参数
//         命名的参数只提供便利 不是必须

//         function doAdd(num1, num2) {
//             arguments[1] = 10;
//             alert(arguments[0] + num2);
//         }

//         arguments[1]的值 和 num2 的值 会同步（ 不是访问的同一个内存空间 ）
//         如果只传了一个值 arguments[1]的值不会反应到num2中 因为arguments的长度是由传递进来的参数决定 不是定义参数觉定的

//         严格模式
//             arguments 不能被重写

//     没有重载





