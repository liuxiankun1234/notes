import _ from 'underscore'
// import './my_undescore'

// isMatch 方法验证
(function() {
    function Person(){}
    Person.prototype.a = 12

    var person = new Person()
    console.log(
        _.isMatch('123', ['1','2', '3']), // true
        // _.isMatch('123', {0: '1', 1: '2', 2: '3'}), // true
        // _.isMatch(null, null),
        // _.isMatch({name: 'lxk'}, {name: 'lxk'}), // true
        // _.isMatch({name: 'lxk', age: '27', sex: 'male'}, {sex: 'male', name: 'lxk'}), // true
        // _.isMatch({name: function() {}}, {name: function() {}}), // false
        // _.isMatch({a: 1}, person)
    );
});

// _.extendOwn 方法验证
(function() {
    var obj = {
        name: 'obj'
    }
    obj.__proto__.sayName = function() {}
    console.log(
        _.extendOwn({name: 'lxk'}, {age: '27'}),
        _.extendOwn({name: 'lxk'}, {name: 'lxk1'}),
        _.extendOwn({}, obj)
    )
});

// _.property 方法验证
(function() {
    const stooge = {
        name: 'moe',
        son: {
            name: 'little boy'
        }
    }; 
    var name = _.property('name')(stooge),
        littleBoyName = _.property(['son', 'names'])(stooge),
        testName = _.property({})(stooge);
    console.log(
        name === 'moe',
        littleBoyName === 'little boy',
        testName
    )

});

// _.map 方法验证
(function(){
    console.log(
        _.map([1,2,3], [1,3]),
        _.extendOwn(12345, {a: 1})
    )
});

// reduce 方法验证
(function() {
    // 数组情况
    // var total = _.reduce([
    //     {math: 89},
    //     {math: 95},
    //     {math: 91},
    //     {math: 65}
    // ], function(total, item) {
    //     return total + item.math
    // }, 0);

    // 对象情况
    // var total = _.reduce({
    //     math: .4,
    //     chinese: .4,
    //     english: .1,
    //     chemistry: .1
    // }, function(prev, next){
    //     return prev + next
    // }, 0)

    // 字符串情况
    var total = _.reduce('1234', function(prev, next){
        return prev + (+next)
    }, 0)
    
    console.log(total)
});

// find 方法验证
(function(){
    var num = _.find([1,2,3,4], function(item) {
        return item > 2
    });
    var num1 = _.find(1234, function(item) {
        return item == '4'
    });
    console.log(num1)
});

// _.findIndex 数组方法验证
(function() {
    var num = _.findIndex([{a: 12}, 2, 3, 4], {})
    console.log(num)
})();
