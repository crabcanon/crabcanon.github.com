---
layout: post
title: AngularJS - 页面跳转传参
date: 2015-11-01
categories: [angularjs]
tags: [Angularjs, Javascript]
---

这篇博客源于一个[知乎问题: angularjs项目需要从一个页面跳转到另一个页面，同时需要传递一个参数。通过什么实现？](http://www.zhihu.com/question/33565135/answer/69651500)。我因此总结了5种最常见方法供大家参考。

**1. 基于ui-router的页面跳转传参**

（1）在AngularJS的app.js中用ui-router定义路由，比如现在有两个页面，一个页面producers.html放置了多个producers，点击其中一个目标，页面跳转到对应的producer.html页，同时将producerId这个参数传过去。

```javascript
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
```

（2）在producers.html中，定义点击事件，比如ng-click="toProducer(producerId)"，在ProducersCtrl中，定义页面跳转函数 (使用ui-router的$state.go接口)：

```javascript
.controller('ProducersCtrl', function ($scope, $state) {
    $scope.toProducer = function (producerId) {
        $state.go('producer', {producerId: producerId});
    };
});
```

 3. 在ProducerCtrl中，通过ui-router的$stateParams获取参数producerId，譬如：

```javascript
 .controller('ProducerCtrl', function ($scope, $state, $stateParams) {
   var producerId = $stateParams.producerId;
});
```

<hr>

**2. 基于factory的页面跳转传参**

举例：你有N个页面，每个页面都需要用户填选信息，最终引导用户至尾页提交，同时后一个页面要显示前一个页面所填写的信息。这个时候用factory传参是比较合理的选择（下面的代码是一个简化版，根据需求可以不同定制）：

```javascript
.factory('myFactory', function() {   
    //定义参数对象
    var myObject = {};
    
    /**
     * 定义传递数据的setter函数
     * @param {type} xxx
     * @returns {*}
     * @private
     */
    var _setter = function(data) {
       myObject = data;     
    };

    /**
     * 定义获取数据的getter函数
     * @param {type} xxx
     * @returns {*}
     * @private
     */
    var _getter = function() {
        return myObject;
    };

    // Public APIs
    // 在controller中通过调setter()和getter()方法可实现提交或获取参数的功能
    return {
        setter: _setter,
        getter: _getter
    };
});
```

<hr>

**3. 基于factory和$rootScope.$broadcast()的传参**

（1）举例：在一个单页中定义了nested views，你希望让所有子作用域都监听到某个参数的变化，并且作出相应动作。比如一个地图应用，某个$state中定义元素input，输入地址后，地图要定位，同时另一个状态下的列表要显示出该位置周边商铺的信息，此时多个$scope都在监听地址变化。
PS: $rootScope.$broadcast()可以非常方便的设置全局事件，并让所有子作用域都监听到。

```javascript
.factory('addressFactory', ['$rootScope', function ($rootScope) {
    // 定义所要返回的地址对象   
    var address = {};
    
    // 定义components数组，数组包括街道，城市，国家等
    address.components = [];

    // 定义更新地址函数，通过$rootScope.$broadcast()设置全局事件'AddressUpdated'
    // 所有子作用域都能监听到该事件
    address.updateAddress = function (value) {
    this.components = angular.copy(value);
    $rootScope.$broadcast('AddressUpdated');
    };
    
    // 返回地址对象
    return address;
}]);
```

（2）在获取地址的controller中：

```javascript
// 动态获取地址，接口方法省略
var component = {
    addressLongName: xxxx,
    addressShortName: xx,
    cityLongName: xxxx,
    cityShortName: xx,
    countryLongName: xxxx,
    countryShortName: xx,
    postCode: xxxxx         
};

// 定义地址数组
$scope.components = [];

$scope.$watch('components', function () {
    // 将component对象推入$scope.components数组
    components.push(component);
    // 更新addressFactory中的components
    addressFactory.updateAddress(components);
});
```

（3）在监听地址变化的controller中：

```javascript
// 通过addressFactory中定义的全局事件'AddressUpdated'监听地址变化
$scope.$on('AddressUpdated', function () {
   // 监听地址变化并获取相应数据
   var street = address.components[0].addressLongName;
   var city = address.components[0].cityLongName;

   // 通过获取的地址数据可以做相关操作，譬如获取该地址周边的商铺，下面代码为本人虚构
   shopFactory.getShops(street, city).then(function(data) {
       if(data.status === 200){
          $scope.shops = data.shops;  
       }else{
          $log.error('对不起，获取该位置周边商铺数据出错: ', data);
       }
   });
});
```

<hr>

**4. 基于localStorage或sessionStorage的页面跳转传参**

注意事项：通过LS或SS传参，一定要监听变量，否则参数改变时，获取变量的一端不会更新。AngularJS有一些现成的WebStorage dependency可以使用，譬如[gsklee/ngStorage · GitHub]()，[grevory/angular-local-storage · GitHub]()。下面使用ngStorage来简述传参过程：

（1）上传参数到localStorage - Controller A

```javascript
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
```

（2）监听localStorage中的参数变化 - Controller B

```javascript
$scope.counter = $localStorage.counter;
$scope.$watch('counter', function(newVal, oldVal) {
    // 监听变化，并获取参数的最新值
    $log.log('newVal: ', newVal);    
});
```

<hr>

**5. 基于localStorage/sessionStorage和Factory的页面传参**

由于传参出现的不同的需求，将不同方式组合起来可帮助你构建低耦合便于扩展和维护的代码。
举例：应用的Authentication（授权）。用户登录后，后端传回一个时限性的token，该用户下次访问应用，通过检测token和相关参数，可获取用户权限，因而无须再次登录即可进入相应页面（Automatically Login）。其次所有的APIs都需要在HTTP header里注入token才能与服务器传输数据。此时我们看到token扮演一个重要角色：（a）用于检测用户权限，（b）保证前后端数据传输安全性。以下实例中使用了依赖ngStorage和angular-permission.

(1）定义一个名为auth.service.js的factory，用于处理和authentication相关的业务逻辑，比如login，logout，checkAuthentication，getAuthenticationParams等。此处略去其他业务，只专注Authentication的部分。

```javascript
(function() {
'use strict';

    angular
      .module('myApp')
      .factory('authService', authService);

    /** @ngInject */
    function authService($http, $log, $q, $localStorage, PermissionStore, ENV) {
      var apiUserPermission = ENV.baseUrl + 'user/permission';

      var authServices = {
        login: login,
        logout: logout,
        getAuthenticationParams: getAuthenticationParams,
        checkAuthentication: checkAuthentication
      };
      
      return authServices;

      ////////////////

      /**
       * 定义处理错误函数，私有函数。
       * @param {type} xxx
       * @returns {*}
       * @private
       */
      function handleError(name, error) {
        return $log.error('XHR Failed for ' + name + '.\n', angular.toJson(error, true));
      }
      
      /**
       * 定义login函数，公有函数。
       * 若登录成功，把服务器返回的token存入localStorage。
       * @param {type} xxx
       * @returns {*}
       * @public
       */
      function login(loginData) {
        var apiLoginUrl = ENV.baseUrl + 'user/login'; 
          
        return $http({
          method: 'POST',
          url: apiLoginUrl,
          params: {
            username: loginData.username,
            password: loginData.password
          }
        })
        .then(loginComplete)
        .catch(loginFailed);
          
        function loginComplete(response) {
          if (response.status === 200 && _.includes(response.data.authorities, 'admin')) {
            // 将token存入localStorage。
            $localStorage.authtoken = response.headers().authtoken;
            setAuthenticationParams(true);
          } else {
            $localStorage.authtoken = '';
            setAuthenticationParams(false);
          }
        }
          
        function loginFailed(error) {
          handleError('login()', error);
        }
      }
      
      /**
       * 定义logout函数，公有函数。
       * 清除localStorage和PermissionStore中的数据。
       * @public
       */
      function logout() {
        $localStorage.$reset();
        PermissionStore.clearStore();
      }

      /**
       * 定义传递数据的setter函数，私有函数。
       * 用于设置isAuth参数。
       * @param {type} xxx
       * @returns {*}
       * @private
       */
      function setAuthenticationParams(param) {
        $localStorage.isAuth = param;
      }
      
      /**
       * 定义获取数据的getter函数，公有函数。
       * 用于获取isAuth和token参数。
       * 通过setter和getter函数，可以避免使用第四种方法所提到的$watch变量。
       * @param {type} xxx
       * @returns {*}
       * @public
       */      
      function getAuthenticationParams() {
        var authParams = {
          isAuth: $localStorage.isAuth,
          authtoken: $localStorage.authtoken
        };
        return authParams;
      }    
     
      /* 
       * 第一步: 检测token是否有效.
       * 若token有效，进入第二步。
       *
       * 第二步: 检测用户是否依旧属于admin权限.
       *
       * 只有满足上述两个条件，函数才会返回true，否则返回false。 
       * 请参看angular-permission文档了解其工作原理https://github.com/Narzerus/angular-permission/wiki/Managing-permissions
       */
      function checkAuthentication() {
        var deferred = $q.defer();
        
        $http.get(apiUserPermission).success(function(response) {
          if (_.includes(response.authorities, 'admin')) {
            deferred.resolve(true);
          } else {
            deferred.reject(false);
          }
        }).error(function(error) {
          handleError('checkAuthentication()', error);
          deferred.reject(false);
        });
          
        return deferred.promise;
      }
    }
})();
```

（2）定义名为index.run.js的文件，用于在应用载入时自动运行权限检测代码。

```javascript
(function() {
  'use strict';

  angular
    .module('myApp')
    .run(checkPermission);

  /** @ngInject */
  
  /**
   * angular-permission version 3.0.x.
   * https://github.com/Narzerus/angular-permission/wiki/Managing-permissions.
   * 
   * 第一步: 运行authService.getAuthenticationParams()函数.
   * 返回true：用户之前成功登陆过。因而localStorage中已储存isAuth和authtoken两个参数。 
   * 返回false：用户或许已logout，或是首次访问应用。因而强制用户至登录页输入用户名密码登录。
   *
   * 第二步: 运行authService.checkAuthentication()函数.
   * 返回true：用户的token依旧有效，同时用户依然拥有admin权限。因而无需手动登录，页面将自动重定向到admin页面。
   * 返回false：要么用户token已经过期，或用户不再属于admin权限。因而强制用户至登录页输入用户名密码登录。
   */
  function checkPermission(PermissionStore, authService) {
    PermissionStore
      .definePermission('ADMIN', function() {
        var authParams = authService.getAuthenticationParams();
        if (authParams.isAuth) {
          return authService.checkAuthentication();
        } else {
          return false;
        }
      });
  }
})();
```

（3）定义名为authInterceptor.service.js的文件，用于在所有该应用请求的HTTP requests的header中注入token。

```javascript
(function() {
'use strict';

    angular
      .module('myApp')
      .factory('authInterceptorService', authInterceptorService);

    /** @ngInject */
    function authInterceptorService($q, $injector, $location) {
      var authService = $injector.get('authService');  
    
      var authInterceptorServices = {
        request: request,
        responseError: responseError
      };
      
      return authInterceptorServices;
      
      ////////////////
      
      // 将token注入所有HTTP requests的headers。
      function request(config) {
        var authParams = authService.getAuthenticationParams();
        config.headers = config.headers || {};
        if (authParams.authtoken) config.headers.authtoken = authParams.authtoken;
      
        return config || $q.when(config);
      }
      
      function responseError(rejection) {
        if (rejection.status === 401) {
          authService.logout();
          $location.path('/login');
        }
        return $q.reject(rejection);  
      }
    }
})();
```