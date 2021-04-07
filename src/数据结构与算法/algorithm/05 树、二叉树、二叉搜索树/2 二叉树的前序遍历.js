/**
 *  题目
 *      二叉树的前序遍历
 *  地址
 *      https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
 *  解题思路
 *      前序遍历 根 左 右
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
var preorderTraversal = function(root) {
    const tree = [];

    const preorder = (root) => {
        if(!root) return;

        tree.push(root.val)
        preorder(root.left)
        preorder(root.right)
    }

    preorder(root)

    return tree;
};




var preorderTraversal = function(root) {
    const tree = [],
        stack = [];
    // 一直遍历一条线
    while(root) {
        tree.push(root.val)
        if(root.right) stack.push(root.right)
        root = root.left
    }

    while(stack.length) {
        root = stack.pop();

        while(root) {
            tree.push(root.val)
            if(root.right) stack.push(root.right)
            root = root.left
        }
    }

    return tree;
};



