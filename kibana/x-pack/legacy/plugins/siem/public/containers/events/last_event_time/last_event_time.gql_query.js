"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LastEventTimeGqlQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetLastEventTimeQuery(\n    $sourceId: ID!\n    $indexKey: LastEventIndexKey!\n    $details: LastTimeDetails!\n    $defaultIndex: [String!]!\n  ) {\n    source(id: $sourceId) {\n      id\n      LastEventTime(indexKey: $indexKey, details: $details, defaultIndex: $defaultIndex) {\n        lastSeen\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LastEventTimeGqlQuery = (0, _graphqlTag.default)(_templateObject());
exports.LastEventTimeGqlQuery = LastEventTimeGqlQuery;