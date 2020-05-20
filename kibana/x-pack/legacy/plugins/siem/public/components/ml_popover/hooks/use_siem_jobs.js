"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSiemJobs = void 0;

var _react = require("react");

var _api = require("../api");

var _has_ml_user_permissions = require("../../ml/permissions/has_ml_user_permissions");

var _toasters = require("../../toasters");

var _kibana = require("../../../lib/kibana");

var _constants = require("../../../../common/constants");

var i18n = _interopRequireWildcard(require("./translations"));

var _use_siem_jobs_helpers = require("./use_siem_jobs_helpers");

var _use_ml_capabilities = require("./use_ml_capabilities");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Compiles a collection of SiemJobs, which are a list of all jobs relevant to the SIEM App. This
 * includes all installed jobs in the `SIEM` ML group, and all jobs within ML Modules defined in
 * ml_module (whether installed or not). Use the corresponding helper functions to filter the job
 * list as necessary. E.g. installed jobs, running jobs, etc.
 *
 * @param refetchData
 */
var useSiemJobs = function useSiemJobs(refetchData) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      siemJobs = _useState2[0],
      setSiemJobs = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var mlCapabilities = (0, _use_ml_capabilities.useMlCapabilities)();
  var userPermissions = (0, _has_ml_user_permissions.hasMlUserPermissions)(mlCapabilities);

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_INDEX_KEY),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      siemDefaultIndex = _useUiSetting$2[0];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();
    setLoading(true);

    function fetchSiemJobIdsFromGroupsData() {
      return _fetchSiemJobIdsFromGroupsData.apply(this, arguments);
    }

    function _fetchSiemJobIdsFromGroupsData() {
      _fetchSiemJobIdsFromGroupsData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, _ref2, jobSummaryData, modulesData, compatibleModules, compositeSiemJobs;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!userPermissions) {
                  _context.next = 16;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return Promise.all([(0, _api.getJobsSummary)(abortCtrl.signal), (0, _api.getModules)({
                  signal: abortCtrl.signal
                }), (0, _api.checkRecognizer)({
                  indexPatternName: siemDefaultIndex,
                  signal: abortCtrl.signal
                })]);

              case 4:
                _ref = _context.sent;
                _ref2 = _slicedToArray(_ref, 3);
                jobSummaryData = _ref2[0];
                modulesData = _ref2[1];
                compatibleModules = _ref2[2];
                compositeSiemJobs = (0, _use_siem_jobs_helpers.createSiemJobs)(jobSummaryData, modulesData, compatibleModules);

                if (isSubscribed) {
                  setSiemJobs(compositeSiemJobs);
                }

                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);

                if (isSubscribed) {
                  (0, _toasters.errorToToaster)({
                    title: i18n.SIEM_JOB_FETCH_FAILURE,
                    error: _context.t0,
                    dispatchToaster: dispatchToaster
                  });
                }

              case 16:
                if (isSubscribed) {
                  setLoading(false);
                }

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13]]);
      }));
      return _fetchSiemJobIdsFromGroupsData.apply(this, arguments);
    }

    fetchSiemJobIdsFromGroupsData();
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [refetchData, userPermissions]);
  return [loading, siemJobs];
};

exports.useSiemJobs = useSiemJobs;