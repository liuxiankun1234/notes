/**
 *  第六章 集合
 *      集合是由一组无序且唯一（不能重复）的项组成    
 * 
 * 
 * 
 * 
**/
void function() {
    /**
     *  模拟ES6set
     *      因为对象的属性不能是重复的key 所以使用对象来存储数据
     *      也可以使用数组来处理数据
     * 
    **/

    class Set{
        constructor() {
            this.items = {}
        }
        has(prop) {
            // 非原型链上的 可枚举和不可枚举的字符串属性和Symbol属性
            return this.items.hasOwnProperty(prop)
        }
        add(val) {
            if(this.has(val)){
                return false;
            }
            
            // 会给items加一个val字符串属性 而非传入的val
            Object.assign(this.items, {
                [val]: val
            })
            return true;
        }
        remove(val) {
            if(!this.has(val)){
                return false;
            }
            delete this.items[val]
            return true;
        }
        clear() {
            this.items = {}
        }
        size() {
            // 仅仅使用for in 不会过滤原型链上的属性
            // Object.keys 不能包括 不可枚举 和 Symbols属性
            // Object.getOwnPropertyNames 不能获取Symbol属性
            // Object.getOwnPropertySymbols 不能获取字符串属性
            let size = 0;
            for(var k in this.items){
                if(this.items.hasOwnProperty(k)){
                    size++
                }
            }
            return size;
        }
        values() {
            const values = [];
            for(let k in this.items){
                if(this.items.hasOwnProperty(k)) {
                    values.push(this.items[k])
                }
            }
            return values;
        }
        // 并集
        union(otherSet) {
            const allSet = new Set();
            otherSet.values().forEach(item => allSet.add(item))
            this.values().forEach(item => allSet.add(item))

            return allSet.values();
        }
        // 交集
        interSection(otherSet) {
            const interSectionSet = new Set();

            this.values().forEach(item => {
                if(otherSet.has(item)){
                    interSectionSet.add(item)
                }
            })

            return interSectionSet.values();
        }
        // 差集 
        difference(otherSet) {
            const differenceSet = new Set();

            this.values().forEach(item => {
                if(!otherSet.has(item)){
                    differenceSet.add(item)
                }
            })

            return differenceSet.values();
        }
        // 子集
        subSet(otherSet) {
            if(this.size() > otherSet.size()) return false;

            const values = this.values();
            for(let i = 0; i < values; i++){
                if(!otherSet.has(values[i])){
                    return false;
                }
            }

            return true;
        }
    }

    const set = new Set();

    set.add(1);
    set.add(2);
    set.add('3');
    // set.remove(3);
    const newSet = new Set();
    newSet.add(1)
    newSet.add(2)
    newSet.add(3)
    newSet.add(4)
    console.log(set.subSet(newSet))

    
}()