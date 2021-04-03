/**
 *  题目
 *      两两交换链表中的节点
 *  地址
 *  https://leetcode.com/problems/swap-nodes-in-pairs/
 *  
 *  解题思路
 *      1->2->3->4->5
 *      2->1->3->4->5      
 *      2->1->4->3->5    
 * 
 *      先替换1 2
 *      再替换3 4 
 *      再替换5 6
 *      替换操作就是重复单元 可以使用递归来处理
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
var swapPairs = function(head) {
    if(head === null || head.next === null) {
        return head;
    }

    const newHead = head.next;

    /**
     * 注意执行顺序
     *  head.next = swapPairs(newHead.next);
     *  newHead.next = head;
     * 
     *  必须先指定head.next指向新的内存地址
     * 
     *  newHead.next = head;
     *  head.next = swapPairs(newHead.next);
     *  这样操作的话会变成 head.next = swapPairs(head)
    **/
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};



