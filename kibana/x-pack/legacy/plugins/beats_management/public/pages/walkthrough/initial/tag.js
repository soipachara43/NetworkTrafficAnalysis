"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitialTagPage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireWildcard(require("react"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _tag_edit = require("../../../components/tag/tag_edit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var InitialTagPage =
/*#__PURE__*/
function (_Component) {
  _inherits(InitialTagPage, _Component);

  function InitialTagPage(props) {
    var _this;

    _classCallCheck(this, InitialTagPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InitialTagPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "loadTag",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var tags;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.props.libs.tags.getTagsWithIds([_this.state.tag.id]);

            case 2:
              tags = _context.sent;

              if (tags.length > 0) {
                _this.setState({
                  tag: tags[0]
                });
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "saveTag",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var newTag, createBlocksResponse, creationError;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.props.libs.tags.upsertTag(_this.state.tag);

            case 2:
              newTag = _context2.sent;

              if (newTag) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", alert(_i18n.i18n.translate('xpack.beatsManagement.createTag.errorSavingTagTitle', {
                defaultMessage: 'error saving tag'
              })));

            case 5:
              _context2.next = 7;
              return _this.props.libs.configBlocks.upsert(_this.state.configuration_blocks.map(function (block) {
                return _objectSpread({}, block, {
                  tag: _this.state.tag.id
                });
              }));

            case 7:
              createBlocksResponse = _context2.sent;
              creationError = createBlocksResponse.results.reduce(function (err, resp) {
                return !err ? err = resp.error ? resp.error.message : '' : err;
              }, '');

              if (!creationError) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", alert(creationError));

            case 11:
              _this.props.setUrlState({
                createdTag: newTag.id
              });

              _this.props.goTo("/walkthrough/initial/finish");

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _this.state = {
      tag: {
        id: (0, _v.default)(),
        name: '',
        color: '#DD0A73',
        hasConfigurationBlocksTypes: []
      },
      configuration_blocks: [],
      currentConfigPage: 0
    };

    if (props.urlState.createdTag) {
      _this.loadTag();
    }

    return _this;
  }

  _createClass(InitialTagPage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var blockStartingIndex = this.state.currentConfigPage * 5;
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_tag_edit.TagEdit, {
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
      }), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButton, {
        fill: true,
        disabled: this.state.tag.name.search(/^[A-Za-z0-9? ,_-]+$/) === -1 || this.state.tag.name === '' || this.state.configuration_blocks.length === 0,
        onClick: this.saveTag
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.createTag.saveAndContinueButtonLabel",
        defaultMessage: "Save & Continue"
      })))));
    }
  }]);

  return InitialTagPage;
}(_react2.Component);

exports.InitialTagPage = InitialTagPage;