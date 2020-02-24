/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/1/array/30/
 *  
 *  这个解决方案都不理想 再思考思考
 *  
**/
/**
 * @param {character[][]} board
 * @return {boolean}
 * 
 * 执行时间 92 ms
 * 内存消耗：41.1 MB
 */
var isValidSudoku = function(board) {
    function isNumber(n) {
        // 不能用typeof判断 字符串数组问题
        return /^\d+$/g.test(n)
    }

    function isRepeat(list) {
        return list.length !== new Set(list).size
    }

    function isRepeatNums(list) {
        var nums = list.filter(isNumber);
        return isRepeat(nums);
    }
    
    function createTwoDimensionalArray(length) {
        var array = Array(length);
        for(var i = 0; i < length; i++) {
            var arr = Array(length);
            array[i] = arr;
        }
        return array;
    }
    var i, length = board.length;
    // 收集数组
    var xArray = createTwoDimensionalArray(length);
    var yArray = createTwoDimensionalArray(length);
    var mArray = createTwoDimensionalArray(length);
    for(i = 0; i < length; i++) {
        var item = board[i];
        for(var j = 0, len = item.length; j < len; j++) {
            var value = item[j];
            xArray[i][j] = value;
            yArray[j][i] = value;
            // 3n + m 表示数组的索引
            mArray[3 * Math.floor(i/ 3) + Math.floor(j/ 3)].push(value)
        }
    }
    // 校验数组集
    for(var index = 0; index < length; index++) {
        if(isRepeatNums(xArray[index]) || isRepeatNums(yArray[index]) || isRepeatNums(mArray[index])){
            return false
        }
    }
    
    return true
};
/**
 *  执行用时：132 ms    
 *  内存消耗：37.7 MB 
 */
var isValidSudoku = function(board) {
    var col, 
        row, 
        length = board.length,
        xArray = Array(length),
        yArray = Array(length),
        mArray = Array(length);

    for(var i = 0; i < 9; i++) {
        xArray[i] = {}
        yArray[i] = {}
        mArray[i] =  {}
    }
    
    for(col = 0; col < length; col++) {
        for(row = 0; row < length; row++) {
            var value = board[col][row];
            if(value === '.') continue;

            var index = 3 * Math.floor(col / 3) + Math.floor(row / 3);

            if(xArray[col][value] || yArray[row][value] || mArray[index][value]) {
                return false;
            }else{
                xArray[col][value] = true;
                yArray[row][value] = true;
                mArray[index][value] = true;
            }
        }
    }
    return true;
}