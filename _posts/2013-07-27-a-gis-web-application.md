---
layout: post
title: A GIS-based Web Application
date: 2013-07-27
categories: [GIS]
tags: [Geoserver, OpenLayers, Apache Tomcat]
---

#### Youtube

<iframe width="100%" height="420" src="//www.youtube.com/embed/HJ3vejLnQ3g" frameborder="0" allowfullscreen></iframe>

#### [Youku (China)](http://v.youku.com/v_show/id_XNTcyOTA3ODEy.html?from=y1.7-1.2)

#### 1. Background

This demo belongs to one of my practical experiments by which I try to create a GIS-based mockup from beginning to end. 

To develop a GIS-based application, we have to follow a specific workflow listed as following:

* Collecting, manipulating and managing the spatial data
* Building Models for the GIS analysis 
* Executing the analysis based on data and models
* Visualizing computational results of the analysis
* Sharing results with users

In this project, tasks mentioned above can be separately assigned to a set of GIS-related softwares listed below:

* Applying desktop softwares, such as [ArcGIS](http://resources.arcgis.com/en/home/) or [QGIS](http://www.qgis.org/) for data manipulation
* Working with [GeoServer](http://docs.geoserver.org/stable/en/user/community/python/index.html) for publishing and managing the spatial data and GIS analysis models
* Using [Pysal](https://code.google.com/p/pysal/) and [Matplotlib](http://matplotlib.org/) for testing the implementation of GIS models and employing some WPS free sources, such as [GeoServer Python Extension](http://docs.geoserver.org/stable/en/user/community/python/overview.html), [Zoo Project](http://zoo-project.org/), [PyWPS](http://pywps.wald.intevation.org/) or [52north](http://52north.org/) to compile models
* Using OpenStreetMap-based services, such as [OpenLayers](http://www.openlayers.org/), [MapBox](http://mapbox.com/), [MapQuest](http://www.mapquest.com/) or [Leaflet](http://leafletjs.com/index.html), to build the front-end interface.

#### 2. Introduction

This web application is mainly focused on implementing one concept from GIS called [Web Processing Service](http://www.opengeospatial.org/standards/wps). Generally, you can use this app to:

- Execute fundamental GIS-based tasks by executing 183 basic WPS analysis modules, such as buffer, area, boundary, centroid, contains, convexHull, crosses, densify, difference, disjoint, intersection, intersects, touches, simplify, reproject, splitPolygon, union, within and so on.
- Execute more complicated tasks by executing another 4 different kinds of WPS analysis modules, “py:BufferSplit”, “py:SCBI”, “py:Simplify and ConvexHull” and “py:disbear”, respectively.
- Edit (draw points/lines/polygons or delete input/output features) the Vector Layer and the Result Layer.
- Locate any place that you would like to check. You can locate the place by either inputting the text addresses or inputting the coordinates of that place.
- View the attributes’ values of the WMS map layers.

An important advantage of using this application is the low cost of learning for people to implement the GIS WPS analysis models. The traditional GIS desktop softwares are too much demands for specialized knowledge of GIS because of the complicated interactive operations between machines and users and the tedious workflows from data management to data visualization. This application provides a easy way for people to enhance their decision-making abilities. Just open up your browser, you can explore the spatial relationships between objects based on a map.

#### 3. Prerequisites

- [Apache HTTP Server 2.2](http://httpd.apache.org/download.cgi)
- [Apache Tomcat 6.0](http://tomcat.apache.org/download-60.cgi)
- [Geoserver 2.3.X Web Archive](http://geoserver.org/display/GEOS/Download)
- [Python Scripting Extension of Geoserver](http://docs.geoserver.org/stable/en/user/community/scripting/installation.html)
- [Geoserver WPS plugin](http://docs.geoserver.org/stable/en/user/extensions/wps/install.html)
- [Java JDK 1.7.0 and Java jre7](http://www.oracle.com/technetwork/java/index.html)
- [OpenLayers proxy.cgi](http://trac.osgeo.org/openlayers/browser/trunk/openlayers/examples/proxy.cgi)

Optional tools include:

- [Quantum GIS](http://www.qgis.org/)
- [ArcGIS](http://www.esri.com/software/arcgis)
- [Sublime Text](http://www.sublimetext.com/) or [Atom](https://atom.io/)


#### 4. How to deploy a GIS-based application by Geoserver and Tomcat?

- Install Apache HTTP Server 2.2
- Install Apache Tomcat 6.0
- Install Geoserver on Apache Tomcat Server
- Deploy Geoserver WPS plugins(If you need)
    +  Download [Geoserver WPS extension](http://docs.geoserver.org/stable/en/user/extensions/wps/install.html)
    +  Extract files to the geoserver/WEB-INF/lib
    +  restart the Apache Tomcat 6.0
- Install Python Scripting Extension of Geoserver(If you need)
    - Place the Python Scripting Extension of Geoserver in the directory `geoserver\WEB-INF\lib` and restart the Apache Tomcat 6.0. You will find that a new folder named “scripts” is created in the directory `geoserver\data`. Place the WPS python files in the directory `geoserver\data\scripts\wps`. You can also customize your own WPS modules by writing this sort of python scripts. Just place the python file in this directory and the WPS builder of Geoserver will automatically connect them with our web application. All the python WPS modules will be shown on the list with the name `py:XXXX`.

- Configure the proxy.cgi parameters in order to solve the Browser Cross Domain problem
    - Create a new folder named “cgi” in the directory geoserver\WEB-INF and place the OpenLayers proxy.cgi in it. Open the proxy.cgi and add a new array value `localhost:8080` in the array `allowedHosts`. Find a XML file named "web.xml" in the directory `geoserver\WEB-INF` and add codes shown as following:

```xml
<servlet>
        <servlet-name>cgi</servlet-name>
        <servlet-class>org.apache.catalina.servlets.CGIServlet</servlet-class>

        <init-param>
            <param-name>debug</param-name>
            <param-value>0</param-value>
        </init-param>
        <init-param>
            <param-name>cgiPathPrefix</param-name>
            <param-value>WEB-INF/cgi</param-value>
        </init-param>
        <init-param>
            <param-name>executable</param-name>
            <param-value>c:/Python27/python.exe</param-value>
        </init-param>
        <init-param>
            <param-name>passShellEnvironment</param-name>
            <param-value>true</param-value>
        </init-param>
        
        <load-on-startup>5</load-on-startup>
    </servlet>
    
    <!-- The mapping for the default servlet -->
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>/</url-pattern>    
    </servlet-mapping>

    <servlet-mapping>
        <servlet-name>cgi</servlet-name>
        <url-pattern>/cgi/*</url-pattern>
    </servlet-mapping>
```

- [Publish a Shapefile](http://docs.geoserver.org/stable/en/user/gettingstarted/shapefile-quickstart/index.html)
- Run and test the application
Place the application codes package in the directory geoserver\data\www. Restart your Apache Tomcat Service and click the link shown as following to test whether the application is successfully deployed or not (For example: http://localhost:8080/geoserver/www/GISAppDev.html). It will take a few minutes when you restart the Tomcat and reload the application. 









