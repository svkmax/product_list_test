/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('productTask')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('domain_name', 'http://localhost:5000/');

})();
