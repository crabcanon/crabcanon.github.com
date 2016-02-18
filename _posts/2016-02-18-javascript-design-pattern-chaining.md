---
layout: post
title: Javascript Design Pattern - Chaining
date: 2016-02-18
categories: [Javascript]
tags: [Javascript]
---

#### 1. Introduction

Firstly, let's take a look at an example. We want to implement a method, capitalize(), such that when the method is called on a String, only the first letter of the string is capitalized(if it's a letter).

```javascript
/* capitalize() method implementation */
function capitalize(str) {
    var c = str.charCodeAt(0);
    if (97 <= c && c<= 122) c-=32 // http://www.ascii-code.com/

    return String.fromCharCode(c) + str.slice(1)
    // return str.charAt(0).toUpperCase() + str.slice(1)
}
```

Assume we use it with other string methods to complete a specific task: remove all the delimiters of a string, then get the second element of the new string and finally capitalize this element. 

```javascript
// Initialize variable 'a'
var a = 'a,b,c,d,e,f,g';

// Define function capitalize 
function capitalize(str) {
    var c = str.charCodeAt(0);
    if (97 <= c && c<= 122) c-=32 // http://www.ascii-code.com/

    return String.fromCharCode(c) + str.slice(1)
    // return str.charAt(0).toUpperCase() + str.slice(1)
}

// Remove all the commas and get the second element of the new string
var b = a.replace(/,/g, '').slice(1,2);
console.log(b); // b

// Capitalize the element
var result = capitalize(b);
console.log(result); // B
```

You can play with the above code [here](https://jsfiddle.net/ygodpva6/).

It's really easy to find something from this line `var b = a.replace(/,/g, '').slice(1,2);`. "string.slice()"" is chaining with "string.replace()" by a dot in between them, which means you don't have to assign the result of "string.replace()" to a new variable and apply "string.slice()" on it anymore. Therefore, we start wondering is it possible to make our capitalize() method chainable? The answer of course is YES.

Actually, if we modify the function to act as a constructor, store the elements as an array in an instance property, then return a reference to the instance in all prototype methods, you can give it the ability to chain. In this case, we only need to extend the String.prototype(add a new method called capitalize to the prototype of String class), it will work.

```javascript
/* Make capitalize method chainable */
String.prototype.capitalize = function() {
    var c = this.charCodeAt(0);
    if (97 <= c && c<= 122) c-=32 // http://www.ascii-code.com/

    return String.fromCharCode(c) + this.slice(1);
}
```

Then you can use it like this([the JSFiddle file](https://jsfiddle.net/ygodpva6/)):

```javascript
var a = 'a,b,c,d,e,f,g';
var result = a.replace(/,/g, '').slice(1,2).capitalize();
console.log(result) // B
```


#### 2. Example

[D3.js](https://d3js.org/) is a powerful Javascript library for data visualization and DOM manipulation. One of the most remarkable features of d3.js is the chaining coding style. Here is an example([JSFiddle file](https://jsfiddle.net/knk07rbj/)):

```javascript
d3.select("body") // Select "body" node of the DOM tree.
  .selectAll("div") // Select all the "div" elements under the "body" node. Here it will return a empty selection.
  .data([1, 2, 3, 4, 5, 6, 7]) // Get the dataset.
  .enter() // Returns placeholders for missing elements. 
  .append("div") // Create 7 new "div" elements and append to "body" in order.
  .text(function(d) { // Assign data to "div" elements in order.
    return d;
  })
```

If we take a look at the source code of D3.js, we will find some clues about why we are able to chain these methods.

```javascript
// Define d3_selectionPrototype
var d3_selectionPrototype = d3.selection.prototype = []; // Line 582 in d3.js

// d3/src/selection/selet.js
d3_selectionPrototype.select = function(selector) { 
    //...
    return d3_selection(subgroups);
};

// d3/src/selection/seletAll.js
d3_selectionPrototype.selectAll = function(selector) {
    //...
    return d3_selection(subgroups);
};

// d3/src/selection/data.js
d3_selectionPrototype.data = function(value, key) {
    //...
};

// d3/src/selection/append.js
d3_selectionPrototype.append = function(name) {
    //...
};
```

If you run [this SFiddle file](https://jsfiddle.net/knk07rbj/), you can see under the '__proto__' object, all the chainable methods will be shown.

#### 3. Summary

Chaining is just a syntax hack. It allows you to express complex operations in a small amount of code by reusing an initial operation.

Javascript passes all objects by reference, so you can pass these references back in every method. By returning `this` at the end of each method, you can create a class that is chainable. it helps to streamline code and make code more elegant and easier to read.















