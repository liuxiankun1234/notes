import Promise from './es6-promise/promise';
import polyfill from './es6-promise/polyfill';

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;
export default Promise;



// Promise    
//     _state
//     _result
//     _subscribers 



    




var p = new Promise(function(resolve, reject) {
    resolve(1)
})

console.log(p)




p.then(res => {
    console.log(res)
})