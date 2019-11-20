/**
 *      正则表达式
 *          元字符必需转译 
 *              如果不记得哪些字符需要转译可以直接加上转译符
 *              ( [ { \ ^ $ | ) ? * + .]}
 *              
 *              [...]   方括号内的任意字符（任意一个字符吗？）
 *              [^...]  除了方括号内的的其他任意字符 字符组的第一位放^, 表示取反
 *              .       匹配除 换行符(\n) 和 其他unicode行终止符(\r) 的任何单个字符
 *              \d      等价[0-9]
 *              \D      等价[^0-9]
 *              \s      任何空字符
 *              \S      任何非空字符
 *              \w      等价[a-zA-Z0-9_]       
 *              \W      等价[^a-zA-Z0-9_]
 *          
 *          重复
 *              {n,m}   匹配前一项至少n次，至多m次
 *              {n,m}   匹配前一项至少n次
 *              {n}     匹配前一项n次
 *              ?       匹配前一项 0次或1次 
 *              *       匹配前一项 0次或多次
 *              +       匹配前一项 1次或多次
 *              量词后面加？，会使量词变为非贪婪模式
 *      
 *          选择 分组 引用
 *              |       用于分割供选择的字符  /ab|cd|ef/匹配ab或者cd或者ef
 *              ()      1 组合，分组操作符  /(ab|cd)+|ef/
 *                      2 完整的模式中定义子模式(当一个正则表达式成功匹配一个字符串时，可以从目标串中抽出与子模式中匹配的部分)
 *                      3 对正则表达式中前一个子表达式的引用
 *              (?:)    只组合，把项组合到一个单元，但不记忆与该组匹配的字符串
 *              \n      n是数字，和第n个分组第一次匹配的字符串相匹配，组是圆括号中的子表达式（也可能是嵌套的），组数是从左到右的(的括号数
 *                      (?:)不记录在内
 *          
 *          指定匹配位置
 *              ^       匹配字符串的开头，在多行索引中，匹配一行的开头
 *              $       匹配字符串的结尾，在多行索引中，匹配一行的结尾
 *              \b      匹配一个单词的边界 具体就是 \w 与 \W之间    \w 和 ^之间   \w 和 $之间
 *              \B      匹配一个单词的非边界
 *              x(?=p)  正向肯定查找，仅匹配后面跟着p的x (正解 匹配后面跟着p的那个位置)
 *                         /jack(?=rose)/.exec('jackrosesdsdf ') --> ["jack", index: 0, input: "jackrosesdsdf ", groups: undefined]
 *                         jack后面不跟着rose不能被匹配，仅当jack紧跟着rose的时候jack被匹配
 *              x(?!p)  正向否定查找，仅匹配后面不跟着p的x (正解 匹配后面不跟着p的那个位置)
 *                          /\d+(?!\.)/.exec('3.1415926') -->   ["1415926", index: 2, input: "3.1415926", groups: undefined]
 *                          匹配数字后面没有小数点的数字
 *              ?<=p     这个还没看
 *              ?<!p
 *              
 *                          
 *          修饰符
 *              i       模式匹配不区分大小写
 *              m       用以在多行模式匹配
 *              g       全局模式匹配
 * 
 *          正则实例方法
 *              test() 
 *                  
 *              exec() 为捕获组设计的
 *                  未匹配到结果返回null
 *                  匹配成功返回一个数组 [index:匹配项在字符串中的位置，input: 应用正则表达式的字符串]
 *          
 *          字符串的正则方法
 *              str.match()
 * 
 *              str.split()
 * 
 *              str.search(regExp)
 *                  regExp 如果传入一个非正则对象，则会使用new RegExp(regExp)转换成正则对象
 *                  返回值  匹配成功返回正则在字符串首次匹配项的索引，未匹配到结果返回-1
 *              str.replace(regExp, str)
 *                  regExp 正则对象或者一个字面量对象 字符串之类
 *                  str准备替换成啥
 *                     或者是一个函数 
 *                  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
 * 
 * 
 *      问题区域
 *          分组的 \1表示匹配第一个分组的内容 必需是相同的内容
 *          /\d{4}(\-\d{2})\1/.test('2019-12-12')   // true 
 *          /\d{4}(\-\d{2})\1/.test('2019-13-12')   // false 第一次匹配的是 13 第二次是12 所以有问题 
 *          如何给数组添加[index: 1]这种实例属性呢？
 *          var arr = []
 *          arr.index = 1 (perfect 哈哈)
 * 
 *          [index:1] 这样输入会报错的啊 因为[]初始化的时候仅支持存放数据 而index:1不是一个数据类型
 * 
 *      
 *      练习题 
 *          123456789     千分位格式化 
 *          123456789.234 千分位格式化
**/
(function() {
    /**
     *  正则实例方法
     *      test()
     *          执行一个检索，用来查看正则表达式与指定的字符串是否匹配
     *      exec()
     *          未匹配到结果返回null
     *          匹配成功返回一个数组 ['匹配字符串', '分组', '分组', index:匹配项在字符串中的位置，input: 应用正则表达式的字符串]
     *          index会随着匹配成功后改变（如果是全局匹配的正则）
    **/ 
    var str = 'aaa bbb ccc';
    const regExp = /\w+/;

    console.log(
        regExp.exec(str) // 如果不是全局匹配的话 永远返回第一次匹配的结果
    )
    
    const regExp1 = /\w+/g;

    console.log(
        regExp1.exec(str), // ['aaa', index: 0, input: 'aaa bbb ccc', groups: undefined]
        regExp1.exec(str), // ['bbb', index: 4, input: 'aaa bbb ccc', groups: undefined]
        regExp1.exec(str), // ['ccc', index: 8, input: 'aaa bbb ccc', groups: undefined]
        regExp1.exec(str), // null
    )


    /**
     *  字符串的正则方法
     *      str.match(regExp)
     *          regExp 一个正则表达式对象 如果传入一个非正则 则调用new RegExp(regExp)
     *          regExp   ''  ['', index: 0, input: '原字符串', groups: undefined]
     *        
     *          返回值
     *              若果 regExp有标志符g，则返回匹配结果的数组集合或者null  
     *              没有g标志的话 同 exec()返回结果相同
     *  
     *      str.split(separator, limit)
     *          separator 字符串 或者 正则
     *          limit     数量限制 
     * 
     * 
     *      str.search(regExp)
     *          regExp 正则表达式 传入非正则表达式 new RegExp(regExp) 调用
     *          匹配不成功返回 -1 其次返回索引
     *      
     *      str.replace(regexp|substr, newSubStr|function)
     *          regexp  一个正则对象 该正则所匹配的内容将被第二个参数的返回值替换掉
     *          substr  一个将被新newSubstr替换的字符串，仅第一个匹配到的字符串被替换掉
     * 
     *          newSubStr   用于替换掉第一个参数在原字符串中匹配部分的字符串 可以插入特殊变量
     *                      $$ 插入一个$
     *                      $& 插入匹配的子串
     *                      $` 插入原字符串中匹配项位置左边内容 
     *                          
     *                      $' 插入原字符串中匹配项位置右边内容
     *                      $n 加入第一个参数是RegExp对象，n是一个小于100的非负整数，那么插入第n个括号匹配的字符串，索引从1开始
     *          function
     *              匹配执行结束后，函数执行
     *              函数的返回值作为替换字符串 特殊变量不能使用
     *              如果第一个参数是正则，并且全局匹配的话，那么这个方法会被调用很多次
     * 
     *              参数
     *                  match   匹配的子串 对应 $&
     *                  p1,pn   如果第一个参数是正则对象，则代表第n个括号匹配的字符串，p1 p2对应$1,$2
     *                  offset  匹配到的子字符串在原字符串中的偏移量
     *                  string  被匹配的原字符串     
     *  
     *          返回一个 由替换值替换一些或者所有匹配的模式后的新字符串，不改变原字符串
     *          
    **/

    // replace()方法
    var str = 'Twas the night before Xmas...';
    var newStr = str.replace(/xmas/i, 'Chrismas')  // "Twas the night before Chrismas..."

    var str = "Apples are round, and apples are juicy."
    var newStr = str.replace(/apples/ig, 'orange'); // "orange are round, and orange are juicy."

    var re = /(\w+) (\w+)/;
    var str = "John Smith";
    var newstr = str.replace(re, "$2 $1"); // Smith John

    var str = 'border-top';
    var newStr = str.replace(/\-\w/i, function(match) {
        console.log(match);
        return match.substring(1).toUpperCase()
    })
    var newStr1 = str.replace(/(\-)(\w)/i, function(match, p1, p2) {
        return p2.toUpperCase()
    })
})();

   