'use strict';
angular.module('StoringenApp')
    .controller('StoringenCtrl', function ($http, $scope, $state) {
    this.$state = $state;
    this.isNavCollapsed = true;
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
});
