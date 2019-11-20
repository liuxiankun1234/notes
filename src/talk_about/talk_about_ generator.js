function p1() {
	return new Promise((resolve, reject) => {
		setTimeout(res => {
			if(Math.random() > 0.6){
				resolve({code: 0, data: {isOk: 'p1 ok'}})
				return;
			}else{
                reject({code: 1, message: 'p1 错误信息'})
            }
		}, 2000)
	})
};
function p2() {
	return new Promise((resolve, reject) => {
		setTimeout(res => {
			if(Math.random() > 0.5){
				resolve({code: 0, data: {isOk: 'p2 ok'}})
				return;
			}else{
                reject({code: 2, message: 'p2 错误信息'})
            }
		}, 1000)
	})
};
function p3() {
	return new Promise((resolve, reject) => {
		setTimeout(res => {
			if(Math.random() > 0.1){
				resolve({code: 0, data: {isOk: 'p3 ok'}})
				return;
			}else{
                reject({code: 3, message: 'p3 错误信息'})
            }
		}, 1000)
	})
}

function run(generator) {
    // debugger
    const iterate = generator();
    function next(data) {
        // debugger
        const result = iterate.next(data)

        if(Object.prototype.toString.call(result.value) === '[object Promise]'){
            result.value.then(res => {
                console.log('res', data, res)
            }).catch(err => {
                console.log('err', data, err)
                next(err)
            })
        }
    }

    next();
}


run(function* createGenerator(){
    const tasks = [p1(), p2(), p3()];
    while(tasks.length){
        const taskDef = tasks.shift();
        yield taskDef;
    }
})