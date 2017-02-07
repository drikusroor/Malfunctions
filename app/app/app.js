/**
 * @ngdoc overview
 * @name dishesApp
 * @description
 * # dishesApp
 *
 * Main module of the application.
 */
angular
  .module('StoringenApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'googlechart',
    'chart.js',
    'as.sortable'
  ])

  // Configuring ChartJS
  // .config(function() {
  //   Chart.defaults.global.colors = [ '#003473', '#DAAF00', '#803690', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
  //   Chart.defaults.global.legend.display = true;
  //   Chart.defaults.global.defaultFontFamily = "'Catamaran', Arial, 'Helvetica Neue', 'helvetica', sans-serif";
  //   Chart.defaults.global.defaultFontColor = '#253372';
  // })

  // .run(function($state, $rootScope, LoginService, $http) {
  //
  //   'use strict';
  //   const API_URL = "http://localhost:49833/api/";
  //   const NULL_REPLACER = "<niet ingevuld>";
  //
  //   var session = LoginService.GetSession();
  //
  //   if(session.email !== undefined && session.token !== undefined) {
  //     $http.defaults.headers.common.Authorization = session.email + ";;;;;" + session.token;
  //   }
  //
  //   $rootScope.$state = $state;
  //
  //   $rootScope.$on('$stateChangeStart',
  //   function(event, toState, toParams, fromState, fromParams, options) {
  //     // If user is not logged in and not going to login page
  //     // Then redirect to login page
  //     var blockAnonymousUsers;
  //     blockAnonymousUsers = true;
  //
  //     if(toState.name !== 'portal.login' && !LoginService.session.loggedin && blockAnonymousUsers) {
  //       $rootScope.$state.go('portal.login');
  //       event.preventDefault();
  //     }
  //   })
  //
  //   Array.prototype.rotate = (function() {
  //       // save references to array functions to make lookup faster
  //       var push = Array.prototype.push,
  //           splice = Array.prototype.splice;
  //
  //       return function(count) {
  //           var len = this.length >>> 0, // convert to uint
  //               count = count >> 0; // convert to int
  //
  //           // convert count to value in range [0, len)
  //           count = ((count % len) + len) % len;
  //
  //           // use splice.call() instead of this.splice() to make function generic
  //           push.apply(this, splice.call(this, 0, count));
  //           return this;
  //       };
  //   })();
  //   Array.prototype.move = function (old_index, new_index) {
  //       while (old_index < 0) {
  //           old_index += this.length;
  //       }
  //       while (new_index < 0) {
  //           new_index += this.length;
  //       }
  //       if (new_index >= this.length) {
  //           var k = new_index - this.length;
  //           while ((k--) + 1) {
  //               this.push(undefined);
  //           }
  //       }
  //       this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  //       return this; // for testing purposes
  //   };
  // })
