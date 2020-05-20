"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlPopover = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _kibana = require("../../lib/kibana");

var _telemetry = require("../../lib/telemetry");

var _has_ml_admin_permissions = require("../ml/permissions/has_ml_admin_permissions");

var _toasters = require("../toasters");

var _api = require("./api");

var _helpers = require("./helpers");

var _use_siem_jobs = require("./hooks/use_siem_jobs");

var _jobs_table_filters = require("./jobs_table/filters/jobs_table_filters");

var _jobs_table = require("./jobs_table/jobs_table");

var _showing_count = require("./jobs_table/showing_count");

var _popover_description = require("./popover_description");

var i18n = _interopRequireWildcard(require("./translations"));

var _upgrade_contents = require("./upgrade_contents");

var _use_ml_capabilities = require("./hooks/use_ml_capabilities");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PopoverContentsDiv = _styledComponents.default.div.withConfig({
  displayName: "PopoverContentsDiv",
  componentId: "sc-1kqieep-0"
})(["max-width:684px;"]);

PopoverContentsDiv.displayName = 'PopoverContentsDiv';

function mlPopoverReducer(state, action) {
  switch (action.type) {
    case 'refresh':
      {
        return _objectSpread({}, state, {
          refreshToggle: !state.refreshToggle
        });
      }

    case 'loading':
      {
        return _objectSpread({}, state, {
          isLoading: true
        });
      }

    case 'success':
      {
        return _objectSpread({}, state, {
          isLoading: false
        });
      }

    case 'failure':
      {
        return _objectSpread({}, state, {
          isLoading: false
        });
      }

    default:
      return state;
  }
}

var initialState = {
  isLoading: false,
  refreshToggle: true
};
var defaultFilterProps = {
  filterQuery: '',
  showCustomJobs: false,
  showElasticJobs: false,
  selectedGroups: []
};

var MlPopover = _react2.default.memo(function () {
  var _useReducer = (0, _react2.useReducer)(mlPopoverReducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      isLoading = _useReducer2$.isLoading,
      refreshToggle = _useReducer2$.refreshToggle,
      dispatch = _useReducer2[1];

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var _useState3 = (0, _react2.useState)(defaultFilterProps),
      _useState4 = _slicedToArray(_useState3, 2),
      filterProperties = _useState4[0],
      setFilterProperties = _useState4[1];

  var _useSiemJobs = (0, _use_siem_jobs.useSiemJobs)(refreshToggle),
      _useSiemJobs2 = _slicedToArray(_useSiemJobs, 2),
      isLoadingSiemJobs = _useSiemJobs2[0],
      siemJobs = _useSiemJobs2[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var capabilities = (0, _use_ml_capabilities.useMlCapabilities)();
  var docLinks = (0, _kibana.useKibana)().services.docLinks;
  var handleJobStateChange = (0, _react2.useCallback)(function (job, latestTimestampMs, enable) {
    return enableDatafeed(job, latestTimestampMs, enable, dispatch, dispatchToaster);
  }, [dispatch, dispatchToaster]);
  var filteredJobs = (0, _helpers.filterJobs)(_objectSpread({
    jobs: siemJobs
  }, filterProperties));
  var incompatibleJobCount = siemJobs.filter(function (j) {
    return !j.isCompatible;
  }).length;

  if (!capabilities.isPlatinumOrTrialLicense) {
    // If the user does not have platinum show upgrade UI
    return _react2.default.createElement(_eui.EuiPopover, {
      anchorPosition: "downRight",
      id: "integrations-popover",
      button: _react2.default.createElement(_eui.EuiButtonEmpty, {
        "data-test-subj": "integrations-button",
        iconType: "arrowDown",
        iconSide: "right",
        onClick: function onClick() {
          return setIsPopoverOpen(!isPopoverOpen);
        }
      }, i18n.ML_JOB_SETTINGS),
      isOpen: isPopoverOpen,
      closePopover: function closePopover() {
        return setIsPopoverOpen(!isPopoverOpen);
      }
    }, _react2.default.createElement(_upgrade_contents.UpgradeContents, null));
  } else if ((0, _has_ml_admin_permissions.hasMlAdminPermissions)(capabilities)) {
    // If the user has Platinum License & ML Admin Permissions, show Anomaly Detection button & full config UI
    return _react2.default.createElement(_eui.EuiPopover, {
      anchorPosition: "downRight",
      id: "integrations-popover",
      button: _react2.default.createElement(_eui.EuiButtonEmpty, {
        "data-test-subj": "integrations-button",
        iconType: "arrowDown",
        iconSide: "right",
        onClick: function onClick() {
          setIsPopoverOpen(!isPopoverOpen);
          dispatch({
            type: 'refresh'
          });
        }
      }, i18n.ML_JOB_SETTINGS),
      isOpen: isPopoverOpen,
      closePopover: function closePopover() {
        return setIsPopoverOpen(!isPopoverOpen);
      }
    }, _react2.default.createElement(PopoverContentsDiv, {
      "data-test-subj": "ml-popover-contents"
    }, _react2.default.createElement(_eui.EuiPopoverTitle, null, i18n.ML_JOB_SETTINGS), _react2.default.createElement(_popover_description.PopoverDescription, null), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_jobs_table_filters.JobsTableFilters, {
      siemJobs: siemJobs,
      onFilterChanged: setFilterProperties
    }), _react2.default.createElement(_showing_count.ShowingCount, {
      filterResultsLength: filteredJobs.length
    }), _react2.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), incompatibleJobCount > 0 && _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiCallOut, {
      title: i18n.MODULE_NOT_COMPATIBLE_TITLE(incompatibleJobCount),
      color: "warning",
      iconType: "alert",
      size: "s"
    }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      defaultMessage: "We could not find any data, see {mlDocs} for more information on Machine Learning job requirements.",
      id: "xpack.siem.components.mlPopup.moduleNotCompatibleDescription",
      values: {
        mlDocs: _react2.default.createElement("a", {
          href: "".concat(docLinks.ELASTIC_WEBSITE_URL, "guide/en/siem/guide/").concat(docLinks.DOC_LINK_VERSION, "/machine-learning.html"),
          rel: "noopener noreferrer",
          target: "_blank"
        }, 'Anomaly Detection with Machine Learning')
      }
    }))), _react2.default.createElement(_eui.EuiSpacer, {
      size: "m"
    })), _react2.default.createElement(_jobs_table.JobsTable, {
      isLoading: isLoadingSiemJobs || isLoading,
      jobs: filteredJobs,
      onJobStateChange: handleJobStateChange
    })));
  } else {
    // If the user has Platinum License & not ML Admin, hide Anomaly Detection button as they don't have permissions to configure
    return null;
  }
}); // Enable/Disable Job & Datafeed -- passed to JobsTable for use as callback on JobSwitch


