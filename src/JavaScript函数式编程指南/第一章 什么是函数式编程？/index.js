/**
 *  第一章 什么是函数式编程？
 *      未解之谜？
 *           
 * 
 *  函数式编程基于一些基本概念
 *      声明式函数
 *      纯函数
 *      引用透明
 *      不可变性
 * 
 * 
**/
(function(){
    /**
     *  命令式编程式很具体的告诉计算机如何执行某个任务
     *  声明式编程 将程序的描述与求值分离开来，它关注于如何用各种表达来描述程序逻辑，而不一定要指明其控制流程或状态的变化
     * 
     * 
     *  问题区
     *  1 为什么要去掉代码循环？
     *      因为循环是一种重要的命令控制结构，很难复用或插入其他操作中
    **/
    // 1 计算一个数组中所有数的平方
    var arr = [0, 1, 2, 3, 4, 5, 6]

    /**
     *  命令式编程
     *      告诉计算机如何具体的执行这件事
    **/
    for(var i = 0, length = arr.length; i < length; i++){
        arr[i] = Math.pow(arr[i], 2)
    }

    /**
     *  声明式编程 
     *      声明式编程更注重于 描述需求 将求值 与 需求分开
     * 
    **/
    arr.map(num => Math.pow(num, 2))
})();
(function() {
    /**
     *  纯函数具有一下性质
     *      仅取决于提供的输入，而不依赖任何在函数求值期间或者调用间隔时可能变化的隐藏状态
     *      不会造成超出其他作用域的变化，例如修改全局对象或者引用类型的参数
     * 
     * 
    **/
})();