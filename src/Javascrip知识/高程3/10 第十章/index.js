/**
 *  第十章 DOM
 *  DOM是针对HTML和XML文档的一个API,描绘了一个层次化的节点数，可以添加、删除、修改页面的一部分 
 *  节点层次
 *      文档节点（document）
 *          是每个文档的根节点
 *          只有一个子节点<html>元素
 *      文档元素
 *          文档的最外层元素，文档中的其他所有元素都包含在文档元素中
 *          每个文档只能有一个文档元素
 *          HTML页面中，文档元素始终都是<html>元素
 *      Node类型
 *          Node接口将DOM中的所有节点类型实现
 *          所有节点类型都继承自Node类型，所有类型共享着相同的基本属性和方法，如下
 *          
 *          nodeType属性
 *              每个节点都有一个nodeType属性，表明节点类型
 *              属性值（IE不支持 建议使用数字进行DOM节点类型判断）
 *                  Node.ELEMENT_NODE(1)
 *                  Node.ATTRIBUTE_NODE(2)
 *                  Node.TEXT_NODE(3)
 *                  Node.CDATA_SECTION_NODE(4)
 *                  Node.ENTITY_REFERENCE_NODE(5)
 *                  Node.ENTITY_NODE(6)
 *                  Node.PROCESSING_INSTRUCTION_NODE(7)
 *                  Node.COMMENT_NODE(8)
 *                  Node.DOCUMENT_NODE(9)
 *                  Node.DOCUMENT_TYPE_NODE(10)
 *                  Node.DOCUMENT_FRAGMENT_NODE(11)
 *                  Node.NOTATION_NODE(12)
 *          nodeName和nodeValue属性
 *          节点关系
 *              各种节点之间的关系可以用家族关系来描述
 *              每个节点都有一个childNodes属性，其中保存着一个NodeLists对象（类数组）  
 *                  NodeLists对象是基于DOM结构动态执行查询的结构（非快照） 
 *                  访问NodeLists对象
 *                      []
 *                      item()
 *              每个节点都有一个parentNode属性，指向文档树中的父节点
 *              包含在childNodes列表中的节点，可以通过 perviousSibling 和 nextSibling 属性访问同一列表中的其他节点
 *              列表中第一个节点的perviousSibling属性值是 null
 *              列表中最后一个节点的nextSibling属性值是 null
 *              父节点的 firstChild 和 lastChild 的值始终等于 childNodes[0] 和 childNodes[childNodes.length - 1]
 *              hasChildNodes() 
 *                  包含一个或多个节点返回ture
 *              ownerDocument
 *                  指向整个文档的文档节点
 *                  这种关系表示任何节点关系都属于他所在的文档，任何节点都不能同时存在两个或者更多文档中
 *          节点操作
 *              appendChild()
 *                  向childNodes列表的末尾添加一个节点，返回新增的节点
 *                  添加节点之后，childNodes的新增节点、父节点及以前的最后一个子节点的关系都会相应的跟新  
 *                  如果appendChild的节点预警时文档中的一部分，结果是将节点从原来的位置移动到新位置
 *              insertBefore(insertNode, compareNode)
 *                  将 insertNode 插入到 compareNode 之前，同时返回insertNode，如果 compareNode 是 null，同appendChild操作相同
 *                  将节点放到childNodes的某一个节点上
 *              replaceChild(insertNode, replaceNode)
 *                  插入的节点替换掉替换节点，同时返回替换节点
 *              removeChild(removeNode)
 *                  移除某个节点，并且返回该节点
 *          其他方法
 *              cloneNode(isDeepClone)
 *                  深拷贝，复制节点及整个子节点树
 *                  浅拷贝，复制jd文本(不包含子节点)
 *                  复制节点需要添加到文档中，才生效
 *      Document类型
 *          JS通过Document类型表示文档 
 *          在浏览器中，document对象是HTMLDocument的一个实例，表示整个HTML页面
 *          document是window的一个属性
 *          文档子节点
 *          文档信息
 *              document.title      
 *                  <title>元素的文本内容
 *              document.URL        
 *                  地址栏的URL (不可写)
 *              document.domain     
 *                  页面域名 (可写)
 *                  p2p.wrox.com这种有子域名可以改写成 wrox.com，改写之后不能往回改
 *                  不能设置url中不包含的渔
 *              document.referrer   
 *                  链接到当前页面的那个页面的url (不可写)
 *          查找元素
 *              getElementById(id)
 *                  未找到返回null
 *                  ID必须严格匹配包括大小写
 *                  多个同名ID,返回第一个配置的DOM
 *              getElementsByTagName(tagName)
 *                  返回一个HTMLCollection[ArrayLike]
 *                  HTMLCollection有一个namedItem方法 返回匹配的name属性相同的元素
 *                  item() 和 []可以匹配对应索引元素
 *      Element元素
 *          html元素
 *              id          元素在文档中的唯一标识符
 *              title       元素的附加说明信息，一般通过工具条显示出来
 *              lang        元素内容的语言代码 很少使用
 *              dir         语言的方向 ltr rtl
 *              className   
 *          取得特性
 *              getAttribute(attr)
 *                  attr值同实际的特性名相同
 *                  getAttribute('class') 非 className  
 *              setAttribute
 *                  设置的属性被转成小写
 *                  div.setAttribute('S_S', 'ss') <div s_s="ss">
 *              removeAttribute 
 *              
 *              自定义属性不能通过DOM对象直接访问(IE除外)
 *              id title class这种可以直接通过DOM访问
 *          attributes属性
 *          创建元素
 *              document.createElement()
 *                  
 *  
**/
