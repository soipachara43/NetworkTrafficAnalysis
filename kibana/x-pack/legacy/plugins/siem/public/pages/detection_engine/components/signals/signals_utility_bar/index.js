"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalsUtilityBar = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _utility_bar = require("../../../../../components/utility_bar");

var i18n = _interopRequireWildcard(require("./translations"));

var _kibana = require("../../../../../lib/kibana");

var _constants = require("../../../../../../common/constants");

var _signals_filter_group = require("../signals_filter_group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SignalsUtilityBarComponent = function SignalsUtilityBarComponent(_ref) {
  var canUserCRUD = _ref.canUserCRUD,
      hasIndexWrite = _ref.hasIndexWrite,
      areEventsLoading = _ref.areEventsLoading,
      clearSelection = _ref.clearSelection,
      totalCount = _ref.totalCount,
      selectedEventIds = _ref.selectedEventIds,
      isFilteredToOpen = _ref.isFilteredToOpen,
      selectAll = _ref.selectAll,
      showClearSelection = _ref.showClearSelection,
      updateSignalsStatus = _ref.updateSignalsStatus;

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_NUMBER_FORMAT),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultNumberFormat = _useUiSetting$2[0];

  var handleUpdateStatus = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return updateSignalsStatus({
              signalIds: Object.keys(selectedEventIds),
              status: isFilteredToOpen ? _signals_filter_group.FILTER_CLOSED : _signals_filter_group.FILTER_OPEN
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [selectedEventIds, updateSignalsStatus, isFilteredToOpen]);
  var formattedTotalCount = (0, _numeral.default)(totalCount).format(defaultNumberFormat);
  var formattedSelectedEventsCount = (0, _numeral.default)(Object.keys(selectedEventIds).length).format(defaultNumberFormat);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_utility_bar.UtilityBar, null, _react.default.createElement(_utility_bar.UtilityBarSection, null, _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, {
    dataTestSubj: "showingSignals"
  }, i18n.SHOWING_SIGNALS(formattedTotalCount, totalCount))), _react.default.createElement(_utility_bar.UtilityBarGroup, null, canUserCRUD && hasIndexWrite && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_utility_bar.UtilityBarText, {
    dataTestSubj: "selectedSignals"
  }, i18n.SELECTED_SIGNALS(showClearSelection ? formattedTotalCount : formattedSelectedEventsCount, showClearSelection ? totalCount : Object.keys(selectedEventIds).length)), _react.default.createElement(_utility_bar.UtilityBarAction, {
    dataTestSubj: "openCloseSignal",
    disabled: areEventsLoading || (0, _fp.isEmpty)(selectedEventIds),
    iconType: isFilteredToOpen ? 'securitySignalResolved' : 'securitySignalDetected',
    onClick: handleUpdateStatus
  }, isFilteredToOpen ? i18n.BATCH_ACTION_CLOSE_SELECTED : i18n.BATCH_ACTION_OPEN_SELECTED), _react.default.createElement(_utility_bar.UtilityBarAction, {
    iconType: showClearSelection ? 'cross' : 'pagesSelect',
    onClick: function onClick() {
      if (!showClearSelection) {
        selectAll();
      } else {
        clearSelection();
      }
    }
  }, showClearSelection ? i18n.CLEAR_SELECTION : i18n.SELECT_ALL_SIGNALS(formattedTotalCount, totalCount)))))));
};

var SignalsUtilityBar = _react.default.memo(SignalsUtilityBarComponent, function (prevProps, nextProps) {
  return prevProps.areEventsLoading === nextProps.areEventsLoading && prevProps.selectedEventIds === nextProps.selectedEventIds && prevProps.totalCount === nextProps.totalCount && prevProps.showClearSelection === nextProps.showClearSelection;
});

exports.SignalsUtilityBar = SignalsUtilityBar;