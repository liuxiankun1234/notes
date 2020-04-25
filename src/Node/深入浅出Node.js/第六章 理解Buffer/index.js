/**
 *  疑惑
 *      Buffer内存是在Node的C++层实现内存申请的 在JS中分配的策略？？？？？
 * 
 *  理解buffer
 *  
 *  为什么会有Buffer这种东西？
 *      在node中，需要处理网络协议 数据库操作 处理图片 接收上传文件 在网络流和文件的操作中 还要处理大量二进制数据
 *      JS自有的字符串远远不能满足这些需求 于是Buffer应运而生
 *  
 *  Buffer结构 
 *      像数组的对象 主要用于操作字节
 *      
 *      模块结构
 *          JS和C++结合的模块 性能相关部分用C++实现 非性能部分使用JS实现
 *          Buffer所占用的内存不是V8分配的，属于堆外内存 由于V8垃圾回性能的影响 将常用的操作对象用更高效的内存分配回收策略来管理是一个不错的思路
 *          Buffer挂载在全局对象(global)上 无需require
 *      Buffer对象
 *          类似数组 可以访问 length 通过索引获取元素 元素为16进制的两位数 即0~255的数值
 *          UTF-8编码中 中文字符占用三个元素 英文字符占用一个元素
 *          buffer的元素只支持 0 ~ 255 的值 
 *              对于负数处理 -x + 256 * n 
 *              对于小数处理 Math.floor()
 *              对于大数处理 x - 256 * n
 *      Buffer内存分配
 *          Buffer内存是在Node的C++层(V8的堆外内存)实现内存申请的 在JS中分配的策略
 *              因为处理大量的字节数据不能使用一点内存就向操作系统申请一点内存 这可能造成大量的内存申请的系统调用 堆操作系统有压力
 *          slab(Node内存分配机制)
 *              动态内存管理机制 (广泛用于*nix操作系统)
 *              slab就是一块申请好的固定大小的内存区域 由三种状态
 *                  full    完全分配状态
 *                  partial 部分分配状态
 *                  empty   没有分配状态
 *              每个slab的值大小值是8KB 在JS层面用它作为单位单元进行内存分配
 *              Node以8KB为界限来区分Buffer是大对象还是小对象
 *          
 *          分配小Buffer对象
 *              
 *          分配大Buffer对象
 *             
 *  Buffer的转换
 *      Buffer对象可以与字符串之间相互转换 
 *      支持字符串编码类型
 *          ASCII               仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位
 *          UTF-8               多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8
 *          UTF-16LE/UCS-2      2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）
 *          Base64              Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”
 *          Binary              一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码
 *          Hex                 将每个字节编码成两个十六进制的字符。
 *      字符串转Buffer  
 *          Buffer.from(strig, encoding)
 *      Buffer转字符串
 *          buf.toString(encoding, start, end)
 *      Buffer不支持的编码类型
 *          Buffer.isEncoding(encoding) 用来判读编码类型是否是Node所支持的
 *              true    支持编码
 *              false   不支持编码
 *          Node生态圈中的模块可以帮助转换
 *              iconv
 *              iconv-lite
 *  Buffer的拼接
 *      Buffer在使用场景中 通常是一段一段的方式传输 
 *      data += chunk 隐藏了 data = data.toString() + chunk.toString() 过程
 *      乱码是如何产生的
 *          设置 highWaterMark: 11 会使得buffer的长度是11
 *          buffer在utf-8编码时 中文占三个元素 所以前3个字是没有问题的 后两个元素不能形成文字 所以显示乱码 
 *          任何宽字节字符串都有可能存在被截断的情况 只不过Buffer长度越大出现的概率越低
 *      setEncoding() 和 string_decoder()
 *          设置编码 仅支持 UTF-8 Base64 UCS-2/UTF-16LE
 *          setEncoding()
 *              可读流对象在内部设置了一个decoder对象 每次data事件通过该decoder对象进行Buffer到字符串的解码 然后传递给调用者 故设置编码后 data不再接收原始的Buffer对象
 *          string_decoder()
 *              仅截取3的倍数的字符 余数加到下一次调用的值上
 *      正确拼接Buffer
 *          将多个小Buffer对象进行拼接为一个Buffer对象 然后通过iconv-lite一类的模块进行转码
 *          正确的拼接方式
 *              用一个数组来存储收到的所有Buffer片段并记录下所有片段的总长度 然后调用Buffer.concat方法生成一个合并的Buffer对象 
 *  Buffer与性能
 *      在应用中我们通常会操作字符串 
 *      在网络中需要转成Buffer 以进行二进制数据传输
 *      通过预先将静态内容转成Buffer对象 可以有效的减少CPU的重复使用 节省服务器资源
 *      在Node构建的Web应用中 可以选择将页面中的动态内容和静态内容分离 静态内容部分可以通过预先转换为Buffer的方式 使性能得到提升
 *      文件读取
 *          与字符串转换有性能消耗
 *          highWaterMark 设置对性能影响很重要
 *          fs.createReadStream()工作方式
 *              在内存中准备一段Buffer，然后在fs.read()读取时逐步从磁盘中将字节复制到Buffer中。完成一次读取时 则从这个buffer中通过slice()方法取出部分数据作为一个小Buffer对象
 *              再通过data事件传递给调用方 如果Buffer用完，则重新分配一个，如果还有剩余，则继续使用
 *              理想情况下 每次的读取长度就是 用户指定的 highWaterMark 
 *              
 *              highWaterMark的大小对性能有两个影响点
 *                  highWaterMark设置对Buffer内存的分配和使用有一定的影响
 *                  highWaterMark设置过小 可能导致系统调用的次数过多
 *                  highWaterMark值越大 读取速度越快
 * 
**/

// buffer拼接乱码问题
const fs = require('fs');
const rs = fs.createReadStream('tangshi.text', {
    highWaterMark: 11
})
rs.setEncoding('utf-8')
let text = '';
rs.on('data', chunk => {
    // console.log(11111, chunk)
    text += chunk
})
rs.on('end', () => {
    // console.log(text)
})