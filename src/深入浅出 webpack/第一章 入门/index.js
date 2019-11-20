void function() {
    /**
     *  前端的发展
     *      模块化
     *          将复杂的系统分解到多个模块以方便开发
     *          模块化之前，开发网页使用命名空间的方式来组织代码，JQ的API都挂载到 window.$上
     *  
     *          命名空间的问题
     *              命名空间名重复，Jquery和zepto的API都挂载到 $上
     *              无法合理的管理项目依赖和版本
     *              无法方便的控制依赖的加载顺序
     * 
     *      CommonJS
     *          核心思想：通过required方法来同步加载依赖的其他模块，通过moudle.exports导出需要暴露的接口    
     *              const moduleA = require('../moduleA');
     *              module.exports = moduleA.someFunc;
     * 
     *          优点
     *              代码可复用在Node.js环境
     *              通过NPM发布的很多模块都依赖于Common.JS规范
     * 
     *          缺点
     *              无法直接运行在浏览器环境，需要通过工具转换成标准的ES5
     * 
     *      AMD
     *          也是JS模块化的规范，与CommonJS最大的不同就是它采用异步的方式去加载依赖的模块
     *          AMD主要解决针对浏览器模块化的问题
     *              // 定义模块
     *              define('module', ['dep'], function() {
     *                  return exports
     *              })
     *              // 导入使用模块
     *              require(['module'], function(module) {});
     *          优点
     *              代码可运行在浏览器环境和Node环境
     *              可以异步加载依赖
     *              可以并行加载多个依赖
     *          缺点
     *              JS运行环境没有原生支持AMD，需要先导入实现了AMD的库才可以使用
     * 
     *      ES6模块化
     *          浏览器和运营商宣布将要支持原生规范 将取代CommonJS 和 AMD
     *          缺点
     *              目前无法直接运行在javascript运行环境下，必须通过工具转译成标准的ES5后才能正常运行
     * 
     *      样式文件的模块化
     *          SCSS的mixin
     * 
     *      新框架
     *          React
     *          Vue             
     *          Angular2
     * 
     *      新语言
     *          ES6
     *              模块化规范
     *              Class语法
     *              箭头函数
     *              async函数
     *              Set 和 Map数据结构
     *          TypeScript
     *          
     *          Flow
     *              静态类型检查
     *          SCSS
    **/
    // 缺少一个require的代码



}();


void function() {
    /**
     *  建议安装webpack到本项目而非全局安装，防止不同项目的版本冲突
     *  
     * 
     *  安装webpack
     *      前提
     *          安装5.0以上版本的Node.js
     *          新建项目 npm install 初始化模块化开发项目
     *  
     *      安装webpack到本项目
     *          安装最新稳定版
     *          npm i -D webpack // 等同于 npm install --save-dev webpack 安装到开发依赖里
     *          
     *          安装指定版本
     *          npm i -D webpack@<version>
     *          
     *          安装最新体验版本
     *          npm i -D webpack@beta
     *      
     *      安装 Webpack 到全局
     *          npm i -g webpack
     *          
     *      webpack在执行构建时默认会从项目根目录下的webpack.config.js文件读取配置表
     *      webpack构建在Node.js环境，所以webpack.config.js文件配置表最后通过CommonJS规范导出一个描述如何构建的Object对象
     * 
    **/
}();

void function() {
    /**
     *  使用Loader
     *      webpack 原生不支持非JS文件（如 css, scss, less文件） 所以需要Loader机制
     *      Loader可以看作是文件转换的翻译员，rules规则负责通知webpack遇到什么类型的文件使用哪些Loader去转换和加载
     *      
     *      Loader传参
     *          URLquerystring
     *              css-loader?minimize
     *          对象方式
     *              {
     *                  loader: 'css-loader',
     *                  options: {
     *                      import: true
     *                  }
     *              }
     *          可以在源码中指定用什么Loader去处理文件
     *              require('style-loader!css-loader?minimize!./main.css');
     * 
     *      注意
     *          use属性的值需要是一个由Loader名称组成的数组，Loader执行顺序由后到前的
     *      
    **/
}();

