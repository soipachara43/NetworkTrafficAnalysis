"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query SourceQuery($sourceId: ID = \"default\", $defaultIndex: [String!]!) {\n    source(id: $sourceId) {\n      id\n      status {\n        indicesExist(defaultIndex: $defaultIndex)\n        indexFields(defaultIndex: $defaultIndex) {\n          category\n          description\n          example\n          indexes\n          name\n          searchable\n          type\n          aggregatable\n          format\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var sourceQuery = (0, _graphqlTag.default)(_templateObject());
exports.sourceQuery = sourceQuery;