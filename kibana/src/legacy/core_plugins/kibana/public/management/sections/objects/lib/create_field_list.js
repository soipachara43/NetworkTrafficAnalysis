"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFieldList = createFieldList;

var _lodash = require("lodash");

var _public = require("../../../../../../../../plugins/data/public");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var maxRecursiveIterations = 20;

function createFieldList(object, service) {
  var fields = Object.entries(object.attributes).reduce(function (objFields, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return [].concat(_toConsumableArray(objFields), _toConsumableArray(recursiveCreateFields(key, value)));
  }, []);

  if (service && service.Class) {
    addFieldsFromClass(service.Class, fields);
  }

  return fields;
}
/**
 * Creates a field definition and pushes it to the memo stack. This function
 * is designed to be used in conjunction with _.reduce(). If the
 * values is plain object it will recurse through all the keys till it hits
 * a string, number or an array.
 *
 * @param {string} key The key of the field
 * @param {mixed} value The value of the field
 * @param {array} parents The parent keys to the field
 * @returns {array}
 */


var recursiveCreateFields = function recursiveCreateFields(key, value) {
  var parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var path = [].concat(_toConsumableArray(parents), [key]);

  if (path.length > maxRecursiveIterations) {
    return [];
  }

  var field = {
    type: 'text',
    name: path.join('.'),
    value: value
  };

  if ((0, _lodash.isString)(field.value)) {
    try {
      field.value = JSON.stringify(JSON.parse(field.value), undefined, 2);
      field.type = 'json';
    } catch (err) {
      field.type = 'text';
    }
  } else if ((0, _lodash.isNumber)(field.value)) {
    field.type = 'number';
  } else if (Array.isArray(field.value)) {
    field.type = 'array';
    field.value = JSON.stringify(field.value, undefined, 2);
  } else if ((0, _lodash.isBoolean)(field.value)) {
    field.type = 'boolean';
  } else if ((0, _lodash.isPlainObject)(field.value)) {
    var fields = [];
    (0, _lodash.forOwn)(field.value, function (childValue, childKey) {
      fields = [].concat(_toConsumableArray(fields), _toConsumableArray(recursiveCreateFields(childKey, childValue, path)));
    });
    return fields;
  }

  return [field];
};

var addFieldsFromClass = function addFieldsFromClass(Class, fields) {
  var fieldMap = (0, _lodash.indexBy)(fields, 'name');

  _.forOwn(Class.mapping, function (esType, name) {
    if (!name || fieldMap[name]) {
      return;
    }

    var getFieldTypeFromEsType = function getFieldTypeFromEsType() {
      switch ((0, _public.castEsToKbnFieldTypeName)(esType)) {
        case 'string':
          return 'text';

        case 'number':
          return 'number';

        case 'boolean':
          return 'boolean';

        default:
          return 'json';
      }
    };

    fields.push({
      name: name,
      type: getFieldTypeFromEsType(),
      value: undefined
    });
  });

  if (Class.searchSource && !fieldMap['kibanaSavedObjectMeta.searchSourceJSON']) {
    fields.push({
      name: 'kibanaSavedObjectMeta.searchSourceJSON',
      type: 'json',
      value: '{}'
    });
  }

  if (!fieldMap.references) {
    fields.push({
      name: 'references',
      type: 'array',
      value: '[]'
    });
  }
};