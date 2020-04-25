/**
 *      解构：使数据访问更 便捷    
 *  
 *      为何使用解构功能
 *          避免同质化代码，简化获取信息的过程
 * 
 *      对象解构
 *          语法 
 *              在一个赋值操作的左侧放置一个对象字面量 
 *              被解构右侧的值 如果是 undefiend null 程序会报错 注意当函数参数不传的时候默认是undefined
 *              如果指定的局部变量名称在对象中不存在 局部变量的值为undefiend(局部变量之前有值的情况 也会被改成undefined)
 *                  demo: let localType = 'localType', { localType } = {}  // localType会被赋值为undefined
 *          使用var let const 解构声明变量必需提供 初始化程序（需要解构的值）     
 *           const 声明必需提供初始化赋值
 *              
 *      解构赋值
 *          规定代码块不能出现在等号的左侧 有时候需要使用分组()变成表达式
 *      嵌套对象解构
 *           let { loc: { end: { line: localLine = 12 } } } = node1
 *            对象解构过程中 loc end 表示对象中检索属性的位置 不会被解构  只有最内层的变量别解构
 * 
 * 
 * 
 * 
 *      注意
 *          结构引用类型值 等同于复制指针 
 *          代码块不可以出现在赋值语句的左侧 {} = node 不可以 ({} = node) 表达式可以
 *          结构值为null/undefined是报错 场景是结构参数，实参传入undefined/null
 * 
**/

(function() {
    console.log('******************  1  ******************');
    /**
     *      为何使用解构功能
     *          避免同质化代码，简化获取信息的过程
     *             
     * 
     *      对象解构
     *          语法 
     *              在一个赋值操作的左侧放置一个对象字面量 
     *              被解构右侧的值 如果是 undefiend null 程序会报错 注意当函数参数不传的时候默认是undefined
     *              如果指定的局部变量名称在对象中不存在 局部变量的值为undefiend(局部变量之前有值的情况 也会被改成undefined)
     *          使用var let const 解构声明变量必需提供 初始化程序（需要解构的值）
     *          const 声明必需提供初始化赋值
     *              
     * 
     *      解构赋值
     *          规定代码块不能出现在等号的左侧 所以解构赋值 需要放在()内变成一个表达式
     *          
     *      默认值
     *      let node = {repeat: true}
     *      let {type = true} = node --> type 走默认值 true
     *  
     *      为非同名局部变量赋值
     *      ({ type: localType = 12} = node)
     *      
     *      如果解构赋值时候 解构的变量 已经有值 但是在解构对象中不存在这个属性 那么这个本地的变量会被赋值为undefiend
     *          let middle = 'middle';
     *          node = { start: 'start', end: 'end'};
     *          ({ middle } = node);
     *          middle属性在 node中不存在 middle被赋值为undefined
     * 
     *          为什么要说呢 是因为在es5中 
     *          var middle = 'middle';
     *          var middle; // 处理引擎会忽略这个变量声明 
     *      
     *          
     *      
    **/
    // 避免同质化代码
    let option = {
        repeat: true,
        save: false
    }
    // es5解构 出现了很多同质化的代码
    // var repeat = option.repeat,
        // save = option.save;
    // es6 对象解构
    // var { repeat, save } = option;

    
    // 解构赋值
    var repeat = '';
    ({ repeat } = option)
    console.log(repeat);
})();

(function() {
    console.log('******************  2  ******************');
    /**
     *      为非同名局部变量赋值
     *          let { type: localType, name: localName = 'default' } = node;
     *          读取名为type的值赋值给本地变量localType
     *          读取名为name的值赋值给本地变量localName,如果localName没有值 使用默认值 'default'
     *  
     *      嵌套对象解构
     *          let { loc: { end: { line: localLine = 12 } } } = node1
     *          对象解构过程中 loc end 表示对象中检索属性的位置 不会被解构  只有最内层的变量被解构
     * 
    **/
    let node = {
        type: 'Identifier',
        name: 'foo'
    }
    let { type: localType, name: localName } = node;


    let node1 = {
        type: 'type',
        name: 'foo',
        loc: {
            start: {
                line: 1
            },
            end: {
                line: undefined
            }
        }
    }

    let { loc: { end: { line: localLine = 12 } } } = node1
    console.log(localLine);
})();

