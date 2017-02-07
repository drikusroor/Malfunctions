angular.module('StoringenApp')
    .directive('plusButton', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'text': '=text',
            'type': '=type'
        },
        template: "\n      <button type=\"{{type}}\" class=\"btn btn-primary\">\n        {{text}}\n        <span class=\"glyphicon glyphicon-plus\"></span>\n      </button>\n    "
    };
})
    .directive('minusButton', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'text': '=text',
            'type': '=type'
        },
        template: "\n      <button type=\"{{type}}\" class=\"btn btn-danger\">\n        {{text}}\n        <span class=\"glyphicon glyphicon-minus\"></span>\n      </button>\n    "
    };
});
