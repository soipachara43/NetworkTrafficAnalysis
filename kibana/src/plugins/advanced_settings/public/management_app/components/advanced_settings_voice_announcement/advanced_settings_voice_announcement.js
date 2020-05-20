"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSettingsVoiceAnnouncement = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AdvancedSettingsVoiceAnnouncement =
/*#__PURE__*/
function (_Component) {
  _inherits(AdvancedSettingsVoiceAnnouncement, _Component);

  function AdvancedSettingsVoiceAnnouncement() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AdvancedSettingsVoiceAnnouncement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AdvancedSettingsVoiceAnnouncement)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "shouldComponentUpdate", function (nextProps) {
      /*
        If a user typed smth new, we should clear the previous timer
        and start another one + block component rendering.
         When it is reset and delaying is over as well as no new string came,
        it's ready to be rendered.
      */
      return nextProps.queryText !== _this.props.queryText;
    });

    return _this;
  }

  _createClass(AdvancedSettingsVoiceAnnouncement, [{
    key: "render",
    value: function render() {
      var filteredSections = Object.values(this.props.settings).map(function (setting) {
        return setting.map(function (option) {
          return option.ariaName;
        });
      });

      var filteredOptions = _toConsumableArray(filteredSections);

      return _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("div", {
        role: "region",
        "aria-live": "polite"
      }, _react.default.createElement(_eui.EuiDelayRender, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "advancedSettings.voiceAnnouncement.searchResultScreenReaderMessage",
        defaultMessage: "You searched for {query}. There {optionLenght, plural, one {is # option} other {are # options}} in {sectionLenght, plural, one {# section} other {# sections}}",
        values: {
          query: this.props.queryText,
          sectionLenght: filteredSections.length,
          optionLenght: filteredOptions.length
        }
      }))));
    }
  }]);

  return AdvancedSettingsVoiceAnnouncement;
}(_react.Component);

exports.AdvancedSettingsVoiceAnnouncement = AdvancedSettingsVoiceAnnouncement;