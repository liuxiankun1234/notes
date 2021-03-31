/**
 *  题目
 *      环形链表
 *  地址
 *  https://leetcode-cn.com/problems/linked-list-cycle/
 *  
 *  解题思路
 *     1、使用map存访问过得节点，如果遍历链表的过程中发现已经存在 则有环
 *          map可以使用指针作为key值 
 *     2、快慢指针
 *          两个人在环形跑道上赛跑，同一个起点出发，一个跑得快一个跑得慢，在某一时刻，跑得快的必定会追上跑得慢的，只要是跑道是环形的，不是环形就肯定追不上
 *          可以画图看下
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
 * @return {boolean}
 */

var hasCycle = function(head) {
    var map = new Map();

    while(head) {
        if(map.has(head)) return true;
        map.set(head, true)
        head = head.next;
    }
    return false;
};

// 快慢指针
var hasCycle = function(head) {
    let fast = head,
        slow = head;

    while(fast) {
        /**
         *  进入循环 证明fast存在
         *  判断 fast.next === null 则证明到链表的结尾 没有重复 
         * 
         *  慢指针向慢指针后移动一步
         *  快指针向快指针的后移动两步
        */
        if(fast.next === null) return false;
        slow = slow.next;
        fast = fast.next.next;

        if(fast === slow) return true
    }
    return false;
};
