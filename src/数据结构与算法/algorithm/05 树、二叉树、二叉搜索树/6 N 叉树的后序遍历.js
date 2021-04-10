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
var preorder = function(root) {
    const tree = [];

    const preorder = (root) => {
        if(!root) return;

        root.children.forEach(child => {
            preorder(child)
        })
        tree.push(root.val)
    }

    preorder(root)
    

    return tree;
};