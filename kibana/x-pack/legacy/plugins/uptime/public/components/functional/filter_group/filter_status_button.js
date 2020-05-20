"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterStatusButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FilterStatusButton = function FilterStatusButton(_ref) {
  var content = _ref.content,
      dataTestSubj = _ref.dataTestSubj,
      isDisabled = _ref.isDisabled,
      value = _ref.value,
      withNext = _ref.withNext;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      getUrlParams = _useUrlParams2[0],
      setUrlParams = _useUrlParams2[1];

  var _getUrlParams = getUrlParams(),
      urlValue = _getUrlParams.statusFilter;

  return _react.default.createElement(_eui.EuiFilterButton, {
    "data-test-subj": dataTestSubj,
    hasActiveFilters: urlValue === value,
    isDisabled: isDisabled,
    onClick: function onClick() {
      var nextFilter = {
        statusFilter: urlValue === value ? '' : value,
        pagination: ''
      };
      setUrlParams(nextFilter);
    },
    withNext: withNext
  }, content);
};

exports.FilterStatusButton = FilterStatusButton;