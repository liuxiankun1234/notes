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
 *      正则表达式是匹配模式，要么匹配字符，要么匹配位置
 * 
 * 
**/
(function(){
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
     *      字符组
     *          虽然叫字符组，最终匹配的是组内的一个字符
     *          
     *          范围表示法
     *              [a-z] 英文字母 a到z中的任意一个字符
     *              [a\-z] a-z三个字符中的任意一个字符
     * 
     *          排除字符组
     *              [^abc] 除了abc之外的任意一个字符
     *      量词
     *          重复
     *              {m,} 至少m次
     *              {m} m次
     *              ？ * +
     *          贪婪匹配和非贪婪匹配
     *              正则是尽可能多的匹配字符
     *              量词后面加 ?  表示非贪婪匹配 尽可能少的匹配字符
     *      多选分之     
     *          用管道符 | 分割     (p1|p2|p3)    p1 p2 p3 任选其一
     *      
     *          
     *      正则题
     *          1 匹配 '<div id="container" class="main"></div>' 的 id
     *              /id=".+"/ 会匹配 到 id="container" class="main" 贪婪匹配 --> 回溯 --> 找到最后对应的" 结束
     *              /id=".+?"/ 会匹配 到 id="container"  非贪婪匹配 直接找到
     *              /id="[^"]+"/ 会匹配 到 id="container" 条件限制
     * 
    **/
    var str = '<div id="container" class="main"></div>';
    str.match(/id=".+"/);
    str.match(/id=".+?"/);
    str.match(/id="[^"]+"/);
})();
(function() {
    /**
     *  第二章 正则表达式位置匹配攻略
     *  
     *  什么是位置(锚)
     *      位置是相邻字符之间的位置 把位置理解为空字符串更好理解位置
     *  如何匹配位置呢          
     *      es5中有六个锚 ^ $ \b \B (?=a) (?!=b)
     *          
     * 
    **/

    var str = 'this\nis\ngood\nboy'
    // 说明g只能约束到当前行的全部 
    str.replace(/^/g, 'A') // Athis\nis\ngood\nboy
    // m可以约束匹配单行 还是多行 但是A只被替换一次 因为没有全局替换
    str.replace(/^/m, 'A') // Athis\nis\ngood\nboy
    // mg同时使用可以 全部替换
    str.replace(/^/m, 'A') // Athis\nAis\nAgood\nAboy



    // \b 替换所有的\w边界为A
    '1-0_1'.replace(/\b/g, 'A'); // 'A1A-A0_1A'




    // 数字 大小写字母 6～12位
    var reg = /^[a-zA-Z0-9]$/;
    // 数字 大小写字母 6～12位 至少要有数字
    // 正则的意思 是 首位置 后面要跟着有数字
    var reg = /(?=.*[0-9])^[a-zA-Z0-9]$/
})();
(function() {
    /**
     *  第三章 正则表达式括号的作用 
     *      括号提供了分组，便于我们引用他们
     *  
     *      分组和分支结构
     *          分组  /(ab)+/    将ab划分为一个组
     *          分之结构 (p1|p2)  p1或p2规则中的一个
     *      分组引用
     *          /^\d{4}(\.|\/|-)\d{2}\1\d{2}$/
     *          括号嵌套时候 按照左边括号为计算依据
     *          反向引用 \10 表示第十个引用 (?:\1)0 或者 \1(?:0) 表示第一个引用 
     *          引用不存在的分组会怎样？ \3 表示就是 \3 而不是对3的转译
     *          分组之后有量词的话，分组最终会捕获到的数据是最后一次的匹配 对应的引用也是最后捕获的值
     *      非捕获型分组
     *          (?:) 表示非捕获型分组 不会被引用  
     * 
    **/

    // \1表示最后一次捕获到的数字 5
    const reg1 = /(\d)+ \1/; 
    reg.test('12345 5'); // true
    reg.test('12345 1'); // false

    // 模拟trim实现
    function trim(str) {
        // 以空格开头 或者以空格结尾 的空格都被替换为 ''
        return str.replace(/^\s*|\s*$/g, '')
    }

    // 将每个单词的首字母转换为大写
    function normalize(str) {
        return str.toLowerCase().replace(/(?:^|\s+)\w/g, function(match) {
            return match.toUpperCase();
        })
    }

    // 驼峰化  'webkit-linear-gradient' ---> 'webkitLinearGradient'
    function camelize(str) {
        return str.replace(/[-\s]+(\w)/g, function(a, match) {
            return match ? match.toUpperCase() : '';
        })
    }

    // HTML转译和反转译
    function escapeHTML(html) {
        const escapeHTML = {
            '>': 'gt',
            '<': 'lt',
            '"': 'quot',
            '&': 'amp',
            '\'': '#39'// 单引号
        }
        return html.replace(new RegExp('[' + Object.keys(escapeHTML).join('') + ']', 'g'), function(match) {
            return `&${escapeHTML[match]};`
        });
    }
    // HTML反转译
    function unescapeHTML(html) {
        const htmlEntities = {
            nbsp: ' ',
            lt: '<',
            gt: '>',
            quot: '"',
            amp: '&',
            apos: '\''
        }

        return html.replace(/&x([^;]+);/g, function(match, key) {
            console.log(match, key);
            // if(htmlEntities[key]){} 不能用这个 因为htmlEntities[key] 为falsy就挂了
            if(key in htmlEntities){
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
     *              <(.+)> 点加号 会贪婪匹配 到最后一个匹配结果，然后回溯
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

        // 42毫秒
        reg3.test(testStr);
    }
    end = +new Date();

    console.log(end - start);

})();
(function() {
    /**
     *  第四章 正则表达式回溯法原理
     *      没有回溯的匹配  
     *          /ab{1,3}c/ 匹配abbbc时候不会回溯
     *          
     *      有回溯的匹配
     *          /ab{1,3}c/ 匹配abbc时候会有回溯
     *          当匹配到 abb之后 再匹配c时候, 正则表示下一个字符应该是个b但是发现的是c，所以b就匹配完了 就取匹配下一个字符c了
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
     *          贪婪量词
     *              b{1,3} 贪婪量词 从多往少匹配
     *              匹配3个b 失败 --> 回溯
     *              匹配2个b 失败 --> 回溯
     *              匹配1个b 成功
     *          惰性量词
     *              贪婪量词后面加一个? 表示尽可能少的匹配
     *              '12345'
     *              /\d{1,3}?\d{1,3}/   匹配 1234  1  和 234
     *              /^\d{1,3}?\d{1,3}$/ 匹配 12345 12 和 345
     *          分支结构
     *              /^(?:can|candy)$/
     *              匹配 'candy' 会 先匹配can然后看是否是尾位置 发现不是 有一个字符串d 然后回溯
     *                              匹配candy 然后发现是尾位置 然后结束
     *      
     *      回溯法 就是试探
     *          贪婪和惰性是相反的过程
     *          分之类似于断点 一步一步来去匹配
     * 
     *     .* 是很影响效率的
    **/
})();
(function() {
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
     *              选择分支    多个子表达式多选一                          abc|bcd --> 匹配abc 或 bcd子串
     *              反向引用    表示引用第几个分组                          \2 表示引用第二个分组 如果分组不存在，表示匹配\2，而不是2的转义
     * 
     *          操作符描述              操作符                        优先级 
     *          转义符                   \                            1
     *          括号和方括号            () [] (?=)                     2
     *          量词限定符              {3} ? * +                      3
     *          位置和序列              ^ $ \元字符 一般字符             4
     *          管道符                   |                            5  
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
(function() {
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
     *          
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
    (function() {  
        // 正则 密码长度 6-12 位，数字、小写字符和大写字母组成，但必须至少包括 2 种字符
        // 将问题变成一个取反的问题处理 就很简单
        function checkPassWord(string) {

            // 一个集合 ABC 组合方式 A，B，C，AB，AC，BC，ABC
            // 除了 A,B,C 就是AB,AC,BC,ABC

            const regex1 = /^[0-9a-zA-Z]{6,12}$/;
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
(function() {
    /**
     *  第七章 正则表达式编程
     *      正则表达式的四种操作
     *          正则主要做的工作就是匹配字符串或匹配位置 都是匹配
     *          有了匹配才有  
     *              验证 String.prototype.search
     *              切分 String.prototype.split
     *              提取 String.prototype.match
     *              替换 String.prototype.replace
     *      相关API注意要点
     *          
     *      真实案例
     *          
    **/
})();