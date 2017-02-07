'use strict';

/**
 * @ngdoc function
 * @name StoringenApp.controller:StoringenCtrl
 * @description
 * # StoringenCtrl
 * Controller of the StoringenApp
 */
angular.module('StoringenApp')
  .controller('StoringenCtrl', function ($http, $scope, $state) {


    this.menu = [
      {
        statename: 'collections',
        description: 'Collecties'
      },
      {
        statename: 'settings',
        description: 'Instellingen'
      }
    ];

    this.state = $state;
})
