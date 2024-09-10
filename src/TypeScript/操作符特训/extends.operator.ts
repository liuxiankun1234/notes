/**
 *  
 * 
 * 
 * 
 *  extends使用场景
 *      1.继承
 * 
 * 
**/
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