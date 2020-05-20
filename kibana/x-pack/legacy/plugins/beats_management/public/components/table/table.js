"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = exports.AssignmentActionType = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("../../../common/constants");

var _index = require("../autocomplete_field/index");

var _option_control = require("./controls/option_control");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AssignmentActionType;
exports.AssignmentActionType = AssignmentActionType;

(function (AssignmentActionType) {
  AssignmentActionType[AssignmentActionType["Add"] = 0] = "Add";
  AssignmentActionType[AssignmentActionType["Assign"] = 1] = "Assign";
  AssignmentActionType[AssignmentActionType["Delete"] = 2] = "Delete";
  AssignmentActionType[AssignmentActionType["Edit"] = 3] = "Edit";
  AssignmentActionType[AssignmentActionType["Reload"] = 4] = "Reload";
  AssignmentActionType[AssignmentActionType["Search"] = 5] = "Search";
})(AssignmentActionType || (exports.AssignmentActionType = AssignmentActionType = {}));

var TableContainer = _styledComponents.default.div.withConfig({
  displayName: "TableContainer",
  componentId: "sc-1bbt7x3-0"
})(["padding:16px;"]);

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "resetSelection", function () {
      _this.setSelection([]);
    });

    _defineProperty(_assertThisInitialized(_this), "setSelection", function (selection) {
      _this.setState({
        selection: selection
      });
    });

    _defineProperty(_assertThisInitialized(_this), "actionHandler", function (action, payload) {
      if (_this.props.actionHandler) {
        _this.props.actionHandler(action, payload);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTableChange", function (_ref) {
      var page = _ref.page;

      if (_this.props.onTableChange) {
        _this.props.onTableChange(page.index, page.size);
      }

      _this.setState({
        pageIndex: page.index
      });
    });

    _this.state = {
      selection: [],
      pageIndex: 0
    };
    return _this;
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          actionData = _this$props.actionData,
          actions = _this$props.actions,
          hideTableControls = _this$props.hideTableControls,
          items = _this$props.items,
          kueryBarProps = _this$props.kueryBarProps,
          type = _this$props.type;
      var pagination = {
        pageIndex: this.state.pageIndex,
        pageSize: _constants.TABLE_CONFIG.INITIAL_ROW_SIZE,
        pageSizeOptions: _constants.TABLE_CONFIG.PAGE_SIZE_OPTIONS
      };
      var selectionOptions = hideTableControls ? undefined : {
        onSelectionChange: this.setSelection,
        selectable: function selectable() {
          return true;
        },
        selectableMessage: function selectableMessage() {
          return _i18n.i18n.translate('xpack.beatsManagement.table.selectThisBeatTooltip', {
            defaultMessage: 'Select this beat'
          });
        },
        selection: this.state.selection
      };
      return _react.default.createElement(TableContainer, null, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        justifyContent: "spaceBetween"
      }, actions && actions.map(function (action) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          grow: false,
          key: action.name
        }, _react.default.createElement(_option_control.OptionControl, _extends({}, action, {
          actionData: actionData,
          actionHandler: _this2.actionHandler,
          disabled: _this2.state.selection.length === 0
        })));
      }), kueryBarProps && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_index.AutocompleteField, _extends({}, kueryBarProps, {
        placeholder: _i18n.i18n.translate('xpack.beatsManagement.table.filterResultsPlaceholder', {
          defaultMessage: 'Filter results'
        })
      })))), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_eui.EuiBasicTable, {
        items: items,
        itemId: "id",
        isSelectable: true,
        selection: selectionOptions,
        columns: type.columnDefinitions,
        pagination: _objectSpread({}, pagination, {
          totalItemCount: items.length
        }),
        onChange: this.onTableChange
      }));
    }
  }]);

  return Table;
}(_react.default.Component);

exports.Table = Table;