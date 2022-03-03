import Promise from './es6-promise/promise';
import polyfill from './es6-promise/polyfill';
import { fulfill, FULFILLED, initializePromise, PENDING, PROMISE_ID, publish } from './es6-promise/-internal';
import { asap } from './es6-promise/asap';

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;
export default Promise;


    
// var p = new Promise(function(resolve, reject) {
//     // setTimeout(function() {
//         resolve(1)
//     // })
// })

// p.then(res => {
//     console.log('then1方法----------------->', res)
//     return 12;
// }).then(res => {
//     console.log('then2方法----------------->', res)
// })


Promise.resolve()
    .then(() => {
        console.log('0');
        return Promise.resolve('4');
    })
    .then(res => {
        console.log(res);
    });
Promise.resolve()
    .then(() => {
        console.log('1');
    })
    .then(() => {
        console.log('2');
    })
    .then(() => {
        console.log('3');
    })
    .then(() => {
        console.log('5');
    })
    .then(() => {
        console.log('6');
    });