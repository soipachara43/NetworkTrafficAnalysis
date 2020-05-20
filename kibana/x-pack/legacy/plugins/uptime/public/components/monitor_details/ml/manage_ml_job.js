"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageMLJobComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _selectors = require("../../../state/selectors");

var _contexts = require("../../../contexts");

var labels = _interopRequireWildcard(require("./translations"));

var _ml_job_link = require("./ml_job_link");

var _hooks = require("../../../hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ManageMLJobComponent = function ManageMLJobComponent(_ref) {
  var hasMLJob = _ref.hasMLJob,
      onEnableJob = _ref.onEnableJob,
      onJobDelete = _ref.onJobDelete;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopOverOpen = _useState2[0],
      setIsPopOverOpen = _useState2[1];

  var _useContext = (0, _react.useContext)(_contexts.UptimeSettingsContext),
      basePath = _useContext.basePath;

  var canDeleteMLJob = (0, _reactRedux.useSelector)(_selectors.canDeleteMLJobSelector);
  var isMLJobCreating = (0, _reactRedux.useSelector)(_selectors.isMLJobCreatingSelector);

  var _useSelector = (0, _reactRedux.useSelector)(_selectors.hasMLJobSelector),
      isMLJobLoading = _useSelector.loading;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      dateRangeStart = _getUrlParams.dateRangeStart,
      dateRangeEnd = _getUrlParams.dateRangeEnd;

  var _useParams = (0, _reactRouterDom.useParams)(),
      monitorId = _useParams.monitorId;

  monitorId = atob(monitorId || '');

  var button = _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: hasMLJob ? 'arrowDown' : 'machineLearningApp',
    iconSide: hasMLJob ? 'right' : 'left',
    onClick: hasMLJob ? function () {
      return setIsPopOverOpen(true);
    } : onEnableJob,
    disabled: hasMLJob && !canDeleteMLJob,
    isLoading: isMLJobCreating || isMLJobLoading
  }, hasMLJob ? labels.ANOMALY_DETECTION : labels.ENABLE_ANOMALY_DETECTION);

  var panels = [{
    id: 0,
    title: labels.MANAGE_ANOMALY_DETECTION,
    items: [{
      name: labels.EXPLORE_IN_ML_APP,
      icon: _react.default.createElement(_eui.EuiIcon, {
        type: "dataVisualizer",
        size: "m"
      }),
      href: (0, _ml_job_link.getMLJobLinkHref)({
        basePath: basePath,
        monitorId: monitorId,
        dateRange: {
          from: dateRangeStart,
          to: dateRangeEnd
        }
      }),
      target: '_blank'
    }, {
      name: labels.DISABLE_ANOMALY_DETECTION,
      icon: _react.default.createElement(_eui.EuiIcon, {
        type: "trash",
        size: "m"
      }),
      onClick: function onClick() {
        setIsPopOverOpen(false);
        onJobDelete();
      }
    }]
  }];
  return _react.default.createElement(_eui.EuiPopover, {
    button: button,
    isOpen: isPopOverOpen,
    closePopover: function closePopover() {
      return setIsPopOverOpen(false);
    }
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: 0,
    panels: panels
  }));
};

exports.ManageMLJobComponent = ManageMLJobComponent;