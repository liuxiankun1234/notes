/**
 *  第八章 树
 *      待学习
 *          红黑树
 *          AVLr5q  
 *      树结构包含
 *          根节点（树顶节点）
 *          内部节点（至少有一个子节点）
 *          外部节点（没有子元素的节点）
 *          
 *          节点的一个属性是深度（深度取决于他祖先节点的数量）
 *  
 *      二叉树和二叉搜索树
 *          二叉树中的节点只能有两个节点，一个左节点，一个右节点
 *          二叉搜索树 只允许你在左侧节点存储小的值，右侧节点存储大的值
 * 
 * 
 *      树的遍历
 *          先 中 后序 是说的 根节点
 *          先序遍历 应用 打印一个结构化的文档
 *              以最小到最大的顺序访问所有节点
 *                  callback(node)
 *                  inOrderTravererNode(node.left, callback)
 *                  inOrderTravererNode(node.right, callback)
 *          中序遍历 应用 对树进行排序
 *              inOrderTravererNode(node.left, callback)
 *              callback(node)
 *              inOrderTravererNode(node.right, callback)
 *          后序遍历 应用 计算一个目录和它的所有文件所占空间的大小
 *              inOrderTravererNode(node.left, callback)
 *              inOrderTravererNode(node.right, callback)
 *              callback(node)
 * 
 *      移除树节点
 *          移除的节点是外部节点 直接删除
 *          移除的节点有一个子节点 同删除单向链表
 *          移除的节点有多个子节点 删除中序（从小到大）的下一位 也就是右侧的最小值
**/
void function() {
    class Node{
        constructor(key) {
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }
    class BinarySearchTree{
        constructor() {
            this.root = null;
        }
        // 向树中插入一个键
        insert(key) {
            var insertNode = function(root, node) {
                if(root.key > node.key){
                    if(root.left === null){
                        root.left = node;
                    }else{
                        insertNode(root.left, node)
                    }
                }else{
                    if(root.right === null){
                        root.right = node;
                    }else{
                        insertNode(root.right, node)
                    }
                }
            }

            const node = new Node(key);
            let head = this.root;

            if(head === null){
                this.root = node;
                return;
            }

            insertNode(head, node);
        }

        inOrderTravererNode(callback) {
            const inOrderTravererNode = function(node, callback) {
                if(node !== null){
                    inOrderTravererNode(node.left, callback);
                    callback(node);
                    inOrderTravererNode(node.right, callback)
                }
            }
            inOrderTravererNode(this.root, callback)
        }

        getMin() {
            function minNode(node) {
                if(node) {
                    while(node !== null && node.left !== null){
                        node = node.left
                    }
                    return node.key;
                }
                return null
            }

            return minNode(this.root)
        }

        getMax() {
            function maxNode(node) {
                if(node){
                    while(node !== null && node.right !== null){
                        node = node.right;
                    }
                    return node.key
                }
                return null
            }

            return maxNode(this.root)
        }

        search(key) {
            var search = function(node, key) {
                if(node === null){
                    return false;
                }
                if(node.key === key){
                    return true
                }
                if(node.key > key){
                    return search(node.left, key)
                }else{
                    return search(node.right, key)
                }
            }

            return search(this.root, key)
        }

        removeNode(key) {
            var findMinNode = function(node) {
                while(node !== null && node.left !== null) {
                    node = node.left
                }
                return node
            }

            var removeNode = function(node, key) {
                if(node === null){
                    return null;
                }
                if(node.key > key){
                    node.left = removeNode(node.left, key);
                    return node;
                }else if(node.key < key){
                    node.right = removeNode(node.right, key);
                    return node;
                }else{
                    // 无子节点
                    if(node.left === null && node.right === null){
                        node = null;
                        return node
                    }

                    有一个右侧子节点
                    if(node.left === null){
                        node = node.right;
                        return node
                    }else if(node.right === null){
                        node = node.left;
                        return node
                    }

                    var aux = findMinNode(node.right);
                    node.key = aux.key;
                    node.right = removeNode(node.right, aux.key);
                    return node
                }
            }
            this.root = removeNode(this.root, key)
        }
    }

    var tree = new BinarySearchTree();

    tree.insert(11);
    tree.insert(7);
    tree.insert(15);
    tree.insert(5);
    tree.insert(3);
    tree.insert(9);
    tree.insert(8);
    tree.insert(10);
    tree.insert(13);
    tree.insert(12);
    tree.insert(14);
    tree.insert(20);
    tree.insert(18);
    tree.insert(25);

    
    // console.log(tree.search(199));


    tree.inOrderTravererNode(function(node) {
        console.log(node.key)
    })


}();



