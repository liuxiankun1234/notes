/**
 *  第十一章 DOM扩展
 *      选择符API
 *          querySelector
 *              接收一个css选择符
 *              返回匹配的第一个元素
 *              未匹配返回null
 *          querySelectorAll
 *              返回一个NodeList
 *          matchesSelector(selectDescriptor)
 *              调用元素与选择符(selectDescriptor)匹配返回true, 否则返回false
 *      元素遍历
 *          DOM新增5个属性
 *              childElementCount
 *                  返回子元素(不包含文本节点、注释节点)个数
 *              firstElementChild
 *                  返回第一个子元素 firstChild元素版本
 *              lastElementChild
 *                  返回最后一个子元素 lastChild元素版本
 *              previousElementSibling
 *                  前一个同辈元素 previousSibling元素版本
 *              nextElementSibling
 *                  下一个同辈元素 nextSibling元素版本
 *      HTML5
 *          与类相关的扩展
 *              element.getElementbyClassName(className)
 *                  className 一个多个类名的字符串 类名不分顺序
 *                  返回指定的NodeList
 *              classList属性
 *                  返回一个DOMTokenList 
 *                  支持方法 可以不使用className进行字符串操作了
 *                      add(className)
 *                      remove(className)
 *                      remove(className)
 *                      toggle(className)
 *          焦点管理
 *          HTMLDocument的变化
 *              document.readyState属性
 *                  属性值
 *                      loading     正在加载文档
 *                      complete    已经加载完文档
 *              兼容模式
 *                  document.compatMode属性
 *                      标准模式    CSS1Compat
 *                      混杂模式    BackCompat
 *              head属性
 *                  document.head === document.getElementByTagName('head')[0]
 *          字符集属性
 *              document.charset
 *                 'UTF-8'、'UTF-16'
 *              document.defaultCharset
 *                  默认浏览器及操作系统
 *          自定义数据属性（data-属性）
 *              可以通过dataset访问、设置自定义属性值
 *              也可以通过setAttribute、getAttribute访问、设置自定义属性值
 *          插入标记
 *              innerHTML属性(可读写)
 *                  返回/重写调用它的元素的所有子节点
 *                  通过innerHTML插入script脚本不会被执行
 *                  IE8及以前版本是唯一可以执行的浏览器，必须 满足下条件
 *                      script元素设置defer属性
 *                      script元素必须位于'有作用域的元素'之后
 *                          无作用域元素(页面看不到的元素)
 *                              script、style、注释元素
 *              outerHTML
 *                  返回/重写调用它的元素及其所有子节点的HTML标签
 *              insertAdjacentHTML()方法
 *                         
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
**/             