(function() {
    console.log('******************  3  ******************');
    /**
     *      数组解构
     *          如果想只解构第n个索引的值 可以在前面写逗号
     *          通过逗号来区分位置进行结构
    **/
    let colors = [ 'red', 'green', 'blue' ];
    let [ firstColor, , thirdColor ] = colors;
    // 这段代码中 我们从color数组中解构出了 red 和 blue 这两个值 并分别存储在变量 firstColor 和 thirdColor变量中 
    // firstColor --> red     thirdColor --> blue
    
})();

(function() {
    console.log('******************  4  ******************');
    /**
     *      解构赋值
     *          同对象解构赋值 如果被要解构的值 是undefined 那么本地的变量会被赋值为undefined
     *          交换两个变量的值 [a, b] = [b, a] 互换位置
     * 
     *      嵌套数组解构
     * 
     *      不定元素
     *          同函数的不定参数 ...restColors
     *          
    **/
    let colors = [ 'red', 'green', 'blue' ],
        firstColor = 'black',
        thirdColor = 'purple';
    [ firstColor, , , thirdColor ] = colors;

    /**
     *      es5中交换两个变量的值 要添加一个中间变量
     *      es6中 左侧是一个解构模式 右侧是一个为解构创建的一个临时数组字面量 执行过程中
     * 
     * 
    **/
    var a = 'a', b = 'b';
    [a, b] = [b, a]


    // 嵌套数组解构
    let colors1 = [ 'red', ['green', 'blue'] ]
    let firstColor1 = 'black', secondColor1 = 'pink';

    [firstColor1 , [ , , secondColor1 = 'newColor']] = colors1

    /**
     *  不定元素
     *      不定元素必需是数组的最后一个值
     *      restColors 会被解构为一个数组 内部是一个数组 值是['green', 'blue']
     *      应用  克隆数组
     *          es5的数组克隆 var restColors = colors.concat();
     *          es6的数组克隆 var [ ...restColors ] = colors
     *          
     *      
    **/

    let colors2 = [ 'red', ['green', 'blue'] ]
    let [ red, ...restColors ] = colors2;
})();

(function() {
    console.log('******************  5  ******************');
    /**
     *      混合解构
     * 
     * 
    **/
    let node = {
        type: 'Identifier',
        name: 'foo',
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 2,
                column: 4
            }
        },
        range: [0, 6]
    }

    // 想要解构 range的 范围值 + loc的start的line + loc的end + type被修改为本地的变量localType
    let {
        type: localType = 'localType',
        loc: {
            start: {
                line
            },
            end
        },
        range: [ startTime, EndTime ]
    } = node
})();

(function() {
    console.log('******************  6  ******************');

    /**
     *      解构参数
     *          name,value是必需参数 而 secure path domain expires 这些值是没有优先顺序 将他们列为额外的命名参数也不适合   
     *          es5的参数设置为option已经很好了
     *              缺点 必需看函数体才能知道申明的参数 option的含义
     *           
     * 
     * 
    **/

    // 解构参数
    function setCookie(name, value, option) {
        option = option || option
        let secure = option.secure,
            path = option.path,
            domain = option.domain,
            expires = option.expires;
    }
    setCookie('type', 'js', {
        secure: true,
        expires: 6000
    })

    // es6解构
    //  缺点 解构传默认undefined时 报错
    function setCookie(name, value, {secure, path, domain, expires}) {}
    setCookie('type', 'js', {
        secure: true,
        expires: 6000
    });
    // 优化
    function setCookie(name, value, {secure, path, domain, expires} = {}) {
    }
    // 优化
    let setCookieDefault = {
        secure: false,
        path: '/',
        domain: 'example.com',
        expires: new Date( Date.now() + 360000000 )
    }
    function setCookie(name, value, 
        {
            secure = setCookieDefault.secure, 
            path = setCookieDefault.path, 
            domain = setCookieDefault.domain, 
            expires = setCookieDefault.expires
        } = setCookieDefault || {} // 默认值为{}也可以 只不过多了一步计算默认值的情况
    ) {}
})();