exports.MlPopover = MlPopover;

var enableDatafeed =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(job, latestTimestampMs, enable, dispatch, dispatchToaster) {
    var maxStartTime, startTime;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            submitTelemetry(job, enable);

            if (job.isInstalled) {
              _context.next = 15;
              break;
            }

            dispatch({
              type: 'loading'
            });
            _context.prev = 3;
            _context.next = 6;
            return (0, _api.setupMlJob)({
              configTemplate: job.moduleId,
              indexPatternName: job.defaultIndexPattern,
              jobIdErrorFilter: [job.id],
              groups: job.groups
            });

          case 6:
            dispatch({
              type: 'success'
            });
            _context.next = 15;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            (0, _toasters.errorToToaster)({
              title: i18n.CREATE_JOB_FAILURE,
              error: _context.t0,
              dispatchToaster: dispatchToaster
            });
            dispatch({
              type: 'failure'
            });
            dispatch({
              type: 'refresh'
            });
            return _context.abrupt("return");

          case 15:
            // Max start time for job is no more than two weeks ago to ensure job performance
            maxStartTime = _moment.default.utc().subtract(14, 'days').valueOf();

            if (!enable) {
              _context.next = 29;
              break;
            }

            startTime = Math.max(latestTimestampMs, maxStartTime);
            _context.prev = 18;
            _context.next = 21;
            return (0, _api.startDatafeeds)({
              datafeedIds: ["datafeed-".concat(job.id)],
              start: startTime
            });

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](18);
            (0, _telemetry.track)(_telemetry.METRIC_TYPE.COUNT, _telemetry.TELEMETRY_EVENT.JOB_ENABLE_FAILURE);
            (0, _toasters.errorToToaster)({
              title: i18n.START_JOB_FAILURE,
              error: _context.t1,
              dispatchToaster: dispatchToaster
            });

          case 27:
            _context.next = 38;
            break;

          case 29:
            _context.prev = 29;
            _context.next = 32;
            return (0, _api.stopDatafeeds)({
              datafeedIds: ["datafeed-".concat(job.id)]
            });

          case 32:
            _context.next = 38;
            break;

          case 34:
            _context.prev = 34;
            _context.t2 = _context["catch"](29);
            (0, _telemetry.track)(_telemetry.METRIC_TYPE.COUNT, _telemetry.TELEMETRY_EVENT.JOB_DISABLE_FAILURE);
            (0, _toasters.errorToToaster)({
              title: i18n.STOP_JOB_FAILURE,
              error: _context.t2,
              dispatchToaster: dispatchToaster
            });

          case 38:
            dispatch({
              type: 'refresh'
            });

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9], [18, 23], [29, 34]]);
  }));

  return function enableDatafeed(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var submitTelemetry = function submitTelemetry(job, enabled) {
  // Report type of job enabled/disabled
  (0, _telemetry.track)(_telemetry.METRIC_TYPE.COUNT, job.isElasticJob ? enabled ? _telemetry.TELEMETRY_EVENT.SIEM_JOB_ENABLED : _telemetry.TELEMETRY_EVENT.SIEM_JOB_DISABLED : enabled ? _telemetry.TELEMETRY_EVENT.CUSTOM_JOB_ENABLED : _telemetry.TELEMETRY_EVENT.CUSTOM_JOB_DISABLED);
};

MlPopover.displayName = 'MlPopover';