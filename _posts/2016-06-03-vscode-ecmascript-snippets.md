---
layout: post
title: Javascript(ECMAScript) Snippets for VS Code
date: 2016-06-03
categories: [Development Environment]
tags: [Visual Studio Code]
---

#### 1. [Javascript(ES6) Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)

1.1. Installation

Launch VS Code Quick Open (⌘+P), paste the following command, and type enter.

```
> ext install JavaScriptSnippets
```

1.2. [Snippets](https://github.com/xabikos/vscode-javascript/blob/master/snippets/snippets.json)

Below is a list of all available snippets and the triggers of each one. The → means the TAB key.

<hr>
<mark>Import and export</mark>
<hr>

`imp→`: import

```javascript
// Imports entire module statement in ES6 syntax.
import module from 'module';
```

`imd→`: importDestructing

```javascript
// Imports only a portion of the module in ES6 syntax.
import {  } from 'module';
```

`ime→`: importEverything

```javascript
// Imports everything as alias from the module in ES6 syntax.
import * as alias from 'module';
```

`ima→`: importAs

```javascript
// Imports a specific portion of the module by assigning a local alias in ES6 syntax.
import {originalName as alias } from 'module';
```

`enf→`: exportNamedFunction

```javascript
// Export named function in ES6 syntax.
export const functionName = (params) =>  {
    
};
```

`edf→`: exportDefaultFunction

```javascript
// Export default function in ES6 syntax.
export default (params) =>  {
    
};
```

`ecl→`: exportClass

```javascript
// Export default class in ES6 syntax.
export default class className {
    
};
```

`ece→`: exportClassExtends

```javascript
// Export default class which extends a base one in ES6 syntax.
export default class className extends baseclassName {
    
};
```

<hr>
<mark>Class helpers</mark>
<hr>

`con→`: constructor

```javascript
// Add default constructor in a class in ES6 syntax.
constructor(params) {
    
}
```

`met→`: method

```javascript
// Creates a mehtod inside a class in ES6 syntax.
methodName(params) {
    
}
```

`pge→`: propertyGet

```javascript
// Creates a getter property inside a class in ES6 syntax.
get propertyName() {
    return this.;
}
```

`pse→`: propertySet

```javascript
// Creates a setter property inside a class in ES6 syntax.
set propertyName(value) {
    ;
}
```

<hr>
<mark>Various methods</mark>
<hr>

`fre→`: forEach

```javascript
// Creates a forEach statement in ES6 syntax.
array.forEach(currentItem => {
    
});
```

`fof→`: forOf

```javascript
// Iterating over property names of iterable objects.
for(let item of object) {
    
}
```

`fin→`: forIn

```javascript
// Iterating over property values of iterable objects.
for(let item in object) {
    
}
```

`afn→`: anonymousFunction

```javascript
// Creates an anonymous function in ES6 syntax.
(params) => {
    
}
```

`nfn→`: namedFunction

```javascript
// Creates a named function in ES6 syntax.
const name = (params) => {
    
}
```

`dob→`: destructingObject

```javascript
// Creates and assigns a local variable using object destructing.
const {propertyName} = objectToDestruct;
```

`dar→`: destructingArray

```javascript
// Creates and assigns a local variable using array destructing.
const [propertyName] = arrayToDestruct;
```

`sti→`: setInterval

```javascript
// Executes the given function at specified intervals in ES6 syntax.
setInterval(() => {
    
}, intervalInms);
```

`sto→`: setTimeOut

```javascript
// Executes the given function after the specified delay in ES6 syntax.
setTimeout(() => {
    
}, delayInms);
```


<hr>
<mark>Console methods</mark>
<hr>

`cas→`: consoleAssert

```javascript
// If the specified expression is false, 
// the message is written to the console along with a stack trace.
console.assert(expression, object);
```

`ccl→`: consoleClear

```javascript
// Clears the console.
console.clear();
```

`cco→`: consoleCount

```javascript
// Writes the the number of times that
// count() has been invoked at the same line and with the same label.
console.count(label);
```

`cdi→`: consoleDir

```javascript
// Prints a JavaScript representation of the specified object.
console.dir(object);
```

`cer→`: consoleError

```javascript
// Displays a message in the console and also includes a stack trace 
// from where the method was called.
console.error(object);
```

`cgr→`: consoleGroup

```javascript
// Groups and indents all following output by an additional level, 
// until console.groupEnd() is called.
console.group("label");
```

`cge→`: consoleGroupEnd

```javascript
// Closes out the corresponding console.group().
console.groupEnd();
```

`clg→`: consoleLog

```javascript
// Displays a message in the console.
console.log(object);
```

`ctr→`: consoleTrace

```javascript
// Prints a stack trace from the point where the method was called.
console.trace(object);
```

`cwa→`: consoleWarn

```javascript
// Displays a message in the console 
// but also displays a yellow warning icon along with the logged message.
console.warn(object);
```


#### 2. [ReactJS(ES6) Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)

2.1. Installation

Launch VS Code Quick Open (⌘+P), paste the following command, and type enter.

```
> ext install ReactSnippets
```

2.2. [Snippets](https://github.com/xabikos/vscode-react/blob/master/snippets/snippets.json)

![ReactJS code snippets](/images/blogs/20160603-1.gif)

![ReactJS code snippets](/images/blogs/20160603-2.gif)

Below is a list of all available snippets and the triggers of each one. The -> means the TAB key.

<hr>
<mark>Main methods</mark>
<hr>

`rcc→`: reactClassCompoment

```javascript
// Creates a React component class with ES6 module system.
import React, {Component} from 'react';

class componentName extends Component {
    render() {
        return (

        );
    }
}

export default componentName;
```

`rccp→`: reactClassCompomentPropTypes

```javascript
// Creates a React component class with PropTypes and ES6 nodule system.
import React, {Component, PropTypes} from 'react';

class componentName extends Component {
    render() {
        return (
            
        );
    }
}

componentName.propTypes = {

};

export default componentName;
```

`rcjc→`: reactJustClassCompoment

```javascript
// Creates a React component class with ES6 module system.
class componentName extends Component {
    render() {
        return (
            
        );
    }
}
```

`rcfc→`: reactClassCompomentWithMethods

```javascript
// Creates a React component class with PropTypes and all lifecycle methods in ES6 nodule system.
import React, {Component, PropTypes} from 'react';

class componentName extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
        
        );
    }
}

componentName.propTypes = {

};

export default componentName;
```

`rsc→`: reactStateless

```javascript
// Creates a stateless React component without PropTypes in ES6 nodule system.
import React from 'react';

const componentName = () => {
    return (
       
    );
};

export default componentName;
```

`rscp→`: reactStatelessProps

```javascript
// Creates a stateless React component with PropTypes in ES6 nodule system.
import React, {PropTypes} from 'react';

const componentName = props => {
    return (
        
    );
};

componentName.propTypes = {
    
};

export default componentName;
```

`con→`: classConstructor

```javascript
// Adds a default construcotr for the class that contains props as arguments.
constructor(params) {
    
}
```

`conc→`: classConstructorContext

```javascript
// Adds a default construcotr for the class that contains props and context as arguments.
constructor(props, context) {
    super(props, context);
    
}
```

`cwm→`: componentWillMount

```javascript
// Invoked once, both on the client and server, immediately before the initial rendering occurs. 
componentWillMount() {
    
}
```

`cdm→`: componentDidMount

```javascript
// Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
componentDidMount() {
    
}
```

`cwr→`: componentWillReceiveProps

```javascript
// Invoked when a component is receiving new props. This method is not called for the initial render.
componentWillReceiveProps(nextProps) {
    
}
```

`scu→`: shouldComponentUpdate

```javascript
// Invoked before rendering when new props or state are being received.
shouldComponentUpdate(nextProps, nextState) {
    
}
```

`cwup→`: componentWillUpdate

```javascript
// Invoked immediately before rendering when new props or state are being received.
componentWillUpdate(nextProps, nextState) {
    
}
```

`cdup→`: componentDidUpdate

```javascript
// Invoked immediately after the component's updates are flushed to the DOM.
componentDidUpdate(prevProps, prevState) {
    
}
```

`cwun→`: componentWillUnmount

```javascript
// Invoked immediately before a component is unmounted from the DOM.
componentWillUnmount() {
    
}
```

`ren→`: componentRender

```javascript
// When called, it should examine this.props and this.state and return a single child element.
render() {
    return (
       
    );
}
```

`sst→`: componentSetStateObject

```javascript
// Performs a shallow merge of nextState into current state.
this.setState();
```

`ssf→`: componentSetStateFunc

```javascript
// Performs a shallow merge of nextState into current state.
this.setState((state, props) => { return {  }});
```

`props→`: componentProps

```javascript
// Access component's props.
this.props.
```

`state`: componentState

```javascript
// Access component's state.
this.state.
```

`bnd→`: bindThis

```javascript
// Access component's state.
this. = this..bind(this);
```

<hr>
<mark>PropTypes methods</mark>
<hr>

`pta→`: propTypeArray

```javascript
// Array prop type.
PropTypes.array,
```

`ptar→`: propTypeArrayRequired

```javascript
// Array prop type required.
PropTypes.array.isRequired,
```

`ptb→`: propTypeBool

```javascript
// Bool prop type.
PropTypes.bool,
```

`ptbr→`: propTypeBoolRequired

```javascript
// Bool prop type required.
PropTypes.bool.isRequired,
```

`ptf→`: propTypeFunc

```javascript
// Func prop type.
PropTypes.func,
```

`ptfr→`: propTypeFuncRequired

```javascript
// Func prop type required.
PropTypes.func.isRequired,
```

`ptn→`: propTypeNumber

```javascript
// Number prop type.
PropTypes.number,
```

`ptnr→`: propTypeNumberRequired

```javascript
// Number prop type required.
PropTypes.number.isRequired,
```

`pto→`: propTypeObject

```javascript
// Object prop type.
PropTypes.object,
```

`ptor→`: propTypeObjectRequired

```javascript
// Object prop type required.
PropTypes.object.isRequired,
```

`pts→`: propTypeString

```javascript
// String prop type.
PropTypes.string,
```

`ptsr→`: propTypeStringRequired

```javascript
// String prop type required.
PropTypes.string.isRequired,
```

`ptnd→`: propTypeNode

```javascript
// Anything that can be rendered: numbers, strings, elements or an array.
PropTypes.node,
```

`ptndr→`: propTypeNodeRequired

```javascript
// Anything that can be rendered: numbers, strings, elements or an array required.
PropTypes.node.isRequired,
```

`ptel→`: propTypeElement

```javascript
// React element prop type.
PropTypes.element,
```

`ptelr→`: propTypeElementRequired

```javascript
// React element prop type required.
PropTypes.element.isRequired,
```

`pti→`: propTypeInstanceOf

```javascript
// Is an instance of a class prop type.
PropTypes.instanceOf(),
```

`ptir→`: propTypeInstanceOfRequired

```javascript
// Is an instance of a class prop type required.
PropTypes.instanceOf().isRequired,
```

`pte→`: propTypeEnum

```javascript
// Prop type limited to specific values by treating it as an enum.
PropTypes.oneOf(['']),
```

`pter→`: propTypeEnumRequired

```javascript
// Prop type limited to specific values by treating it as an enum required.
PropTypes.oneOf(['']).isRequired,
```

`ptet→`: propTypeOneOfType

```javascript
// An object that could be one of many type.
PropTypes.oneOfType([
    
]),
```

`ptao→`: propTypeArrayOf

```javascript
// An array of a certain type.
PropTypes.arrayOf(),
```

`ptaor→`: propTypeArrayOfRequired

```javascript
// An array of a certain type required.
PropTypes.arrayOf().isRequired,
```

`ptoo→`: propTypeObjectOf

```javascript
// An object with property values of a certain type.
PropTypes.objectOf(),
```

`ptoor→`: propTypeObjectOfRequired

```javascript
// An object with property values of a certain type required.
PropTypes.objectOf().isRequired,
```

`ptsh→`: propTypeShape

```javascript
// An object taking on a particular shape.
PropTypes.shape({
    
}),
```

`ptshr→`: propTypeShapeRequired

```javascript
// An object taking on a particular shape required.
PropTypes.shape({
    
}).isRequired,
```

#### 3. [Angular 2(TypeScript) Code Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)

3.1. Installation

Launch VS Code Quick Open (⌘+P), paste the following command, and type enter.

```
> ext install Angular2
```

![Angular code snippets](/images/blogs/20160603-4.gif)

3.2. [Snippets](https://github.com/johnpapa/vscode-angular2-snippets/tree/master/snippets)

![Angular code snippets](/images/blogs/20160603-3.gif)

<hr>
<mark>TypeScript Snippets</mark>
<hr>

`ng2-component-root→`: Angular 2 root App component

```javascript
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import 'rxjs/Rx'; // load the full rxjs

@Component({
    moduleId: module.id,
    selector: 'selector',
    templateUrl: 'name.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS
    ]
})
@Routes([
    
])
export class AppComponent {}
```

`ng2-bootstrap→`: Angular 2 bootstraping, for main.ts

```javascript
import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppComponent } from './name.component';

// enableProdMode();

bootstrap(AppComponent)
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));
```

`ng2-component→`: Angular 2 component

```javascript
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'selector',
    templateUrl: 'name.component.html'
})
export class ComponentNameComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
```

`ng2-pipe→`: Angular 2 pipe

```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'name'
})

export class PipeNamePipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        
    }
}
```

`ng2-route-path→`: Angular 2 routing path

```javascript
{ path: '/path', component: Component }
```

`ng2-service→`: Angular 2 service

```javascript
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceNameService {

    constructor() { }

}
```

`ng2-subscribe→`: Angular 2 observable subscription

```javascript
this.service.function
    .subscribe(arg => this.property = arg);
```

<hr>
<mark>HTML Snippets</mark>
<hr>

`ng2-ngClass→`: ngClass

```html
[ngClass]="{cssClass: expression}"
```

`ng2-ngFor→`: ngFor

```html
*ngFor="let item of list"
```

`ng2-ngIf→`: ngIf

```html
*ngIf="Property" 
```

`ng2-ngModel→`: ngModel

```html
[(ngModel)]="binding"
```

`ng2-routerLink→`: routerLink

```html
[routerLink]="['routeName']"
```

`ng2-ngStyle→`: ngStyle

```html
[ngStyle]="{style: expression}"
```

`ng2-ngSwitch→`: ngSwitch

```html
<div [ngSwitch]="conditionExpression">
    <div *ngSwitchWhen="expression">output</div>
    <div *ngSwitchDefault>output2</div>
</div>
```








