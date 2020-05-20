"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptInMessage = void 0;

var React = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _constants = require("../../common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OptInMessage =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(OptInMessage, _React$PureComponent);

  function OptInMessage() {
    _classCallCheck(this, OptInMessage);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptInMessage).apply(this, arguments));
  }

  _createClass(OptInMessage, [{
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, React.createElement(_react2.FormattedMessage, {
        id: "telemetry.telemetryBannerDescription",
        defaultMessage: "Want to help us improve the Elastic Stack? Data usage collection is currently disabled. Enabling data usage collection helps us manage and improve our products and services. See our {privacyStatementLink} for more details.",
        values: {
          privacyStatementLink: React.createElement(_eui.EuiLink, {
            href: _constants.PRIVACY_STATEMENT_URL,
            target: "_blank",
            rel: "noopener"
          }, React.createElement(_react2.FormattedMessage, {
            id: "telemetry.welcomeBanner.telemetryConfigDetailsDescription.telemetryPrivacyStatementLinkText",
            defaultMessage: "Privacy Statement"
          }))
        }
      }));
    }
  }]);

  return OptInMessage;
}(React.PureComponent);

exports.OptInMessage = OptInMessage;