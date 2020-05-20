"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatDetailPage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

var _config_schemas = require("../../../common/config_schemas");

var _config_schemas_translations_map = require("../../../common/config_schemas_translations_map");

var _constants = require("../../../common/constants");

var _breadcrumb = require("../../components/navigation/breadcrumb");

var _connected_link = require("../../components/navigation/connected_link");

var _tag = require("../../components/tag");

var _index = require("../../components/tag/config_view/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BeatDetailPageUi =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(BeatDetailPageUi, _React$PureComponent);

  function BeatDetailPageUi(props) {
    var _this;

    _classCallCheck(this, BeatDetailPageUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BeatDetailPageUi).call(this, props));
    _this.state = {
      selectedConfig: null,
      tags: [],
      configuration_blocks: [],
      configurationBlocksPage: 0
    };
    return _this;
  }

  _createClass(BeatDetailPageUi, [{
    key: "UNSAFE_componentWillMount",
    value: function () {
      var _UNSAFE_componentWillMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var tags, blocksResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.libs.tags.getTagsWithIds(this.props.beat.tags);

              case 2:
                tags = _context.sent;
                _context.next = 5;
                return this.props.libs.configBlocks.getForTags(this.props.beat.tags, this.state.configurationBlocksPage);

              case 5:
                blocksResult = _context.sent;
                this.setState({
                  configuration_blocks: blocksResult.list,
                  tags: tags
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function UNSAFE_componentWillMount() {
        return _UNSAFE_componentWillMount.apply(this, arguments);
      }

      return UNSAFE_componentWillMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var beat = props.beat,
          intl = props.intl;

      if (!beat) {
        return _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.beat.beatNotFoundErrorTitle",
          defaultMessage: "Beat not found"
        });
      }

      var configurationBlocks = !this.state.configuration_blocks ? [] : this.state.configuration_blocks.map(function (configuration) {
        return _objectSpread({
          // @ts-ignore one of the types on ConfigurationBlock doesn't define a "module" property
          module: configuration.config.type || null,
          tagId: configuration.tag,
          tagColor: ((_this2.state.tags || []).find(function (tag) {
            return tag.id === configuration.tag;
          }) || {}).color || 'grey',
          tagName: ((_this2.state.tags || []).find(function (tag) {
            return tag.id === configuration.tag;
          }) || {}).name || configuration.tag
        }, beat, {}, configuration, {
          displayValue: (0, _lodash.get)((0, _config_schemas_translations_map.translateConfigSchema)(_config_schemas.configBlockSchemas).find(function (config) {
            return config.id === configuration.type;
          }), 'text', null)
        });
      });
      var columns = [{
        field: 'displayValue',
        name: intl.formatMessage({
          id: 'xpack.beatsManagement.beatConfigurations.typeColumnName',
          defaultMessage: 'Type'
        }),
        sortable: true,
        render: function render(value, configuration) {
          return _react2.default.createElement(_eui.EuiLink, {
            onClick: function onClick() {
              _this2.setState({
                selectedConfig: configuration
              });
            }
          }, value || configuration.type);
        }
      }, {
        field: 'module',
        name: intl.formatMessage({
          id: 'xpack.beatsManagement.beatConfigurations.moduleColumnName',
          defaultMessage: 'Module'
        }),
        sortable: true
      }, {
        field: 'description',
        name: intl.formatMessage({
          id: 'xpack.beatsManagement.beatConfigurations.descriptionColumnName',
          defaultMessage: 'Description'
        }),
        sortable: true
      }, {
        field: 'tagId',
        name: intl.formatMessage({
          id: 'xpack.beatsManagement.beatConfigurations.tagColumnName',
          defaultMessage: 'Tag'
        }),
        render: function render(id, block) {
          return _react2.default.createElement(_connected_link.ConnectedLink, {
            path: "/tag/edit/".concat(id)
          }, _react2.default.createElement(_tag.TagBadge, {
            maxIdRenderSize: _constants.TABLE_CONFIG.TRUNCATE_TAG_LENGTH_SMALL,
            tag: {
              color: block.tagColor,
              id: id,
              name: block.tagName
            }
          }));
        },
        sortable: true
      }];
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_breadcrumb.Breadcrumb, {
        title: _i18n.i18n.translate('xpack.beatsManagement.breadcrumb.beatDetails', {
          defaultMessage: 'Beat details for: {beatId}',
          values: {
            beatId: beat.id
          }
        }),
        path: "/beat/".concat(beat.id, "/details")
      }), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beat.detailsConfigurationTitle",
        defaultMessage: "Configurations"
      }))), _react2.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beat.detailsConfigurationDescription",
        defaultMessage: "You can have multiple configurations applied to an individual tag. These configurations can repeat or mix types as necessary. For example, you may utilize three metricbeat configurations alongside one input and filebeat configuration."
      })))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiInMemoryTable, {
        columns: columns,
        items: configurationBlocks
      }))), this.state.selectedConfig && _react2.default.createElement(_index.ConfigView, {
        configBlock: this.state.selectedConfig,
        onClose: function onClose() {
          return _this2.setState({
            selectedConfig: null
          });
        }
      }));
    }
  }]);

  return BeatDetailPageUi;
}(_react2.default.PureComponent);

var BeatDetailPage = (0, _react.injectI18n)(BeatDetailPageUi);
exports.BeatDetailPage = BeatDetailPage;