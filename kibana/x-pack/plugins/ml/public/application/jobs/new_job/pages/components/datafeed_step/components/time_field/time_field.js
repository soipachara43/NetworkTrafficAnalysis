"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _time_field_select = require("./time_field_select");

var _job_creator_context = require("../../../job_creator_context");

var _new_job_capabilities_service = require("../../../../../../../services/new_job_capabilities_service");

var _description = require("./description");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TimeField = function TimeField() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated;

  var jobCreator = jc;
  var dateFields = _new_job_capabilities_service.newJobCapsService.dateFields;

  var _useState = (0, _react.useState)(jobCreator.timeFieldName),
      _useState2 = _slicedToArray(_useState, 2),
      timeFieldName = _useState2[0],
      setTimeFieldName = _useState2[1];

  (0, _react.useEffect)(function () {
    jobCreator.timeFieldName = timeFieldName;
    jobCreatorUpdate();
  }, [timeFieldName]);
  (0, _react.useEffect)(function () {
    setTimeFieldName(jobCreator.timeFieldName);
  }, [jobCreatorUpdated]);
  return _react.default.createElement(_description.Description, null, _react.default.createElement(_time_field_select.TimeFieldSelect, {
    fields: dateFields,
    changeHandler: setTimeFieldName,
    selectedField: timeFieldName
  }));
};

exports.TimeField = TimeField;