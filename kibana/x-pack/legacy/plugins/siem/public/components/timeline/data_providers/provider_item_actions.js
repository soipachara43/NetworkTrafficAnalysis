"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProviderItemActions = exports.getProviderActions = exports.DELETE_CLASS_NAME = exports.FILTER_FOR_FIELD_PRESENT_CLASS_NAME = exports.ENABLE_CLASS_NAME = exports.EXCLUDE_CLASS_NAME = exports.EDIT_CLASS_NAME = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _data_provider = require("./data_provider");

var _edit_data_provider = require("../../edit_data_provider");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var EDIT_CLASS_NAME = 'edit-data-provider';
exports.EDIT_CLASS_NAME = EDIT_CLASS_NAME;
var EXCLUDE_CLASS_NAME = 'exclude-data-provider';
exports.EXCLUDE_CLASS_NAME = EXCLUDE_CLASS_NAME;
var ENABLE_CLASS_NAME = 'enable-data-provider';
exports.ENABLE_CLASS_NAME = ENABLE_CLASS_NAME;
var FILTER_FOR_FIELD_PRESENT_CLASS_NAME = 'filter-for-field-present-data-provider';
exports.FILTER_FOR_FIELD_PRESENT_CLASS_NAME = FILTER_FOR_FIELD_PRESENT_CLASS_NAME;
var DELETE_CLASS_NAME = 'delete-data-provider';
exports.DELETE_CLASS_NAME = DELETE_CLASS_NAME;
var MyEuiPopover = (0, _styledComponents.default)(_eui.EuiPopover).withConfig({
  displayName: "MyEuiPopover",
  componentId: "sc-1hmt32j-0"
})(["height:100%;user-select:none;"]);
MyEuiPopover.displayName = 'MyEuiPopover';

var getProviderActions = function getProviderActions(_ref) {
  var andProviderId = _ref.andProviderId,
      browserFields = _ref.browserFields,
      deleteItem = _ref.deleteItem,
      field = _ref.field,
      isEnabled = _ref.isEnabled,
      isExcluded = _ref.isExcluded,
      isLoading = _ref.isLoading,
      operator = _ref.operator,
      onDataProviderEdited = _ref.onDataProviderEdited,
      onFilterForFieldPresent = _ref.onFilterForFieldPresent,
      providerId = _ref.providerId,
      timelineId = _ref.timelineId,
      toggleEnabled = _ref.toggleEnabled,
      toggleExcluded = _ref.toggleExcluded,
      value = _ref.value;
  return [{
    id: 0,
    items: [{
      className: EDIT_CLASS_NAME,
      disabled: isLoading,
      icon: 'pencil',
      name: i18n.EDIT_MENU_ITEM,
      panel: 1
    }, {
      className: EXCLUDE_CLASS_NAME,
      disabled: isLoading,
      icon: "".concat(isExcluded ? 'plusInCircle' : 'minusInCircle'),
      name: isExcluded ? i18n.INCLUDE_DATA_PROVIDER : i18n.EXCLUDE_DATA_PROVIDER,
      onClick: toggleExcluded
    }, {
      className: ENABLE_CLASS_NAME,
      disabled: isLoading,
      icon: "".concat(isEnabled ? 'eyeClosed' : 'eye'),
      name: isEnabled ? i18n.TEMPORARILY_DISABLE_DATA_PROVIDER : i18n.RE_ENABLE_DATA_PROVIDER,
      onClick: toggleEnabled
    }, {
      className: FILTER_FOR_FIELD_PRESENT_CLASS_NAME,
      disabled: isLoading,
      icon: 'logstashFilter',
      name: i18n.FILTER_FOR_FIELD_PRESENT,
      onClick: onFilterForFieldPresent
    }, {
      className: DELETE_CLASS_NAME,
      disabled: isLoading,
      icon: 'trash',
      name: i18n.DELETE_DATA_PROVIDER,
      onClick: deleteItem
    }]
  }, {
    content: browserFields != null && timelineId != null && onDataProviderEdited != null ? _react.default.createElement(_edit_data_provider.StatefulEditDataProvider, {
      andProviderId: andProviderId,
      browserFields: browserFields,
      field: field,
      isExcluded: isExcluded,
      onDataProviderEdited: onDataProviderEdited,
      operator: operator,
      providerId: providerId,
      timelineId: timelineId,
      value: value
    }) : null,
    id: 1,
    title: i18n.EDIT_TITLE,
    width: 400
  }];
};

