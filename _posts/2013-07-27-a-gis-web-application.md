---
layout: post
title: A GIS-based Web Application
date: 2013-07-27
categories: [GIS]
tags: [Geoserver, OpenLayers, Apache Tomcat]
---

####Youtube

<iframe width="100%" height="420" src="//www.youtube.com/embed/HJ3vejLnQ3g" frameborder="0" allowfullscreen></iframe>

####Youku (China)

<iframe width="100%" height="420" src="http://player.youku.com/embed/XNTcyOTA3ODEy" frameborder="0" allowfullscreen></iframe>

####1. Background

This demo belongs to one of my practical experiments by which I try to learn how to make a GIS-based mockup from beginning to end. 

To develop a GIS-based application, we have to follow a specific workflow listed as following:

* Collecting, manipulating and managing the spatial data
* Building Models for the GIS analysis 
* Executing the GIS analysis based on data and models
* Visualizing computational results of the GIS analysis
* Sharing results with users

In this project, tasks mentioned above can be separately assigned to a set of GIS-related softwares listed below:

* Applying desktop softwares, such as [ArcGIS](http://resources.arcgis.com/en/home/) or [QGIS](http://www.qgis.org/) for data manipulation
* Working with [GeoServer](http://docs.geoserver.org/stable/en/user/community/python/index.html) for publishing and managing the spatial data and GIS analysis models
* Using [Pysal](https://code.google.com/p/pysal/) and [Matplotlib](http://matplotlib.org/) for testing the implementation of GIS models and employing some WPS free sources, such as [GeoServer Python Extension](http://docs.geoserver.org/stable/en/user/community/python/overview.html), [Zoo Project](http://zoo-project.org/), [PyWPS](http://pywps.wald.intevation.org/) or [52north](http://52north.org/) to compile models
* Using OpenStreetMap-based services, such as [OpenLayers](http://www.openlayers.org/), [MapBox](http://mapbox.com/), [MapQuest](http://www.mapquest.com/) or [Leaflet](http://leafletjs.com/index.html), to build the front-end interface.





