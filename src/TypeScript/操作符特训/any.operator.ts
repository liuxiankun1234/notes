/**
 *  void
 *      表示没有任何类型，主要使用在函数返回值
 *      void类型仅可以被 null & undefined 赋值
 * 
 *  any
 *      可以被任务值重新赋值
 * 
 *  never
 *      函数返回值为never类型 表示永远不会有返回值
 *          函数里面throw Error 或者 函数死循环 都会返回never
 * 
 *  unknown
 *      任何类型都可以被赋值给unknow
 *      type unknow = string | number | boolean | object | undefined | null | ...
 *      unknow类型不能调用任何方法 
 *          除非使用类型守卫、类型断言
**/

let unknowValue: unknown = 'string';
// unknowValue.toUpperCase() // compile-time error 
// 类型断言
(unknowValue as string).toUpperCase()
// 类型守卫
if (typeof unknowValue === 'string') {
    unknowValue.toUpperCase()
}