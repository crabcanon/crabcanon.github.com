---
layout: post
title: AWS Lambda - Serverless Architecture(FaaS)
date: 2017-01-30
categories: [Javascript]
tags: [AWS Lambda, Serverless]
---

#### 1. Introduction

Recently, I read a very nice article about 'Serverless Architectures' - [click here](https://martinfowler.com/articles/serverless.html). This concept has became much hotter than ever before. Almost like a moment, the whole world starts to promote it - [click here](https://github.com/JustServerless/awesome-serverless). As I am a long-term user of BaaS services(Firebase, Auth0, etc.), it doesn't feel like any panic for me. However, there is one thing that dramatically beyonds my anticipation: FaaS(Function as a Service) is suddenly booming even though BaaS(Backend as a Service) is still robustly growing. It turns out that they are complementary to each other rather than a pair of competitors. That's because everyone is dreaming to create something cost effective(for both operational and development cost) and to be able to control every penny they spend. Meanwhile, it should be extremely easy to integrate, maintain and extend. 

#### 2. My first FaaS 

As FaaS naturally borns for microservices, it's a good idea to implement something that combined with a bunch of packages or modules. If you've heard about [GIS](http://www.esri.com/what-is-gis) before, you may have the same point of view as what I have: cloud microservices will finally eliminate the tranditional GIS-based desktop softwares. Therefore, my first FaaS will be a simple GIS analysis function powered by [Serverless Framework](https://serverless.com/), [AWS Lambda](https://aws.amazon.com/lambda/) and [Turf.js](https://github.com/Turfjs/turf).

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
  const geometryTypeError = {'message': 'GeoJSON must be either Feature or FeatureCollection.', 'line': null};
  const hintErrors = geojsonhint.hint(polygon);
  let errors = [];

  if (geometryTypes.indexOf(polygon.type) === -1) errors.push(geometryTypeError);
  if (hintErrors.length !== 0) errors.concat(hintErrors);

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
  const result = measureArea(event.geojson);
  const response = {
    statusCode: null,
    body: null,
  };

  if (errors.length !== 0) {
    Object.assign(response, {statusCode: 400, body: JSON.stringify(errors)});
    callback(null, response);
    return;
  }

  Object.assign(response, {statusCode: 200, body: JSON.stringify(result)});
  callback(null, response);
};
```

* Publish to AWS

```bash
$ serverless deploy
```

* Test online

![Test FaaS Online](/assets/img/blogs/20170130-1.gif)


     


