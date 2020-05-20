"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MachineLearningFlyout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _selectors = require("../../../state/selectors");

var _actions = require("../../../state/actions");

var _ml_job_link = require("./ml_job_link");

var labels = _interopRequireWildcard(require("./translations"));

var _public = require("../../../../../../../../src/plugins/kibana_react/public");

var _ml_flyout = require("./ml_flyout");

var _constants = require("../../../../common/constants");

var _contexts = require("../../../contexts");

var _hooks = require("../../../hooks");

var _dynamic_settings = require("../../../state/actions/dynamic_settings");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var showMLJobNotification = function showMLJobNotification(notifications, monitorId, basePath, range, success) {
  var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

  if (success) {
    notifications.toasts.success({
      title: _react.default.createElement("p", null, labels.JOB_CREATED_SUCCESS_TITLE),
      body: _react.default.createElement("p", null, labels.JOB_CREATED_SUCCESS_MESSAGE, _react.default.createElement(_ml_job_link.MLJobLink, {
        monitorId: monitorId,
        basePath: basePath,
        dateRange: range
      }, labels.VIEW_JOB)),
      toastLifeTimeMs: 10000
    });
  } else {
    notifications.toasts.danger({
      title: _react.default.createElement("p", null, labels.JOB_CREATION_FAILED),
      body: message !== null && message !== void 0 ? message : _react.default.createElement("p", null, labels.JOB_CREATION_FAILED_MESSAGE),
      toastLifeTimeMs: 10000
    });
  }
};

var MachineLearningFlyout = function MachineLearningFlyout(_ref) {
  var onClose = _ref.onClose;

  var _useKibana = (0, _public.useKibana)(),
      notifications = _useKibana.notifications;

  var dispatch = (0, _reactRedux.useDispatch)();

  var _useSelector = (0, _reactRedux.useSelector)(_selectors.hasNewMLJobSelector),
      hasMLJob = _useSelector.data,
      error = _useSelector.error;

  var isMLJobCreating = (0, _reactRedux.useSelector)(_selectors.isMLJobCreatingSelector);

  var _useSelector2 = (0, _reactRedux.useSelector)(_selectors.selectDynamicSettings),
      settings = _useSelector2.settings;

  (0, _react.useEffect)(function () {
    // Attempt to load or refresh the dynamic settings
    dispatch((0, _dynamic_settings.getDynamicSettings)({}));
  }, [dispatch]);
  var heartbeatIndices = (settings === null || settings === void 0 ? void 0 : settings.heartbeatIndices) || '';

  var _useContext = (0, _react.useContext)(_contexts.UptimeSettingsContext),
      basePath = _useContext.basePath;

  var _useContext2 = (0, _react.useContext)(_contexts.UptimeRefreshContext),
      refreshApp = _useContext2.refreshApp;

  var _useParams = (0, _reactRouterDom.useParams)(),
      monitorId = _useParams.monitorId;

  monitorId = atob(monitorId || '');
  var canCreateMLJob = (0, _reactRedux.useSelector)(_selectors.canCreateMLJobSelector) && heartbeatIndices !== ''; // This function is a noop in the form's disabled state

  var createMLJob = heartbeatIndices ? function () {
    return dispatch(_actions.createMLJobAction.get({
      monitorId: monitorId,
      heartbeatIndices: heartbeatIndices
    }));
  } : function () {
    return null;
  };

  var _useSelector3 = (0, _reactRedux.useSelector)(_selectors.hasMLJobSelector),
      uptimeJobs = _useSelector3.data;

  var hasExistingMLJob = !!(uptimeJobs === null || uptimeJobs === void 0 ? void 0 : uptimeJobs.jobsExist);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isCreatingJob = _useState2[0],
      setIsCreatingJob = _useState2[1];

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      dateRangeStart = _getUrlParams.dateRangeStart,
      dateRangeEnd = _getUrlParams.dateRangeEnd;

  (0, _react.useEffect)(function () {
    if (isCreatingJob && !isMLJobCreating) {
      if (hasMLJob) {
        showMLJobNotification(notifications, monitorId, basePath, {
          to: dateRangeEnd,
          from: dateRangeStart
        }, true);

        var loadMLJob = function loadMLJob(jobId) {
          return dispatch(_actions.getExistingMLJobAction.get({
            monitorId: monitorId
          }));
        };

        loadMLJob(_constants.ML_JOB_ID);
        refreshApp();
      } else {
        var _error$body;

        showMLJobNotification(notifications, monitorId, basePath, {
          to: dateRangeEnd,
          from: dateRangeStart
        }, false, (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : (_error$body = error.body) === null || _error$body === void 0 ? void 0 : _error$body.message));
      }

      setIsCreatingJob(false);
      onClose();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [hasMLJob, notifications, onClose, isCreatingJob, error, isMLJobCreating, monitorId, dispatch, basePath]);
  (0, _react.useEffect)(function () {
    if (hasExistingMLJob && !isMLJobCreating && !hasMLJob && heartbeatIndices) {
      setIsCreatingJob(true);
      dispatch(_actions.createMLJobAction.get({
        monitorId: monitorId,
        heartbeatIndices: heartbeatIndices
      }));
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [dispatch, hasExistingMLJob, heartbeatIndices, monitorId, hasMLJob]);

  if (hasExistingMLJob) {
    return null;
  }

  var createAnomalyJob = function createAnomalyJob() {
    setIsCreatingJob(true);
    createMLJob();
  };

  return _react.default.createElement(_ml_flyout.MLFlyoutView, {
    canCreateMLJob: !!canCreateMLJob,
    isCreatingJob: isMLJobCreating,
    onClickCreate: createAnomalyJob,
    onClose: onClose
  });
};

exports.MachineLearningFlyout = MachineLearningFlyout;