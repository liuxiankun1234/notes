/**
 *  题目
 *       N 叉树的后序遍历
 *  地址
 *      https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/
 *  解题思路
 *      1、递归操作
 *          同二叉树一样 递归遍历即可
*/
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function(root) {
    const tree = [];
   
    const postorder = (root) => {
        if(root === null) return;

        if(root.children) {
            root.children.forEach(child => postorder(child))
        }
        tree.push(root.val)
    }
    postorder(root)
    return tree
};