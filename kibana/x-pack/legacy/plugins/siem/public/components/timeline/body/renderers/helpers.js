"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNillEmptyOrNotFinite = isNillEmptyOrNotFinite;
exports.showVia = exports.isProcessStoppedOrTerminationEvent = exports.isFileEvent = exports.TokensFlexItem = exports.Details = exports.getValues = exports.findItem = exports.deleteItemIdx = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var deleteItemIdx = function deleteItemIdx(data, idx) {
  return [].concat(_toConsumableArray(data.slice(0, idx)), _toConsumableArray(data.slice(idx + 1)));
};

exports.deleteItemIdx = deleteItemIdx;

var findItem = function findItem(data, field) {
  return data.findIndex(function (d) {
    return d.field === field;
  });
};

exports.findItem = findItem;

var getValues = function getValues(field, data) {
  var obj = data.find(function (d) {
    return d.field === field;
  });

  if (obj != null && obj.value != null) {
    return obj.value;
  }

  return undefined;
};

exports.getValues = getValues;

var Details = _styledComponents.default.div.withConfig({
  displayName: "Details",
  componentId: "vnu413-0"
})(["margin:5px 0 5px 10px;& .euiBadge{margin:2px 0 2px 0;}"]);

exports.Details = Details;
Details.displayName = 'Details';
var TokensFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "TokensFlexItem",
  componentId: "vnu413-1"
})(["margin-left:3px;"]);
exports.TokensFlexItem = TokensFlexItem;
TokensFlexItem.displayName = 'TokensFlexItem';

function isNillEmptyOrNotFinite(value) {
  return (0, _fp.isNumber)(value) ? !isFinite(value) : (0, _fp.isEmpty)(value);
}

var isFileEvent = function isFileEvent(_ref) {
  var eventCategory = _ref.eventCategory,
      eventDataset = _ref.eventDataset;
  return eventCategory != null && eventCategory.toLowerCase() === 'file' || eventDataset != null && eventDataset.toLowerCase() === 'file';
};

exports.isFileEvent = isFileEvent;

var isProcessStoppedOrTerminationEvent = function isProcessStoppedOrTerminationEvent(eventAction) {
  return ['process_stopped', 'termination_event'].includes("".concat(eventAction).toLowerCase());
};

exports.isProcessStoppedOrTerminationEvent = isProcessStoppedOrTerminationEvent;

var showVia = function showVia(eventAction) {
  return ['file_create_event', 'created', 'file_delete_event', 'deleted'].includes("".concat(eventAction).toLowerCase());
};

exports.showVia = showVia;