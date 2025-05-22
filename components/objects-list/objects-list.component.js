(function (angular) {
  'use strict';
  angular
    .module('objects', [])
    .service('objectsApiService', ['$http', ObjectsApiService])
    .service('storageService', [StorageService])
    .component('objects', {
      templateUrl: 'components/objects-list/objects-list.component.html',
      controller: ['$scope', 'objectsApiService', 'storageService', ObjectsListComponent],
    });
})(window.angular);

function ObjectsListComponent($scope, objectsApiService, storageService) {
  var $ctrl = this;
  const objectFields = {
    object_title: 'object_title',
    object_name: 'object_name',
    object_type: 'object_type',
    uom: 'uom',
    manufacturer: 'manufacturer',
    density: 'density',
  };

  $ctrl.tableColNames = {
    [objectFields.object_title]: 'Обьект',
    [objectFields.object_name]: 'Имя',
    [objectFields.object_type]: 'Тип',
    [objectFields.uom]: 'Единицы измерения',
    [objectFields.manufacturer]: 'Производитель',
    [objectFields.density]: 'Плотность',
  };

  $ctrl.loading = true;
  $ctrl.data = [];
  $ctrl.filteredData = [];
  $ctrl.formKeys = Object.keys(objectFields);
  const defaultFormFilters = $ctrl.formKeys.reduce((obj, key) => {
    obj[key] = '';
    return obj;
  }, {});

  const loadFiltersFromStorage = () => {
    const savedFilters = storageService.getItem(STORAGE_KEYS.filterByObjects);
    return savedFilters ?? {...defaultFormFilters};
  };

  $ctrl.filtersform = loadFiltersFromStorage();

  const filterDataItemFn = (item, filtersform) => {
    return Object.keys(filtersform).every((key) => {
      const filterValue = filtersform[key];

      const value = item[key];
      if (!filterValue?.length) {
        return true;
      }

      if (typeof value === 'string') {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      } else if (typeof value === 'number') {
        return !isNaN(filterValue) && value === Number(filterValue);
      }
      return false;
    });
  };

  const loadData = () => {
    $ctrl.loading = true;
    objectsApiService
      .getObjects()
      .then(function (data) {
        $scope.$applyAsync(function () {
          $ctrl.data = data;
          $ctrl.filteredData = $ctrl.data.filter((item)=> filterDataItemFn(item, $ctrl.filtersform));
        });
      })
      .catch(function (error) {
        $scope.$applyAsync(function () {
          $ctrl.data = [];
        });
        console.error('load data error:', error);
      })
      .finally(() => ($ctrl.loading = false));
  };

  $ctrl.isFiltersActive = () => Object.values($ctrl.filtersform).find((f) => f?.length);
  $ctrl.resetFilters = function() {
    storageService.removeItem(STORAGE_KEYS.filterByObjects);
    $ctrl.filtersform = loadFiltersFromStorage();
    $ctrl.filteredData = $ctrl.data.filter((item)=> filterDataItemFn(item, $ctrl.filtersform));
  };

  $ctrl.onInputChange = () => {
    storageService.setItem(STORAGE_KEYS.filterByObjects, $ctrl.filtersform);
    $ctrl.filteredData = $ctrl.data.filter((item)=> filterDataItemFn(item, $ctrl.filtersform));
  };

  $ctrl.$onInit = loadData;
}
