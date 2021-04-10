/**
 *  题目
 *      二叉树的层序遍历
 *  地址
 *      https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
 *  解题思路
 *      1、队列解决
 *          用队列保存当前层的节点，每次遍历队列的长度进行处理数据
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const queue = [root];
    const tree = [];
    if(!root) return tree

    while(queue.length) {
        const level = queue.length;

        tree.push([])
        for(let i = 0; i < level; i++) {
            const pop = queue.shift();
            if(pop === null) continue
            tree[tree.length - 1].push(pop.val)
            if(pop.left) queue.push(pop.left)
            if(pop.right) queue.push(pop.right)
        }
    }

    return tree;
};