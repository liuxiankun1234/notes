import ERR_OK from './test_01'
import * as all from './test_01';

import { PROMISE_ID } from './test_01'


console.log(`PROMISE_ID-----------> ${PROMISE_ID}`);
/**
 *      全局作用域命名冲突问题和安全问题 才会有模块化
 * 
 *      用模块封装代码
 *      
 *      什么是模块
 *          是自动运行在严格模式下并且没有办法退出运行的JS代码
 *          与共享一切架构相反的是 在模块顶部创建的变量不会自动被添加到全局共享作用域，这个变量仅仅在模块顶部作用域存在 
 *          而且模块必需导出一部分外部代码可以访问的元素 如变量 函数等 
 *          
 *          模块也可以从其他模块导入绑定
 *          在模块顶部 this的值是undefiend
 *          模块不支持HTML风格的代码注释
 * 
 *          模块的魔力是 仅导出和导入你需要的绑定
 *          
 *      export 和 import必需在其他语句 和 函数之外使用
 *      导出的基本语法
 *          export关键字将变量 函数 类声明暴露给其他模块
 *              export let color = 'red'
 *          因为导出的函数和类声明需要有一个名字 所以代码中的每一个函数 或 类也确实有这个名字 （default除外）
 *          没有使用export关键字导出的变量 只可以在模块内部使用
 * 
 *      导入的基本语法
 *          import关键字 从那个模块导入标识符
 *              import { identifier } from './index.js'
 *          导入绑定的列表不是解构对象
 *          从模块中导入一个绑定时，他就好像使用const定义的一样 无法定义另一个同名变量（包含导入另一个同名变量） 也不放在import之前使用该变量
 *          
 *      导入单个绑定 import { num } from '../index.js'
 *      导入多个绑定 import { num, multiply } from '../index.js'
 *      导入整个模块 将所有都挂在导example对象上 import * as example from '../index.js' 
 *     
 *      不管import语句把一个模块写了多少次 该模块将只执行一次（类似单例模式 实际上是导入代码执行后 实例化过后的模块会被保存在内存中）
 *      不同模块import同一个模块 该模块也仅只执行一次
 * 
 *      导出 和 导入时重命名
 *          export { add as sum } 将add重新命名为sum导出
 *          import { sum as add } 将sum重新命名为add导入
 * 
 *      
 *      模块的默认值
 *          模块的默认值是通过default关键字指定的单个变量 函数 类
 *          只能为模块导出一个默认值 多次使用default关键字报错 
 *      
 *          导出默认值
 *              由于函数被模块所代表 所以可以不需要一个名字
 *              export default function() {}
 *              export default function sum(){}
 *              export { sum as default } 
 * 
 *          导入默认值
 *              import sum from './index.js'
 *              import sum, { add, calc } from './index.js'
 *              import { default as sum, add, calc } from './index.js'
 *          
 *          重新导出一个绑定
 *              import { sum } from './index.js'
 *              export { sum }
 *              
 *              export { sum } from './index.js  ----> 简写
 *              export { sum as add } from './index.js' 将sum从index这个模块引入 作为add标识符导出
 *      
 *          无绑定导入
 *              某些模块没有导入和导出的操作 可能只修改全局作用域中的对象
 *              最有可能应用于 Polyfill 和 Shim（旧环境中模拟API）
 * 
 *          加载模块
 *              在web中使用模块
 *                  在script中通过src来指定一个加载代码的地址
 *                  内嵌script
 *                  web worker 或 server worker 方法加载并执行JS文件
**/
window.a = 2;
delete window.a



console.log(window.a, this)

