"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TruncateHeightSection = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ToggleButtonContainer = _styledComponents.default.div.withConfig({
  displayName: "ToggleButtonContainer",
  componentId: "sc-1mcx3ay-0"
})(["margin-top:", ";user-select:none;"], (0, _variables.px)(_variables.units.half));

var TruncateHeightSection = function TruncateHeightSection(_ref) {
  var children = _ref.children,
      previewHeight = _ref.previewHeight;
  var contentContainerEl = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      showToggle = _useState2[0],
      setShowToggle = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isOpen = _useState4[0],
      setIsOpen = _useState4[1];

  (0, _react.useEffect)(function () {
    if (contentContainerEl.current) {
      var shouldShow = contentContainerEl.current.scrollHeight > previewHeight;
      setShowToggle(shouldShow);
    }
  }, [children, previewHeight]);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
    ref: contentContainerEl,
    style: {
      overflow: 'hidden',
      maxHeight: isOpen ? 'initial' : (0, _variables.px)(previewHeight)
    }
  }, children), showToggle ? _react.default.createElement(ToggleButtonContainer, null, _react.default.createElement(_eui.EuiLink, {
    onClick: function onClick() {
      setIsOpen(!isOpen);
    }
  }, _react.default.createElement(_eui.EuiIcon, {
    style: {
      transition: 'transform 0.1s',
      transform: "rotate(".concat(isOpen ? 90 : 0, "deg)")
    },
    type: "arrowRight"
  }), ' ', isOpen ? _i18n.i18n.translate('xpack.apm.toggleHeight.showLessButtonLabel', {
    defaultMessage: 'Show fewer lines'
  }) : _i18n.i18n.translate('xpack.apm.toggleHeight.showMoreButtonLabel', {
    defaultMessage: 'Show more lines'
  }))) : null);
};

exports.TruncateHeightSection = TruncateHeightSection;