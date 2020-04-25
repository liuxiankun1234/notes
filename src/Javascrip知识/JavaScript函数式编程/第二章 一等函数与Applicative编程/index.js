/**
 *  读到34页，跳到第三章节了
 *  函数式编程
 *      应该是促进创造和使用函数的
 * 
 *      函数式编程还伴随这一些其他定义，包括不限于
 *          静态类型
 *          模式匹配
 *          不变性
 *          纯度
 * 
 *  函数是一等公民
 *      一等公民：函数可以去任何想去的地方，很少有限制
 *      
 *      函数同数字一样可以存储为一个变量
 *      函数同数字一样可以存储为数组的一个元素
 *      函数同数字一样可以作为对象的成员变量
 *      函数同数字一样可以使用时直接创建出来
 *      函数同数字一样可以被传递给另一个函数
 *      函数同数字一样可以被另一个函数返回
 *  
 *      高阶函数
 *          一个高阶函数应该可以执行至少一项操作
 *              以一个函数作为参数
 *              返回一个函数作为结果
 *  
 *      多种JavaScript编程方式
 *          函数式编程
 *          命令式编程
 *          基于原型的面向对象编程
 *          元编程
 * 
 *  Applicative编程
 *      典型例子 map reduce filter
 *      
 *      集合中心编程
 *          
 *  
**/
(function() {
    /**
     *   命令式编程
     *      命令性代码运行在如此细的层面，往往一次性实现或尝试最好的，否则难以再利用
     *      命令式语言通常局限于细节
    **/

    // 命令式编程例子
    var lyrics = [];
    
    for(var bottles = 99; bottles > 0; bottles--){
        lyrics.push(bottles + ' bottles of beer on the wall');
        lyrics.push(bottles + ' bottles of beer');
        lyrics.push('Take one down, pass it around');
        
        if(bottles > 1){
            lyrics.push((bottles - 1) + ' bottles of beer on the wall');
        }else{
            lyrics.push('No more bottles of beer on the wall!')
        }
    }

    // 函数式编程
    function lyricSegment(n){
        return _.chain([])
        .push(n + ' bottles of beer on the wall')
        .push(n + ' bottles of beer')
        .push('Take one down, pass it around')
        .tab(function(lyrics) {
            if(n > 1){
                lyrics.push((n - 1) + ' bottles of beer on the wall');
            }else{
                lyrics.push('No more bottles of beer on the wall!')
            }
        }).value()
    }

    // 元编程
    function Point2D(x, y) {
        this._x = x;
        this._y = y
    }
    function Point3D(x, y, x){
        Point2D.call(this, x, y);
        this._z = z;
    }
})();