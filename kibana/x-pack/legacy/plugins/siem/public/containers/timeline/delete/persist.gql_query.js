"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTimelineMutation = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  mutation DeleteTimelineMutation($id: [ID!]!) {\n    deleteTimeline(id: $id)\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var deleteTimelineMutation = (0, _graphqlTag.default)(_templateObject());
exports.deleteTimelineMutation = deleteTimelineMutation;