---
layout: post
title: Javascript Design Pattern - Encapsulation
date: 2016-02-10
categories: [Javascript]
tags: [Javascript]
---

#### 1. Introduction

Encapsulation is used to hide internal data representation and implementation details in an object. This information hiding principle serves to reduce the interdependency of two actors in a system, which is known as 'decoupling'. There are 3 basic patterns that can be used to create objects:

- `Fully Exposed Object` - Simplest but provides only public members.

- `Private Methods Using Underscores` - Uses underscores to denote methods and attributes that are intended to be private.

- `Private Members Through Closures` - Uses closures to create true private members, which can only be accessed through the use of privileged methods.

<hr>

#### 2. Basic Patterns

Let's say we want to implement a class called "Phone" which is able to store data about a phone, and implement a method for displaying the phone's data in HTML. Here is an example of how it will be used:

```javascript
// Phone(imei, manufacture, model, color)
var iPhone = new Phone('35-780502-398494', 'Apple', 'iPhone 6s', 'silver');
iPhone.display();
```

2.1. `Fully Exposed Object`

```javascript
var Phone = function(imei, manufacture, model) {
    if(!this.checkImei(imei)) throw new Error('Invalid IMEI.');
    this.imei = imei;
    this.manufacture = manufacture || 'No manufacture specified';
    this.model = model || 'No model specified';
}

Phone.prototype = {
    checkImei: function(imei) {
        if(imei === undefined || typeof imei !== 'string') {
            return false;
        }

        imei = imei.replace(/-/. '');//Remove dashes.
        if(imei.length != 14) { // 14 digit IMEI
            return false;
        }
        
        return true;
    },

    display: function() {
        //...
    }
};
```

The above codes roughly implement a Phone class which is able to verify that the IMEI is valide when the object is created, and to display the given information as well. But the problem is that we don't have any control over what another programmer will assign to the attribute directly. For example, a phone may have multiple versions, each with its own IMEI. Therefore, another coder may create a function for selecting IMEI and use it to change the imei attribute directly, which means it's possible to skip the verification process and change the value of an attribute directly. Like this:

```javascript
iPhone.imei = '123-456789';
iPhone.display();
```

To resolve this problem, we have to introduce Accessor and Mutator methods for each attribute. An accessor method will get the value of an attribute while a mutator method will set the value of an attribute.

```javascript
var Phone = function(imei, manufacture, model) {
    this.setImei(imei);
    this.setManufacture(manufacture);
    this.setModel(model);
}

Phone.prototype = {
    checkImei: function(imei) {
        //...
    },
    getImei: function() {
        return this.imei;
    },
    setImei: function(imei) {
        if(!this.checkImei(imei)) throw new Error('Invalid IMEI.');
        this.imei = imei;
    },

    getManufacture: function() {
        return this.manufacture;
    },
    setManufacture: function(manufacture) {
        this.manufacture = manufacture || 'No manufacture specified';
    },

    getModel: function() {
        return this.model;
    },
    setModel: function(model) {
        this.model = model || 'No model specified';
    },

    display: function() {
        //...
    }
};
```


2.2. `Private Methods Using Underscores`

By adding an underscore to the beginning of each method or attribute, other programmers will know that it's intended to be private or is used internally, and accessing or setting it directly may have unintended consequences. Though this is not a measure to get at the root of the problem, it's less likely other programmers will do something unintentionally. 

```javascript
var Phone = function(imei, manufacture, model) {
    this.setImei(imei);
    this.setManufacture(manufacture);
    this.setModel(model);
}

Phone.prototype = {
    _checkImei: function(imei) {
        //...
    },
    getImei: function() {
        return this._imei;
    },
    setImei: function(imei) {
        if(!this.checkImei(imei)) throw new Error('Invalid IMEI.');
        this._imei = imei;
    },

    getManufacture: function() {
        return this._manufacture;
    },
    setManufacture: function(manufacture) {
        this._manufacture = manufacture || 'No manufacture specified';
    },

    getModel: function() {
        return this._model;
    },
    setModel: function(model) {
        this._model = model || 'No model specified';
    },

    display: function() {
        //...
    }
};
```

<hr>

2.3. `Private Members Through Closures`

In the beginning, let's talk a bit about clousures which is one of the most phenomenal features in Javascript and is widely used to create advanced functionalities in the large-scale applications. To understand closures, we have to introduce scope firstly. In Javascript(ECMAScript 5), there are two types of scope, global scope and function scope(the block scope is introduced in ECMAScript 6), respectively. A function can read the global variable directly:

```javascript
var a = 1;

(function f1() {
    console.log(a);
})(); // 1
```

But cannot read a variable inside a function from outside:

```javascript
function f1() {
    var a = 1;
}

console.log(a);
// Uncaught ReferenceError: a is not defined
```

Therefore, if you want to get the value of a variable inside a function scope from outside, how will you do that? A smart method is to define another function inside the original function and return that function:

```javascript
function f1() {
  var a = 1;
  function f2() {
    console.log(a);
  }
  return f2;
}

var result = f1();
result(); // 1
```

The reason we can do it in this way is because Javascript has a feature called "Chain Scope", which defines a principle that variables of father objects can be accessed by children objects and children objects will find all the father variables level by level. In the above case, function f2() is the closures. Simply put, closures is to define another function inside a function and the most important feature of closures is it's able to store the environment where it "borns". 

You can use closures to, for example, read a variable inside a function from outside, keep the variable in the memory and encapsulate private attributes or methods of an object:

```javascript
// Example 1
function createIncrementor(start) {
  return function () {
    return start++;
  };
}

var inc = createIncrementor(5);

inc() // 5
inc() // 6
inc() // 7

// Example 2
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = person('YeHuang');
p1.setAge(26);
p1.getAge() // 26
```

Back to the original problem: you need to create a variable that can only accessed internally. A closures seems to be a perfect fit! To create private attributes, you define variables in the scope of your constructor function. These attributes can be accessed by all functions defined within this scope, including privileged methods:

```javascript
var Phone = function(newImei, newManufacture, newModel) {
    
    // Private attributes
    var imei, manufacture, model;

    // Private method
    function checkImei(imei) {
        // ...
    }

    // Privileged methods
    this.getImei: function() {
        return imei;
    },
    this.setImei: function(newImei) {
        if(!this.checkImei(imei)) throw new Error('Invalid IMEI.');
        imei = newImei;
    },

    this.getManufacture: function() {
        return manufacture;
    },
    this.setManufacture: function(newManufacture) {
        manufacture = newManufacture || 'No manufacture specified';
    },

    this.getModel: function() {
        return model;
    },
    this.setModel: function(newModel) {
        model = model || 'No model specified';
    };

    // Constructor code
    this.setImei(newImei);
    this.setManufacture(newManufacture);
    this.setModel(newModel);
};

// Public, non-privileged methods
Phone.prototype = {
    display: function() {
        //...
    }
};
```




























