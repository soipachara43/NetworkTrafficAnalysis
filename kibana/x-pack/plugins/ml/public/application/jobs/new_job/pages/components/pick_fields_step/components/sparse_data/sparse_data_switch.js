"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SparseDataSwitch = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _description = require("./description");

var _aggregation_types = require("../../../../../../../../../common/constants/aggregation_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SparseDataSwitch = function SparseDataSwitch() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdated = _useContext.jobCreatorUpdated,
      jobCreatorUpdate = _useContext.jobCreatorUpdate;

  var _useState = (0, _react.useState)(jobCreator.sparseData),
      _useState2 = _slicedToArray(_useState, 2),
      sparseData = _useState2[0],
      setSparseData = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      enabled = _useState4[0],
      setEnabled = _useState4[1];

  (0, _react.useEffect)(function () {
    jobCreator.sparseData = sparseData;
    jobCreatorUpdate();
  }, [sparseData]);
  (0, _react.useEffect)(function () {
    var aggs = [_aggregation_types.ES_AGGREGATION.COUNT, _aggregation_types.ES_AGGREGATION.SUM];
    var isCountOrSum = jobCreator.aggregations.some(function (agg) {
      return agg.dslName !== null && aggs.includes(agg.dslName);
    });
    setEnabled(isCountOrSum);

    if (isCountOrSum === false && sparseData === true) {
      setSparseData(false);
    }
  }, [jobCreatorUpdated]);

  function toggleSparseData() {
    setSparseData(!sparseData);
  }

  return _react.default.createElement(_description.Description, null, _react.default.createElement(_eui.EuiSwitch, {
    name: "switch",
    disabled: enabled === false,
    checked: sparseData,
    onChange: toggleSparseData,
    "data-test-subj": "mlJobWizardSwitchSparseData",
    label: _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.sparseData.title', {
      defaultMessage: 'Sparse data'
    })
  }));
};

exports.SparseDataSwitch = SparseDataSwitch;