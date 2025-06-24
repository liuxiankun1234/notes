/**
 *  映射类型
 *      TS映射类型是将一个类型映射成另一个类型
 *      Partial、Omit、Pick等工具都是做这个的
 *  映射类型修饰符
 *      + - 用于添加/删除修饰符 默认为添加修饰符
 *      readonly 将参数变成只读
 *      ? 将参数变成可选
 *  键名重映射
 *      可以对索引类型进行 过滤 和 转换
 *      as aliasName 可以做键名重映射
 *      as never 可以过滤键名
 *      as 后面表达式的返回值是as的值
 *  其他
 *      索引类型
 *      为什么 type A = {}; const a:A = {name: ''} 不会报错呢
**/

// 键名重映射 转换
type P = {
    name: string;
    age: number;
    sex: 1 | 0
}
type Getter<T> = {
    [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K]
}
const x: Getter<P> = {
    getName() {
        return ''
    },
    getAge() {
        return 12
    },
    getSex() {
        return 1
    }
}

// 键名重映射 过滤掉可选类型
type P1 = {
    name: string;
    age?: number;
    sex: 1 | 0
}

type Getter1<T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
}

// 有一个隐藏逻辑
type AgeNumberAndUndefined = P1['age']; // number | undefined
type AgeNumber = Required<P1>['age']; // number
type NonPartial = AgeNumberAndUndefined extends AgeNumber ? true : false;



type P2 = {
    name: string;
    age?: number;
    sex: 1 | 0
}

type Getter2<T> = {
    [K in keyof T as never]: T[K]
}
// 这个为什么不会报错呢
const x2: Getter2<P2> = {
    name: '',
    sex: 1,
    ss: 1
}