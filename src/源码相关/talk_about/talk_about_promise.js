/**
 *      promise 和 setTimeout的执行顺序
 *      事件循环
 *      宏任务
 * 
 * 
 * 
 * 
**/

(function() {
    /**
     * 
     * 
     * 
    **/
    class LazyMan {
        constructor(name) {
            this.tasks = []
            console.log(`Hi! This is ${name}!`)
            setTimeout(() => {
                this.next()
            }, 0)
        }

        next() {
            const fn = this.tasks.shift();
            fn && fn();
        }

        eat(foods) {
            console.log('eat');
            const self = this;
            const fn = (function() {
                return function() {
                    console.log(`eating ${foods}`);
                    self.next();
                }
            })()
            this.tasks.push(fn)
            return this
        }

        sleep(time) {
            console.log('sleep');
            const self = this;
            const fn = (function() {
                return function() {
                    setTimeout(function() {
                        console.log(`weak up after ${time}s`);
                        self.next();
                    }, time * 1000)
                }
            })();
            this.tasks.push(fn)
            return this
        }

        sleepFirst(time) {
            console.log('sleepFirst');
            const self = this;
            const fn = (function() {
                return function() {
                    setTimeout(function() {
                        console.log(`weak up after ${foods}`);
                        self.next();
                    }, time)
                }   
            })();
            this.tasks.unshift(fn)
            return this
        }
    }
    new LazyMan('Hank').sleep(2).eat('dinner')
})();