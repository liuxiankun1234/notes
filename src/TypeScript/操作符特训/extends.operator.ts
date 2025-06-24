/**
 *  extends使用场景
 *      1.继承
 *          继承interface/type 不能有重复字段，否则报错
 *          继承类只继承类的全部成员(private/protected/public)，不继承实现 后续再细看
 *      2.条件类型( T extends U ? X : Y )
 *          like conditional expressions ( condition ? trueExpression : falseExpression )
 *          TS的做的是【结构继承】逻辑，只要用一个类型包含了另一个类型的全部成员 那就满足子类型条件 
 *          条件类型 判断为真的逻辑
 *          分布式条件类型 distributive conditional types
 *              never 特殊联合类型？？？？
 *              这块也得再看看
 *      3.泛型约束
 *          T必须满足{ msg: unknown }类型
 *          type MsgOf<T extends { msg: unknown }> = T['msg'];
 *          
 *          这里的number是索引对应的类型
 *          type Flatten<T> = T extends any[] ? T[number] : T;
 *          type tuple = Flatten<[number, string]>  
 *          返回一个联合类型 number | string
 *            
**/
https://yutengjing.com/posts/ts%E7%B1%BB%E5%9E%8B%E4%BD%93%E6%93%8D%E6%8A%80%E5%B7%A7%E6%80%BB%E7%BB%93/
// 1.继承type、interface、Class
interface Vehicle {
    wheels: number;
}
interface Car extends Vehicle {
    power: "gas" | "electricity";
}

const car: Car = {
    wheels: 2,
    power: 'gas'
}

https://dev.to/tomoy/interface-extendingmerging-in-typescript-3fjb