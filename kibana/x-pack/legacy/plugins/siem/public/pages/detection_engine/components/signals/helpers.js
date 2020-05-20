"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceTemplateFieldFromDataProviders = exports.reformatDataProviderWithNewValue = exports.replaceTemplateFieldFromMatchFilters = exports.replaceTemplateFieldFromQuery = exports.findValueToChangeInQuery = exports.getStringArray = void 0;

var _fp = require("lodash/fp");

var _public = require("../../../../../../../../../src/plugins/data/public");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Fields that will be replaced with the template strings from a a saved timeline template.
 * This is used for the signals detection engine feature when you save a timeline template
 * and are the fields you can replace when creating a template.
 */
var templateFields = ['host.name', 'host.hostname', 'host.domain', 'host.id', 'host.ip', 'client.ip', 'destination.ip', 'server.ip', 'source.ip', 'network.community_id', 'user.name', 'process.name'];
/**
 * This will return an unknown as a string array if it exists from an unknown data type and a string
 * that represents the path within the data object the same as lodash's "get". If the value is non-existent
 * we will return an empty array. If it is a non string value then this will log a trace to the console
 * that it encountered an error and return an empty array.
 * @param field string of the field to access
 * @param data The unknown data that is typically a ECS value to get the value
 * @param localConsole The local console which can be sent in to make this pure (for tests) or use the default console
 */

var getStringArray = function getStringArray(field, data) {
  var localConsole = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console;
  var value = (0, _fp.get)(field, data);

  if (value == null) {
    return [];
  } else if (typeof value === 'string') {
    return [value];
  } else if (Array.isArray(value) && value.every(function (element) {
    return typeof element === 'string';
  })) {
    return value;
  } else {
    localConsole.trace('Data type that is not a string or string array detected:', value, 'when trying to access field:', field, 'from data object of:', data);
    return [];
  }
};

exports.getStringArray = getStringArray;

var findValueToChangeInQuery = function findValueToChangeInQuery(kueryNode) {
  var valueToChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var localValueToChange = valueToChange;

  if (kueryNode.function === 'is' && templateFields.includes(kueryNode.arguments[0].value)) {
    localValueToChange = [].concat(_toConsumableArray(localValueToChange), [{
      field: kueryNode.arguments[0].value,
      valueToChange: kueryNode.arguments[1].value
    }]);
  }

  return kueryNode.arguments.reduce(function (addValueToChange, ast) {
    if (ast.function === 'is' && templateFields.includes(ast.arguments[0].value)) {
      return [].concat(_toConsumableArray(addValueToChange), [{
        field: ast.arguments[0].value,
        valueToChange: ast.arguments[1].value
      }]);
    }

    if (ast.arguments) {
      return findValueToChangeInQuery(ast, addValueToChange);
    }

    return addValueToChange;
  }, localValueToChange);
};

exports.findValueToChangeInQuery = findValueToChangeInQuery;

var replaceTemplateFieldFromQuery = function replaceTemplateFieldFromQuery(query, ecsData) {
  if (query.trim() !== '') {
    var valueToChange = findValueToChangeInQuery(_public.esKuery.fromKueryExpression(query));
    return valueToChange.reduce(function (newQuery, vtc) {
      var newValue = getStringArray(vtc.field, ecsData);

      if (newValue.length) {
        return newQuery.replace(vtc.valueToChange, newValue[0]);
      } else {
        return newQuery;
      }
    }, query);
  } else {
    return '';
  }
};

exports.replaceTemplateFieldFromQuery = replaceTemplateFieldFromQuery;

var replaceTemplateFieldFromMatchFilters = function replaceTemplateFieldFromMatchFilters(filters, ecsData) {
  return filters.map(function (filter) {
    if (filter.meta.type === 'phrase' && filter.meta.key != null && templateFields.includes(filter.meta.key)) {
      var newValue = getStringArray(filter.meta.key, ecsData);

      if (newValue.length) {
        filter.meta.params = {
          query: newValue[0]
        };
        filter.query = {
          match_phrase: _defineProperty({}, filter.meta.key, newValue[0])
        };
      }
    }

    return filter;
  });
};

exports.replaceTemplateFieldFromMatchFilters = replaceTemplateFieldFromMatchFilters;

var reformatDataProviderWithNewValue = function reformatDataProviderWithNewValue(dataProvider, ecsData) {
  if (templateFields.includes(dataProvider.queryMatch.field)) {
    var newValue = getStringArray(dataProvider.queryMatch.field, ecsData);

    if (newValue.length) {
      dataProvider.id = dataProvider.id.replace(dataProvider.name, newValue[0]);
      dataProvider.name = newValue[0];
      dataProvider.queryMatch.value = newValue[0];
      dataProvider.queryMatch.displayField = undefined;
      dataProvider.queryMatch.displayValue = undefined;
    }
  }

  return dataProvider;
};

exports.reformatDataProviderWithNewValue = reformatDataProviderWithNewValue;

var replaceTemplateFieldFromDataProviders = function replaceTemplateFieldFromDataProviders(dataProviders, ecsData) {
  return dataProviders.map(function (dataProvider) {
    var newDataProvider = reformatDataProviderWithNewValue(dataProvider, ecsData);

    if (newDataProvider.and != null && !(0, _fp.isEmpty)(newDataProvider.and)) {
      newDataProvider.and = newDataProvider.and.map(function (andDataProvider) {
        return reformatDataProviderWithNewValue(andDataProvider, ecsData);
      });
    }

    return newDataProvider;
  });
};

exports.replaceTemplateFieldFromDataProviders = replaceTemplateFieldFromDataProviders;