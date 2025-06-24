
/**
 *  接口声明
 *      可选属性
 *          语法
 *              interface SquareConfig {
 *                  color?: string
 *              }
 *      只读属性
 *          语法
 *              interface Point {
 *                  readonly x: number;
 *              }
 *              const point:Point = {x: 12}
 *              point.x = 13; // error
 *          ReadonlyArray<T>语法 声明一个只读的数组 
 *              let readonlyArr:ReadonlyArray<number> = [1, 2, 3];
 *              readonlyArr[0] = 5 // error 
 *          readonly & const 
 *              属性用 readonly 
 *              变量使用const
 *      额外的属性检查
 *          interface SquareConfig {
 *              width: number;
 *              color?: string;
 *          }
 *          function createSquare(config: SquareConfig) {}
 *          let mySquare = createSquare({ colour: "red", width: 100 }); // error: 'colour' does not exist in type 'SquareConfig'
 *          绕过额外属性检查
 *              类型断言
 *                  as SquareConfig
 *              字符串索引
 *                  优先级小于已经声明属性的类型定义
 *                  color 必须是string类型 width必须是number类型 其他随意
 *                  interface SquareConfig {
 *                      width: number;
 *                      color?: string;
 *                      [key: string]: any;
 *                  }
 *              赋值给其他对象
 *                  squareOptions不会经过额外属性检查，但是会检查已声明的属性
 *                  不会检查colour，但是会检查width
 *                  let squareOptions = { colour: "red", width: 100 };
 *                  let mySquare = createSquare(squareOptions);
 *      函数类型
 *          接口可以描述带有属性的普通函数，也可以描述函数类型
 *          调用签名
 *              在使用中【调用签名】的 参数名可以随便改，不需要和【调用签名】一致，但是类型声明必须一致
 *                  interface SearchFunc {
 *                      (source: string, subString: string): boolean;
 *                  }
 *              不必须命名成source、subString，下面也支持 但是s、sub必须是string类型
 *              const search:SearchFunc = (s, sub) => true;
 *      可索引的类型
 *          TODO 这块需要单独看下 没有清晰 symbol number string 类型 都需要单独看下
 *          可索引的类型有一个索引签名，描述了对象索引的类型和索引对应返回值的类型
 *          可以描述通过索引得到的类型arr[0] or ageMap['age']
 *              interface StringArray {
 *                    [index: number]: string;
 *              }
 *              这个索引签名表示用number去索引StringArray时会返回一个string类型的值
 *              let myArray: StringArray = ["Bob", "Fred"];
 *          索引签名类型
 *              仅支持 数字 & 字符串 类型 数字类型和字符串索引类型是有区别的
 *                  可以同时使用数字、字符串签名，但是数字索引返回值必须是字符串索引返回值的子类型
 *                  已声明属性和索引签名类型必须一致，否则类型检查器会错误提示
 *                      interface NumberDictionary {
 *                          [index: string]: number;
 *                          length: number;    // 可以，length是number类型
 *                          name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
 *                      }    
 *                  只读索引签名
 *                      interface ReadonlyStringArray {
 *                          readonly [index: number]: string;
 *                      }   
 *                      let myArray: ReadonlyStringArray = ["Alice", "Bob"];
 *                      myArray[2] = "Mallory"; // error!
 *      类类型
 *          类实现接口的时候不检查constructor里的内容
 *          类分两部分 constructor 和 属性方法
 *              interface ClockInterface {
 *                  id: number
 *                  tick(): void;
 *              }
 *              interface ClockConstructor {
 *                  new (hour: number, minute: number): ClockInterface;
 *              }
 *              这块只能实现属性和方法
 *              class DigitalClock implements ClockInterface {
 *                  constructor(private hour: number, private minute: number) {}
 *                  tick() {}
 *              }
 *              这块实现构造器部分
 *                  const creater = (ctor: ClockConstructor) { return new ctor() }
 *                  const createClock: ClockConstructor = DigitalClock;
 *                  const myClock = new createClock(12, 30);
 *      继承接口
 *          接口继承可以让我们从一个接口中复制全部成员到另一个接口中
 *          可以同时继承多个接口
 *              interface Shape { color: string }
 *              interface PenStroke {     penWidth: number; }
 *              interface Square extends Shape, PenStroke {
 *                      sideLength: number;
 *              }
 *      混合类型
 *          一个对象被用作函数和对象是用，并且有额外属性
 *              interface Counter {
 *                  (start: number): string;
 *                  interval: number;
 *                  reset(): void;
 *              }
 *              function getCounter(): Counter {
 *                  let counter = function (start: number) { } as Counter;
 *                  counter.interval = 123;
 *                  counter.reset = () => { };
 *                  return counter;
 *              }
 *      接口继承类
 *          TODO
 * 
 *      疑问
 *          as 很邪恶
 *          
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
**/

interface Ponit {
    readonly x: number;
    readonly y: number;
}
interface User {
    [prop: number]: number;
    age: string;
}

// const users: User = ['bob', 'tom', 'jerry'];

// const us2: User = {
//     0: 'bob',
//     1: '',
//     age: 12
// }
