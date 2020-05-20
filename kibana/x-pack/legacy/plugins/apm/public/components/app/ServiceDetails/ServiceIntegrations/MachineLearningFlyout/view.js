"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MachineLearningFlyoutView = MachineLearningFlyoutView;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _useFetcher2 = require("../../../../../hooks/useFetcher");

var _ml = require("../../../../../services/rest/ml");

var _MLJobLink = require("../../../../shared/Links/MachineLearningLinks/MLJobLink");

var _MLLink = require("../../../../shared/Links/MachineLearningLinks/MLLink");

var _TransactionSelect = require("./TransactionSelect");

var _useServiceTransactionTypes = require("../../../../../hooks/useServiceTransactionTypes");

var _useApmPluginContext = require("../../../../../hooks/useApmPluginContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function MachineLearningFlyoutView(_ref) {
  var isCreatingJob = _ref.isCreatingJob,
      onClickCreate = _ref.onClickCreate,
      onClose = _ref.onClose,
      urlParams = _ref.urlParams;
  var serviceName = urlParams.serviceName;
  var transactionTypes = (0, _useServiceTransactionTypes.useServiceTransactionTypes)(urlParams);

  var _useState = (0, _react2.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTransactionType = _useState2[0],
      setSelectedTransactionType = _useState2[1];

  var http = (0, _useApmPluginContext.useApmPluginContext)().core.http;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function () {
    if (serviceName && selectedTransactionType) {
      return (0, _ml.getHasMLJob)({
        serviceName: serviceName,
        transactionType: selectedTransactionType,
        http: http
      });
    }
  }, [serviceName, selectedTransactionType, http]),
      _useFetcher$data = _useFetcher.data,
      hasMLJob = _useFetcher$data === void 0 ? false : _useFetcher$data,
      status = _useFetcher.status; // update selectedTransactionType when list of transaction types has loaded


  (0, _react2.useEffect)(function () {
    setSelectedTransactionType(transactionTypes[0]);
  }, [transactionTypes]);

  if (!serviceName || !selectedTransactionType || (0, _lodash.isEmpty)(transactionTypes)) {
    return null;
  }

  var isLoadingMLJob = status === _useFetcher2.FETCH_STATUS.LOADING;
  return _react2.default.createElement(_eui.EuiFlyout, {
    onClose: onClose,
    size: "s"
  }, _react2.default.createElement(_eui.EuiFlyoutHeader, null, _react2.default.createElement(_eui.EuiTitle, null, _react2.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.enableAnomalyDetectionTitle', {
    defaultMessage: 'Enable anomaly detection'
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), _react2.default.createElement(_eui.EuiFlyoutBody, null, hasMLJob && _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.callout.jobExistsTitle', {
      defaultMessage: 'Job already exists'
    }),
    color: "success",
    iconType: "check"
  }, _react2.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.callout.jobExistsDescription', {
    defaultMessage: 'There is currently a job running for {serviceName} ({transactionType}).',
    values: {
      serviceName: serviceName,
      transactionType: selectedTransactionType
    }
  }), ' ', _react2.default.createElement(_MLJobLink.MLJobLink, {
    serviceName: serviceName,
    transactionType: selectedTransactionType
  }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.callout.jobExistsDescription.viewJobLinkText', {
    defaultMessage: 'View existing job'
  })))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })), _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.apm.serviceDetails.enableAnomalyDetectionPanel.createMLJobDescription",
    defaultMessage: "Here you can create a machine learning job to calculate anomaly scores on durations for APM transactions within the {serviceName} service. Once enabled, {transactionDurationGraphText} will show the expected bounds and annotate the graph once the anomaly score is >=75.",
    values: {
      serviceName: serviceName,
      transactionDurationGraphText: _react2.default.createElement("b", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.createMLJobDescription.transactionDurationGraphText', {
        defaultMessage: 'the transaction duration graph'
      }))
    }
  })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.apm.serviceDetails.enableAnomalyDetectionPanel.manageMLJobDescription",
    defaultMessage: "Jobs can be created for each service + transaction type combination. Once a job is created, you can manage it and see more details in the {mlJobsPageLink}.",
    values: {
      mlJobsPageLink: _react2.default.createElement(_MLLink.MLLink, null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.manageMLJobDescription.mlJobsPageLinkText', {
        defaultMessage: 'Machine Learning jobs management page'
      }))
    }
  }), ' ', _react2.default.createElement("em", null, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.manageMLJobDescription.noteText', {
    defaultMessage: 'Note: It might take a few minutes for the job to begin calculating results.'
  })))), _react2.default.createElement(_eui.EuiSpacer, null)), _react2.default.createElement(_eui.EuiFlyoutFooter, null, _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "flexEnd"
  }, _react2.default.createElement(_eui.EuiFlexItem, null, transactionTypes.length > 1 ? _react2.default.createElement(_TransactionSelect.TransactionSelect, {
    selectedTransactionType: selectedTransactionType,
    transactionTypes: transactionTypes,
    onChange: function onChange(value) {
      setSelectedTransactionType(value);
    }
  }) : null), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiFormRow, null, _react2.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      return onClickCreate({
        transactionType: selectedTransactionType
      });
    },
    fill: true,
    disabled: isCreatingJob || hasMLJob || isLoadingMLJob
  }, _i18n.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.createNewJobButtonLabel', {
    defaultMessage: 'Create job'
  })))))));
}