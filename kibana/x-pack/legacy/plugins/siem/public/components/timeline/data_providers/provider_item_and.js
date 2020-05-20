"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProviderItemAnd = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _and_or_badge = require("../../and_or_badge");

var _data_provider = require("./data_provider");

var _provider_item_badge = require("./provider_item_badge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProviderItemAnd =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ProviderItemAnd, _React$PureComponent);

  function ProviderItemAnd() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ProviderItemAnd);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProviderItemAnd)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "deleteAndProvider", function (providerId, andProviderId) {
      _this.props.onDataProviderRemoved(providerId, andProviderId);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleEnabledAndProvider", function (providerId, enabled, andProviderId) {
      _this.props.onToggleDataProviderEnabled({
        providerId: providerId,
        enabled: enabled,
        andProviderId: andProviderId
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleExcludedAndProvider", function (providerId, excluded, andProviderId) {
      _this.props.onToggleDataProviderExcluded({
        providerId: providerId,
        excluded: excluded,
        andProviderId: andProviderId
      });
    });

    return _this;
  }

  _createClass(ProviderItemAnd, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          browserFields = _this$props.browserFields,
          dataProvidersAnd = _this$props.dataProvidersAnd,
          onDataProviderEdited = _this$props.onDataProviderEdited,
          providerId = _this$props.providerId,
          timelineId = _this$props.timelineId;
      return dataProvidersAnd.map(function (providerAnd, index) {
        return _react.default.createElement(_react.default.Fragment, {
          key: "provider-item-and-".concat(timelineId, "-").concat(providerId, "-").concat(providerAnd.id)
        }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_and_or_badge.AndOrBadge, {
          type: "and"
        })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_provider_item_badge.ProviderItemBadge, {
          andProviderId: providerAnd.id,
          browserFields: browserFields,
          deleteProvider: function deleteProvider() {
            return _this2.deleteAndProvider(providerId, providerAnd.id);
          },
          field: providerAnd.queryMatch.displayField || providerAnd.queryMatch.field,
          kqlQuery: providerAnd.kqlQuery,
          isEnabled: providerAnd.enabled,
          isExcluded: providerAnd.excluded,
          onDataProviderEdited: onDataProviderEdited,
          operator: providerAnd.queryMatch.operator || _data_provider.IS_OPERATOR,
          providerId: providerId,
          timelineId: timelineId,
          toggleEnabledProvider: function toggleEnabledProvider() {
            return _this2.toggleEnabledAndProvider(providerId, !providerAnd.enabled, providerAnd.id);
          },
          toggleExcludedProvider: function toggleExcludedProvider() {
            return _this2.toggleExcludedAndProvider(providerId, !providerAnd.excluded, providerAnd.id);
          },
          val: providerAnd.queryMatch.displayValue || providerAnd.queryMatch.value
        })));
      });
    }
  }]);

  return ProviderItemAnd;
}(_react.default.PureComponent);

exports.ProviderItemAnd = ProviderItemAnd;