/**
 *  比较 type 和 interface 
 *      1.可以定义的值不同
 *          type 可以定义全部类型包括 基本类型、元组、对象
 *          inteface 只能定义对象
 *      2.扩展方式不同
 *          interface使用extends来扩展对象的属性值
 *          type使用 &(交叉类型) 来扩展对象的属性值
 *      3.implements实现不同
 *          interface/inteface extends可以被实现
 *          type/intersection type 可以被实现 onion type不能被实现
 * 
 *      interface 多个同名接口存在， interface会自动合并成一个接口
 * 使用场景
 *      定义一个对象类型 直接使用interface
 *      定义一个联合类型、交叉类型、定义类型别名 使用type
 *      对已有的类型扩展，或者合并多个同名接口 用interface
 *      
 *      联合类型
 *          基本类型的值 直接取并集
 *          只要满足任意一个的type声明即可，不需要同时满足多个type声明，同时可以使用其他type声明的部分属性
 *              type T5 = { name: string; sex: 1 | 0 };
 *              type T6 = { age: number; color: string; } | T5;
 *              const t6: T6 = { name: '', sex: 1 } // ✅
 *              const t6: T6 = { name: '', sex: 1, age: 18 } // ✅
 *              const t6: T6 = { age: 18, name: '' } // ❌
 *      交叉类型
 *          需要同时满足多个type声明
 *              type T5 = { name: string; sex: 1 | 0 };
 *              type T6 = { age: number; color: string; } | T5;
 *              const t6: T6 = { name: '', sex: 1, age: 178, color: '' } // ✅
 *          基本类型不需要使用 感觉没啥意义
 *              type T7 = string & number; // never 
 *              const t7:T7 = (() => {
 *                  while(true) {}
 *              })();
**/

// https://juejin.cn/post/7181623514355466296
// 定义基本类型 
// type T0 = 'abc' // 定义基本类型值
type T0 = number;
// type 可以定义元组 number string表示联合类型 T1是数字和字符串类型的数组 长度不限
type T1 = [number, string];
// 联合类型 T2 并集 T2可以是string类型或者number类型
type T2 = string | number;
// 交叉类型 T3 交集 T3只能是string类型
type T3 = T2 & string;
// 定义对象 跟接口一样
type T4 = {
    name: string;
    age: number;
    info: {
        sex: 1 | 0;
    }
}



type T5 = { name: string; sex: 1 | 0 };
type T6 = { age: number; color: string; } | T5;
type T7 = { age: number; color: string; } & T5;
const t4:T6 = {
    name: '18',
    color: '',
    age: 18,
}
const t5:T7 = {
    name: '18',
    age: 18,
    color: ''
}