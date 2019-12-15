/**
 *  未看部分？
 *      正则
 * 
 *  第二章 字符串和正则表达式
 *  UTF-16码位
 *      Unicode的目标是为全世界每一个字符提供全球唯一的标识符，我们把字符长度限制在16位，码位数量不足以表示如此多的字符
 *      
 *      码位：全球唯一的标识符，从0开始的数值
 *      字符编码：表示字符的这些数值或者码位
 *      字符编码必需将码位编码位内部一致的编码单元
 *      
 * 
 * 
 * 
 * 
**/
(function() {
    console.log('******************  1  ******************');
    /**
     *      字符串中子串识别
     *          includes 如果在字符串中检测到指定的文本则返回true，否则返回false
     *          startsWith  如果在字符串的开始位置检测到指定文本则返回true，否则返回false
     *          endsWith    如果在字符串的结束位置检测到指定文本则返回true，否则返回false
     * 
     *          这三个方法都接受两个参数 
     *              第一个是要检索的文本
     *              第二个是 可选 指定一个开始搜索的位置的索引值
     * 
     * 
     *      repeat()方法
     *          
    **/

    //
    let msg = 'hello world!'
    console.log(
        msg.includes('ello worl'), // true
        msg.startsWith('ell', 1), // true 从第一个字符检索 返回true
        msg.endsWith('world') // false 必需以world!结尾才返回true
    )
    console.log( msg.endsWith('h', 1) ); // 从第一位开始往前查找 结果返回为true

    
    console.log('x'.repeat(3)); // 'xxx'
    
})();
(function(){
    console.log('******************  2  ******************');
    /**
     *      模板字面量
     *         `` 如果想使用`可以使用转义符 \`
     *      多行字符串
     *          行尾加 \
     *      变量占位 ${}
    **/
    console.log(
        `A\
         B\
         C\n\
         D
        `
    );
    
})();