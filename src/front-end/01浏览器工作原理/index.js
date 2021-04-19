/**
 *  理解URL到bitMap过程
 *      URL-(HTTP)->HTML-(parse)->DOM-(css computing)-> DOM with CSS -(layout)->DOM with position -(render)->bitMap
 *  有限状态机
 *      特点
 *          每一个状态都是一个机器
 *              在每一个状态里我们都可以计算、存储、输出
 *              所有状态接收的输入都是一致的
 *              状态机的每一个机器本身没有状态，我们用函数表示的话，他应该是一个纯函数
 *          每个机器都知道下一个状态
 *              每个机器都有确定的下一个状态（Moore状态机）
 *              每个机器根据输入决定下一个状态（Mealy状态机）
 *  Moore状态机
 *  Mealy状态机
 *  有限状态机实现正则？？？
 * 
 * 
*/

/**
 * 状态机实现字符串搜索
*/
function match(string) {
    let state = start;
    for(let c of string) {
        state = state(c)
    }
    return state === end
}

function end(c) {
    return end(c)
}

function start(c) {
    if(c === 'a') {
        return foundA
    }
    return start(c);
}

function foundA(c) {
    if(c === 'b') {
        return foundB;
    }
    return start(c)
}
function foundB(c) {
    if(c === 'c') {
        return foundC;
    }
    return start(c)
}

function foundC(c) {
    if(c === 'd') {
        return end;
    }
    return start(c);
}


match('abcdefs')