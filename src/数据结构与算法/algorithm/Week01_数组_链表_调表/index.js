;(function() {
    /**
     *  待看内容
     *      链表调表的实现
     * 
     *  时间复杂度和空间复杂度
     *
     *  如何提高算法的时间复杂度？
     *      升维 一维数组变二维数组
     *      空间换时间
     *  
     *  如何衡量算法的效率？
     *      通常是用资源，CPU(时间)占用、内存占用、硬盘占用、网络占用等
     *      大O一般考虑的是CPU(时间)占用
     *      通常说的算法是最差情况下运行开销
     *  大O表示法
     *      O(1)                常数的
     *      O(log(n))           对数的
     *      O(n)                线性的
     *      O(n²)               二次的
     *      O(n^k)              n的k次方
     *      O(k^n)              指数的 Factorial阶层的
     *  理解大O表示法
     *      O(1)    
     *          运行函数 increment(1) ，执行时间等于X，再用不同的参数运行一次，执行时间依然是X
     *          运行时间与参数无关的函数 时间复杂度为O(1)
     *      O(n)
     *          运行函数 sequentialSearch(array, item) 
     *          最好情况 item 位于array的第0位 返回0 开销是1
     *          最坏情况 item 不存在于array中 返回-1 开销是数组的长度
     *          最坏情况 数组大小是多少 开销就是多少 可以得出 sequentialSearch 函数的时间复杂度为O(n)  n是输入的大小
     *      O(n²)
     *          二层数组的嵌套就会造成O(n²)的时间复杂度
     *      O(n^k)
     *          k层数组的嵌套就会造成O(n^k)的时间复杂度
     *      O(logn)
     *          函数 binary 运行的开销就是 O(logn)
     *      O(k^n)
     *          待补充：斐波拉契递归
    **/

    function increment(num){
        return ++num;
    }

    function sequentialSearch(array, item) {
        for (let i = 0; i < array.length; i++) {
            if (item === array[i]) {
                return i;
            }
        }
        return -1;
    }
    function binary(num) {
        for (let i = 0; i < num; i *= 2) {
            console.log(i);
        }
    }

    /**
     *  数组
     *      计算机在内存中申请了一串连续的地址，可以通过内存管理器进行访问
     *      数组的访问时间复杂度为O(1) 可以直接通过索引
     *      插入和删除操作时间复杂度为O(n)，因为会影响后续的元素位置更新
     * 
     *      为什么数组的索引是从零开始的？
     *          索引表示偏移，如果a来表示数组的首地址，a[0]表示方位偏移为0的内存地址所在的元素
     *      
     *      
     *  数组prepend操作正常是O(n)的时间复杂度，不过可以在初始化时候申请稍大一点的内存空间，然后在数组最开始预留一部分空间，prepend操作则把头下标往前挪一个位置即可
    **/
})()

