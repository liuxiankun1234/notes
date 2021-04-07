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
var inorderTraversal = function(root) {
    // 中序 左 根 右
    var stack = [],
        tree = []

    while(root || stack.length) {
        while(root) {
            stack.push(root)
            root = root.left;
        }
        let root = stack.pop();
        tree.push(root.val);
        root = root.right;
    }
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    // 中序 左 根 右
    var stack = [],
        tree = []

    while(root || stack.length) {
        while(root) {
            stack.push(root)
            root = root.left;
        }
        let root = stack.pop();
        tree.push(root.val);
        root = root.right;
    }
};


