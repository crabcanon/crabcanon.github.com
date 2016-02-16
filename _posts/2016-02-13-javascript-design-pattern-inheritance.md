---
layout: post
title: Javascript Design Pattern - Inheritance
date: 2016-02-13
categories: [Javascript]
tags: [Javascript]
---

#### 1. Introduction

Suppose you define several classes and each of them need to have a method called "toString". How do you implement it? The most straight way is to copy and paste a toString method declaration into each class, but then each time you need to change how the method works, you would have to make the change to every class. In OO programming, we cannot tolerate duplicated code or tightly coupled code! Therefore, if instead you create a ToStringProvider class and make other classes inherit from it, this method would be declared once in only one place.

There are 2 ways to create Inheritance in Javascript, `Classical Inheritance` and `Prototypal Inheritance`, respectively. We will introduce them one by one as following.

#### 2. Classical Inheritance

Firstly, let's talk a bit about `Prototype Chain`. Javascript is a prototype-based language and almost everything in Javascript is an object. Objects contain named properties which can be accessed with "object.propName" or object['propName']. Each object has an internal property called `prototype`, which links to another object. The prototype object has a prototype object of its own, and so on, which is referred to as the prototype chain. If you follow an object's prototype chain, you will eventually reach the core object prototype whose prototype is `null`, signalling the end of the chain. 

Now let's create a class called "Language":

```javascript
/* Class Language */
function Language(name) {
    this.name = name;
}

Language.prototype.getName = function() {
    return this.name;
}

// How to use it?
var language = new Language('python');
language.getName(); // python
```

Then, we create a class "Javascript" that inherits from "Language":

```javascript
/* Class Javascript */
function Javascript(name, frameworks) {
    Language.call(this, name); // Call the superclass's constructor in the scope of this.
    this.frameworks = frameworks; // Add an attribute to Javascript.
}

Javascript.prototype = new Language(); // Set up the prototype chain.
Javascript.prototype.constructor = Javascript; // Set the constructor attribute to Javascript.
Javascript.prototype.getFrameworks = function() { // Add a method to Javascript.
    return this.frameworks;
};
```

The logic of above codes can be described as:

- Create a constructor function called "Javascript".
- Within the Javascript constructor, call the superclass's(Language) constructor, and pass in the name argument. 
- Set up the prototype chain, which means set the subclass's prototype to point to an instance of the superclass. As mentioned before, every object has an attribute called prototype which points to either another object or to null. When a member of an object is accessed(like language.getName), Javascript looks for this member in the prototype object if it's doesn't exist in the current object. If it's not found there, it will continue up the chain, accessing each objects' prototype until the member is found(or until the prototype is null).
- Because you point the Javascript.prototype to an instance of Language, the constructor attribute is wiped out. Therefore, you have to set the constructor attribute of subclass back to subclass itself.
- Finally, add new methods to the subclass.

[Here is a jsfiddle file by which you could see what will happen when you instantiate Language or Javascript Class(PS: open the javascript console of your browser to check the results).](https://jsfiddle.net/wLag0fwb/)

Actually, in order to make things easier, you can wrap the whole process in a function, called `extend`:

```javascript
/* Extend function */
function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

// How to use it?
function Javascript(name, frameworks) {
    Javascript.superclass.constructor.call(this, name);
    this.frameworks = frameworks;
}
extend(Javascript, Language);

Javascript.prototype.getFrameworks = function() {
    return this.frameworks;
};
```


#### 3. Prototypal Inheritance

The classical approach of inheritance is trying to structure an object with a couple of steps - (a) define a class, and (b) instantiate that class to create a new object which has its own copies of all instance attributes and a link to the single copy of each of the instance methods.

In prototypal inheritance, benefiting from the Javascript Prototype Chain, we only need to simply create an object and then reuse it to create the inheritance:

```javascript
/* Language Prototype Object */
var Language = {
    name: 'default name',
    getName: function() {
        return this.name;
    }
};

/* Javascript Prototype Object */
var Javascript = clone(Language);
Javascript.frameworks = []; // Default value.
Javascript.getFrameworks = function() {
    return this.frameworks;
}

// How to use it?
var a = [];
a[0] = clone(Javascript);
a[0].name = 'Javascript';
a[0].frameworks = 'AngularJS';

a[1] = clone(Javascript);
a[1].name = 'Javascript';
a[1].frameworks = 'React';
```

You may notice that there is a function called `clone()`. It's actually the key point of prototypal inheritance, which looks like this:

```javascript
/* Clone function */

function clone(object) {
    function F() {} // Create a new and empty function F.
    F.prototype = object; // Set the prototype attribute of F to the prototype object, which means point prototype attribute to the prototype object and it will provide links to all the inherited members through prototype chain.
    return new F; // Return a completely empty cloned object, except for the prototype attribute.
}
```









