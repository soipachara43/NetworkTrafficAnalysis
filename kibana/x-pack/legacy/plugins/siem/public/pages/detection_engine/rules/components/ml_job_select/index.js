"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlJobSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _shared_imports = require("../../../../../shared_imports");

var _use_siem_jobs = require("../../../../../components/ml_popover/hooks/use_siem_jobs");

var _kibana = require("../../../../../lib/kibana");

var _translations = require("../step_define_rule/translations");

var _ml_helpers = require("../../../../../../common/detection_engine/ml_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HelpTextWarningContainer = _styledComponents.default.div.withConfig({
  displayName: "HelpTextWarningContainer",
  componentId: "k3c8x7-0"
})(["margin-top:10px;"]);

var MlJobSelectEuiFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "MlJobSelectEuiFlexGroup",
  componentId: "k3c8x7-1"
})(["margin-bottom:5px;"]);

var HelpText = function HelpText(_ref) {
  var href = _ref.href,
      _ref$showEnableWarnin = _ref.showEnableWarning,
      showEnableWarning = _ref$showEnableWarnin === void 0 ? false : _ref$showEnableWarnin;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.detectionEngine.createRule.stepDefineRule.machineLearningJobIdHelpText",
    defaultMessage: "We've provided a few common jobs to get you started. To add your own custom jobs, assign a group of \u201Csiem\u201D to those jobs in the {machineLearning} application to make them appear here.",
    values: {
      machineLearning: _react.default.createElement(_eui.EuiLink, {
        href: href,
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.siem.components.mlJobSelect.machineLearningLink",
        defaultMessage: "Machine Learning"
      }))
    }
  }), showEnableWarning && _react.default.createElement(HelpTextWarningContainer, null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "warning"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "alert"
  }), _react.default.createElement("span", null, _translations.ENABLE_ML_JOB_WARNING))));
};

var JobDisplay = function JobDisplay(_ref2) {
  var title = _ref2.title,
      description = _ref2.description;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("strong", null, title), _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement("p", null, description)));
};

var MlJobSelect = function MlJobSelect(_ref3) {
  var _ref3$describedByIds = _ref3.describedByIds,
      describedByIds = _ref3$describedByIds === void 0 ? [] : _ref3$describedByIds,
      field = _ref3.field;
  var jobId = field.value;

  var _getFieldValidityAndE = (0, _shared_imports.getFieldValidityAndErrorMessage)(field),
      isInvalid = _getFieldValidityAndE.isInvalid,
      errorMessage = _getFieldValidityAndE.errorMessage;

  var _useSiemJobs = (0, _use_siem_jobs.useSiemJobs)(false),
      _useSiemJobs2 = _slicedToArray(_useSiemJobs, 2),
      isLoading = _useSiemJobs2[0],
      siemJobs = _useSiemJobs2[1];

  var mlUrl = (0, _kibana.useKibana)().services.application.getUrlForApp('ml');
  var handleJobChange = (0, _react.useCallback)(function (machineLearningJobId) {
    field.setValue(machineLearningJobId);
  }, [field]);
  var placeholderOption = {
    value: 'placeholder',
    inputDisplay: _translations.ML_JOB_SELECT_PLACEHOLDER_TEXT,
    dropdownDisplay: _translations.ML_JOB_SELECT_PLACEHOLDER_TEXT,
    disabled: true
  };
  var jobOptions = siemJobs.map(function (job) {
    return {
      value: job.id,
      inputDisplay: job.id,
      dropdownDisplay: _react.default.createElement(JobDisplay, {
        title: job.id,
        description: job.description
      })
    };
  });
  var options = [placeholderOption].concat(_toConsumableArray(jobOptions));
  var isJobRunning = (0, _react.useMemo)(function () {
    // If the selected job is not found in the list, it means the placeholder is selected
    // and so we don't want to show the warning, thus isJobRunning will be true when 'job == null'
    var job = siemJobs.find(function (j) {
      return j.id === jobId;
    });
    return job == null || (0, _ml_helpers.isJobStarted)(job.jobState, job.datafeedState);
  }, [siemJobs, jobId]);
  return _react.default.createElement(MlJobSelectEuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: field.label,
    helpText: _react.default.createElement(HelpText, {
      href: mlUrl,
      showEnableWarning: !isJobRunning
    }),
    isInvalid: isInvalid,
    error: errorMessage,
    "data-test-subj": "mlJobSelect",
    describedByIds: describedByIds
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSuperSelect, {
    hasDividers: true,
    isLoading: isLoading,
    onChange: handleJobChange,
    options: options,
    valueOfSelected: jobId || 'placeholder'
  }))))));
};

exports.MlJobSelect = MlJobSelect;