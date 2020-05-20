"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobSwitch = exports.JobSwitchComponent = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _ml_helpers = require("../../../../common/detection_engine/ml_helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StaticSwitch = (0, _styledComponents.default)(_eui.EuiSwitch).withConfig({
  displayName: "StaticSwitch",
  componentId: "bkss9i-0"
})([".euiSwitch__thumb,.euiSwitch__icon{transition:none;}"]);
StaticSwitch.displayName = 'StaticSwitch';

var JobSwitchComponent = function JobSwitchComponent(_ref) {
  var job = _ref.job,
      isSiemJobsLoading = _ref.isSiemJobsLoading,
      onJobStateChange = _ref.onJobStateChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var handleChange = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.next = 3;
              return onJobStateChange(job, job.latestTimestampMs || 0, e.target.checked);

            case 3:
              setIsLoading(false);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [job, setIsLoading, onJobStateChange]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isSiemJobsLoading || isLoading || (0, _ml_helpers.isJobLoading)(job.jobState, job.datafeedState) ? _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m",
    "data-test-subj": "job-switch-loader"
  }) : _react.default.createElement(StaticSwitch, {
    "data-test-subj": "job-switch",
    disabled: (0, _ml_helpers.isJobFailed)(job.jobState, job.datafeedState),
    checked: (0, _ml_helpers.isJobStarted)(job.jobState, job.datafeedState),
    onChange: handleChange,
    showLabel: false,
    label: ""
  })));
};

exports.JobSwitchComponent = JobSwitchComponent;
JobSwitchComponent.displayName = 'JobSwitchComponent';

var JobSwitch = _react.default.memo(JobSwitchComponent);

exports.JobSwitch = JobSwitch;
JobSwitch.displayName = 'JobSwitch';