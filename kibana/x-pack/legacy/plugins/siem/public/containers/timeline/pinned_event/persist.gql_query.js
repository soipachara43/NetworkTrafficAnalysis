"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistTimelinePinnedEventMutation = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  mutation PersistTimelinePinnedEventMutation($pinnedEventId: ID, $eventId: ID!, $timelineId: ID) {\n    persistPinnedEventOnTimeline(\n      pinnedEventId: $pinnedEventId\n      eventId: $eventId\n      timelineId: $timelineId\n    ) {\n      pinnedEventId\n      eventId\n      timelineId\n      timelineVersion\n      created\n      createdBy\n      updated\n      updatedBy\n      version\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var persistTimelinePinnedEventMutation = (0, _graphqlTag.default)(_templateObject());
exports.persistTimelinePinnedEventMutation = persistTimelinePinnedEventMutation;