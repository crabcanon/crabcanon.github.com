---
layout: post
title: Javascript Design Pattern - Singleton
date: 2016-02-16
categories: [Javascript]
tags: [Javascript]
---

#### 1.Introduction

Singleton restricts the instantiation of a class to one object, which means it provides a way to group code into a logical unit that can be accessed through a single variable. By using singleton, you are able to group all the initialization code in one place and use them as the a global resource. The following list shows what you could do with singleton:

- Namespacing: reduces the number of global variables.
- Branching: allows you to use common utility functions without worring about different behaviors of different browsers which may generate bugs.
- Organizes your code in a consistent manner, which increases the readability and maintainability or your code.

#### 2. Namespacing

Why is namespacing so important? The reason is pretty straightforward: everything in Javascript can be overwritten. When developers cooperate with each other working on a large-scale application, it's really easy to have the namespacing collision. For example, one developer may define a function like "function findLocation() {}", later because other developers have no clue that this namespacing has already been declared, they may accidently reuse this namespacing for other purposes, such as "var findLocation = $('find-location-button')". In this case, the "findLocation" variable has been overwritten, and this error would be extremely time-consuming to find for sure. 

Therefore, one of the best ways to prevent accidentally overwriting variables is to namespace your code within a singleton object:

```javascript
/* Using a namespace */
var ArrayManipulation = {
    mapArray: function(arr) {
        //...
    },
    sliceArray: function(arr) {
        //...
    },
    reverseArray: function(arr) {

    },
    // Other methods can go here as will
}

// How to use?
var results = ArrayManipulation.mapArray(arr);

// If other developers declare variables with the name, such as
// mapArray, sliceArray or reverseArray, it will not cause the 
// variables overwriting bugs. 
var mapArray = $('map-array-button'); // This is fine, nothing was overwritten.
```

Furthermore, here is a good practice that you may utilize. We will always use code from more than one source when developing an application, such as library code, advertiser code and badge code, in addtion to aything we write. To prevent namespacing collision, we can put all your code under a single variable, which can help you to group all of your code and data within objects or singletons under that single global variable.

#### 2. Singleton with Private Members

Though we know creating private methods is very memory-inefficient because a new copy of the method would be created for each instance. But because singleton objects are only instantiated once, you can use private members without worring about memory. As metioned in the article [Javascript Design Pattern - Encapsulation](https://yehuang.me/javascript/2016/02/10/javascript-design-pattern-encapsulation/), `underscore notation` or `closures` could be utilized. 

<mark>2.1. Using Underscore Notation</mark>

```javascript
/* DataParser singleton, converts character delimited strings into arrays */
GiantCorp.DataParser = {
    // Private methods.
    _stripWhitespace: function(str) {
        return str.replace(/\s+/,'');
    },
    _stringSplit: function(str, delimiter) {
        return str.split(delimiter);
    },

    // Public method.
    stringToArray: function(str, delimiter, stripWS) {
        if(stripWS) {
            str = this._stripWhitespace(str);
        }
        var outputArray = this._stringSplit(str, delimiter);
        return outputArray;
    }
};
```

<mark>2.2. Using Closures</mark>

```javascript
/* Template of Singleton with Private Members by Closures */
MyNameSpace.Singleton = (function() {
    // Private members.
    var privateAttr1 = [1, 2, 3];
    var privateAttr2 = false;

    function privateMethod1() {
        //...
    }
    function privateMethod2() {
        //...
    }

    return { // Public members
        publicAttr1: true,
        publicAttr2: 10,

        publicMethod1: function() {
            //...
        },
        publicMethod2: function() {
            //...
        }
    };
})();
```

>Key point: we have to use different syntax to define private and public members. `Private attributes` must be declared using "var", or else they will be made global. `Private methods` are declared as "function funcName(args) {...}", without semicolon needed after the closing bracket. `Public attributes` are declared as "attributeName: attributValue". `Public methods` are declared as methodName: "function(args) {...}".

Back to the topic, we will now use closures to rewrite the previous example:

```javascript
/* DataParser singleton, converts character delimited strings into arrays */
/* Using closures */
GiantCorp.DataParser = (function() {
    // Private attributes.
    var whitespaceRegex = /\s+/;

    // Private methods.
    function stripWhitespace(str) {
        return str.replace(whitespaceRegex, '');
    }
    function stringSplit(str, delimiter) {
        return str.split(delimiter);
    }

    return { // Public methods
        stringToArray: function(str, delimiter, stripWS) {
            if(stripWS) {
                str = stripWhitespace(str);
            }
            var outputArray = stringSplit(str, delimiter);
            return outputArray;
        }
    };
})();
```

#### 3. Lazy Instantiation

Lazy Instantiation is inherited from a design pattern called lazy loading, which can be defined as "defer initialization of an object until the point at which it's needed". If you have a singleton that is expensive to configure, it might make more sense to defer instantiation until it's needed. Instead of calling Singleton.methodName(), you would call Singleton.getInstance().methodName(). The getInstance method is a static method which is used to check whether the singleton has been instantiated or not. 

```javascript
/* General skeleton for a lazy loading singleton */
MyNamespace.Singleton = (function() {
    var uniqueInstance; // Private attribute that holds the single instance.
    function constructor() { // All of the normal singleton code goes here.
        //...
    }

    return {
        getInstance: function() {
            if(!uniqueInstance) { // Only if the instance doesn't exist
                uniqueInstance = constructor();
            }
            return uniqueInstance;
        }
    }
})();
```

#### 4. Branching

Branching is a technique that allows you to encapsulate browser differences into dynamic methods that get set at run-time. For example, we may create a method to return an XHR object which is an instance of the XMLHttpRequest class for most browsers and an instance of ActiveX class for older versions of IE. Therefore, we are able to assign the browser-specific code only once when the script loads.

```javascript
/* SimpleXhrFactory singleton */
var SimpleXhrFactory = (function() {
    // The 3 different branches
    var standard = {
        createXhrObject: function() {
            return new XMLHttpRequest();
        }
    };

    var activeXNew = {
        createXhrObject: function() {
            return new ActiveXObject('Msxml2.XMLHTTP');
        }
    };

    var activeXOld = {
        createXhrObject: function() {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    };

    // Assign the branch according to the specific browser
    var testObject;
    try {
        testObject = standard.createXhrObject();
        return standard; // if no error, return standard
    }
    catch(e) {
        try {
            testObject = activeXNew.createXhrObject();
            return activeXNew; // if no error, return activeXNew
        }
        catch(e) {
            try {
                testObject = activeXOld.createXhrObject();
                return activeXOld; // if no error, return activeXOld
            }
            catch(e) {
                throw new Error('No XHR object found in this browser');
            }
        }
    }
})();
```


#### 5. Summary

<mark>5.1. Benefits of Singleton</mark> 

- Well-organized code.
- Aviods namespacing collision.
- Separates your code from third-party library.
- Improve the performance to the end user (lazy loading and branching).

<mark>5.2. Drawbacks of Singleton</mark>

- Has the potential to tightly couple modules together.
- Makes your code harder to unit test because of the above reason(singleton is best reserved for namespacing and branching, therefore, coupling isn't a big problem in this case).


