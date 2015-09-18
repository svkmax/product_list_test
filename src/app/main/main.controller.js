(function () {
  'use strict';

  angular
    .module('productTask')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, NgTableParams, $filter, domain_name, $http) {
    $scope.products = [];
    var total = function() {

    }
    $scope.total = $http.get(domain_name + 'products/count').then(function (response) {
      $scope.total = response.data
    });

    $scope.tableParams = new NgTableParams({
      page: 1,
      count: 10,
      filter: {
        category: null       // initial filter
      }
    }, {
      total: $scope.total,
      getData: function (params) {
        $http.get(domain_name + 'products', {
          params: {
            per_page: params.count(),
            page_number: params.page()
          }
        }).then(function (response) {
          $scope.products = response.data.products;
          var orderedData = params.filter().category !== null ?
            $filter('filter')($scope.products, params.filter()) :
            $scope.products;
          $scope.products = orderedData;
          params.data = $scope.products;
          return $scope.products;
        });
      }
    });

    $scope.updateProduct = function updateProduct(product) {
      $http.put(domain_name + 'products/' + product.id,
        {product: {name: product.name, category: product.category, sku: product.sku}}).then(function () {
        }, function (response) {
          var response_object = response.data;
          product.sku = response_object.sku;
          product.category = response_object.category;
          product.name = response_object.name;
        });
    };

  }
})();
