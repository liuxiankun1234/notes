/**
 *  题目
 *      二叉树的中序遍历
 *  地址
 *      https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
 *  解题思路
 *      中序遍历 左 根 右
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
var inorderTraversal = function(root) {
    var tree = [];
    const inorder = (root) => {
        if(!root) return;

        inorder(root.left)
        tree.push(root.val)
        inorder(root.right)
    }              
    inorder(root)                       
    return tree;
};


var inorderTraversal = function(root) {
    let tree = []
 
     const inorder = (root) => {
         if(root === null) {
             return
         }
         inorder(root.left)
         tree.push(root.val)
         inorder(root.right)
     }
     inorder(root)
     return tree
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
    var tree = []
    var stack = [];

    while(root || stack.length) {
        while(root) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        tree.push(root.val)
        root = root.right;
    }
    
    return tree;
};