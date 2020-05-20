"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagBadgeList = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _table = require("../../../../common/constants/table");

var _tag_badge = require("../../tag/tag_badge");

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TagBadgeList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TagBadgeList, _React$Component);

  function TagBadgeList(props) {
    var _this;

    _classCallCheck(this, TagBadgeList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagBadgeList).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onButtonClick",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.props.actionHandler(_index.AssignmentActionType.Reload);

              _this.setState(function (prevState) {
                return {
                  isPopoverOpen: !prevState.isPopoverOpen
                };
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    _this.state = {
      isPopoverOpen: false,
      items: []
    };
    return _this;
  }

  _createClass(TagBadgeList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var button = _react.default.createElement(_eui.EuiButton, {
        size: "s",
        iconType: "arrowDown",
        iconSide: "right",
        onClick: this.onButtonClick,
        disabled: this.props.disabled
      }, this.props.name);

      return _react.default.createElement(_eui.EuiPopover, {
        id: "contentPanel",
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        anchorPosition: "downLeft"
      }, _react.default.createElement(_eui.EuiContextMenuPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column",
        gutterSize: "xs",
        style: {
          margin: 10
        }
      }, !this.props.items && _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "l"
      }), this.props.items && this.props.items.length === 0 && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "xs"
      }, _react.default.createElement(_eui.EuiFlexItem, null, "No options avaliable"))), this.props.items && this.props.items.map(function (tag) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          key: "".concat(tag.id)
        }, _react.default.createElement(_eui.EuiFlexGroup, {
          gutterSize: "xs"
        }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_tag_badge.TagBadge, {
          maxIdRenderSize: _table.TABLE_CONFIG.TRUNCATE_TAG_LENGTH_SMALL,
          onClick: function onClick() {
            return _this2.props.actionHandler(_index.AssignmentActionType.Assign, tag.id);
          },
          onClickAriaLabel: tag.id,
          tag: tag
        }))));
      }))));
    }
  }]);

  return TagBadgeList;
}(_react.default.Component);

exports.TagBadgeList = TagBadgeList;