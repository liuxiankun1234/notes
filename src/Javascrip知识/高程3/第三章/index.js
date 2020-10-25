/**
 *  已有知识点
 *      严格模式 import '../../talk_about/talk_about_严格模式
 *      toString(binary) 和 parseInt(binary) 可逆的进制操作 转过去 转过来
 *  注释中的**表示 tips
**/

/**
 *  基本概念
 *  
 *  语法
 *      区分大小写
 *          ECMAScript中的一切变量、函数名、操作符、参数...都区分大小写
 *              test和TEST是两个不同的变量
 *              typeof是一个操作符、而typeOf可以是一个合法的变量
 *      关键字不能当作函数名
 *          this、try、while...不能被用作标识符
 *      标识符
 *          什么是标识符?
 *              变量 函数 属性的名字 或者函数的参数
 *          标识符定义规则
 *              第一个字母必须是一个字母 下划线 或者一个美元符
 *              其它字符可以是字母 下划线 美元符 数字
 *              标识符的字母包含 ASCII 或 unicode字母字符（不推荐）
 *              ** 推荐驼峰式法 doSomething
 *              ** 不能把关键字 保留字 true false null 用作函数名/参数/变量 可以用作属性名(不推荐使用)
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
 *          松散类型（可以用来保存任何类型的数据/不同于强烈性语言 Int Float类型不可以改变）
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
 *                  严格模式下不支持八进制字面量
 *              十六进制
 *                  前两位必须是0x，后跟任何十六进制数字（0~9 A-F）字母不区分大小写
 *              二进制
 * 
 *          浮点数值
 *              所有IEEE754格式的浮点数存在精度丢失问题 最高精度17位
 *              科学计数法e 数值等于e前面的数值乘以10的指数次幂
 *                  3.2e7 ---> 3.2 * Math.pow(10, 7)
 *          数值范围
 *              Number.MIN_VALUE 最小值
 *              Number.MAX_VALUE 最大值
 *              isFinite()
 *          NaN(Not a number)
 *              表示一个本来要返回数值的操作数未返回数值的情况
 *              特点
 *                  传染性 凡是涉及到NaN操作都会返回NaN
 *                  NaN 不等于任何值 包括自己
 *                      NaN === NaN // false
 *                      Object.is(NaN, NaN) // true 
 *                      Object.is = Object.is(x, y) {
 *                          if(x === y) {
 *                              // +0,-0 --> +Infinity !== -Infinity
 *                              // 其实判断 x !== 0 || y !== 0 就可以
 *                              return x !== 0 || 1 / x !== 1 / y
 *                          }else{
 *                              // 除了NaN都返回false
 *                              return x !== x && y !== y
 *                          }
 *                      }
 *              检测NaN
 *                  isNaN()
 *                      参数值先变为Number类型，然后再判断是否是NaN
 *                      var isNaN = function(value) {
 *                          var n = Number(value);
 *                          return n !== n;
 *                      };
 *                  Object.is()
 *                  自定义函数 var isNaN = number => typeof number === 'number' && number !== number
 *                  ** 这个方法是有漏洞的，非Number类型的值,isNaN方法会将其转为Number类型，再进行NaN比较
 *          数值转换
 *              非数值转成数值
 *                  Number()
 *                      用于任何数据类型
 *                      加号(+)运算符等同于Number方法 + === Number()
 *                      转换规则
 *                          Number  
 *                          Boolean true --> 1 false --> 0
 *                          Undefined NaN
 *                          null    0
 *                          string
 *                              仅包含有效数值(前导符号 科学计数法) 转为十进制数值(八进制也当十进制处理)
 *                              十六进制数字字面量 转为十进制数值
 *                              空字符串 转为 0
 *                              其他 NaN
 *                          引用类型
 *                              先调用对象的valueOf(),依照上面规则返回，如果转换结果是NaN
 *                              再调用对象的toString(),再次依照规则转换返回字符串
 *                  用于字符串转换
 *                      parseInt(number, binary) 
 *                          binary： 表示进制 默认十进制 强烈推荐使用时加上默认值
 *                          从第一个非空有效字符开始，如果是非数字字符或者符号返回NaN
 *                              空字符串会被转成 NaN
 *                          强烈推荐使用第二个进制参数
 *                              处理其他进制数值 ES3或ES5有区别
 *                              parseInt('070') // ES3 --> 56  ES5 --> 70
 *                              十六进制可以不加前导0x
 *                                  parseInt('AF') NaN
 *                                  parseInt('AF', 16) 175
 *                      parseFloat()  
 *                          处理浮点数
 *                          从第一个非空有效字符开始， 一直解析到无效的浮点数值格式（包括 . ）为止 否则返回NaN
 *                          不支持进制参数
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
 *                  位于要操作的对象之前执行
 *                  返回值改变 操作数值也改变
 *              后置型
 *                  位于要操作的对象之后执行
 *                  返回值没改变 操作数值改变  
 *              适用于任何类型数据
 *                  都是先转换为数字 再执行操作
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
 *          按位异或(XOR) ^
 *              注意：
 *                  两数相同异或值为0
 *                  0异或任何数值都等于改数值
 *                  
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
 *              将数值向右移动，但保留符号位（结果最小是0）
 *              位做移动n位，用零补充
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
 *          逻辑与(&&)
 *              优先级高于逻辑或
 *              规则：有一假则假
 *              如果第一个操作数能够决定结果(false值)，那么就不会对第二个操作数进行求值 直接返回false值
 *                  NaN && 'A'          // 返回NaN
 *                  0 && 'A'            // 返回0
 *                  null && 'A'         // 返回null
 *                  undefined && 'A'    // 返回undefined
 *                  '' && 'A'           // 返回 ''
 *                  false && 'A'        // 返回 false
 *                  
 *          逻辑或(||)
 *              规则：有一真则真
 *              如果第一个操作数能够决定结果(true值)，那么就不会对第二个操作数进行求值 直接返回true值
 *              true || 'A'             // 返回 true
 *              '非空字符' || 'A'        // 返回 '非空字符'
 *              1 || 'A'                // 返回 1
 *              ({}) || 'A'             // 返回 {}
 *
 *      乘性操作符 
 *          操作数非数值 调用Number()
 *          乘法(*) 
 *              如果乘积超过了ES数值的表示范围 则返回Infinity或者-Infinity
 *              如果一个数是NaN         返回NaN 
 *              Infinity * 0        === NaN
 *              Infinity * n        === Infinity(符号取决于n)
 *              Infinity * Infinity === Infinity
 *              如果有一个操作数不是数值，后台调用Number()进行转换，再调用上规则
 *          除法(/)
 *              如果除商超过了ES数值的表示范围 则返回Infinity或者-Infinity
 *              如果一个数是NaN           === NaN 
 *              Infinity / Infinity     === NaN
 *              0 / 0                   === NaN
 *              n / 0                   === Infinity (n !== 0 符号取决于n的正负)
 *              如果有一个操作数不是数值，后台调用Number()进行转换，再调用上规则
 *          求模(%)
 *              Infinity % n            === NaN (n有限大的数值 0 负数 正数) 
 *              n % Infinity            === n (n有限大的数值 0 负数 正数)      
 *              Infinity % Infinity     === NaN
 *              如果有一个操作数不是数值，后台调用Number()进行转换，再调用上规则
 * 
 *      加性操作符号
 *          加法
 *              数值
 *                  NaN + n                  === NaN(有一个操作数是NaN 返回NaN)
 *                  Infinity + Infinity      === Infinity
 *                  -Infinity + -Infinity    === -Infinity
 *                  Infinity + -Infinity     === NaN
 *              字符串
 *                  字符串 + 字符串 ===字符串拼接
 *                  如果一个操作符是字符串 另一个是非字符串 将非字符串转成字符串(调用String()方法) 然后拼接
 *          减法
 *              NaN + n                  === NaN(有一个操作数是NaN 返回NaN)
 *              Infinity - Infinity      === NaN
 *              -Infinity - Infinity     === NaN
 *              Infinity + Infinity      === Infinity
 *              -Infinity - Infinity     === -Infinity
 *              如果操作数是字符串 布尔值 null undefined 调用Number()转换为数值
 *              如果操作数是对象 调用valueOf() 返回值不是数值 则调用toString()方法
 * 
 *      关系操作符
 *          > < >= <=
 *          如果两个操作数都是数值 则执行数值比较
 *          如果两个操作数都是字符串 则比较字符串的编码值
 *              '23' > '3' --> false 因为比较编码值 2的编码是50 3的编码是51 所以'23' < '3'
 *          如果一个操作数是数值 则将另一个操作数转为一个数值 进行比较
 *              对象调用valueOf() 返回值不是数值 调用toString()方法
 *              布尔值转为数值，然后进行比较
 *              
 *      相等操作符
 *          相等/不相等 强制转型
 *              一个操作数是布尔值，转成数值进行比较        Number(boolean)
 *              一个操作数是字符串 另一个操作数是数值       Number(string)与数值比较
 *              一个操作数是对象 转成基本类型(valueOf() toString()) 进行比较
 *              null undefined 
 *                  null和undefined相等，但是没有进行任何类型转换
 *                      null == undefined 
 *                  null和undefined进行相等比较，不进行任何类型转换
 *                      null == 0 // false 
 *                      undefined == NaN // false
 *                  
 *                  +null --> Number(null) --> 0 但是 null != 0 可恶
 *              两个操作数都是对象 看是否是同一个引用 是返回true 否返回false
 *              null == undefined // true
 *              null != 0 // true
 *              undefined == 0 // false
 *              
 *          全等/不全等
 *              类型相等 并且值也相等
 *      
 *      逗号操作符
 *          多用于声明多个变量 
 *              var num1 = 1, num2 = 2, num3 = 3;
 *          还可用于赋值 (总是返回表达式的最后一项)   
 *              var num = (1, 2, 3, 4); //  num === 4;  
 *          
**/

