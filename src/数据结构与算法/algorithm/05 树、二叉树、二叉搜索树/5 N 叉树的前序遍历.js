/**
 *  题目
 *       N 叉树的前序遍历
 *  地址
 *      https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/
 *  解题思路
 *      1、递归操作
 *          同二叉树一样 递归遍历即可
 *      2、栈操作
 *          通过一个栈来使得数据有序访问
 *      其实递归就是隐式的维护一个栈
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
        tree.push(root.val)

        root.children.forEach(child => {
            preorder(child)
        })

    }

    preorder(root)
    

    return tree;
};


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
    const stack = [root];

    while(stack.length) {
        /**
         * 注意
         *      [1,null,2,3,4,null,5,6]
         *          结果是 1,2,5,6,3,4
         *          第一层 stack = [1]
         *          第二层 stack = [4,3,2]
         *          第三层 stack = [4,3,6,5]
         *      这块不能使用
         *          stack.shift();
         *          pop.children.forEach
         * 
         *          第一层 stack = [1]
         *          第二层 stack = [2,3,4]
         *          第三层 stack = [3,4,5,6]
         * 
        **/
        const pop = stack.pop();
        if(!pop) continue;
        
        tree.push(pop.val);

        pop.children.reverse().forEach(child => {
            stack.push(child)
        })
    }
    return tree;
};