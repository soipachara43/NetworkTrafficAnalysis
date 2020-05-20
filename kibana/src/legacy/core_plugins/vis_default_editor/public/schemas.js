"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchemasByGroup = exports.getSchemaByName = exports.Schemas = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _indexed_array = require("ui/indexed_array");

var _public = require("../../../../plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schemas = // @ts-ignore
function Schemas(schemas) {
  var _this = this;

  _classCallCheck(this, Schemas);

  _defineProperty(this, "all", void 0);

  (0, _lodash.default)(schemas || []).map(function (schema) {
    if (!schema.name) throw new Error('all schema must have a unique name');

    if (schema.name === 'split') {
      schema.params = [{
        name: 'row',
        default: true
      }];
    }

    _lodash.default.defaults(schema, {
      min: 0,
      max: Infinity,
      group: _public.AggGroupNames.Buckets,
      title: schema.name,
      aggFilter: '*',
      editor: false,
      params: []
    });

    return schema;
  }).tap(function (fullSchemas) {
    _this.all = new _indexed_array.IndexedArray({
      index: ['name'],
      group: ['group'],
      immutable: true,
      initialSet: fullSchemas
    });
  }).groupBy('group').forOwn(function (group, groupName) {
    // @ts-ignore
    _this[groupName] = new _indexed_array.IndexedArray({
      index: ['name'],
      immutable: true,
      // @ts-ignore
      initialSet: group
    });
  }).commit();
};

exports.Schemas = Schemas;

var getSchemaByName = function getSchemaByName(schemas, schemaName) {
  return schemas.find(function (s) {
    return s.name === schemaName;
  }) || {};
};

exports.getSchemaByName = getSchemaByName;

var getSchemasByGroup = function getSchemasByGroup(schemas, schemaGroup) {
  return schemas.filter(function (s) {
    return s.group === schemaGroup;
  });
};

exports.getSchemasByGroup = getSchemasByGroup;