exports.getProviderActions = getProviderActions;

var ProviderItemActions =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ProviderItemActions, _React$PureComponent);

  function ProviderItemActions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ProviderItemActions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProviderItemActions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onDataProviderEdited", function (_ref2) {
      var andProviderId = _ref2.andProviderId,
          excluded = _ref2.excluded,
          field = _ref2.field,
          id = _ref2.id,
          operator = _ref2.operator,
          providerId = _ref2.providerId,
          value = _ref2.value;

      if (_this.props.onDataProviderEdited != null) {
        _this.props.onDataProviderEdited({
          andProviderId: andProviderId,
          excluded: excluded,
          field: field,
          id: id,
          operator: operator,
          providerId: providerId,
          value: value
        });
      }

      _this.props.closePopover();
    });

    _defineProperty(_assertThisInitialized(_this), "onFilterForFieldPresent", function () {
      var _this$props = _this.props,
          andProviderId = _this$props.andProviderId,
          field = _this$props.field,
          timelineId = _this$props.timelineId,
          providerId = _this$props.providerId,
          value = _this$props.value;

      if (_this.props.onDataProviderEdited != null) {
        _this.props.onDataProviderEdited({
          andProviderId: andProviderId,
          excluded: false,
          field: field,
          id: "".concat(timelineId),
          operator: _data_provider.EXISTS_OPERATOR,
          providerId: providerId,
          value: value
        });
      }

      _this.props.closePopover();
    });

    return _this;
  }

  _createClass(ProviderItemActions, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          andProviderId = _this$props2.andProviderId,
          browserFields = _this$props2.browserFields,
          button = _this$props2.button,
          closePopover = _this$props2.closePopover,
          deleteProvider = _this$props2.deleteProvider,
          field = _this$props2.field,
          isEnabled = _this$props2.isEnabled,
          isExcluded = _this$props2.isExcluded,
          isLoading = _this$props2.isLoading,
          isOpen = _this$props2.isOpen,
          operator = _this$props2.operator,
          providerId = _this$props2.providerId,
          timelineId = _this$props2.timelineId,
          toggleEnabledProvider = _this$props2.toggleEnabledProvider,
          toggleExcludedProvider = _this$props2.toggleExcludedProvider,
          value = _this$props2.value;
      var panelTree = getProviderActions({
        andProviderId: andProviderId,
        browserFields: browserFields,
        deleteItem: deleteProvider,
        field: field,
        isEnabled: isEnabled,
        isExcluded: isExcluded,
        isLoading: isLoading,
        onDataProviderEdited: this.onDataProviderEdited,
        onFilterForFieldPresent: this.onFilterForFieldPresent,
        operator: operator,
        providerId: providerId,
        timelineId: timelineId,
        toggleEnabled: toggleEnabledProvider,
        toggleExcluded: toggleExcludedProvider,
        value: value
      });
      return _react.default.createElement(MyEuiPopover, {
        id: "popoverFor_".concat(providerId, "-").concat(field, "-").concat(value),
        isOpen: isOpen,
        closePopover: closePopover,
        button: button,
        anchorPosition: "downCenter",
        panelPaddingSize: "none"
      }, _react.default.createElement("div", {
        style: {
          userSelect: 'none'
        }
      }, _react.default.createElement(_eui.EuiContextMenu, {
        initialPanelId: 0,
        panels: panelTree,
        "data-test-subj": "providerActions"
      })));
    }
  }]);

  return ProviderItemActions;
}(_react.default.PureComponent);

exports.ProviderItemActions = ProviderItemActions;