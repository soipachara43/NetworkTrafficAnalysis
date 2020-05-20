"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLIntegrationComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _ml_flyout_container = require("./ml_flyout_container");

var _selectors = require("../../../state/selectors");

var _actions = require("../../../state/actions");

var _confirm_delete = require("./confirm_delete");

var _contexts = require("../../../contexts");

var _ml_anomaly = require("../../../state/api/ml_anomaly");

var labels = _interopRequireWildcard(require("./translations"));

var _public = require("../../../../../../../../src/plugins/kibana_react/public");

var _manage_ml_job = require("./manage_ml_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MLIntegrationComponent = function MLIntegrationComponent() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isMlFlyoutOpen = _useState2[0],
      setIsMlFlyoutOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isConfirmDeleteJobOpen = _useState4[0],
      setIsConfirmDeleteJobOpen = _useState4[1];

  var _useContext = (0, _react.useContext)(_contexts.UptimeRefreshContext),
      lastRefresh = _useContext.lastRefresh,
      refreshApp = _useContext.refreshApp;

  var _useKibana = (0, _public.useKibana)(),
      notifications = _useKibana.notifications;

  var _useParams = (0, _reactRouterDom.useParams)(),
      monitorId = _useParams.monitorId;

  monitorId = atob(monitorId || '');
  var dispatch = (0, _reactRedux.useDispatch)();
  var isMLAvailable = (0, _reactRedux.useSelector)(_selectors.hasMLFeatureAvailable);

  var deleteMLJob = function deleteMLJob() {
    return dispatch(_actions.deleteMLJobAction.get({
      monitorId: monitorId
    }));
  };

  var isMLJobDeleting = (0, _reactRedux.useSelector)(_selectors.isMLJobDeletingSelector);

  var _useSelector = (0, _reactRedux.useSelector)(_selectors.isMLJobDeletedSelector),
      jobDeletionSuccess = _useSelector.data;

  var _useSelector2 = (0, _reactRedux.useSelector)(_selectors.hasMLJobSelector),
      uptimeJobs = _useSelector2.data;

  var hasMLJob = !!(uptimeJobs === null || uptimeJobs === void 0 ? void 0 : uptimeJobs.jobsExist) && !!uptimeJobs.jobs.find(function (job) {
    return job.id === (0, _ml_anomaly.getMLJobId)(monitorId);
  });
  (0, _react.useEffect)(function () {
    if (isMLAvailable) {
      dispatch(_actions.getExistingMLJobAction.get({
        monitorId: monitorId
      }));
    }
  }, [dispatch, isMLAvailable, monitorId, lastRefresh]);
  (0, _react.useEffect)(function () {
    var _jobDeletionSuccess$g;

    if (isConfirmDeleteJobOpen && (jobDeletionSuccess === null || jobDeletionSuccess === void 0 ? void 0 : (_jobDeletionSuccess$g = jobDeletionSuccess[(0, _ml_anomaly.getMLJobId)(monitorId)]) === null || _jobDeletionSuccess$g === void 0 ? void 0 : _jobDeletionSuccess$g.deleted)) {
      setIsConfirmDeleteJobOpen(false);
      notifications.toasts.success({
        title: _react.default.createElement("p", null, labels.JOB_DELETION),
        body: _react.default.createElement("p", null, labels.JOB_DELETION_SUCCESS),
        toastLifeTimeMs: 3000
      });
      dispatch((0, _actions.resetMLState)());
      refreshApp();
    }

    return function () {
      dispatch((0, _actions.resetMLState)());
    };
  }, [isMLJobDeleting, isConfirmDeleteJobOpen, jobDeletionSuccess, monitorId, refreshApp, notifications.toasts, dispatch]);

  var onEnableJobClick = function onEnableJobClick() {
    setIsMlFlyoutOpen(true);
  };

  var closeFlyout = function closeFlyout() {
    setIsMlFlyoutOpen(false);
  };

  var confirmDeleteMLJob = function confirmDeleteMLJob() {
    setIsConfirmDeleteJobOpen(true);
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_manage_ml_job.ManageMLJobComponent, {
    hasMLJob: hasMLJob,
    onEnableJob: onEnableJobClick,
    onJobDelete: confirmDeleteMLJob
  }), isMlFlyoutOpen && _react.default.createElement(_ml_flyout_container.MachineLearningFlyout, {
    onClose: closeFlyout
  }), isConfirmDeleteJobOpen && _react.default.createElement(_confirm_delete.ConfirmJobDeletion, {
    onConfirm: deleteMLJob,
    loading: isMLJobDeleting,
    onCancel: function onCancel() {
      setIsConfirmDeleteJobOpen(false);
    }
  }));
};

exports.MLIntegrationComponent = MLIntegrationComponent;