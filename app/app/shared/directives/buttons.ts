angular.module('StoringenApp')
.directive('plusButton', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'text': '=text',
      'type': '=type'
    },
    template: `
      <button type="{{type}}" class="btn btn-primary">
        {{text}}
        <span class="glyphicon glyphicon-plus"></span>
      </button>
    `
  };
})

.directive('minusButton', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'text': '=text',
      'type': '=type'
    },
    template: `
      <button type="{{type}}" class="btn btn-danger">
        {{text}}
        <span class="glyphicon glyphicon-minus"></span>
      </button>
    `
  };
});
