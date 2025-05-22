function ObjectsApiService($http) {
  const getData = (fileName) => {
    return $http
      .get(`assets/${fileName}.json`)
      .then((response) => response.data?.objects ?? [])
      .catch((error) => {
        console.error(`Ошибка при получении файла: ${fileName}`, error);
        throw error;
      });
  };

  const builsUomsMap = (uoms) =>
    (uoms ?? []).reduce((acc, uom) => {
      acc[uom.uom_id] = uom.uom_name;
      return acc;
    }, {});

    
    this.getObjects = function() {
      return Promise.all([getData('objects'), getData('uoms')]).then(function([items, uoms]) {
        return (items ?? []).map(function(item) {
          return objectUiMapper(item, builsUomsMap(uoms));
        });
      });
    };
  this.getObject = (id) => this.getObjects().then((result) => result.filter((item) => item.object_name === id)?.[0]);
}