/**
 *  语句
 *      通常使用一个或者多个关键字来完成给定的任务
 *      if语句
 *          条件 会自动调用Boolean()转换成布尔类型
 *      for语句
 *          执行循环前 初始化变量
 *          可以定义循环之后要执行的代码
 *          初始表达式 控制表达式 循环后表达式 都是可选的 
 *              for(;;;){} 创建一个无限循环语句
 *              for(; i < count ;) 等同于while语句
 *      for-in语句
 *          循环输出的属性名的顺序不可预测
 *          循环之前确保该对象不是null/undefined
 *      label
 *          给循环设置label 可以通过 break/continue跳出对应循环
 *          可以让break/continue跳过(跳出)外层循环
 *      不建议使用with语句
 *      break 
 *          仅跳出内层循环,不影响外层循环 如果想跳出外层循环 找label标签
 *      continue 
 *          仅跳过单次内层循环,不影响外层循环 如果想跳出外层循环 找label标签
 *      switch
 *          expression中使用全等进行判断
 *          case的值 可以是常量 变量 表达式
 *          值比较时 使用全等操作
 *  
 *  函数
 *      传递的参数
 *          基本类型 传递的是值的副本
 *          引用类型 传递的是指针的副本
 *      命名的参数只提供便利 非必需
 *      传入实参跟arguments的对应数据进行同步 未传入的不同步
 *      推荐：让函数始终都有返回值/或者始终没有返回值
 *      
 *      严格模式 arguments限制
 *          给arguments[x]赋值 不同步实参
 *          重写arguments语法错误
 * 
 *      arguments.length    传入实参长度
 *      function.length     第一个非默认形参之前的参数数量,不包括剩余参数的数量
 * 
 *      没有重载
 *          其他语言定义两个签名不同即可定义两个同名函数
 *          JS不支持 可以通过传入参数类型 数量作出不同反应 模仿重载
 *      
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



    for(var i = 0; i < 5; i++) {
        for(var j = 0; j < 5; j++) {
            if(j === 2) {
                // 跳过当前j循环(不影响外层循环)
                break

                // 跳过单次j循环(不影响外层循环)
                // continue
            }
            console.log(i, '|||',j)
        }
    }    
    // 00，01，10，11，20，21

}();
