"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewPageLink = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _hooks = require("../../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var OverviewPageLinkButtonIcon = (0, _styledComponents.default)(_eui.EuiButtonIcon).withConfig({
  displayName: "OverviewPageLinkButtonIcon",
  componentId: "sc-56g4g6-0"
})(["padding-top:12px;"]);

var OverviewPageLink = function OverviewPageLink(_ref) {
  var dataTestSubj = _ref.dataTestSubj,
      direction = _ref.direction,
      pagination = _ref.pagination;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      updateUrlParams = _useUrlParams2[1];

  var icon = direction === 'prev' ? 'arrowLeft' : 'arrowRight';
  var ariaLabel = direction === 'next' ? _i18n.i18n.translate('xpack.uptime.overviewPageLink.next.ariaLabel', {
    defaultMessage: 'Next page of results'
  }) : _i18n.i18n.translate('xpack.uptime.overviewPageLink.prev.ariaLabel', {
    defaultMessage: 'Prev page of results'
  });

  var disableLinkLabel = _i18n.i18n.translate('xpack.uptime.overviewPageLink.disabled.ariaLabel', {
    defaultMessage: 'A disabled pagination button indicating that there cannot be any further navigation in the monitors list.'
  });

  return _react.default.createElement(OverviewPageLinkButtonIcon, {
    color: "text",
    onClick: function onClick() {
      updateUrlParams({
        pagination: pagination
      });
    },
    "data-test-subj": dataTestSubj,
    iconType: icon,
    "aria-label": !pagination ? disableLinkLabel : ariaLabel,
    disabled: !pagination
  });
};

exports.OverviewPageLink = OverviewPageLink;