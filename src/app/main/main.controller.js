(function () {
  'use strict';

  angular
    .module('productTask')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, NgTableParams, domain_name, $http) {
    $scope.products = [];
    $scope.tableParams = new NgTableParams({
      page: 1,
      count: 10,
      filter: {
        category: ""       // initial filter
      }
    }, {
      total: 1000,
      getData: function(params) {
        params.filter().category !== "" ? getFilteredAndPagedData(params) : getPagedData(params)
      }
    });

    function getPagedData(params) {
      $http.get(domain_name + 'products', {
        params: {
          per_page: params.count(),
          page_number: params.page()
        }
      }).then(function (response) {
        $scope.products = response.data.products;
        params.data = $scope.products;
        params.total(response.data.total);
        return params.data;
      });
    }

    function getFilteredAndPagedData(params) {
      $http.get(domain_name + 'products/filter',
        { params: {filter: params.filter().category,
          per_page: params.count(),
          page_number: params.page() }
      }).then(function(response){
        $scope.products = response.data.products;
        params.total(response.data.total);
          params.data = $scope.products;
          return params.data
      });
    }

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
