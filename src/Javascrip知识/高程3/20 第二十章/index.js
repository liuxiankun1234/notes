/**
 *  第二十章 JSON
 *      JSON是一种数据格式，不是编程语言
 *      语法
 *          JSON语法可以表示以下三种类型值
 *              简单值 
 *                  与JS相同的语法，可以在JSON中表示字符串、数值、布尔类型、和null 
 *                  不支持JS中特殊值 undefined
 *              对象
 *                  对象作为一种复杂类型，表示一组无序的键值对。而每个键值对的值又可以是简单类型 也可以是复杂类型
 *              数组
 *                  有序的值列表 值可以是简单值、对象、数组
 *          简单值
 *              5 true "JSON string" null 这些值都是有效的JSON数据 
 *              JSON.parse('"JSON string"') // "JSON string"
 *              JSON.parse(5) // 5
 *          JSON对象
 *              属性值必须加引号
 *              引号必须是双引号
 *          数组
 *      解析与序列化
 *          序列化选项
 *              JSON.stringify()
 *              所有函数、原型成员属性、undefined值会被有意忽略
 *              
 *          解析选项
 *  
 * 
 * 
 * 
**/