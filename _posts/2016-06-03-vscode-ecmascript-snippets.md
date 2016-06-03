---
layout: post
title: ECMAScript Snippets for VS Code
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

1.2. Snippets

Below is a list of all available snippets and the triggers of each one. The → means the TAB key.

<hr>
<mark>Import and export</mark>
<hr>

| Trigger | Target                                                           |
| ------- | ---------------------------------------------------------------- |
| imp→    | import fs from 'fs';                                             |
| imd→    | import {rename} from 'fs';                                       |
| ime→    | import * as localAlias from 'fs';                                |
| ima→    | import { rename as localRename } from 'fs';                      |
| enf→    | export const log = (parameter) => { console.log(parameter);};    |
| edf→    | export default (parameter) => { console.log(parameter);};        |
| ecl→    | export default class Calculator { };                             |
| ece→    | export default class Calculator extends BaseClass { };           |

<hr>
<mark>Class helpers</mark>
<hr>

| Trigger | Target                                                           |
| ------- | ---------------------------------------------------------------- |
| con→    | `constructor() {}`                                               |
| met→    | `add() {}`                                                       |
| pge→    | `get propertyName() {return value;}`                             |
| pse→    | `set propertyName(value) {}`                                     |

<hr>
<mark>Various methods</mark>
<hr>

| Trigger | Target                                                           |
| ------- | ---------------------------------------------------------------- |
| fre→    | `array.forEach(currentItem => {})`                               | 
| fof→    | `for(let item of object) {}`                                     | 
| fin→    | `for(let item in object) {}`                                     | 
| afn→    | a anonymous function `(params) => {}`                            | 
| nfn→    | a named function `const add = (params) => {}`                    | 
| dob→    | `const {rename} = fs`                                            | 
| dar→    | `const [first, second] = [1,2]`                                  | 
| sti→    | `setInterval(() => {});`                                         | 
| sto→    | `setTimeout(() => {});`                                          | 

<hr>
<mark>Console methods</mark>
<hr>

| Trigger | Target                                                           |
| ------- | ---------------------------------------------------------------- |
| cas→    | `console.assert(expression, object)`                             |
| ccl→    | `console.clear()`                                                |
| cco→    | `console.count(label)`                                           |
| cdi→    | `console.dir`                                                    |
| cer→    | `console.error(object)`                                          |
| cgr→    | `console.group(label)`                                           |
| cge→    | `console.groupEnd()`                                             |
| clg→    | `console.log(object)`                                            |
| ctr→    | `console.trace(object)`                                          |
| cwa→    | `console.warn`                                                   |


#### 2. [ReactJS(ES6) Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)

2.1. Installation

Launch VS Code Quick Open (⌘+P), paste the following command, and type enter.

```
> ext install ReactSnippets
```

2.2. Snippets

![ReactJS code snippets](/images/blogs/20160603-1.gif)

![ReactJS code snippets](/images/blogs/20160603-2.gif)

Below is a list of all available snippets and the triggers of each one. The -> means the TAB key.

<hr>
<mark>Main methods</mark>
<hr>

| Trigger | Target                                                           |
| ------- | ---------------------------------------------------------------- |
| rcc→    | class component skeleton                                         |
| rccp→   | class component skeleton with prop types after the class         |
| rcjc→   | class component skeleton without import and default export lines |
| rcfc→   | class component skeleton that contains all the lifecycle methods |
| rsc→    | stateless component skeleton                                     |
| rscp→   | stateless component with prop types skeleton                     |
| con→    | class default constructor with props                             |
| conc→   | class default constructor with props and context                 |
| cwm→    | componentWillMount method                                        |
| cdm→    | componentDidMount method                                         |
| cwr→    | componentWillReceiveProps method                                 |
| scu→    | shouldComponentUpdate method                                     |
| cwup→   | componentWillUpdate method                                       |
| cdup→   | componentDidUpdate method                                        |
| cwun→   | componentWillUnmount method                                      |
| ren→    | render method                                                    |
| sst→    | this.setState with object as parameter                           |
| ssf→    | this.setState with function as parameter                         |
| props→  | this.props                                                       | 
| state→  | this.state                                                       |
| bnd→    | binds the this of method inside the constructor                  |

<hr>
<mark>PropTypes methods</mark>
<hr>

| Trigger | Content                                                          |
| ------- | ---------------------------------------------------------------- |
| pta→    | PropTypes.array                                                  |
| ptar→   | PropTypes.array.isRequired                                       |
| ptb→    | PropTypes.bool                                                   |
| ptbr→   | PropTypes.bool.isRequired                                        |
| ptf→    | PropTypes.func                                                   |
| ptfr→   | PropTypes.func.isRequired                                        |
| ptn→    | PropTypes.number                                                 |
| ptnr→   | PropTypes.number.isRequired                                      |
| pto→    | PropTypes.object.                                                |
| ptor→   | PropTypes.object.isRequired                                      |
| pts→    | PropTypes.string                                                 |
| ptsr→   | PropTypes.string.isRequired                                      |
| ptnd→   | PropTypes.node                                                   |
| ptndr→  | PropTypes.node.isRequired                                        |
| ptel→   | PropTypes.element                                                |
| ptelr→  | PropTypes.element.isRequired                                     |
| pti→    | PropTypes.instanceOf(ClassName)                                  |
| ptir→   | PropTypes.instanceOf(ClassName).isRequired                       |
| pte→    | PropTypes.oneOf(['News', 'Photos'])                              |
| pter→   | PropTypes.oneOf(['News', 'Photos']).isRequired                   |
| ptet→   | PropTypes.oneOfType([PropTypes.string, PropTypes.number])        |
| ptao→   | PropTypes.arrayOf(PropTypes.number)                              |
| ptaor→  | PropTypes.arrayOf(PropTypes.number).isRequired                   |
| ptoo→   | PropTypes.objectOf(PropTypes.number)                             |
| ptoor→  | PropTypes.objectOf(PropTypes.number).isRequired                  |


#### 3. [Angular 2(TypeScript) Code Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)

3.1. Installation

Launch VS Code Quick Open (⌘+P), paste the following command, and type enter.

```
> ext install Angular2
```

![Angular code snippets](/images/blogs/20160603-4.gif)

3.2. Snippets

![Angular code snippets](/images/blogs/20160603-3.gif)

<hr>
<mark>TypeScript Snippets</mark>
<hr>

| Trigger             | Target                                               |
| ------------------- | ---------------------------------------------------- |
| ng2-component-root→ | Angular 2 root App component                         |
| ng2-bootstrap→      | Angular 2 bootstraping, for main.ts                  |
| ng2-component→      | Angular 2 component                                  |
| ng2-pipe→           | Angular 2 pipe                                       |
| ng2-route-config→   | Angular 2 @RouteConfig                               |
| ng2-route-path→     | Angular 2 routing path                               |
| ng2-service→        | Angular 2 service                                    |
| ng2-subscribe→      | Angular 2 observable subscription                    |

<hr>
<mark>HTML Snippets</mark>
<hr>

| Trigger         | Target                                                   |
| --------------- | -------------------------------------------------------- |
| ng2-ngClass→    | ngClass                                                  |
| ng2-ngFor→      | ngFor                                                    |
| ng2-ngIf→       | ngIf                                                     |
| ng2-ngModel→    | ngModel                                                  |
| ng2-routerLink→ | routerLink                                               |
| ng2-ngStyle→    | ngStyle                                                  |
| ng2-ngSwitch→   | ngSwitch                                                 |






