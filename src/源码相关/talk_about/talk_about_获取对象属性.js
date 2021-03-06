(function() {
    /**
     *  缺少ES6的reflect 反射
     *  ES5
     *  Object.getOwnPropertyNames(obj)     获取当前对象上(非原型链上)所有的可枚举和不可以枚举的字符串属性
     *                                          返回数组顺序  1 --> 2 顺序返回 12内在顺序如下
     *                                              1 所有数字升序排序
     *                                              2 所有字符串按照加入顺序排序
     *  Object.getOwnPropertySymbols(obj)   获取当前对象上(非原型链上)所有可枚举和不可以枚举的Symbol属性的数组
     *  Object.keys(obj)                    获取当前对象(非原型链上)上的可枚举的字符串属性
     *  obj.hasOwnProperty(prop)            获取当前对象(非原型链上)是否含有prop字符串属性和Symbol属性(可枚举和不可枚举的属性)
     *  
     *  array.keys                          
     *  
     *  ES3
     *  for-in                              获取当前对象（包含原型链上的）所有可以枚举的字符串属性
     *  in (prop in obj)                    获取当前对象（包含原型链上的）所有可以枚举或不可枚举的属性 字符串或symbol属性
     *                                      in 可以适用于 数组 字符串的索引 
     *  
     *  总结：
     *      Object.getOwnPropertyNames / Object.getOwnPropertySymbols 
     *          当前对象（非原型链）可枚举和不可枚举的字符串属性/symbol属性
     *      Object.getOwnPropertyNames / Object.keys
     *          当前对象字符串属性全部属性 / 可枚举属性
     *      for-in 循环只检索可枚举的字符串属性
     *      hasOwnProperty  当前对象的可枚举和不可枚举的字符串属性和Symbol属性
     *      移动端兼容性都没问题 都可以使用
     *  
     *  注：
     *      ES6 class语法中的 原型方法都是不可以枚举的(descriptors的enumerable：false) 详情见 ../ES6/第九章 js中的类
     *      
     *      let strObj = new String('abc'); '0' in strObj === true
     *      因为strObj的key是0,1,2
     * 
     *  
     *  插：
     *      Object.getOwnPropertyDescriptor(obj, prop)  获取实例上属性特征值
     *      
    **/
    class Person{
        constructor(){
            this.name = 'person'
        }
        getName() {
            console.log(this.name)
        }
    }
    let Person2 = function() {
        this.name = 'person'
    }
    Person2.prototype.getName = function(){
        console.log(this.name)
    }

    let p = new Person2();
    console.log(
        Object.getOwnPropertyNames(p)
    )
    
    let arr = []
    for(const k in p){
        arr.push(k)
    }
    console.log(arr)

    let strObj = new String('abc');
    ('0' in strObj) === true
})();