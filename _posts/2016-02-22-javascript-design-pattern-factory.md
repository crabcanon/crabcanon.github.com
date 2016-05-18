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
    sellVehicle: function(options) {
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
var myCar = helsinkiShop.sellVehicle({
                vehicleType: 'Car',
                brand: 'Volkswagen',
                gearbox: 'Manual',
                fuelType: 'Petrol'
            });
var myTruck = helsinkiShop.sellVehicle({
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

#### 2. Simple Factory Pattern

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

        return vehicle;
    }
}

/* A constructor for defining new vehicle shops, improved */
var VehicleShop = function() {};
VehicleShop.prototype = {
    sellVehicle: function(options) {
        var vehicle = VehicleFactory.createVehicle(options);

        vehicle.inspect();
        vehicle.wash();
        vehicle.transfer();

        return vehicle;
    }
};
```

#### 3. True Factory Pattern

Our simple factory above is actually used to separate the process of creating a vehicle(method `createVehicle()`) from the original VehicleShop class and move it to a new object `VehicleFactory`. However, we will soon find that it will cause a new problem. Let's assume a situation: there are 100 vehicle shops in a country, and each of them sells 100 different types of products. As all the vehicle shops share one vehicle factory, we have to extend it with 10000 switch-cases, which is obviously not good for the further development. Therefore, a real factory pattern should be introduced in order to resolve this problem. Instead of using a new class or object to create vehicles, we will use a subclass(`class inheritance`), which means we are able to customize our VehicleFactory based on a real demand of each vehicle shop.

Let's firstly create an abstract VehicleShop class(a parent class of all the vehicle shop classes):

```javascript
/* VehicleShop class (parent) */
var VehicleShop = function() {};
VehicleShop.prototype = {
    sellVehicle: function(options) {
        var vehicle = this.createVehicle(options);

        vehicle.inspect();
        vehicle.wash();
        vehicle.transfer();

        return vehicle;
    },
    createVehicle: function(options) {
        throw new Error('Unsupported operation on an abstract class');    
    }
};
```

Then we create two subclasses `HelsinkiVehicleShop` and `EspooVehicleShop`, which indicate two vehicle shops located in two cities(Helsinki and Espoo) of Finland, inherited from above VehicleShop class:

```javascript
/* HelsinkiVehicleShop class (subclass) */
var HelsinkiVehicleShop = function() {};
extend(HelsinkiVehicleShop, VehicleShop); // We ignore the inheritance codes here.
VehicleShop.prototype.createVehicle = function(options) {
    var vehicle;

    switch(options.vehicleType) {
        case 'Car':
            vehicle = new HelsinkiCar(options); // Second-hand cars in Helsinki.
            break;
        case 'Truck':
            vehicle = new HelsinkiTruck(options); // Second-hand trucks in Helsinki.
            break;
        case 'Minibus':
            vehicle = new HelsinkiMinibus(options); // Second-hand minibuses in Helsinki.
            break;
        case 'Van':
            vehicle = new HelsinkiVan(options); // Second-hand vans in Helsinki.
            break;
    }

    return vehicle;  
};

/* EspooVehicleShop class (subclass) */
var EspooVehicleShop = function() {};
extend(EspooVehicleShop, VehicleShop); // We ignore the inheritance codes here.
VehicleShop.prototype.createVehicle = function(options) {
    var vehicle;

    switch(options.vehicleType) {
        case 'Car':
            vehicle = new EspooCar(options); // Second-hand cars in Espoo.
            break;
        case 'Truck':
            vehicle = new EspooTruck(options); // Second-hand trucks in Espoo.
            break;
        case 'Minibus':
            vehicle = new EspooMinibus(options); // Second-hand minibuses in Espoo.
            break;
        case 'Van':
            vehicle = new EspooVan(options); // Second-hand vans in Espoo.
            break;
    }

    return vehicle;  
};
```

Now you are able to buy a second-hand vehicle in a very flexible way(from both Helsinki or Espoo shops):

```javascript
/* Use cases for selling a vehicle */

// Buy a second-hand Volkswagen car from Helsinki Shop.
var helsinkiShop = new HelsinkiVehicleShop();
var myCarFromHelsinki = helsinkiShop.sellVehicle({
                vehicleType: 'Car',
                brand: 'Volkswagen',
                gearbox: 'Manual',
                fuelType: 'Petrol'
            });

// Buy a second-hand Volkswagen car from Espoo Shop.            
var espooShop = new EspooVehicleShop();
var myCarFromEspoo = espooShop.sellVehicle({
                vehicleType: 'Car',
                brand: 'Volkswagen',
                gearbox: 'Manual',
                fuelType: 'Petrol'
            });

```

The logic of above codes can be described as:

- Create a parent class and wrap all the general methods inside.
- Create subclasses and override(modify or extend) relevant factory methods based on your demands. 
- Defer the actual instantiation of specific objects to the subclasses.

#### 4. Summary

<mark>4.1. When to use the Factory Pattern?</mark>

- Dynamic Implementations: Create objects with the same interface but different implementations.
- Combining Setup Costs: If objects have complex but related setup costs, using a factory can reduce the amount of code needed for each.
- Abstracting small objects into one large object: A vehicle can be divided into several types: car, truck, minibus or van, but it might locate in different shops. If you don't want to tightly couple one of types to the larger object, but instead want to be able to choose one out of types at run-time, a factory method is ideal.
 
<mark>4.2. Benefits of the Factory Pattern</mark>

- Make your objects loosely coupled, which means it's much easier to swap classes or assign classes dynamically at run-time and it provide a flexible way to create parent classes and subclasses.

<mark>4.3. Drawbacks of the Factory Pattern</mark>

- It's easy to make us use it everywhere. However, you can make code simpler and easier to follow if most class instantiation is done in the open, with the `new` keyword and a constructor, instead of having a large amount of subclasses.


