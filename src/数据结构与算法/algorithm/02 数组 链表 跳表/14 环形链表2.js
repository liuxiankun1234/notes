/**
 *  题目
 *      环形链表 II
 *  地址
 *  https://leetcode-cn.com/problems/linked-list-cycle-ii/
 *  
 *  解题思路
 *     1、使用map存访问过得节点，如果遍历链表的过程中发现已经存在 则有环
 *          map可以使用指针作为key值 
 *          时间复杂度 O(n)
 *          空间复杂度 O(n)
 *     2、快慢指针
 *          两个人在环形跑道上赛跑，同一个起点出发，一个跑得快一个跑得慢，在某一时刻，跑得快的必定会追上跑得慢的，只要是跑道是环形的，不是环形就肯定追不上
 *          可以画图看下
 *          时间复杂度 O(n)
 *          空间复杂度 O(1)
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    const set = new Set();

    while(head) {
        if(set.has(head)) return head;

        set.add(head, head);
        head = head.next
    }

    return null
};

var detectCycle = function(head) {
    if(head === null) return null;  

    let fast = head,
        slow = head;
    while(fast) {
        /**
         *  思路
         *      https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/huan-xing-lian-biao-ii-by-leetcode-solution/
         * 
         *      快慢指针跑圈，最后快指针相遇慢指针
         *          a+n(b+c)+b=a+(n+1)b+nca+n(b+c)+b=a+(n+1)b+nc
         *          a+(n+1)b+nc=2(a+b)
         *      快指针跑的距离是 a+n(b+c)+b
         *      相遇跑时候 快指针跑的路程 是慢指针跑的路程的2倍 得出 
         *      a=c+(n−1)(b+c)
         *      细节点
         *          1 慢指针入环跑一圈肯定会被快指针追上
         *              
         *          2 理解a=c+(n−1)(b+c)
         *              在相遇点，这两个点肯定会重合
         *                  1、从head开一个新指针一步一步走
         *                  2、从相遇点一步一步走
         *              
         *      
        **/
        if(fast.next === null) return null;

        slow = slow.next;
        fast = fast.next.next;

        if(fast === slow) {
            let ptr = head;

            while(ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next
            }
            return slow
        }
    }
    return null;
};










function C1(name) {
    if(name) this.name = name
}
function C2(name) {
    this.name = name
}
function C2(name) {
    this.name = name || 'A'
}

C1.prototype.name = 'TOM'
C2.prototype.name = 'TOM'
C3.prototype.name = 'TOM'