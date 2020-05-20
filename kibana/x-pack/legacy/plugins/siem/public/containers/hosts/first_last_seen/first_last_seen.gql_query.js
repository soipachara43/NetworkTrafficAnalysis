"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostFirstLastSeenGqlQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetHostFirstLastSeenQuery($sourceId: ID!, $hostName: String!, $defaultIndex: [String!]!) {\n    source(id: $sourceId) {\n      id\n      HostFirstLastSeen(hostName: $hostName, defaultIndex: $defaultIndex) {\n        firstSeen\n        lastSeen\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var HostFirstLastSeenGqlQuery = (0, _graphqlTag.default)(_templateObject());
exports.HostFirstLastSeenGqlQuery = HostFirstLastSeenGqlQuery;