/**
 *  题目
 *      N 叉树的层序遍历
 *  地址
 *      https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/
 *  解题思路
 *      1、队列广度优先解决
 *          用队列保存当前层的节点，每次遍历队列的长度进行处理数据
*/
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return [];

    const tree = [];
    const queue = [root];

    while(queue.length) {
        let count = queue.length;

        tree.push([])
        for(var i = 0; i < count; i++) {
            const pop = queue.shift();
            if(!pop) continue;

            tree[tree.length - 1].push(pop.val)
            if(pop.children) queue.push(...pop.children)
        }
    }
    return tree
};


/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    var tree = []
    const levelOrder = (root, level) => {
        if(root == null) return

        tree[level] = tree[level] || []
        tree[level].push(root.val)
        
        level++;
        if(root.children) {
            root.children.forEach(child => {
                levelOrder(child, level)
            })
        }
    }
    levelOrder(root, 0)
    return tree
};