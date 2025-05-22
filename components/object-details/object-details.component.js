(function (angular) {
  'use strict';
  angular
    .module('object', [])
    .service('objectsApiService', ['$http', ObjectsApiService])
    .component('object', {
      templateUrl: 'components/object-details/object-details.component.html',
      controller: ObjectDetailsComponent,
      bindings: { $router: '<' },
    });

  function ObjectDetailsComponent($scope, objectsApiService) {
    const $ctrl = this;
    $ctrl.data = undefined;
    $ctrl.loading = true;

    this.$routerOnActivate = function (next) {
      const id = next.params.id;
      return objectsApiService.getObject(id)
      .then(function (data) {
        $scope.$apply(function () {
          $ctrl.data = data;
        });

        $ctrl.loading = false;
      })
      .catch(function (error) {
        console.error('load data error:', error);
      })
      .finally(() => ($ctrl.loading = false));
    };
  }
})(window.angular);
