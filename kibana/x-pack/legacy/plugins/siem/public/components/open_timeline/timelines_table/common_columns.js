"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommonColumns = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _common_styles = require("./common_styles");

var _helpers = require("../helpers");

var _note_previews = require("../note_previews");

var i18n = _interopRequireWildcard(require("../translations"));

var _empty_value = require("../../empty_value");

var _formatted_date = require("../../formatted_date");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Returns the column definitions (passed as the `columns` prop to
 * `EuiBasicTable`) that are common to the compact `Open Timeline` modal view,
 * and the full view shown in the `All Timelines` view of the `Timelines` page
 */
var getCommonColumns = function getCommonColumns(_ref) {
  var itemIdToExpandedNotesRowMap = _ref.itemIdToExpandedNotesRowMap,
      onOpenTimeline = _ref.onOpenTimeline,
      onToggleShowNotes = _ref.onToggleShowNotes;
  return [{
    isExpander: true,
    render: function render(_ref2) {
      var notes = _ref2.notes,
          savedObjectId = _ref2.savedObjectId;
      return notes != null && notes.length > 0 && savedObjectId != null ? _react.default.createElement(_eui.EuiButtonIcon, {
        "data-test-subj": "expand-notes",
        onClick: function onClick() {
          return itemIdToExpandedNotesRowMap[savedObjectId] != null ? onToggleShowNotes((0, _fp.omit)(savedObjectId, itemIdToExpandedNotesRowMap)) : onToggleShowNotes(_objectSpread({}, itemIdToExpandedNotesRowMap, _defineProperty({}, savedObjectId, _react.default.createElement(_note_previews.NotePreviews, {
            notes: notes
          }))));
        },
        "aria-label": itemIdToExpandedNotesRowMap[savedObjectId] ? i18n.COLLAPSE : i18n.EXPAND,
        iconType: itemIdToExpandedNotesRowMap[savedObjectId] ? 'arrowDown' : 'arrowRight'
      }) : null;
    },
    width: _common_styles.ACTION_COLUMN_WIDTH
  }, {
    dataType: 'string',
    field: 'title',
    name: i18n.TIMELINE_NAME,
    render: function render(title, timelineResult) {
      return timelineResult.savedObjectId != null ? _react.default.createElement(_eui.EuiLink, {
        "data-test-subj": "title-".concat(timelineResult.savedObjectId),
        onClick: function onClick() {
          return onOpenTimeline({
            duplicate: false,
            timelineId: "".concat(timelineResult.savedObjectId)
          });
        }
      }, (0, _helpers.isUntitled)(timelineResult) ? i18n.UNTITLED_TIMELINE : title) : _react.default.createElement("div", {
        "data-test-subj": "title-no-saved-object-id-".concat(title || 'no-title')
      }, (0, _helpers.isUntitled)(timelineResult) ? i18n.UNTITLED_TIMELINE : title);
    },
    sortable: false
  }, {
    dataType: 'string',
    field: 'description',
    name: i18n.DESCRIPTION,
    render: function render(description) {
      return _react.default.createElement("span", {
        "data-test-subj": "description"
      }, description != null && description.trim().length > 0 ? description : (0, _empty_value.getEmptyTagValue)());
    },
    sortable: false
  }, {
    dataType: 'date',
    field: 'updated',
    name: i18n.LAST_MODIFIED,
    render: function render(date, timelineResult) {
      return _react.default.createElement("div", {
        "data-test-subj": "updated"
      }, timelineResult.updated != null ? _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
        value: date
      }) : (0, _empty_value.getEmptyTagValue)());
    },
    sortable: true
  }];
};

exports.getCommonColumns = getCommonColumns;