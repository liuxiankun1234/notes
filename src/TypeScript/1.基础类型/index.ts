/**
 *  基本类型
 *      布尔值
 *          let bool:boolean = false;
 *      数字
 *          所有的数字都是浮点数
 *          支持十进制、十六进制，ecmascript2015之后的二进制、八进制
 *          let hexLiteral:number = 0xf00d;
 *      字符串
 *          支持模板字符串、单双引号
 *          let str:string = 'abc'
 *      数组
 *          定义数组的两种方式
 *              let arr: number[] = [1, 2, 3];
 *              let arr1:Array<number> = [1, 2, 3];
 *          数组类型可以是any
 *              let anyArr:any[] = [1, 'str', true];
 *      元组 Tuple
 *          可以表示一个已知元素数量、类型的数组，各元素的类型不必相同
 *          当给越界的元素赋值的时候会使用 联合类型 进行限制
 *
 *          let tuple:[string, number] = ['str', 123];
 *          tuple[2] = 'abc' // success, 可以赋值给(string | number)类型
 *      枚举
 *          默认从数字类型0开始编号，自增，如果有赋值 以当前值为准
 *          数字类型的值枚举会进行反向映射
 *          非数字类型的值枚举不会进行反向映射
 *          枚举逻辑 Color[ Color['Red'] = 0 ] = 'Red'
 *          enum  Color { Red, Green = 2, Blue }
 *          Color.Red === 0 // true
 *          Color.Blue === 3 // true
 *          Color[2] === 'Green' true
 *      any
 *          在编程阶段还不清楚类型的变量指定的一个类型
 *          let list: any[] = [1, true, "free"];
 *      void
 *          没有任何类型，常见场景：函数返回值
 *          void类型可以被赋值成 null、undefined
 *              let nullOrUndefined: void = null
 *              let nullOrUndefined: void = undefined
 *      null & undefined
 *          默认情况 null 和 undefined是全部类型的子类型
 *          可以通过--strictNullChecks标记，将null、undefined只能赋给void和他们自己
 *              let n:number = null; // 非 --strictNullChecks 模式
 *              let u: undefined = undefined;
 *              let n: null = null;
 *      never
 *          表示 永不存在的值 的类型
 *              总是抛出异常
 *                  throw new Error('返回的类型为never')
 *              无法到达函数终点
 *                  while(true)
 *          never是任何类型的子类型，可以赋值给任何类型
 *          没有任何类型是never类型的子类型，任何类型都不能赋值给never
 *          any也不能赋值给never
 *      object
 *          非原始类型
 *      断言类型
 *          两种形式
 *              let someValue: any = 'abcde';
 *              let len1: number = (<string>someValue).length;
 *              let len: number = (someValue as String).length;
 *
 *      疑问
 *          数组和元组有什么区别?
 *             常规数组限制了元素的类型必须唯一，不确定长度
 *             元组限制了元素的类型、数量，类型可以不唯一，越界元素赋值 联合类型 进行限制
 *
 *          为什么不能将null赋值给void类型
 *              let n:void = null // 报错
 *
 *          never类型可以赋值给任何类型 怎么赋值呢？
 *
 *          object类型干嘛用的？
 *
 **/


// 基础类型
// let n: number = 1;
let number: number = 12,
    string: string = 'string',
    isDone: boolean = false,
    arr1: number[] = [1, 2, '3']

console.log(number, isDone, string)