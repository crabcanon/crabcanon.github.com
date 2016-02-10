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

<hr>

2.3. `Private Members Through Closures`