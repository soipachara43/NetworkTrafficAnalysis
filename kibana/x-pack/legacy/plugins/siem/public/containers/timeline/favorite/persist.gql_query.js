"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistTimelineFavoriteMutation = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  mutation PersistTimelineFavoriteMutation($timelineId: ID) {\n    persistFavorite(timelineId: $timelineId) {\n      savedObjectId\n      version\n      favorite {\n        fullName\n        userName\n        favoriteDate\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var persistTimelineFavoriteMutation = (0, _graphqlTag.default)(_templateObject());
exports.persistTimelineFavoriteMutation = persistTimelineFavoriteMutation;