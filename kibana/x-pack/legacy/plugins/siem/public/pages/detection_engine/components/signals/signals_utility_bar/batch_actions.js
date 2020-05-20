"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqueRuleCount = exports.getBatchItems = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var i18n = _interopRequireWildcard(require("./translations"));

var _signals_filter_group = require("../signals_filter_group");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Returns ViewInTimeline / UpdateSignalStatus actions to be display within an EuiContextMenuPanel
 *
 * @param areEventsLoading are any events loading
 * @param allEventsSelected are all events on all pages selected
 * @param selectedEventIds
 * @param updateSignalsStatus function for updating signal status
 * @param sendSignalsToTimeline function for sending signals to timeline
 * @param closePopover
 * @param isFilteredToOpen currently selected filter options
 */
var getBatchItems = function getBatchItems(_ref) {
  var areEventsLoading = _ref.areEventsLoading,
      allEventsSelected = _ref.allEventsSelected,
      selectedEventIds = _ref.selectedEventIds,
      updateSignalsStatus = _ref.updateSignalsStatus,
      sendSignalsToTimeline = _ref.sendSignalsToTimeline,
      closePopover = _ref.closePopover,
      isFilteredToOpen = _ref.isFilteredToOpen;
  var allDisabled = areEventsLoading || Object.keys(selectedEventIds).length === 0;
  var sendToTimelineDisabled = allEventsSelected || uniqueRuleCount(selectedEventIds) > 1;
  var filterString = isFilteredToOpen ? i18n.BATCH_ACTION_CLOSE_SELECTED : i18n.BATCH_ACTION_OPEN_SELECTED;
  return [_react.default.createElement(_eui.EuiContextMenuItem, {
    key: i18n.BATCH_ACTION_VIEW_SELECTED_IN_TIMELINE,
    icon: "editorUnorderedList",
    disabled: allDisabled || sendToTimelineDisabled,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              closePopover();
              sendSignalsToTimeline();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }, i18n.BATCH_ACTION_VIEW_SELECTED_IN_TIMELINE), _react.default.createElement(_eui.EuiContextMenuItem, {
    key: filterString,
    icon: isFilteredToOpen ? 'securitySignalResolved' : 'securitySignalDetected',
    disabled: allDisabled,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              closePopover();
              _context2.next = 3;
              return updateSignalsStatus({
                signalIds: Object.keys(selectedEventIds),
                status: isFilteredToOpen ? _signals_filter_group.FILTER_CLOSED : _signals_filter_group.FILTER_OPEN
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))
  }, filterString)];
};
/**
 * Returns the number of unique rules for a given list of signals
 *
 * @param signals
 */


exports.getBatchItems = getBatchItems;

var uniqueRuleCount = function uniqueRuleCount(signals) {
  var ruleIds = Object.values(signals).flatMap(function (data) {
    var _data$find;

    return (_data$find = data.find(function (d) {
      return d.field === 'signal.rule.id';
    })) === null || _data$find === void 0 ? void 0 : _data$find.value;
  });
  return Array.from(new Set(ruleIds)).length;
};

exports.uniqueRuleCount = uniqueRuleCount;