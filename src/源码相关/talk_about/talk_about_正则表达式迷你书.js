/**
 *      
 *      第一章 正则表达式字符匹配攻略
 *      第二章 正则表达式位置匹配攻略
 *      第三章 正则表达式括号的作用 
 *      第四章 正则表达式回溯法原理
 *      第五章 正则表达式的拆分
 *      第六章 正则表达式的构建
 *      第七章 正则表达式编程
 *      
 * 
 * 
 * 
 *      重点注意：
 *          正则表达式是匹配模式，要么匹配字符，要么匹配位置
 *          (?:)  非捕获型分组
 *          (?=a) 匹配位置 后面是a的位置
 *          (?!a) 匹配位置 后面不是a的位置
 *          (?<=y)x 匹配x，前面是y的这个x
 *          (?<!y)x 匹配x，前面不是y的这个x
 *          /^\d{15}|\d{17}[xX\d]$/g
 *              分支结构将正则分为左右两部分表达式 
 *              匹配15位数字开头或17位数字...结尾
 *          [a - z] 匹配 a z '' 这里的-表示空字符串到空字符串的字符 也就是空字符串
 * 
 *          test() 和 exec() 方法受到g标识影响，改变lastIndex，多次调用注意下
 * 
 *          /[good|goodbye]/ 字符组表示g o o d b y e 和 | 字符中的一个 而非good|goodbye中的一个
 *          /^(good|bye)$/  字符组表示good/bye单词中的一个 
 *          常见回溯产生原因(深度优先搜索算法)
 *              贪婪量词/惰性量词/分支结构
 * 
 *          .* 是很影响效率的 尽量使用准确正则
 * 
 * 
 *  
**/
(function () {
    /**
     *  第一章 正则表达式字符匹配攻略
     *      正则表达式是匹配模式，要么匹配字符，要么匹配位置
     *      
     *      两种模糊匹配
     *          横向模糊匹配
     *              定义： 一个正则可匹配的字符串的长度不是固定的，可以是多种情况的
     *              实现方式： 使用量词
     *          纵向模糊匹配
     *              定义： 一个正则匹配的字符串，具体到某一位字符时，他可以不是确定的字符，可以有很多种情况
     *              实现方式：字符组 [abc] 表示abc中的任意一个字符
     * 
     *      字符组 ([])
     *          虽然叫字符组，最终匹配的是组内的一个字符
     *          [ab|01] 匹配ab|01字符中一个字符 
     * 
     *          范围表示法 - 
     *              - 表示一个区间范围 在范围组内表示左边字符到右边字符的范围区间
     *              [a-z] 英文字母 a到z中的任意一个字符
     *              [a\-z] [-az] [az-] 表示a、-、z三个字符中的任意一个字符
     *              [a - z] 匹配 a z '' 这里的-表示空字符串到空字符串的字符 也就是空字符串
     *              
     * 
     *          排除字符组 ^(脱字符)
     *              字符组第一位放脱字符 表示取反的意思
     *              [^abc] 匹配除了abc之外的任意一个字符
     *          
     *          常见简写形式
     *              \d 表示[0-9] 一位数字
     *              \D 表示[^0-9] 非数字任意字符
     *              \w 表示[0-9a-zA-Z_] 数字 大小写字母 下划线
     *              \W 表示[^0-9a-zA-Z_] 非数字 大小写字母 下划线
     *              \s 表示[\t\v\n\r\f] 表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符
     *              \S 非空白符
     *              .  任意字符
     *      量词
     *          重复
     *              {m,} 至少m次
     *              {m} m次
     *              ？ * +
     *          贪婪匹配 (尽可能多的匹配字符)
     *              正常情况下都是贪婪匹配
     *          非贪婪匹配 (尽可能少的匹配字符)
     *              量词后加? 表示非贪婪匹配 
     *              多选分支匹配也是非贪婪匹配  No 'goodbye'.match(/^good|goodbye$/g)
     *      多选分之     
     *          用管道符 | 分割     (p1|p2|p3)    p1 p2 p3 任选其一
     *          | 两侧所有表达式看成一个整体
     *          /^begin|end$/g 这个正则表示以begin开头或者end结尾就可以
     *      
     *          
     *      正则题
     *          1 匹配 '<div id="container" class="main"></div>' 的 id
     *              /id=".+"/ 会匹配 到 id="container" class="main" 贪婪匹配 --> 回溯 --> 找到最后对应的" 结束
     *              /id=".+?"/ 会匹配 到 id="container"  非贪婪匹配 直接找到
     *              /id="[^"]+"/ 会匹配 到 id="container" 条件限制
     * 
    **/

    '012345 666 6666666'.match(/\d{2,5}/g)
    //  贪婪匹配  ["01234", "666", "66666", "66"]

    '012345 666 6666666'.match(/\d{2,5}?/g)
    //  非贪婪匹配  ["01", "23", "45", "66", "66", "66", "66"]

    '012345 666 6666666'.match(/\d{2}|\d{5}/g)
    // 多选分支匹配是非贪婪匹配 ["01", "23", "45", "66", "66", "66", "66"]
    'goodbye'.match(/good|goodbye/g)
    // 多选分支匹配是非贪婪匹配 ["good"]

    var str = '<div id="container" class="main"></div>';
    str.match(/id=".+"/);
    str.match(/id=".+?"/);
    str.match(/id="[^"]+"/);
})();
(function () {
    /**
     *  第二章 正则表达式位置匹配攻略
     *  
     *  什么是位置(锚)
     *      位置是指相邻字符之间的位置 把位置理解为空字符串更好理解位置
     *  如何匹配位置呢          
     *      es5中有六个锚 ^ $ \b \B (?=a) (?!=b)
     *     
     *      ^ 匹配开头 在多行模式中匹配行开头
     *      $ 匹配结尾 在多行模式中匹配行结尾
     * 
     *      \b 单词边界 具体就是\w和\W之间 \w和^之间 \w和$之间
     *      \B 非单词边界 \w和\w之间 \W和\W之间 \W和^之间 \W和$之间
     *      
     *      (?=a)  匹配后面是a的位置 注意必须使用括号括起来 否则报错 
     *      (?!=a) 匹配后面不是a的位置 注意必须使用括号括起来 否则报错 
     * 
     *  
     *  位置的特性
     *      位置可以理解为空字符串
     * 
     *      "hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "" + "o" + ""
     *      "hello" == "" + "" + "hello"
     *      所以正则写成/^^hello$$$/是没有问题的
    **/

    /**
     *  m标识对g标识无影响，m标识仅影响位置
     *  添加m标识，认为换行的开头/结尾位置被认同，不添加换行时，仅认同一个开始/结尾位置
    **/
    // ^ $ 同 mg 同时使用时候才会匹配多行全部的位置
    var str = 'this\nis\ngood\nboy'
    // 说明g只能约束到当前行的全部 
    str.replace(/^/g, 'A') // Athis\nis\ngood\nboy
    // m可以约束匹配单行 还是多行 但是A只被替换一次 因为没有全局替换
    str.replace(/^/m, '#') // #this\nis\ngood\nboy
    // mg同时使用可以 全部替换
    str.replace(/^/gm, '#') // #this\n#is\n#good\n#boy



    // \b 替换所有的\w边界为A
    '1-0_1'.replace(/\b/g, '#'); // '#1#-#0_1#'

    // 不匹配任何字符的正则
    /.^/ // 字符后面是开头位置  没有这样的字符

    // 
    /**
     *  匹配千分位
     *      原理匹配位置 使得相应位置替换成,
     *      
     *      (?=(\d{3})+$) 匹配后面是以三的整数倍为结尾的位置
     *      (?!^) 匹配不能是开头的位置
     *      
     * 
    **/
    '123456789'.replace(/(?!^)(?=(\d{3})+$)/g, ',')


    /**
     *  格式化数字
     *      1888 --> $ 1,888.00
     *  $$ 表示美元符
    **/

    function format(num) {
        return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ',').replace(/^/, '$$')
    }
    format(1888)

    // 数字 大小写字母 6～12位
    var reg = /^[a-zA-Z0-9]$/;

    // 数字 大小写字母 6～12位 至少要有数字
    // 正则的意思 是 首位置 后面要跟着有数字
    var reg = /(?=.*[0-9])^[a-zA-Z0-9]{6, 12}$/

    // 正则匹配6~12位 数字 大小写字母 必须包括两种

    function f(str) {
        /**
         *  原理匹配位置 
         *      (?=.*\d)(?=.*[a-z])     后面有[0-9][a-z] (包含两种字符)
         *      (?=.*\d)(?=.*[A-Z])     后面有[0-9][A-Z] (包含两种字符)
         *      (?=.*[a-z])(?=.*[A-Z])  后面有[a-z][A-Z] (包含两种字符)
         *      并且格式限制为 以[a-zA-Z0-9]{6,12}开头结尾
        **/
        return /((?=.*\d)(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[a-zA-Z0-9]{6,12}$/g.test(str)

        /**
         *  第二种解法 取反 这个思路比较高级
         *      (?![0-9]{6,12})     后面不是纯数字
         *      (?![a-z]{6,12})     后面不是纯小写字母
         *      (?![A-Z]{6,12})     后面不是纯大写字母
         *      并且格式限制为 以[a-zA-Z0-9]{6,12}开头结尾
         * 
        **/
        return /(?!^[0-9]{6,12}$)(?!^[a-z]]{6,12}$)(?!^[A-Z]{6,12}$)^[a-zA-Z0-9]{6,12}$/g;
    }

})();
(function () {
    /**
     *  第三章 正则表达式括号的作用 
     *      括号提供了分组，便于我们引用他们
     *  
     *      分组和分支结构
     *          分组  /(ab)+/    将ab划分为一个组
     *          分之结构 (p1|p2)  分支结构会把正则整体(或者分组内整体)分为n+1份
     *              p1或p2规则中的一个 p1|p2是一个整体 
     *              /^green|red$/.test('gred') // true
     *              匹配规则为以red结尾/green开头
     *              /^green|red$/.test('grred') // true
     *              匹配规则为以red结尾/green开头
     *      分组引用
     *          /^\d{4}(\.|\/|-)\d{2}\1\d{2}$/
     *          括号嵌套时候 按照左边括号为计算依据 依次递增
     *          反向引用 \10 表示第十个引用 (?:\1)0 或者 \1(?:0) 通过非捕获型分组表示第一个引用 
     *          引用不存在的分组会怎样？ \3 表示就是 \3 而不是对3的转译
     *          分组之后有量词的话，分组最终会捕获到的数据是最后一次的匹配 对应的引用也是最后捕获的值
     *          
     *      非捕获型分组
     *          (?:) 表示非捕获型分组 不会被引用  
     * 
    **/

    // 
    /**
     *  分组之后有量词的话
     *      \1表示最后一次捕获到的数字 5
     * 
    **/
    const reg1 = /(\d)+ \1/;
    reg.test('12345 5'); // true
    reg.test('12345 1'); // false

    // 模拟trim实现
    function trim(str) {
        // 开头位置之后 结尾位置之前 的空格都被替换为 ''
        return str.replace(/^\s*|\s*$/g, '');

        /**
         * 方案二
         *  (.*?)使用了非贪婪匹配 否则会匹配第一个非空字符开始到最后一个空格(或者没有空格)之前
         *  '  abc  ' --> 'abc ' 贪婪匹配导致空格处理不干净
        **/
        return str.replace(/^\s*(.*?)\s*$/g, "$1");
    }

    // 将每个单词的首字母转换为大写
    function normalize(str) {
        // /\b\w/g 也可以 
        return str.toLowerCase().replace(/(?:^|\s+)\w/g, function (match) {
            return match.toUpperCase();
        })
    }

    // 驼峰化  'webkit-linear-gradient' ---> 'webkitLinearGradient'
    function camelize(str) {
        return str.replace(/[-\s]+(\w)/g, function (a, match) {
            return match ? match.toUpperCase() : '';
        })
    }

    // HTML转译和反转译 转义规则 以&开头;结尾
    function escapeHTML(html) {
        const escapeHTML = {
            '>': 'gt',
            '<': 'lt',
            '"': 'quot',
            '&': 'amp',
            '\'': '#39'// 单引号
        }
        return html.replace(new RegExp('[' + Object.keys(escapeHTML).join('') + ']', 'g'), function (match) {
            return `&${escapeHTML[match]};`
        });
    }
    // HTML反转译 转义规则 以&开头;结尾
    function unescapeHTML(html) {
        const htmlEntities = {
            nbsp: ' ',
            lt: '<',
            gt: '>',
            quot: '"',
            amp: '&',
            apos: '\''
        }

        return html.replace(/&([^;]+);/g, function (match, key) {
            console.log(match, key);
            // if(htmlEntities[key]){} 不能用这个 因为htmlEntities[key] 为falsy就挂了
            if (key in htmlEntities) {
                return htmlEntities[key]
            }
            return match
        })
    }


    /**
     *  匹配成对标签
     *      匹配
     *          <title>regular expression</title>
     *          <p>laoyao bye bye</p>
     *      不匹配
     *          <title>regular expression</p>
     *      
     *      考虑嵌套问题呢
     *          /<(.+)>.*<\/\1>/g 
     *              <(.+)> 点加号 会贪婪匹配 到最后一个匹配结果，然后回溯性能低
     *          正则优化
     *          /<([^>]+)>.*<\/\1>/
     *              <([^>]+)>这个正则不会匹配到第一个>就结束 不会有贪婪匹配，回溯的情况发生
     *              
     *      
     *      
     *          
    **/
    const reg2 = /<(.+)>.*<\/\1>/g,
        reg3 = /<([^>]+)>.*<\/\1>/g;

    var start = +new Date(),
        end,
        testStr = 'This optimization makes the lexer more than twice as fas<title>t! Why does this make sense? First, if you think about it in the simplest way possible, the iteration over rules moved from Python code to C code (the implementation of the re module). Second, its even more than that. In the regex engine, | alternation doesnt simply mean iteration. When the regex is built, all the sub-regexes get combined into a single NFA - some states may be combined, etc. In short, the speedup is not surprising.so</title>meone';

    for (var i = 100000; i >= 0; i--) {
        // 62毫秒
        // reg2.test(testStr);

        // 24毫秒
        reg3.test(testStr);
    }
    end = +new Date();

    console.log(end - start);

    /**
     *  不好的正则 造成的回溯性能问题
    **/
    var start = +new Date(),
        end,
        testStr = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
        reg2 = /a{1,100}aaaabaaaabbbab/,
        reg3 = /a{1,100}b/;
    for (var i = 100000; i >= 0; i--) {
        // 1784ms 有回溯过程
    //         reg2.test(testStr);

        // 107ms 没有回溯
        reg3.test(testStr);
    }
    end = +new Date();

    console.log(end - start);

})();
(function () {
    /**
     *  第四章 正则表达式回溯法原理
     *      没有回溯的匹配  
     *          /ab{1,3}c/ 匹配abbbc时候不会回溯
     *          
     *      有回溯的匹配
     *          /ab{1,3}c/ 匹配abbc时候会有回溯
     *          当匹配到 abb之后 再匹配c时候, 正则贪婪模式认为下一个字符还是b，检测之后发现是c，这个时候b{1,3}这个正则就匹配完了 量词是2 之后进入子表达式c的匹配阶段
     * 
     *          /ab{1,3}bbc/ 匹配abbbc时候会回溯
     *          过程
     *              匹配    a
     *              匹配    a,b3次
     *              匹配    a,b3次 b 这个时候是b{1,3}的3次， 下一个字符要去匹配b 但是匹配的是c 挂了 回溯              
     *              匹配    a,b2次 下一个字符 b对上了 然后下一个规则b 对应c 挂了 回溯  
     *              匹配    a,b1次 下一个字符 b对上了 然后下一个字符b 对上了 然后下一个字符c对上了 匹配成功
     * 
     *      常见的回溯形式
     *          本质深度优先搜索算法
     *          回溯产生情况有哪些
     *              贪婪量词
     *                  多个贪婪量词同时存在 先下手为强 
     *                  b{1,3} 贪婪量词 从多往少匹配
     *                  匹配3个b 失败 --> 回溯
     *                  匹配2个b 失败 --> 回溯
     *                  匹配1个b 成功
     *              惰性量词
     *                  贪婪量词后面加一个? 表示尽可能少的匹配 同贪婪量词一样存在回溯
     *                  '12345'
     *                  /\d{1,3}?\d{1,3}/   匹配 1234  1  和 234
     *                  /^\d{1,3}?\d{1,3}$/ 匹配 12345 12 和 345
     *              分支结构
     *                  /^(?:can|candy)$/
     *                  匹配 'candy' 会 先匹配can然后看是否是尾位置 发现不是 有一个字符串d 然后回溯
     *                                  匹配candy 然后发现是尾位置 然后结束
     *          
     *      回溯法 就是试探
     *          贪婪和惰性是相反的过程
     *          分之类似于断点 一步一步来去匹配
     * 
     *     .* 是很影响效率的
    **/
})();
(function () {
    /**
     *   第五章 正则表达式的拆分
     *      结构和操作符
     *          有一大堆操作符在一起就涉及到优先级问题
     *          正则中操作符都体现在结构中， 特殊字符和普通字符所代表的一个个特殊整体
     *          正则中的结构
     *              字符字面量  匹配具体字符，包括不用转义字符和需要转义字符    a --> a   . --> 全部字符  \. --> 真实的点
     *              字符组     匹配一个字符，可以是多种可能之一              [0-9] --> 一个数字  [^0-9] --> 非0到9
     *              量词       表示一个字符连续出现n次                     {1,3} --> 1～3次  ? --> 0~1次
     *              锚         匹配位置，而不是字符                       ^ $ \b \B (?=) (?!=)
     *              分组       用括号表示一个整体                          (ab)+ --> 表示ab连续出现一次或多次
     *              分支结构    多个子表达式多选一                          abc|bcd --> 匹配abc 或 bcd子串
     *              反向引用    表示引用第几个分组                          \2 表示引用第二个分组 如果分组不存在，表示匹配\2，而不是2的转义
     * 
     *          操作符描述              操作符                        优先级 
     *          转义符                   \                            5
     *          括号和方括号            () [] (?=)                     4
     *          量词限定符              {3} ? * +                      3
     *          位置和序列              ^ $ \元字符 一般字符             2
     *          管道符                   |                            1 
     *      注意要点
     *          匹配字符串整体问题
     *              匹配 abc或者bcd
     *              正确的正则  /^(?:abc|bcd)$/ 以 abc或者bcd中的一个 开头和结尾
     *              错误的正则  /^abc|bcd$/  匹配以abc开头 或 bcd结尾的字符(因为管道符|的优先级最低，所以^abc 和 bcd$被分为两个整体)
     *          量词连缀问题
     *              匹配 abc字符任选其一，字符串的长度是3的倍数
     *              正确的正则  /(?:[abc]{3})+/ 
     *              错误的正则  /[abc]{3}+/  语法错误
     *          元字符转义问题
     *              所有元字符 ^, $, ., ?, *, +, |, \, /, (, ), [, ], {, }, =, !, :, -
     *              加 \ 转义 其他不确定的可以使用\转义
     *      案例分析
     *          身份证
     *              /^(\d{15}|\d{17}[\dxX])$/
    **/
})();
(function () {
    /**
     *  第六章 正则表达式的构建
     *      平衡法则
     *          匹配预期的字符串
     *          不匹配非预期的字符串
     *          可读性和可维护性
     *          效率
     *      构建正则前提
     *          是否能使用正则
     *              正则很强大，但是不是银弹
     *              正则不能匹配 10100100010000100...这种有规律的字符
     *          是否有必要使用正则
     *              有些方法可以代替正则  indexOf split
     *          是否有必要构建一个复杂的正则
     *              密码长度 6-12 位，数字、小写字符和大写字母组成，但必须至少包括 2 种字符
     *              可以拆成小的正则来做，没有必要做一个麻烦的正则
     *      准确性
     *          正则可以分规则写不同正则 最后合并同类项
     *      效率
     *          正则表达式运行分如下几个阶段
     *              编译
     *              设定起始位置
     *              尝试匹配    
     *              匹配失败的话，从下一位开始继续第三步
     *              最终结果，匹配成功或失败
     *          
     *          使用具体字符组来代替通配符，取消回溯
     *          使用非捕获分组
     *          独立出确定字符
     *              /a+/ 可以改写成 /aa+/后者比前者多确定了字符a,加快判断是否匹配失败，进而加快移位的速度
     *          提取分支公共部分 可以减少匹配过程中的重复
     *              /^abc|^def/ 修改成 /^(?:abc|def)/
     *              /this|that/ 修改成 /th(?:is|at)/ 
     *          减少分支数量 缩小他们的范围
     *              /red|read/ 修改成 /rea?d/
     *              
    **/
    (function () {
        // 正则 密码长度 6-12 位，数字、小写字符和大写字母组成，但必须至少包括 2 种字符
        // 将问题变成一个取反的问题处理 就很简单
        function checkPassWord(string) {

            // 一个集合 ABC 组合方式 A，B，C，AB，AC，BC，ABC
            // 除了 A,B,C 就是AB,AC,BC,ABC

            const regex1 = /^[0-9a-zA-Z]{6,12}$/; // 长度6~12的数字 字母 大写字母
            regex2 = /^[0-9]{6,12}$/,
                regex3 = /^[A-Z]{6,12}$/,
                regex4 = /^[a-z]{6,12}$/;

            if (!regex1.test(string)) return false;
            if (regex2.test(string)) return false;
            if (regex3.test(string)) return false;
            if (regex4.test(string)) return false;
            return true;
        }
    })();
})();
(function () {
    /**
     *  第七章 正则表达式编程
     *      构造函数写正则 传入的字符串\需要反斜杠转移 '\\d' -表示-> \d
     *      正则实例上source属性 动态创建正则时候可以看到new之后的正则
     *      正则表达式的四种操作
     *          正则主要做的工作就是匹配字符串或匹配位置 都是匹配
     *          有了匹配才有  
     *              验证 String.prototype.search
     *              切分 String.prototype.split
     *              提取 String.prototype.match
     *              替换 String.prototype.replace
     *          字符串方法(参数是正则)
     *              参数是正则 字符串会被new RegExp转成正则
     *                  search()
     *                  match()
     *                      使用g标志，则将返回一个完成匹配结果，但不会返回捕获组
     *                      不适用g标志，返回结果同exec() 不同与exec(), 不会记录lastIndex
     *              
     *              参数是字符串或者正则
     *                  replace() 第二个参数可以是字符串/函数
     *                      第二个参数是字符串时
     *                          $1,$2,...,$99 表示分组捕获匹配到的第n个文本
     *                          $& 匹配到的子串文本
     *                          $` 匹配到的子串的左边文本
     *                          $' 匹配到的子串的右边文本
     *                      第二个参数是函数时
     *                          function(match, $1, $2, index, input) {}
     *                          match 匹配字符串
     *                          $1,$2 分组捕获文本
     *                          index 开始索引
     *                          input 原文本
     *                      
     *                  split(separator, limit) 参数可以是字符串 也可以是正则 第二个参数limit 返回数值的长度
     *                      '2019-10-10'.split(/\D/g) // 也可以使用 '-'
     *                      使用正则分组会返回分组内容
     *                          var string = "html,css,javascript";
     *                          string.split(/(,)/) // ["html", ",", "css", ",", "javascript"]
     *          正则方法
     *              test() 受g标识符影响
     *                  
     *              re.exec()
     *                  匹配结果[匹配字符串, 匹配分组, 匹配分组, ..., 匹配到字符基于零的索引, 原始字符串]
     *                  受g标识符影响 
     *                      有g标识符正则会自动更新lastIndex(下次匹配位置)
     *                      没有g标识符 lastIndex每次都是0
     *                  
     *      相关API注意要点
     *          
     *      真实案例
     *          
     * 
    **/

    var re = /quick\s(brown).+?(jumps)/ig;
    var str = 'The Quick Brown Fox Jumps Over The Lazy Dog';
    var result = re.exec(str);
    //  result === ["Quick Brown Fox Jumps", "Brown", "Jumps", index: 4, input: "The Quick Brown Fox Jumps Over The Lazy Dog", groups: undefined
    // re 更新lastIndex

    str.match(re);
    // 使用g标识 返回结果同exec()
    // 不使用g标识 ['Quick Brown Fox Jumps'] 返回所有匹配元素

    var string = "2017.06.27";
    var re1 = /\b(\d+)\b/;
    var re2 = /\b(\d+)\b/g;

    string.match(re1) // ['2017', '2017', index: 0, input: '2017.06.27'] 同re1.exec(string) 
    string.match(re2) // ['2017', '06', '27']

    re2.exec(string) // ['2017', '2017', index: 0, input: '2017.06.27']
    re2.exec(string) // ['06', '06', index: 5, input: '2017.06.27']
    re2.exec(string) // ['27', '27', index: 8, input: '2017.06.27']


    // test()方法受到g标识影响
    var re1 = /a/;
    var re2 = /a/g;
    var str = 'abababc';

    re1.test(str); // true lastIndex: 0
    re1.test(str); // true lastIndex: 0

    re2.test(str); // true lastIndex: 1
    re2.test(str); // true lastIndex: 3
    re2.test(str); // true lastIndex: 0
    re2.test(str); // false lastIndex: 0


    // 优秀的replace(, string) 
    var str = '2,3,5'
    // 变成 5 = 2 + 3
    str.replace(/(\d)\D(\d)\D(\d)/g, '$3 = $1 + $2')

    // 变成 '222,333,555'
    str.replace(/(\d)/g, '$&$&$&')

    // '2+3=5' 变成 "2+3=2+3=5=5"
    str.replace(/=/g, '$&$`$&$\'$&')

    function getElementsByClassName(className) {
        var elements = document.querySelector('*');
        // /(^|\s*)className(\s*|$)/
        var regex = new RegExp('(^|\\s*)' + className +'(\\s*|$)');
        var list = []
        elements.forEach(item => {
            if(item.className.test(regex)) {
                list.push(item);
            }
        })
        return list;
    }

    // 'a=1&b=2&a=3&b=4' ----> 'a=1,3&b=2,4'
    // 如果对URI参数做编解码 需要加encodeURIComponent
    function compress(source) {
        var obj = {};
        source.replace(/([^&=]+)=([^&]+)/g, function(match, key, value) {
            var ss = obj[key];
            obj[key] = (ss ? ss + ',' : '') + value;
        });
        var result = [];
        for(var k in obj) {
            result.push(k + '=' + obj[k])
        }
        return result.join('&')
    }
})();