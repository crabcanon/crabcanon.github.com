---
layout: post
title: Javascript Design Pattern - Factory
date: 2016-02-22
categories: [Javascript]
tags: [Javascript]
---

#### 1. Introduction

The Factory pattern provides a creational way for creating objects. Trandionally, we use the class constructor and the `new` keyword to create and instantiate objects. Assume that we want to build a web service and cooperate with local car dealers to sell second-hand cars. Firstly, all the cars can be categorized based on different types of factors, such as manufacturers(Mercedes-Benz, Volvo, Volkswagen, Toyota, Nissan, Audi, BMW, etc.), vehicle type(Car, Truck, Minibus, Van, etc.), fuel type(Petrol, Diesel, Hybrid, Gas, Electric, etc.), gearbox type(Automatic, Manual) and so on. Secondly, cars will be provided by different dealers. Therefore, let's take a look at a basic example: customers will choose cars based on the vehicle type, and then cars will be inspected, washed, and transfered to our customers finally.

```javascript
/* A constructor for defining new vehicle shops */
var VehicleShop = function() {};
VehicleShop.prototype = {
    sellVehicles: function(options) {
        var vehicle;

        switch(options.vehicleType) {
            case 'Car':
                vehicle = new Car(options);
                break;
            case 'Truck':
                vehicle = new Truck(options);
                break;
        }

        vehicle.inspect();
        vehicle.wash();
        vehicle.transfer();

        return vehicle;
    }
};

/* A constructor for defining new cars */
function Car(options) {
    // default configurations
    this.brand = options.brand || 'Mercedes-Benz';
    this.gearbox = options.gearbox || 'Automatic';
    this.fuelType = options.fuelType || 'Petrol';
};
Car.prototype = {
    inspect: function() {
       return console.log('This car has passed the inspection!');
    },
    wash: function() {
       return console.log('This car has been washed!');
    },
    transfer: function() {
       return console.log('This car has been registered under your name.');
    }
};

/* A constructor for defining new trucks */
function Truck(options) {
    // default configurations
    this.brand = options.brand || 'Ford';
    this.gearbox = options.gearbox || 'Manual';
    this.fuelType = options.fuelType || 'Diesel';
    this.wheelSize = options.wheelSize || '22.5';
};
Truck.prototype = {
    inspect: function() {
        return console.log('This truck has passed the inspection!');
    },
    wash: function() {
        return console.log('This truck has been washed!');
    },
    transfer: function() {
        return console.log('This truck has been registered under your name!');
    }
};

// How to use?
var helsinkiShop = new VehicleShop();
var myCar = helsinkiShop.sellVehicles({
                vehicleType: 'Car',
                brand: 'Volkswagen',
                gearbox: 'Manual',
                fuelType: 'Petrol'
            });
var myTruck = helsinkiShop.sellVehicles({
                vehicleType: 'Truck',
                brand: 'Ford',
                gearbox: 'Manual',
                fuelType: 'Petrol',
                wheelSize: '24'
            });
                        
console.log(myCar instanceof Car); // true
console.log(myCar);

console.log(myTruck instanceof Truck); // true
console.log(myTruck);
```

[You can play with the code here.](https://jsfiddle.net/2tjdx863/1/)

Everything looks good until you want to make some changes. What if you want to add a new vehicle type to your lineup? This would require you to modify the VehicleShop constructor. The basic logic of VehicleShop doesn't change, but you still have to add some duplicated-like codes in the switch-case part. It's not a good style as the VehicleShop class seems to be tightly coupled with other classes. Therefore, we are going to introduce the `Simple Factory` and `The Factory Pattern` to resolve those problems.

#### 2. Simple Factory

The basic idea of Simple Factory is actually as same as a Singleton, which means creating a namespace(object) to contain the method. Put simply, pass off the "create a new instance" part of the method to a simple factory object:

```javascript
/* VehicleFactory namespace */
var VehicleFactory = {
    createVehicle: function(options) {
        var vehicle;

        switch(options.vehicleType) {
            case 'Car':
                vehicle = new Car(options);
                break;
            case 'Truck':
                vehicle = new Truck(options);
                break;
            case 'Minibus':
                vehicle = new Minibus(options);
                break;
            case 'Van':
                vehicle = new Van(options);
                break;
        }

        vehicle.inspect();
        vehicle.wash();
        vehicle.transfer();

        return vehicle;
    }
}

/* A constructor for defining new vehicle shops, improved */
var VehicleShop = function() {};
VehicleShop.prototype = {
    sellVehicles: function(options) {
        var vehicle = VehicleFactory.createVehicle(options);

        vehicle.inspect();
        vehicle.wash();
        vehicle.transfer();

        return vehicle;
    }
};
```











