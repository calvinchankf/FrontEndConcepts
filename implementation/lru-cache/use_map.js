https://leetcode.com/problems/lru-cache/discuss/46045/JS-implementation-with-very-detailed-explanation-easy-to-understand

/**
 * @constructor
 */
var ListNode = function (key, val) {
  this.prev = null;
  this.next = null;
  this.val = val;
  this.key = key;
}
var LRUCache = function (capacity) {
  this.head = new ListNode(-1, -1);
  this.tail = new ListNode(-1, -1);
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.size = 0;
  this.capacity = capacity;
  this.map = new Map();
};

/**
* @param {number} key
* @returns {number}
*/
LRUCache.prototype.get = function (key) {
  let node = this.map.get(key);
  if (node) {
    this.moveToHead(node);
    return node.val;
  } else {
    return -1;
  }
};

/**
* @param {number} key
* @param {number} value
* @returns {void}
*/
LRUCache.prototype.set = function (key, value) {
  let node = this.map.get(key);
  if (!node) {
    node = new ListNode(key, value);
    this.attachToHead(node);
    this.size++;
  } else {
    node.val = value;
    this.moveToHead(node);
  }
  if (this.size > this.capacity) {
    this.removeLast();
    this.size--;
  }
  this.map.set(key, node);
};

LRUCache.prototype.attachToHead = function (node) {
  node.next = this.head.next;
  node.next.prev = node;
  this.head.next = node;
  node.prev = this.head;
}

LRUCache.prototype.moveToHead = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
  this.attachToHead(node);
}

LRUCache.prototype.removeLast = function () {
  let last = this.tail.prev;
  last.prev.next = this.tail;
  this.tail.prev = last.prev;
  this.map.delete(last.key);
}

const c = new LRUCache(2)
c.put("c", 123)
c.put("a", 456)
c.put("b", 789)
console.log(c.get("c"))
console.log(c.get("a"))
c.put("d", 123)
console.log(c.get("c"))
console.log(c.get("a"))
console.log(c.get("d"))