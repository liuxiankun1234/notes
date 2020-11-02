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
 *              insertAdjacentHTML(type, element)方法
 *                  type值
 *                      beforebegin 
 *                          在该元素本身的前面
 *                      afterend
 *                          在该元素本身的后面.
 *                      afterbegin
 *                          只在该元素当中, 在该元素第一个子孩子前面
 *                      beforeend
 *                          只在该元素当中, 在该元素最后一个子孩子后面
 *                  element
 *                      必须是dom元素，不能是字符串 
 *                      document.createElement('p') 不能是'<p></p>'
 *              内存与性能问题
 *                  删除dom元素要取消事件程序
 *                  避免频繁赋值、尽量一次性插入       
 *          scrollIntoView(boolean)
 *              调用元素就可以出现在视口中
 *              可以在所有dom上调用，通过滚动浏览器窗口或者某一个容器元素
 *              boolean
 *                  true    调用元素的顶部与视口尽肯能 平齐
 *                  false   调用元素会尽可能全部出现在视口中(可能的化元素底部会与视口顶部平齐)
 *      专有扩展
 *          文档模型
 *          children属性
 *          contains()方法
 *              A.contains(B) A是否包含B
 *              compareDocumentPosition()
 *                  返回值
 *                      1   无关
 *                      2   位于参考节点前
 *                      4   位于参考节点后
 *                      8   包含
 *                      16  被包含
 *          插入文本
 *              innerText属性
 *              outerText属性
 *          滚动 
 *              scrollIntoViewIfNeed(alignCenter)
 *                  用来将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域
 *                  如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动
 *                  alignCenter
 *                      如果为true，则元素将在其所在滚动区的可视区域中居中对齐
 *                      如果为false，则元素将与其所在滚动区的可视区域最近的边缘对齐
 *              scrollByLines(lines)
 *                  将元素内容滚动指定行高
 *                  lines 可正、负
 *              scrollByPages(page)
 *                  将元素内容滚动到指定页面高度
 * 
 * 
 * 
 * 
 * 
**/             