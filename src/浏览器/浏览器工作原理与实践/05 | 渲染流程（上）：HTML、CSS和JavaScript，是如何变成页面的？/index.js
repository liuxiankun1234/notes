/**
 *  如果下载 CSS 文件阻塞了，会阻塞 DOM 树的合成吗？会阻塞页面的显示吗？
 *      CSS文件阻塞时，浏览器内可以看到DOM树已经生成，但是不会渲染页面，需要等CSS文件下载完成，生成styleSheets才能生成页面
 *  为什么要将CSS文件尽量放前面？
 *      布局树依赖styleSheets，所以越早下载样式资源越能早看到页面 
 *      
 *  05 | 渲染流程（上）：HTML、CSS和JavaScript，是如何变成页面的？
 *  浏览器渲染步骤
 *      构建DOM树、样式计算、布局阶段、分层、绘制、分块、光栅化和合成
 *      每个阶段都有输入内容 
 *      每个阶段都有其处理过程 
 *      最终每个阶段会生成输出内容
 *  
 *      构建DOM树(树状结构DOM节点)
 *          为什么要构建DOM树呢？
 *              因为浏览器无法直接理解和使用HTML，所以需要将HTML解析成浏览器能够理解的DOM树
 *          DOM树是保存在内存中树状结构，可以通过JS来查询和修改其内容
 *      样式计算(用于计算DOM节点中每个元素的具体样式)
 *          将CSS转换成浏览器能够理解的结构styleSheets（浏览器不能理解和使用CSS）
 *          转换样式表中的属性值，将其标准化
 *              red --> rgba(255, 0, 0)
 *              em  --> px
 *          计算出DOM树中每个节点的具体样式 
 *              计算规则
 *                  CSS继承：每个节点都包含父节点样式
 *                  层叠：定义了如何合并来自多个源的属性值的算法  
 *          CSS来源 外链样式 内联样式 行间样式
 *          浏览器将所有来源的css全部转换成styleSheets结构中的数据并且该结构具备查询和修改功能
 *      布局阶段
 *          计算DOM树的几何位置信息
 *          创建布局树(图 ./i/布局树构造过程示意图.png)
 *              浏览器遍历DOM树种的所有可见节点，并把这些节点添加到布局中
 *              不可见的节点会被布局树忽略，如head标签下全部内容 display:none元素
 *          布局计算
 *              计算布局树的节点的坐标位置
 *              后面讲
 * 
 * 
 * 
 * 
**/