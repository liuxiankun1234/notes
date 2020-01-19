(function() {
    /**
     *  Array.isArray 与 arr instanceof Array 区别
     *      创建一个iframes 会创建一个新的window对象及其Array对象 所以instanceof检测必须是当前window才生效 
     *      Array.isArray 能检测iframes里的数组
     *      instanceof 不能检测内嵌iframes数组
     *  数组
     *      参数
     *          new Array(element)
     *          element: 值为非单一数字时，数组的初始化值
     *          element: 值为一个数字时，是数组的初始化长度 length区间范围(0 ~ Math.pow(2, 32) - 1)
     *      访问数组元素
     *          arr[n]
     *          arr[arr.length - 1]    
     *          arr.length = 3; 如果数组的元素最开始大于3,则会截断数组， 最开始小于3，会创建空的值默认用undefined填充
     *      
     *      数组方法
     *          会修改自身值的方法
     *              pop()       删除数组最后一项元素 返回值是删除的值
     *              push()      添加一项元素 返回值数组的长度
     *              shift()     删除数组的第一项 返回值是删除的值
     *              unshift()   数组的开头添加一项元素 返回值数组的长度
     *              reverse()   颠倒数组的中元素的排位 
     *              sort()      对数组进行排序并且返回该数组
     *              splice(start, deleteCount, item1, item2 ...)
     *                  修改原数组的长度，返回值是删除的数组
     *     
     *                  start 从那里开始删除
     *                  deleteCount 删除的长度是多少
     *                  item1。。。 可以替换的元素是啥
     *          
     *          访问方法 不会修改原数组值，只会返回一个新数组或者期望值
     *              concat()        引用类型会是浅拷贝 参数可以是数组，...args
     *              join()          将数组变成一个字符串
     *              includes(valueToFind, fromIndex)  
     *                  是否包含某个值，返回一个Boolean值   
     *                  对象数组不能使用includes检查 
     *                  valueToFind 所检查的值
     *                  fromIndex 从哪个索引开始检查 负数的话length-fromIndex 默认为0 大于等于数组的长度 返回false
     *                  [1, 2, NaN].includes(NaN) // true
     *              slice(start, end)         
     *                  抽取出数组中的一段元素组合成新的数组 [start, end) 包含start，不包含end 
     *                  start 默认为0 end 默认数组的长度
     *                  slice可以讲类数组转换为数组 Array.prototype.slice.call({0: 1, 1: 2, length: 2})
     * 
     *              indexOf()       返回数组中第一个与指定值相等的元素的索引，找不到返回-1 支持可选参数fromIndex 从哪个索引开始搜索
     *              lastIndexOf()   返回数组中最后一个与指定值相等的元素的索引，找不到返回-1 支持可选参数fromIndex 从哪个索引开始搜索
     *              toString()      返回一个由所有数组元素组合成本地化的字符串 屏蔽了原型链上的Object.prototype.toString()方法
     *             
     *          迭代方法    不要在迭代中对原数组进行任何修改 
     *              forEach()       循环忽略空项
     *              map()
     *              every()
     *              some()
     *              filter()
     *              reduce()
     *              reduceRight()
     *              keys()
     *              find()          返回数组中满足测试函数的第一个元素的值
     *              findIndex()
     *              values()
     *                  
     *              
     *      
     *      删除数组某一个元素 arr.splice(pos, length)
     *      delete arr[pos] 不会改变数组长度 是pos项为undefined
     *      
     *      
    **/
   var iframe = document.createElement('iframe');
   document.body.appendChild(iframe);
   var win = window.frames[window.frames.length-1] // 返回一个window对象
   xArray = win.Array;
   var arr = new xArray(1,2,3); // [1,2,3]
   
   // Correctly checking for Array
   Array.isArray(arr);  // true
   // Considered harmful, because doesn't work though iframes
   arr instanceof Array; // false
   console.log(arr instanceof xArray, arr instanceof Array)
})();