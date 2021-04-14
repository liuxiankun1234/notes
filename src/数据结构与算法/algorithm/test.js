



var isValid = function(s) {
    var stack = [],
        keys = new Map([
            [')', '('],
            [']', '['],
            ['}', '{'],
        ])

    for(var i = 0; i < s.length; i++) {
        var code = s.charAt(i);

        if(keys.has(code)) {
             if(stack.length === 0 || stack[stack.length - 1] !== code) {
                return false;
            }

            stack.pop();
        }else{
            stack.push(code)
        }
    }
    return stack.length === 0
};


isValid('()')