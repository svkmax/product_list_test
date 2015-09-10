(function() {
  'use strict';

  angular
    .module('productTask')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $resource, NgTableParams, $filter, domain_name, $http) {
    var productsResource = $resource(domain_name + 'products');

    var products = productsResource.query(function()
    {
      $scope.tableParams = new NgTableParams({
        page: 1,
        count: 10,
        filter: {
          category: null       // initial filter
        }
      }, {
        getData: function (params) {
          var orderedData = params.filter().category !== null  ?
            $filter('filter')(products, params.filter()):
            products;
          params.total(orderedData.length);
          return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
      });

      $scope.updateProduct = function updateProduct($data, product) {
        $http.put(domain_name + 'products/' + product.id,
          {product: {name: product.name, category: product.category, sku: product.sku }}).then(function(response) {
        }, function(response) {
            var response_object = response.data;
            product.sku = response_object.sku;
            product.category = response_object.category;
            product.name = response_object.name;
        });
      }
    });
  };
})();
