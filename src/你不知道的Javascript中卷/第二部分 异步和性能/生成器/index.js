/**
 *	
 *
 *
 *
 *
**/


// var createIterator = function*() {
// 	var y = 2 + (yield 1);
// 	yield y;
// 	yield 3;
// 	return 4
// }

// var create = function*() {
// 	yield *createIterator();
// }

// var it = create();
// var ir = create();

// console.log(
// 	it.next(),
// 	it.next(2),
// 	it.next(),
// 	it.next(),
// 	it.next()
// )
// console.log(ir === ir[Symbol.iterator]())


// var something = (function() {
// 	var nextVal;

// 	return {
// 		[Symbol.iterator]: function() { return this },
// 		next: function() {
// 			if(nextVal == void 0){
// 				nextVal = 1;
// 			}else{
// 				nextVal =  (3 * nextVal) + 6;
// 			}
// 			return {
// 				done: false,
// 				value: nextVal
// 			}
// 		}
// 	}
// })();	










    



function ajax() {
	setTimeout(() => {
		var random = Math.random();
		if(random > .1){
			console.log(it)
			it.next({code: 0, arr: [1,2,3]})
		}else{
			it.throw({code: 1, msg: 'error'})
		}
	})
}


function *main() {
	const data = yield ajax();
	console.log('data', data)
}
var it = main();
it.next();


