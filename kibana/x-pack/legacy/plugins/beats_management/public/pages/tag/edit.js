"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagEditPage = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

require("brace/mode/yaml");

require("brace/theme/github");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

var _constants = require("../../../common/constants");

var _primary = require("../../components/layouts/primary");

var _tag = require("../../components/tag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var TagEditPageComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TagEditPageComponent, _React$PureComponent);

  function TagEditPageComponent(props) {
    var _this;

    _classCallCheck(this, TagEditPageComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagEditPageComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "loadConfigBlocks",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var page,
            blocksResponse,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                page = _args.length > 0 && _args[0] !== undefined ? _args[0] : -1;
                _context.next = 3;
                return _this.props.libs.configBlocks.getForTags([_this.state.tag.id], page);

              case 3:
                blocksResponse = _context.sent;

                _this.setState({
                  configuration_blocks: blocksResponse
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function () {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "loadTag",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var tags;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.props.libs.tags.getTagsWithIds([_this.props.match.params.tagid]);

            case 2:
              tags = _context2.sent;

              if (tags.length === 0) {// TODO do something to error https://github.com/elastic/kibana/issues/26023
              }

              _this.setState({
                tag: tags[0]
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "loadAttachedBeats",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var beats, beatsTags;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this.props.libs.beats.getBeatsWithTag(_this.props.match.params.tagid);

            case 2:
              beats = _context3.sent;
              _context3.next = 5;
              return _this.props.libs.tags.getTagsWithIds((0, _lodash.flatten)(beats.map(function (beat) {
                return beat.tags;
              })));

            case 5:
              beatsTags = _context3.sent;

              _this.setState({
                attachedBeats: beats,
                beatsTags: beatsTags
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    _defineProperty(_assertThisInitialized(_this), "saveTag",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.props.containers.tags.upsertTag(_this.state.tag);

            case 2:
              _this.props.goTo("/overview/configuration_tags");

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    _defineProperty(_assertThisInitialized(_this), "getNumExclusiveConfigurationBlocks", function () {
      return _this.state.configuration_blocks.list.map(function (_ref5) {
        var type = _ref5.type;
        return _constants.UNIQUENESS_ENFORCING_TYPES.some(function (uniqueType) {
          return uniqueType === type;
        });
      }).reduce(function (acc, cur) {
        return cur ? acc + 1 : acc;
      }, 0);
    });

    _this.state = {
      showFlyout: false,
      attachedBeats: null,
      beatsTags: [],
      tag: {
        id: props.match.params.tagid,
        name: '',
        color: '#fff',
        hasConfigurationBlocksTypes: []
      },
      configuration_blocks: {
        list: [],
        page: 0,
        total: 0
      }
    };
    return _this;
  }

  _createClass(TagEditPageComponent, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.loadTag();
      this.loadAttachedBeats();
      this.loadConfigBlocks();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var intl = this.props.intl;
      return _react2.default.createElement(_primary.PrimaryLayout, {
        hideBreadcrumbs: this.props.libs.framework.versionGreaterThen('6.7.0'),
        title: intl.formatMessage({
          id: 'xpack.beatsManagement.tag.updateTagTitle',
          defaultMessage: 'Update Tag: {tagId}'
        }, {
          tagId: this.state.tag.id
        })
      }, _react2.default.createElement("div", null, _react2.default.createElement(_tag.TagEdit, {
        tag: this.state.tag,
        configuration_blocks: this.state.configuration_blocks,
        onDetachBeat:
        /*#__PURE__*/
        function () {
          var _ref6 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5(beatIds) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return _this2.props.containers.beats.removeTagsFromBeats(beatIds, _this2.state.tag.id);

                  case 2:
                    _context5.next = 4;
                    return _this2.loadAttachedBeats();

                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));

          return function (_x) {
            return _ref6.apply(this, arguments);
          };
        }(),
        onTagChange: function onTagChange(field, value) {
          return _this2.setState(function (oldState) {
            return {
              tag: _objectSpread({}, oldState.tag, _defineProperty({}, field, value))
            };
          });
        },
        attachedBeats: (this.state.attachedBeats || []).map(function (beat) {
          return _objectSpread({}, beat, {
            tags: (0, _lodash.flatten)(beat.tags.map(function (tagId) {
              return _this2.state.beatsTags.filter(function (tag) {
                return tag.id === tagId;
              });
            }))
          });
        }),
        onConfigListChange: function onConfigListChange(index) {
          _this2.loadConfigBlocks(index);
        },
        onConfigAddOrEdit: function onConfigAddOrEdit(block) {
          _this2.props.libs.configBlocks.upsert([_objectSpread({}, block, {
            tag: _this2.state.tag.id
          })]).catch(function (e) {
            // eslint-disable-next-line
            console.error('Error upseting config block', e);
          }).then(function () {
            _this2.loadConfigBlocks(_this2.state.configuration_blocks.page);
          });
        },
        onConfigRemoved: function onConfigRemoved(block) {
          _this2.props.libs.configBlocks.delete(block.id).catch(function (e) {
            alert('Error removing block, please check your browsers console logs for more details'); // eslint-disable-next-line

            console.error("Error removing block ".concat(block.id), e);
          }).then(function () {
            _this2.loadConfigBlocks(_this2.state.configuration_blocks.page);
          });
        }
      }), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButton, {
        fill: true,
        disabled: this.state.tag.id.search(/^[A-Za-z0-9? ,_-]+$/) === -1 || this.state.tag.id === '' || this.getNumExclusiveConfigurationBlocks() > 1 // || this.state.tag.configuration_blocks.length === 0
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

  return TagEditPageComponent;
}(_react2.default.PureComponent);

var TagEditPage = (0, _react.injectI18n)(TagEditPageComponent);
exports.TagEditPage = TagEditPage;