/**
 * @ngdoc function
 * @name StoringenApp.service:FilterKeyValue
 * @description
 * # FilterKeyValue
 * Service of the StoringenApp
 */
angular.module('StoringenApp').factory('FilterKeyValue', function() {
  'use strict';
  var filterKeyValue = function(array, key, value) {
    var filteredArray = [];
    for (var i = 0; array.length > i; i++) {
      console.log(array[i][key], key, value) // let op of het string of int is!
      if (array[i][key] !== undefined && array[i][key] !== null) {
        if (array[i][key].toString() === value.toString())
          filteredArray.push(array[i]);
        }
      }
    return filteredArray;
  }
  return filterKeyValue;
}).factory('pivotTable', function() {
  'use strict';
  return function pivotTable(array, headersToAdd) {

    var rotatedArray = [];
    for (var i = 0; array[0].length > i; i++) {
      rotatedArray.push([]);
    }

    for (var i = 0; array.length > i; i++) {
      for (var y = 0; array[i].length > y; y++) {
        rotatedArray[y].push(array[i][y]);
      }
    }

    var headers = [];

    if (headersToAdd !== undefined && headersToAdd !== null) {
      for(var i = 0; rotatedArray[0].length > i; i++) {
        headers.push(headersToAdd[i]);
      }
    } else {
      for(var i = 0; rotatedArray[0].length > i; i++) {
        headers.push("Kolom " + String(i));
      }
    }

    rotatedArray.unshift(headers);

    // if (firstColumn !== undefined) {
    //
    //   var header,
    //     firstColumnIndex;
    //   for (var i = 0; rotatedArray[0].length > i; i++) {
    //     header = rotatedArray[0][i]
    //     if (header === firstColumn) {
    //       firstColumnIndex = i;
    //     }
    //   }
    //   for (var i = 0; rotatedArray.length > i; i++) {
    //     rotatedArray[i] = rotatedArray[i].move(firstColumnIndex, 0);
    //   }
    // }
    return rotatedArray;
  }
}).factory('toObjects', function() {
  'use strict';
  return function toObjects(headers, data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      var o = {};
      for (var j = 0; j < headers.length; j++) {
        o[headers[j]] = data[i][j];
      }
      result.push(o);
    }
    return result;
  }
}).factory('toArray', function() {
  'use strict';
  return function toArray(headers, data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      var a = [];
      for (var j = 0; j < headers.length; j++) {
        a.push(data[i][headers[j]]);
      }
      result.push(a);
    }
    return result;
  }
}).factory('jsonToArray', function() {
  'use strict';
  return function jsonToArray(data) {
    var result = [],
      headers = Object.keys(data[0]),
      values;
    result.push(headers);
    for (var i = 0; data.length > i; i++) {
      values = [];
      for (var h = 0; headers.length > h; h++) {
        values.push(data[i][headers[h]]);
      }
      result.push(values);
    }
    return result;
  }
}).factory('getPivotArray', function() {
  'use strict';
  return function getPivotArray(dataArray, rowIndex, colIndex, dataIndex) {
    //Code from http://techbrij.com
    var result = {},
      ret = [];
    var newCols = [];
    for (var i = 0; i < dataArray.length; i++) {

      if (!result[dataArray[i][rowIndex]]) {
        result[dataArray[i][rowIndex]] = {};
      }
      result[dataArray[i][rowIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];

      //To get column names
      if (newCols.indexOf(dataArray[i][colIndex]) == -1) {
        newCols.push(dataArray[i][colIndex]);
      }
    }

    newCols.sort();
    var item = [];

    //Add Header Row
    item.push('Item');
    item.push.apply(item, newCols);
    ret.push(item);

    //Add content
    for (var key in result) {
      item = [];
      item.push(key);
      for (var i = 0; i < newCols.length; i++) {
        item.push(result[key][newCols[i]] || 0);
      }
      ret.push(item);
    }
    return ret;
  }
}).factory('sortArray', function() {
  'use strict';
  return function Comparator(a, b) {
    if (a[1] < b[1])
      return -1;
    if (a[1] > b[1])
      return 1;
    return 0;
  }
}).factory('isEmpty', function() {
  'use strict';
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  return function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null)
      return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)
      return false;
    if (obj.length === 0)
      return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object")
      return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key))
        return false;
      }

    return true;
  }
})
