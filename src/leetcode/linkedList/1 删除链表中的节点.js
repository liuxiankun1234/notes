/**
 *  题目地址
 * 
 *  https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/6/linked-list/41/
 * 
 *  
**/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    if(node == null) return;
    if(node.next == null) {
        node = null;
        return
    };
    var nextN = node.next;
    node.val = nextN.val;
    node.next = nextN.next;
};