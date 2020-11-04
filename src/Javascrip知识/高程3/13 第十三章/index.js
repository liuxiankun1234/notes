/**
 *  第十三章 事件
 *      事件流
 *          描述从页面中接收事件的顺序
 *          事件冒泡（IE）
 *              事件开始由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到最不具体的节点（文档）
 *              IE5.5及以前版本 事件冒泡会跳过<html>元素
 *              IE9 Firefox Chrome Safari则将事件冒泡至window
 *          事件捕获
 *              事件开始由最不具体的节点更早接收到事件，然后向下传播到最具体的节点接收事件
 *          DOM事件流
 *              DOM2级事件规定事件流包括三个阶段
 *                  事件捕获阶段、处于目标阶段、事件冒泡阶段
 *      事件处理程序
 *          事件是用户或浏览器自身执行的某种动作。例如 click load
 *          响应某个事件的函数就是事件处理程序
 *          HTML事件处理程序
 *              <div onclick="alert('被点击')"></div>    
 *              HTML代码和JS代码耦合度太高 修改的话要同时修改两个地方 不建议使用
 *          DOM0级事件处理程序
 *              document.onclick = function() {alert(1)}
 *              document.onclick = null
 *          DOM2级事件处理程序
 *              addEventListener(type, listener, useCapture)
 *                  type        处理的事件名
 *                  listener    绑定的事件处理程序的函数
 *                  useCapture  true 捕获阶段触发事件处理程序 false 冒泡阶段触发事件处理程序
 *              removeEventListener()
 *                 移除的事件处理程序函数需要同绑定的函数是同一个引用
 *                  匿名函数表达式不可以（new Function）
 *          IE事件处理程序
 *              attachEvent(type, listener)
 *              detachEvent(type, listener)
 *                  
 *              
**/