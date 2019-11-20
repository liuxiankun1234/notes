/**
 * 
 *  排序小型数组时，插入排序优于冒泡排序和选择排序
 *  
 *  由于性能问题，成产中不适合使用插入/冒泡/选择排序
 * 
 * 
 * 
 * 
**/


void function() {
    function swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp
    }
    class Sort {
        constructor(list) {
            this.list = list
        }
        // 冒泡排序
        bubble() {
            /**
             *  冒泡排序
             *      比较任何两个相邻的项，如果第一个数比第二个数字大，则交换他们 
             *      优化 内部循环 减去 i 后面的已经是确定最大数
             *      
             *      时间复杂度 O(n2)
            **/
            const arr = this.list.concat();

            for(let i = 0, length = arr.length; i < length; i++){
                for(let j = 0; j < length - 1 - i; j++){
                    if(arr[j] > arr[j + 1]){
                        swap(arr, j, j + 1);
                    }
                }
            }
            return arr;
        }

        // 选择排序
        selection() {
            /**
             *  选择排序
             *      找到最小数，然后把它放到第一位，然后找到第二小，放到第二位
             *  
             *  事件复杂度 O(n2) 
             * 
            **/
            const arr = this.list.concat();
            let minIndex = -1;

            for(let i = 0, length = arr.length; i < length; i++){
                minIndex = i;
                for(let j = i + 1; j < length; j++){
                    if(arr[minIndex] > arr[j]){
                        minIndex = j;
                    }
                }
                if(minIndex !== i){
                    swap(arr, i, minIndex)
                }
            }

            return arr;
        }

        // 插入排序
        insert() {
            /**
             *  插入排序
             *      插入小型数组时， 此算法优于 冒泡排序和选择最小排序    
             * 
             *      算法推演
             *      5 1 2 3 4
             *      
             *      1 // i = 1
             *      5 5 2 3 4 // i = 0
             *      1 5 2 3 4
             * 
             *      2 // i = 2      
             *      1 5 5 3 4 // i = 1
             *      1 2 5 3 4
             * 
             *      3 // i = 3
             *      1 2 5 5 4 // i = 2
             *      1 2 3 5 4 // i = 1
             * 
             *      4 // i = 4 
             *      1 2 3 5 5 
             *      
            **/
            const arr = this.list.concat();
            
            for(let i = 0, length = arr.length; i < length; i++){
                let j = i, temp = arr[j];

                while(j > 0 && arr[j - 1] > temp){
                    arr[j] = arr[j - 1];
                    j--;
                }
                arr[j] = temp;
            }

            return arr;
        }

        // 归并排序
        merge() {
            /**
             * 主要思想 分治 和 递归
             * 
             * 
            **/
            /**
             *      [4, 5, 6,1,2,7,3]
             *      merge(mergeSort([4, 5, 6]), mergeSort([1, 2, 7, 3]))
             *      merge(merge( mergeSort([4]), mergeSort([5, 6]) ), mergeSort([1, 2, 7, 3]))
             *      merge(merge( mergeSort([4]), mergeSort([5, 6]) ), merge(mergeSort([1, 2], mergeSort([7, 3])))
             *      merge(merge( mergeSort([4]), mergeSort([5, 6]) ), merge(mergeSort([1, 2], mergeSort([7, 3])))
             *      merge(merge( [4], merge([5], [6]) ), merge(merge([1], [2]), merge([7], [3])))
             *      merge([4,5,6], [1,2,3,7] )
            **/ 
            const list = this.list.concat();
            const merge = function(left, right) {
                const ret = []
                while(left.length && right.length){
                    if(left[0] > right[0]){
                        ret.push(right.shift())
                    }else{
                        ret.push(left.shift())
                    }
                }

                while(left.length){
                    ret.push(left.shift())
                }


                while(right.length){
                    ret.push(right.shift())
                }

                return ret;
            }

            var mergeSort = function(arr) {
                const length = arr.length;
                if(length < 2) {
                    return arr;
                }

                const mid = Math.floor( length / 2 ),
                    left = arr.slice(0, mid),
                    right = arr.slice(mid, length);

                return merge( mergeSort(left), mergeSort(right) )
            }

            return mergeSort(list)
        }
    }
    var arr = Array.from({length: 100000}).fill(0);
    arr = arr.map((v, k) => arr.length - k);
    
    var timeStart = Date.now();
    // new Sort(arr).selection(); // 5252ms
    // new Sort(arr).insert(); // 4902
    // new Sort(arr).bubble(); //9050
    var arr1 = arr.sort((x, y) => x - y) // 4
    console.log(Date.now() - timeStart, arr1)


    console.log(new Sort(arr).merge())


}();