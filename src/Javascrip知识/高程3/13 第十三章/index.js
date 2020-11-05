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
 *              默认冒泡阶段处理事件程序
 *              addEventListener(type, listener, useCapture)
 *                  type        处理的事件名 click load
 *                  listener    绑定的事件处理程序的函数 this指向当前绑定事件的节点
 *                  useCapture  true 捕获阶段触发事件处理程序 false 冒泡阶段触发事件处理程序
 *              removeEventListener()
 *                 移除的事件处理程序函数需要同绑定的函数是同一个引用
 *                 匿名函数表达式不能被移除（new Function）
 *          IE事件处理程序
 *              冒泡阶段处理事件程序
 *              attachEvent(type, listener)
 *                  type        事件处理程序名 onclick onload （有区别）
 *                  listener    绑定的事件处理程序的函数 this指向window 
 *              detachEvent(type, listener)
 *                  移除的事件处理程序函数需要同绑定的函数是同一个引用
 *                  匿名函数表达式不能被移除（new Function）
 *          跨浏览器的事件处理程序
 *              见demo1代码
 *      事件对象
 *          触发dom上的某个事件时，会产生一个事件对象event，包含与事件有关的信息
 *          DOM中的事件对象(event)
 *              事件对象的属性、方法
 *                  target              Element     只读    触发事件的目标元素
 *                  currentTarget       Element     只读    事件处理程序当前正在处理事件的那个元素(绑定事件处理函数的元素节点)
 *                  bubbles             Boolean     只读    事件是否冒泡
 *                  cancelable          Boolean     只读    是否可以取消事件的默认程序
 *                  preventDefaut()     Function    只读    取消事件的默认行为 cancelable为true可以使用
 *                  defaultPrevented    Boolean     只读    true 表示已经调用了preventDefaut()
 *                  detail              Integet     只读    与事件相关的细节信息
 *                  eventPhase          Integet     只读    调用事件处理程序的阶段 1 捕获 2 目标阶段 3 冒泡阶段
 *                  stopPropagation()   Function    只读    取消事件的进一步捕获或者冒泡。如果bubbles是true可以使用
 *                  stopImmediatePropagation        只读    取消事件的进一步捕获或者冒泡。同时阻止任何事件处理程序被调用
 *                  trusted             Boolean     只读    true 事件是浏览器生成的 false 事件是开发人员通过JS注册的
 *                  type                String      只读    被触发的事件类型
 *                  view                AbstractView只读    与事件关联的抽象视图。等同于发生事件的window对象
 *          IE中的事件对象
 *              DOM0级添加事件处理程序
 *                  dom.oncilck = function(){}
 *                  event绑定在window上
 *              DOM2级事件处理程序
 *                  event当做参数传到事件处理函数中
 *              事件对象的属性、方法
 *                  cancelBubble        Boolean     只读    同DOM中 stopPropagation
 *                  returnValue         Boolean     只读    同preventDefault() 默认是true 不取消默认事件 false 取消默认事件
 *                  srcElement          Element     只读    同DOM中target
 *                  type                String      只读    被触发的事件类型
 *      事件类型
 *          DOM3级事件规定以下事件
 *              UI事件         （user Interface 用户界面）当用户与页面上的元素交互时触发
 *              焦点事件        当用户获得、失去焦点时触发
 *              鼠标事件        通过鼠标在页面上执行操作时触发
 *              滚轮事件        使用鼠标滚轮时触发
 *              文本事件        在文档中输入文本时触发
 *              键盘事件        用户通过键盘触发事件
 *              合成事件        当为IME(input Method Editor输入法编辑器)输入字符时触发
 *              变动事件        当底层DOM结构发生变化时触发
 *  
**/
(function() {
    // demo1 跨浏览器的事件处理程序
    var EventUtil = {
        addHandler: function(ele, type, handler) {
            if(ele.addEventListener) {
                ele.addEventListener(type, handler, false)
            }else if(ele.attachEvent) {
                ele.attachEvent('on' + type, handler)
            }else{
                ele['on' + type] = handler
            }
        },
        removeHandler: function(ele, type, handler) {
            if(ele.addEventListener) {
                ele.removeEventListener(type, handler, false)
            }else if(ele.attachEvent) {
                ele.detachEvent('on' + type, handler)
            }else{
                ele['on' + type] = null
            }
        }
    }
})()