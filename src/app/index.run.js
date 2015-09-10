(function() {
  'use strict';

  angular
    .module('productTask')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
