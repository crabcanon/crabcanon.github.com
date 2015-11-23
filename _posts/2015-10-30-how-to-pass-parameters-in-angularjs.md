---
layout: post
title: AngularJS - 页面跳转传参
date: 2015-11-01
categories: [angularjs]
tags: [Angularjs, Javascript]
---

这篇博客源于一个[知乎问题: angularjs项目需要从一个页面跳转到另一个页面，同时需要传递一个参数。通过什么实现？](http://www.zhihu.com/question/33565135/answer/69651500)。我因此总结归纳了4种最常见的方法供大家参考。

**1. 基于ui-router的页面跳转传参**

（1）在AngularJS的app.js中用ui-router定义路由，比如现在有两个页面，一个页面（producers.html）放置了多个producers，点击其中一个目标，页面跳转到对应的producer页，同时将producerId这个参数传过去。

{% highlight javascript %}
//定义producers状态
.state('producers', {
    url: '/producers',
    templateUrl: 'views/producers.html',
    controller: 'ProducersCtrl'
})
//定义producer状态
.state('producer', {
    url: '/producer/:producerId',
    templateUrl: 'views/producer.html',
    controller: 'ProducerCtrl'
})
{% endhighlight %}

（2）在producers.html中，定义点击事件，比如ng-click="toProducer(producerId)"，在ProducersCtrl中，定义页面跳转函数 (使用ui-router的$state.go接口)：

{% highlight javascript %}
.controller('ProducersCtrl', function ($scope, $state) {
    $scope.toProducer = function (producerId) {
        $state.go('producer', {producerId: producerId});
    };
});
{% endhighlight %}

 3. 在ProducerCtrl中，通过ui-router的$stateParams获取参数producerId，譬如：

{% highlight javascript %}
 .controller('ProducerCtrl', function ($scope, $state, $stateParams) {
   var producerId = $stateParams.producerId;
});
{% endhighlight %}

<hr>

**2. 基于factory的页面跳转传参**

举例：你有N个页面，每个页面都需要用户填选信息，最终引导用户至尾页提交，同时后一个页面要显示前一个页面所填写的信息。这个时候用factory传参是比较合理的选择（下面的代码是一个简化版，根据需求可以不同定制）：

{% highlight javascript %}
.factory('myFactory', function () {
    //定义factory返回对象
    var myServices = {};    
    //定义参数对象
    var myObject = {};
    
    /**
     * 定义传递数据的set函数
     * param {type} xxx
     * returns {*}
     * private
     */
    var _set = function (data) {
       myObject = data;     
    };

    /**
     * 定义获取数据的get函数
     * param {type} xxx
     * returns {*}
     * private
     */
    var _get = function () {
        return myObject;
    };

    // Public APIs
    myServices.set = _set;
    myServices.get = _get;
    
    // 在controller中通过调set()和get()方法可实现提交或获取参数的功能
    return myServices;
  
});
{% endhighlight %}

<hr>

**3. 基于factory和$rootScope.$broadcast()的传参**

（1）举例：在一个单页中定义了nested views，你希望让所有子作用域都监听到某个参数的变化，并且作出相应动作。比如一个地图应用，某个$state中定义元素input，输入地址后，地图要定位，同时另一个状态下的列表要显示出该位置周边商铺的信息，此时多个$scope都在监听地址变化。
PS: $rootScope.$broadcast()可以非常方便的设置全局事件，并让所有子作用域都监听到。

{% highlight javascript %}
.factory('addressFactory', ['$rootScope', function ($rootScope) {
    // 定义所要返回的地址对象   
    var address = {};
    
    // 定义components数组，数组包括街道，城市，国家等
    address.components = [];

    // 定义更新地址函数，通过$rootScope.$broadcast()设置全局事件'AddressUpdated'
    // 所有子作用域都能监听到该事件
    address.updateAddress = function (value) {
	this.components = value.slice();
	$rootScope.$broadcast('AddressUpdated');
    };
    
    // 返回地址对象
    return address;
}]);
{% endhighlight %}

（2）在获取地址的controller中：

{% highlight javascript %}
// 动态获取地址，接口方法省略
var component = {
    addressLongName: xxxx,
    addressShortName: xxxx,
    cityLongName: xxxx,
    cityShortName: xxxx         
};

// 定义地址数组
$scope.components = [];

$scope.$watch('components', function () {
    // 将component对象推入$scope.components数组
    components.push(component);
    // 更新addressFactory中的components
    addressFactory.updateAddress(components);
});
{% endhighlight %}

（3）在监听地址变化的controller中：

{% highlight javascript %}
// 通过addressFactory中定义的全局事件'AddressUpdated'监听地址变化
$scope.$on('AddressUpdated', function () {
   // 监听地址变化并获取相应数据
   var street = address.components[0].addressLongName;
   var city = address.components[0].cityLongName;

   // 通过获取的地址数据可以做相关操作，譬如获取该地址周边的商铺，下面代码为本人虚构
   shopFactory.getShops(street, city).then(function (data) {
       if(data.status === 200){
          $scope.shops = data.shops;  
       }else{
          $log.error('对不起，获取该位置周边商铺数据出错: ', data);
       }
   });
});
{% endhighlight %}

<hr>

**4. 基于localStorage或sessionStorage的页面跳转传参**

注意事项：通过LS或SS传参，一定要监听变量，否则参数改变时，获取变量的一端不会更新。AngularJS有一些现成的WebStorage dependency可以使用，譬如[gsklee/ngStorage · GitHub]()，[grevory/angular-local-storage · GitHub]()。下面使用ngStorage来简述传参过程：

（1）上传参数到localStorage - Controller A

{% highlight javascript %}
// 定义并初始化localStorage中的counter属性
$scope.$storage = $localStorage.$default({
    counter: 0
});

// 假设某个factory（此例暂且命名为counterFactory）中的updateCounter()方法
// 可以用于更新参数counter
counterFactory.updateCounter().then(function (data) {
    // 将新的counter值上传到localStorage中
    $scope.$storage.counter = data.counter;
});
{% endhighlight %}

（2）监听localStorage中的参数变化 - Controller B

{% highlight javascript %}
$scope.counter = $localStorage.counter;
$scope.$watch('counter', function(newVal, oldVal) {
    // 监听变化，并获取参数的最新值
    $log.log('newVal: ', newVal);    
});
{% endhighlight %}