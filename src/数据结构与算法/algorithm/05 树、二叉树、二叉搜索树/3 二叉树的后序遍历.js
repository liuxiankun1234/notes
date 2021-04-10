/**
 *  题目
 *      二叉树的后序遍历
 *  地址
 *      https://leetcode-cn.com/problems/binary-tree-postorder-traversal/
 *  解题思路
 *      
 *      1、递归实现
 *      2、使用栈维护一个有序的排序
 *  辅助网站
 *      https://visualgo.net/zh/bst
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    const tree = [];

    const postorder = (root) => {
        if(!root) return;

        postorder(root.left)
        postorder(root.right)
        tree.push(root.val)
    }

    postorder(root)

    return tree;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    const tree = [];
    const stack = [];
    let prev = null;

    while(root !== null || stack.length) {
        while(root) {
            stack.push(root)
            root = root.left;
        }

        root = stack.pop();

        if(root.right === null) {
            tree.push(root.val);
            prev = root;
            root = null
        }else{

        }
    }
    

    return tree;
};