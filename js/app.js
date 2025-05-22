(function (angular) {
  'use strict';
  angular
    .module('app', ['ngComponentRouter', 'objects', 'object'])
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(true);
    })
    .value('$routerRootComponent', 'app')
    .component('app', {
      template: '<ng-outlet></ng-outlet>',
      $routeConfig: [
        { path: '/objects-list', name: 'ObjectsList', component: 'objects', useAsDefault: true },
        { path: '/objects-list/:id', name: 'ObjectDetail', component: 'object' },
      ],
    });
})(window.angular);
