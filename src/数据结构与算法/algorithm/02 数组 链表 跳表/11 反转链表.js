/**
 *  题目
 *      反转链表
 *  地址
 *  https://leetcode-cn.com/problems/reverse-linked-list/
 *  
 *  解题思路
 *      遍历一次链表，通过一个变量存翻转的链表，循环原链表，把指针修改，并且更新新的链表
 *          
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
        // 新返回的链表
    let linkList = null,
        current = head;

    while(current) {
        const next = current.next;
        // 修改当前引用的指针
        current.next = linkList;
        // 修正链表
        linkList = current;
        // 更新当前引用
        current = next;
    }
    return linkList
};