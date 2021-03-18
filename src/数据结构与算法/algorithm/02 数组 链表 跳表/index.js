/**
 *  数组
 *      定义了一个数组 计算机在内存中申请了一个连续的地址
 * 
 *      注： 频繁的插入和删除操作不适合使用数组数据结构
 *      
 *  链表
 *      占用非连续的内存
 * 
 *  跳表 
 *      升维 空间换时间
 *      只能用于链表元素有序的情况下使用
 *      用于取代的是平衡树和二分查找，是一种 插入/删除/搜索都是O(logn)的数据结构
 *      在一些热门项目中代替平衡树如 Redis LevelDB
 * 
 *  时间复杂度对比
 *      method              array           LinkedList              skipList
 *      prepend             O(1)            O(1)                    O(1)
 *      append              O(1)            O(1)                    O(1)
 *      lookup              O(1)            O(n)                    O(logn)
 *      insert              O(n)            O(1)                    O(logn)
 *      delete              O(n)            O(1)                    O(logn)
 * 
 *  注意
 *      补充数组、链表知识点
*/