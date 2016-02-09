---
layout: post
title: Array Methods of ECMAScript 5/6
date: 2016-02-09
categories: [Javascript]
tags: [Javascript, ECMAScript 6]
---

#### ECMAScript 5

1. `isArray()`

Returns true if an object is an array, false if not.

```javascript
var a = [1, 2, 3];

typeof a // "object"
Array.isArray(a) // true
```

2. `valueOf()`

Returns the array itself.

```javascript
var a = [1, 2, 3];
a.valueOf() // [1, 2, 3]
```

3. `toString()`

Returns the array as a string.

```javascript
var a = [1, 2, 3];
a.toString() // "1,2,3"

var a = [1, 2, 3, [4, 5, 6]];
a.toString() // "1,2,3,4,5,6"
```

4. `push()`

Adds one or more elements to the end of an array and returns the new length of the array.

```javascript
var a = [];

a.push(1) // 1
a.push('a') // 2
a.push(true, {}) // 4
a // [1, 'a', true, {}]
```

```javascript
var a = [1, 2, 3];
var b = [4, 5, 6];

Array.prototype.push.apply(a, b)
// or
a.push.apply(a,b)
// or
a.push(4,5,6)

a // [1, 2, 3, 4, 5, 6]
```

5. `pop()`

Removes the last element from an array and returns that element.

```javascript
var a = [1, 2, 3];

a.pop() // 3
a // [1, 2]

[].pop() // undefined
```

6. `join()`

Joins all elements of an array into a string.

```javascript
var a = [1, 2, 3];

a.join() // "1,2,3"
a.join('') // '123'
a.join("|") // "1|2|3"
```

7. `concat()`

Adds one or more arrays to the end of an array and returns that array.

```javascript
['hello'].concat(['world'])
// ["hello", "world"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[1, 2, 3].concat(4, 5, 6)
// [1, 2, 3, 4, 5, 6]
```

8. `shift()`

Removes the first element from an array and returns that element.

```javascript
var a = [1, 2, 3];

a.shift() // 1
a // [2, 3]
```

9. `unshift()`

Adds one or more elements to the beginning of an array and returns the new length of the array.

```javascript
var a = [1, 2, 3];

a.unshift(4); // 4
a // [4, 1, 2, 3]
```

10. `reverse()`

Reverses an array in place.

```javascript
var a = [1, 2, 3];

a.reverse() // [3, 2, 1] 
a // [3, 2, 1] 
```

11. `slice()`

Returns a shallow copy of a portion of an array into a new array object.

```javascript
// Syntax
// If the second parameter is missing, returns till the last element.
arr.slice(start_index, upto_index);

// Instances
var a = ['a', 'b', 'c'];

a.slice(1,2) // ["b"]
a.slice(1) // ["b", "c"]
a.slice(0) // ["a","b","c"]
a.slice(-2) // ["b", "c"]
a.slice(4) // []
a.slice(2, 6) // ["c"]
a.slice(2, 1) // []
```

12. `splice()`

Changes the content of an array by removing existing elements and/or adding new elements.

```javascript
// Syntax
arr.splice(index, count_to_remove, addElement1, addElement2, ...);

// Instances
var a = ["a","b","c","d","e","f"];

a.splice(4,2)
// ["e", "f"]

a
// ["a", "b", "c", "d"]
```

```javascript
var a = ["a","b","c","d","e","f"];

a.splice(4,2,1,2)
// ["e", "f"]

a
// ["a", "b", "c", "d", 1, 2]
```

```javascript
var a = [1, 1, 1];

a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]
```

```javascript
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

13. `sort()`

Sorts the elements of an array in place and returns the array

```javascript
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

[11, 101].sort()
// [101, 11]

[10111,1101,111].sort()
// [10111, 1101, 111]
```

```javascript
// A function with two params can be passed to sort() as a parameter
// which could be used to compare any two elements in the array.
// If returns true, the first element will be placed before the second one.

[10111,1101,111].sort(function (a,b){
  return a - b;
})
// [111, 1101, 10111]

[
  { name: "nameA", age: 30 },
  { name: "nameB", age: 24 },
  { name: "nameC", age: 28  }
].sort(function(o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "nameB", age: 24 },
//   { name: "nameC", age: 28  },
//   { name: "nameA", age: 30 }
// ] 
```

14. `map()`

Creates a new array with the results of calling a provided function on every element in this array.

```javascript
var numbers = [1, 2, 3];

numbers.map(function(n) { return n+1 });
// [2, 3, 4]

numbers
// [1, 2, 3]
```

```javascript
[1, 2, 3].map(function(elem, index, arr) {
  return elem * elem;
});
// [1, 4, 9]
// "elem" is the current element, "index" is the position and "arr" is the array itself.
```

```javascript
var upper = function (x) { return x.toUpperCase() };

[].map.call('abc', upper)
// [ 'A', 'B', 'C' ]

// Or
'abc'.split('').map(upper)
// [ 'A', 'B', 'C' ]
```

```javascript
var arr = ['a', 'b', 'c'];

[1, 2].map(function(e){
  return this[e];
}, arr)
// ['b', 'c']
```

15. `forEach()`

The forEach() method is similar as the map() method, but without return value. 

```javascript
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```

```javascript
var out = [];

[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem);
}, out);

out // [1, 4, 9]
```

16. `filter()`

Creates a new array with all elements that pass the test implemented by the provided function.

```javascript
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})
// [4, 5]
```

```javascript
[1, 2, 3, 4, 5].filter(function(elem, index, arr){
  return index % 2 === 0;
});
// [1, 3, 5]
```

```javascript
var Obj = function () {
  this.MAX = 3;
};

var myFilter = function(item) {
  if (item > this.MAX) {
    return true;
  }
};

var arr = [2,8,3,4,1,3,2,9];
arr.filter(myFilter, new Obj())
// [8, 4, 9]
```

17. `some()`

Returns true if any element passes the test implemented by the provided function, otherwise, returns false.

```javascript
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true
```

18. `every()`

Returns true only if every element passes the test, otherwise, returns false.

```javascript
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false
```

19. `reduce()`

Applies a function against an accumulator and each value of the array (from left-to-right) to reduce it to a single value.

```javascript
// Syntax
arr.reduce(callback[, initialValue])

arr.reduce(function(previousValue, currentValue, currentIndex, array){}, initialValue)


// Instances
[1, 2, 3, 4, 5].reduce(function(x, y){
    return x+y;
});
// 15
```

```javascript
Array.prototype.sum = function (){
    return this.reduce(function (partial, value){
        return partial + value;
    })
};

[3,4,5,6,10].sum()
// 28
```

```javascript
// Assign the initial value to 10
[1, 2, 3, 4, 5].reduce(function(x, y){
  return x+y;
}, 10);
// 25
```

```javascript
// Find the longest element in an array
function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
    return entry.length > longest.length ? entry : longest;
  }, '');
}
```

20. `reduceRight()`

Same as reduce(), only difference is executing from right to left.

21. `indexOf()`

Returns the first index at which a given element can be found in the array, or -1 if it is not present.

```javascript
var a = ['a', 'b', 'c'];

a.indexOf('b') // 1
a.indexOf('y') // -1

// Start from a specific index
['a', 'b', 'c'].indexOf('a', 1) // -1
```

22. `lastIndexOf()`

Returns the last index at which a given element can be found in the array, or -1 if it is not present. 

```javascript
var a = [2, 5, 9, 2];

a.lastIndexOf(2)
// 3

a.lastIndexOf(7)
// -1
```
