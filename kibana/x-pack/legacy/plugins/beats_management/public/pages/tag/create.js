"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagCreatePage = void 0;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

require("brace/mode/yaml");

require("brace/theme/github");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

var _configuration_blocks = require("../../../common/constants/configuration_blocks");

var _primary = require("../../components/layouts/primary");

var _tag = require("../../components/tag");

var _random_eui_color = require("../../utils/random_eui_color");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var TagCreatePageComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TagCreatePageComponent, _React$PureComponent);

  function TagCreatePageComponent(props) {
    var _this;

    _classCallCheck(this, TagCreatePageComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagCreatePageComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "saveTag",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var newTag, createBlocksResponse, creationError;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.props.containers.tags.upsertTag(_this.state.tag);

            case 2:
              newTag = _context.sent;

              if (newTag) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", alert(_i18n.i18n.translate('xpack.beatsManagement.createTag.errorSavingTagTitle', {
                defaultMessage: 'error saving tag'
              })));

            case 5:
              _context.next = 7;
              return _this.props.libs.configBlocks.upsert(_this.state.configuration_blocks.map(function (block) {
                return _objectSpread({}, block, {
                  tag: _this.state.tag.id
                });
              }));

            case 7:
              createBlocksResponse = _context.sent;
              creationError = createBlocksResponse.results.reduce(function (err, resp) {
                return !err ? err = resp.error ? resp.error.message : '' : err;
              }, '');

              if (!creationError) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", alert(creationError));

            case 11:
              _this.props.goTo("/overview/configuration_tags");

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "getNumExclusiveConfigurationBlocks", function () {
      return _this.state.configuration_blocks.map(function (_ref2) {
        var type = _ref2.type;
        return _configuration_blocks.UNIQUENESS_ENFORCING_TYPES.some(function (uniqueType) {
          return uniqueType === type;
        });
      }).reduce(function (acc, cur) {
        return cur ? acc + 1 : acc;
      }, 0);
    });

    _this.state = {
      showFlyout: false,
      currentConfigPage: 0,
      tag: {
        id: '',
        name: '',
        color: (0, _random_eui_color.randomEUIColor)(_eui_theme_light.default),
        hasConfigurationBlocksTypes: []
      },
      configuration_blocks: []
    };
    return _this;
  }

  _createClass(TagCreatePageComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var intl = this.props.intl;
      var blockStartingIndex = this.state.currentConfigPage * 5;
      return _react2.default.createElement(_primary.PrimaryLayout, {
        hideBreadcrumbs: this.props.libs.framework.versionGreaterThen('6.7.0'),
        title: intl.formatMessage({
          id: 'xpack.beatsManagement.tag.createTagTitle',
          defaultMessage: 'Create Tag'
        })
      }, _react2.default.createElement("div", null, _react2.default.createElement(_tag.TagEdit, {
        tag: this.state.tag,
        configuration_blocks: {
          list: this.state.configuration_blocks.slice(blockStartingIndex, 5 + blockStartingIndex),
          page: this.state.currentConfigPage,
          total: this.state.configuration_blocks.length
        },
        onTagChange: function onTagChange(field, value) {
          return _this2.setState(function (oldState) {
            return {
              tag: _objectSpread({}, oldState.tag, _defineProperty({}, field, value))
            };
          });
        },
        onConfigListChange: function onConfigListChange(index) {
          _this2.setState({
            currentConfigPage: index
          });
        },
        onConfigAddOrEdit: function onConfigAddOrEdit(block) {
          _this2.setState(function (previousState) {
            return {
              configuration_blocks: previousState.configuration_blocks.concat([block])
            };
          });
        },
        onConfigRemoved: function onConfigRemoved(block) {
          _this2.setState(function (previousState) {
            var selectedIndex = previousState.configuration_blocks.findIndex(function (c) {
              return (0, _lodash.isEqual)(block, c);
            });

            var blocks = _toConsumableArray(previousState.configuration_blocks);

            blocks.splice(selectedIndex, 1);
            return {
              configuration_blocks: blocks
            };
          });
        }
      }), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButton, {
        fill: true,
        disabled: this.state.tag.name.search(/^[A-Za-z0-9? ,_-]+$/) === -1 || this.state.tag.name === '' || this.getNumExclusiveConfigurationBlocks() > 1 // || this.state.tag.configuration_blocks.length === 0
        ,
        onClick: this.saveTag
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tag.saveButtonLabel",
        defaultMessage: "Save"
      }))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButtonEmpty, {
        onClick: function onClick() {
          return _this2.props.goTo('/overview/configuration_tags');
        }
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tag.cancelButtonLabel",
        defaultMessage: "Cancel"
      }))))));
    }
  }]);

  return TagCreatePageComponent;
}(_react2.default.PureComponent);

var TagCreatePage = (0, _react.injectI18n)(TagCreatePageComponent);
exports.TagCreatePage = TagCreatePage;