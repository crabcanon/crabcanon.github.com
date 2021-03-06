---
layout: post
title: Javascript Design Pattern - Facade
date: 2017-06-13
categories: [Javascript]
tags: [Javascript]
---

#### 1. Introduction

As one of the most widely used design patterns, Facade simplifies complex interfaces and decouples the abstract workflow from a client's real implementation :dizzy_face:. To be more intuitive, I will explain this way: let's compare how people design a framework with how people use a framework. In order to fulfill all the pre-defined requirements, designers will usually break down a big system into a series of independent micro modules, and each module will be only responsible for one abstract task. This is where those primitive interfaces come from. By contrast, in order to achieve a practical task, users have to integrate different modules together to form a complete logic workflow. This is why libraries such as [three.js](https://threejs.org/) and [jQuery](https://jquery.com/) exist. For example, you don't have to struggle with a 3D scene rendering function by dealing with hundreds of lines of [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) if you use three.js instead, which is only one line code! It means three.js actually wraps up the whole logic behind and simplifies complex interfaces provided by WebGL in order to achieve rendering functionalities which share a same abstract logic.

Simply put, you could achieve same tasks without using Facade. However, as an organizational pattern, it will make your life easier and more manageable.

#### 2. Example

<mark>2.1. Requirements</mark>

I was involved into a project of developing a GIS-based map application in using [OpenLayers](https://openlayers.org/) before. One task was to create clustered icon layers([ol.source.Cluster](https://openlayers.org/en/latest/apidoc/ol.source.Cluster.html)) for multiple vector area layers, which contains a couple of sub-tasks:

- Create centroid point features based on the area layer and assign them to each corresponding icon layer, which means icon will be put in the center of each area geometry.
- Set key-values provided by the area feature to each icon feature's properties.
- Set style for each icon layer.

<mark>2.2. In theory</mark>

The basic coding logic could be:

- `Function A`: create centroid point features with specific properties for each icon layer.
- `Function B`: set styles for each icon layer.

A bunch of primitive OpenLayers APIs would be utilized, including but not limited to:

- [ol.geom.Point](https://openlayers.org/en/latest/apidoc/ol.geom.Point.html)
- [ol.geom.Geometry::getExtent](https://openlayers.org/en/latest/apidoc/ol.geom.Geometry.html#getExtent)
- [ol.extent::getCenter](https://openlayers.org/en/latest/apidoc/ol.extent.html#.getCenter)
- [ol.source.Cluster::getFeatures](https://openlayers.org/en/latest/apidoc/ol.source.Cluster.html#getFeatures)
- [ol.source.Cluster::addFeatures](https://openlayers.org/en/latest/apidoc/ol.source.Cluster.html#addFeatures)
- [ol.Feature](https://openlayers.org/en/latest/apidoc/ol.Feature.html)
- [ol.Feature::getGeometry](https://openlayers.org/en/latest/apidoc/ol.Feature.html#getGeometry)
- [ol.Feature::setId](https://openlayers.org/en/latest/apidoc/ol.Feature.html#setId)
- [ol.Feature::getId](https://openlayers.org/en/latest/apidoc/ol.Feature.html#getId)
- [ol.Feature::set](https://openlayers.org/en/latest/apidoc/ol.Feature.html#set)
- [ol.Feature::get](https://openlayers.org/en/latest/apidoc/ol.Feature.html#get)
- [ol.Feature::setStyle](https://openlayers.org/en/latest/apidoc/ol.Feature.html#setStyle)

<mark>2.3. In practice</mark>

First, let's check how does `Function A` look like without applying Facade?

```javascript
var areaLayerOneSource = getLayer('areaLayerOne').getSource(); // Vector data
var areaLayerTwoSource = getLayer('areaLayerTwo').getSource(); // Vector data
var iconLayerOneSource = getLayer('iconLayerOne').getSource().getSource(); // Cluster vector data
var iconLayerTwoSource = getLayer('iconLayerTwo').getSource().getSource(); // Cluster vector data
var iconFeatures = [];
var center = null;
var extent = null;
var point = null;
var newFeature = null;

// Generate & add features to icon layer one.
areaLayerOneSource.getFeatures().forEach(function(feature) {
  extent = feature.getGeometry().getExtent(); // Calculate the extent of the area geometry.
  center = ol.extent.getCenter(extent); // Calculate the center of the extent.
  point = new ol.geom.Point(center); // Generate a new Point geometry.
  newFeature = new ol.Feature({geometry: point}); // Generate a new vector Feature based on the point geometry.

  newFeature.setId(feature.getId()); // Set feature's properties.
  newFeature.set('prop1', feature.get('prop1'));
  newFeature.set('prop2', feature.get('prop2'));
  newFeature.set('prop3', feature.get('prop3'));

  iconFeatures.push(newFeature); // Push this generated feature to iconFeatures array.
});
iconLayerOneSource.addFeatures(iconFeatures);

// Generate & add features to icon layer two.
areaLayerOneSource.getFeatures().forEach(function(feature) {
  extent = feature.getGeometry().getExtent(); // Calculate the extent of the area geometry.
  center = ol.extent.getCenter(extent); // Calculate the center of the extent.
  point = new ol.geom.Point(center); // Generate a new Point geometry.
  newFeature = new ol.Feature({geometry: point}); // Generate a new vector Feature based on the point geometry.

  newFeature.setId(feature.getId()); // Set feature's properties.
  newFeature.set('prop4', feature.get('prop4'));
  newFeature.set('prop5', feature.get('prop5'));

  iconFeatures.push(newFeature); // Push this generated feature to iconFeatures array.
});
iconLayerTwoSource.addFeatures(iconFeatures);

```

We could easily find that the only difference is the part of setting feature's properties. Actually, it's a very bad practice to have duplicated code, especially when the amount of icon layers are dynamic. Therefore, let's introduce our `first Facade`, which could (1)avoid duplications and (2)wrap up complex interfaces.

```javascript
// First Facade
function createFeaturesForIconLayer(iconLayerSource, areaLayerSource, featureProps) {
  var iconFeatures = [];

  areaLayerSource.getFeatures().forEach(function(feature) {
    var extent = feature.getGeometry().getExtent();
    var center = ol.extent.getCenter(extent);
    var point = new ol.geom.Point(center);
    var newFeature = new ol.Feature({geometry: point});
    newFeature.setId(feature.getId());
    featureProps.forEach(function(prop) {
      newFeature.set(prop, feature.get(prop));
    });
    iconFeatures.push(newFeature);
  });

  iconLayerSource.addFeatures(iconFeatures);
}

// Usage
createFeaturesForIconLayer(iconLayerOneSource, areaLayerOneSource, ['prop1', 'prop2', 'prop3']);
createFeaturesForIconLayer(iconLayerTwoSource, areaLayerTwoSource, ['prop4', 'prop5']);

```

Same principle to `Function B`, we could implement our `second Facade` shown as following:

```javascript
// Second Facade
function setStylesForIconLayer(iconLayer, styleFn) {
  iconLayer.setStyle(function(feature) {
    return styleFn.getStyleForIconLayer(feature);
  });
}

// Usage
var styleOneFn = iconLayerOneStyle();
var styleTwoFn = iconLayerTwoStyle();
setStylesForIconLayer(iconLayerOne, styleOneFn);
setStylesForIconLayer(iconLayerTwo, styleTwoFn);

```

Finally, let's make the interface even simpler by applying our `third Facade` which constructs a combined function, known as `convenience function`, based on Function A and Function B.

```javascript
// Third Facade
function constructIconLayer(iconLayer, areaLayer, iconFeatureProps, styleFn) {
  var iconLayerSource = iconLayer.getSource().getSource();
  var areaLayerSource = areaLayer.getSource();

  createFeaturesForIconLayer(iconLayerSource, areaLayerSource, iconFeatureProps);
  setStylesForIconLayer(iconLayer, styleFn);
}

// Usage
var iconLayerOne = getLayer('iconLayerOne');
var areaLayerOne = getLayer('areaLayerOne');
var iconFeatureOneProps = ['prop1', 'prop2', 'prop3'];
var iconLayerOneStyleFn = iconLayerOneStyle();

var iconLayerTwo = getLayer('iconLayerTwo');
var areaLayerTwo = getLayer('areaLayerTwo');
var iconFeatureOneProps = ['prop4', 'prop5'];
var iconLayerTwoStyleFn = iconLayerTwoStyle();

constructIconLayer(iconLayerOne, areaLayerOne, iconFeatureOneProps, iconLayerOneStyleFn);
constructIconLayer(iconLayerTwo, areaLayerTwo, iconFeatureTwoProps, iconLayerTwoStyleFn);

```

#### 3. Summary

<mark>3.1. Benefits of the Facade Pattern</mark>

- It saves time and effort by allowing developers to write the combined code once and use it repeatedly.
- It avoids developers to deal with complex interfaces and could dramatically boost the cooperation efficiency.
- It reduces dependencies on outside code, which allows extra flexibility when developing applications.

<mark>3.2. Drawbacks of the Facade Pattern</mark>

- You may use too much to do too little! For example, according to my experience, if a convenience function's hierarchical layers are more than 3, it will become quite hard for other developers to maintain or extend the codes.

```javascript
// Layer 1
function parentTask() {
  childA();
  childB();
}

// Layer 2
function childA() {
  childA1();
  childA2();
}

// Layer 3
function childA1() {}
function childA2() {}

// Layer 2
function childB() {
  childB1();
  childB2();
}

// Layer 3
function childB1() {}
function childB2() {}

```

- As you warp up complex interfaces and expose some non-standard APIs, naming functions and writing comments become the most critical tasks. You should really spend time to think about which names would be most suitable and also make sure you write good comments for each function. Otherwise, other developers would completely get lost once they start reading your code. My suggestion is to think about the big picture and agree some interior protocols with your team members before a real implementation.
- You may not need an entire Facade-driven library to just implement a few simple tasks.
