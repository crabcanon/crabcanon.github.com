---
layout: post
title: Javascript Design Pattern - Inheritance
date: 2016-02-13
categories: [Javascript]
tags: [Javascript]
---

#### 1. Introduction

Suppose you define several classes and each of them need to have a method called "toString". How do you implement it? The most straight way is to copy and paste a toString method declaration into each class, but then each time you need to change how the method works, you would have to make the change to every class. In OO programming, we cannot tolerate `duplicated code` and `tightly coupled code`! Therefore, if instead you create a ToStringProvider class and make other classes inherit from it, this method would be declared once in only one place.

There are 3 ways to create Inheritance in Javascript, `Classical Inheritance`, `Prototypal Inheritance` and `Mixin Classes`, respectively. We will introduce them one by one as following.

#### 2. Classical Inheritance

Firstly, let's talk a bit about `Prototype Chain`. Javascript is a prototype-based language and almost everything in Javascript is an object. Objects contain named properties which can be accessed with `object.propName` or object['propName']. Each object has an internal property called `prototype`, which links to another object. The prototype object has a prototype object of its own, and so on, which is referred to as the prototype chain. If you follow an object's prototype chain, you will eventually reach the core object prototype whose prototype is `null`, signalling the end of the chain. 

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


*To be continued...*











