// 防抖 一段时间之内只能执行一次 
var debounce = function(func, wait) {
    var timer = null;

    return function() {
        if(timer){
            clearTimeout(func)
        }
        timer = setTimeout(func, wait)
    }
}
