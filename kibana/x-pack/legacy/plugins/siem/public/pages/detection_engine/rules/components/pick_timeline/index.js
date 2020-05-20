"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickTimeline = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _search_super_select = require("../../../../../components/timeline/search_super_select");

var _shared_imports = require("../../../../../shared_imports");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PickTimeline = function PickTimeline(_ref) {
  var dataTestSubj = _ref.dataTestSubj,
      field = _ref.field,
      idAria = _ref.idAria,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      timelineId = _useState2[0],
      setTimelineId = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      timelineTitle = _useState4[0],
      setTimelineTitle = _useState4[1];

  var _getFieldValidityAndE = (0, _shared_imports.getFieldValidityAndErrorMessage)(field),
      isInvalid = _getFieldValidityAndE.isInvalid,
      errorMessage = _getFieldValidityAndE.errorMessage;

  (0, _react.useEffect)(function () {
    var _ref2 = field.value,
        id = _ref2.id,
        title = _ref2.title;

    if (timelineTitle !== title && timelineId !== id) {
      setTimelineId(id);
      setTimelineTitle(title);
    }
  }, [field.value]);
  var handleOnTimelineChange = (0, _react.useCallback)(function (title, id) {
    if (id === null) {
      field.setValue({
        id: id,
        title: null
      });
    } else if (timelineTitle !== title && timelineId !== id) {
      field.setValue({
        id: id,
        title: title
      });
    }
  }, [field]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: field.label,
    labelAppend: field.labelAppend,
    helpText: field.helpText,
    error: errorMessage,
    isInvalid: isInvalid,
    "data-test-subj": dataTestSubj,
    describedByIds: idAria ? [idAria] : undefined
  }, _react.default.createElement(_search_super_select.SearchTimelineSuperSelect, {
    isDisabled: isDisabled,
    hideUntitled: true,
    timelineId: timelineId,
    timelineTitle: timelineTitle,
    onTimelineChange: handleOnTimelineChange
  }));
};

exports.PickTimeline = PickTimeline;