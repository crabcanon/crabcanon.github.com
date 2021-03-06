---
layout: post
title: AWS Lambda - Serverless Architecture(FaaS)
date: 2017-01-30
categories: [Javascript]
tags: [AWS Lambda, Serverless]
---

#### 1. Introduction

Recently, I read a very nice article about 'Serverless Architectures' :point_right: [link](https://martinfowler.com/articles/serverless.html). This concept has became much hotter than ever before, and here is a list to show how the world madly promotes it :point_right: [check](https://github.com/JustServerless/awesome-serverless). As I am a long-term user of BaaS services(Firebase, Auth0, etc.), it doesn't feel like a panic attack for me. However, there is one thing that beyonds my anticipation: [FaaS(Function as a Service)](https://en.wikipedia.org/wiki/Function_as_a_Service) is suddenly booming when [BaaS(Backend as a Service)](https://en.wikipedia.org/wiki/Mobile_backend_as_a_service) is robustly growing. It turns out that they are complementary to each other rather than a pair of rivals. Everyone dreams to create something with high performance, while cost effective(for both operational and development cost) and extremely easy to integrate, maintain and extend. Most important, we hope that every penny spent is completely under control. That's why serverless is so welcome.

> If your PaaS can efficiently start instances in 20ms that run for half a second, then call it serverless. - [Adrian Cockcroft](https://twitter.com/adrianco)

#### 2. My first FaaS

As FaaS is a nature-born killer for micro-services, it's a good idea to implement something combined with a series of independent modules and has the potential to chain workflows together. If you've heard about [GIS](http://www.esri.com/what-is-gis), you may come up with the same point of view as what I have: cloud micro-services will play a big role in GIS industry soon or even will eliminate most of the works done by today's GIS-based desktop softwares. Therefore, my first FaaS will refer to a simple GIS analysis module powered by [Serverless Framework](https://serverless.com/), [AWS Lambda](https://aws.amazon.com/lambda/) and [Turf.js](https://github.com/Turfjs/turf).

<hr>
<mark>Step by step</mark>
<hr>

* Install `serverless` and setup an `aws-nodejs` project

```bash
$ npm install -g serverless
$ mkdir turf-area && cd $_
$ serverless create --template aws-nodejs
$ npm init
$ npm install --save @mapbox/geojsonhint @turf/area
$ mkdir lib && cd $_
$ touch area.js lint.js
```

Project structure should look like this:

![Project structure](/assets/img/blogs/20170130-1.png)

*  [Setup AWS credentials]((https://serverless.com/framework/docs/providers/aws/guide/credentials/))

```bash
$ serverless config credentials --provider aws --key YOUR-AWS-KEY --secret YOUR-AWS-SECRET
```

* Config serverless.yml

```yml
service: turf-area

provider:
  name: aws
  runtime: nodejs6.10

functions:
  area:
    handler: handler.area
    description: Takes one or more features and returns their area in square meters.
    events:
      - http:
          path: turf/area
          method: post
          cors: true
```

* Code `lib/area.js`

```javascript
'use strict';

const area = require('@turf/area');

function measureArea(polygon) {
  return area(polygon);
}

module.exports.measureArea = measureArea;
```

* Code `lib/lint.js`

```javascript
'use strict';

const geojsonhint = require('@mapbox/geojsonhint');

function lint(polygon) {
  const geometryTypes = ['Feature', 'FeatureCollection'];
  const geometryTypeError = {'message': 'GeoJSON must be either Feature or FeatureCollection.'};
  const hintErrors = geojsonhint.hint(polygon);
  let errors = [];

  if (geometryTypes.indexOf(polygon.type) === -1) errors.push(geometryTypeError);
  if (hintErrors.length !== 0) errors.push(...hintErrors);

  return errors;
}

module.exports.lint = lint;
```

* Code `handler.js`

```javascript
'use strict';

const lint = require('./lib/lint').lint;
const measureArea = require('./lib/area').measureArea;

module.exports.area = (event, context, callback) => {
  const errors = lint(event.geojson);
  let result = null;
  const response = {
    statusCode: null,
    body: null,
  };

  if (errors.length !== 0) {
    Object.assign(response, {statusCode: 400, body: errors});
    callback(null, response);
    return;
  }

  result = measureArea(event.geojson);
  Object.assign(response, {statusCode: 200, body: JSON.stringify(result)});
  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

```

* Publish to AWS Lambda and expose the corresponding AWS Gateway API

```bash
$ serverless deploy
```

* Test online

![Test FaaS Online](/assets/img/blogs/20170130-2.gif)
