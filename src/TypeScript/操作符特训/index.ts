/**
 *  extends  ✅
 *  in
 *  as 
 *  重映射  ✅
 *      https://typescript.net.cn/docs/handbook/2/mapped-types.html
 *      晚点看下
 *  never & any & unknow & void 区别
 *  类型守卫
 *      typeof instance 
 * 
 *  keyof
 *      keyof any
 *  typeof
 *  infer
 *      协变或逆变
 *          看了下 
 *  ReturnType
 * 
 *  函数重载
 *  declare
 *
**/
// https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.zh-CN.md
https://github.com/microsoft/TypeScript/blob/8da3eff7b0dbb68c17a950c006edf143456b28cc/src/lib/es5.d.ts#L1442
// https://juejin.cn/post/7009046640308781063#heading-2

/**
 *  infer
 *      infer声明的变量只能在true的条件分支中使用
 * 
 * 
**/
interface List {
    add(): void;
    remove(): void;
}
class LinkedList implements List {
    add(): void {
        throw new Error("Method not implemented.");
    }
    remove(): void {
        throw new Error("Method not implemented.");
    }

}