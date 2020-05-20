"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagEdit = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

require("brace/mode/yaml");

require("brace/theme/github");

var _react2 = _interopRequireDefault(require("react"));

var _config_list = require("../config_list");

var _table = require("../table");

var _config_view = require("./config_view");

var _tag_badge = require("./tag_badge");

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

var TagEdit =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TagEdit, _React$PureComponent);

  function TagEdit(props) {
    var _this;

    _classCallCheck(this, TagEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagEdit).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getNameError", function (name) {
      if (name && name !== '' && name.search(/^[a-zA-Z0-9-]+$/) === -1) {
        return _i18n.i18n.translate('xpack.beatsManagement.tag.tagName.validationErrorMessage', {
          defaultMessage: 'Tag name must consist of letters, numbers, and dashes only'
        });
      } else {
        return false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleAssignmentActions", function (action) {
      switch (action) {
        case _table.AssignmentActionType.Delete:
          var selection = _this.state.tableRef.current.state.selection;

          if (_this.props.onDetachBeat) {
            _this.props.onDetachBeat(selection.map(function (beat) {
              return beat.id;
            }));
          }

      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateTag", function (key, value) {
      return value !== undefined ? _this.props.onTagChange(key, value) : function (e) {
        return _this.props.onTagChange(key, e.target ? e.target.value : e);
      };
    });

    _this.state = {
      showFlyout: false,
      tableRef: _react2.default.createRef()
    };
    return _this;
  }

  _createClass(TagEdit, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          tag = _this$props.tag,
          attachedBeats = _this$props.attachedBeats,
          configuration_blocks = _this$props.configuration_blocks;
      return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tag.tagDetailsTitle",
        defaultMessage: "Tag details"
      }))), _react2.default.createElement(_eui.EuiText, {
        color: "subdued"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tag.tagDetailsDescription",
        defaultMessage: "A tag is a group of configuration blocks that you can apply to one or more Beats."
      }))), _react2.default.createElement("div", null, _react2.default.createElement(_tag_badge.TagBadge, {
        tag: tag
      }))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.beatsManagement.tag.tagNameLabel",
          defaultMessage: "Tag Name"
        }),
        isInvalid: !!this.getNameError(tag.name),
        error: this.getNameError(tag.name) || undefined
      }, _react2.default.createElement(_eui.EuiFieldText, {
        name: "name",
        isInvalid: !!this.getNameError(tag.name),
        onChange: this.updateTag('name'),
        value: tag.name,
        placeholder: _i18n.i18n.translate('xpack.beatsManagement.tag.tagNamePlaceholder', {
          defaultMessage: 'Tag name (required)'
        })
      })), _react2.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.beatsManagement.tag.tagColorLabel', {
          defaultMessage: 'Tag Color'
        })
      }, _react2.default.createElement(_eui.EuiColorPicker, {
        color: tag.color,
        onChange: this.updateTag('color')
      }))))), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiHorizontalRule, null), _react2.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "stretch"
      }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tag.tagConfigurationsTitle",
        defaultMessage: "Configuration blocks"
      }))), _react2.default.createElement(_eui.EuiText, {
        color: "subdued"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tag.tagConfigurationsDescription",
        defaultMessage: "A tag can have configuration blocks for different types of Beats. For example, a tag can have two Metricbeat configuration blocks and one Filebeat input configuration block."
      })))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement("div", null, _react2.default.createElement(_config_list.ConfigList, {
        onTableChange: this.props.onConfigListChange,
        configs: configuration_blocks // eslint-disable-line @typescript-eslint/camelcase
        ,
        onConfigClick: function onConfigClick(action, block) {
          if (action === 'delete') {
            _this2.props.onConfigRemoved(block);
          } else {
            _this2.setState({
              showFlyout: true,
              selectedConfig: block
            });
          }
        }
      }), _react2.default.createElement("br", null), _react2.default.createElement(_eui.EuiButton, {
        onClick: function onClick() {
          _this2.setState({
            showFlyout: true
          });
        }
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tag.addConfigurationButtonLabel",
        defaultMessage: "Add configuration block"
      }))))), _react2.default.createElement(_eui.EuiSpacer, null), attachedBeats && _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiHorizontalRule, null), _react2.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.tag.beatsAssignedToTagTitle",
        defaultMessage: "Beats with this tag"
      }))), _react2.default.createElement(_table.Table, {
        actions: _table.tagConfigActions,
        actionHandler: this.handleAssignmentActions,
        items: attachedBeats,
        ref: this.state.tableRef,
        type: _table.BeatsTableType
      })), this.state.showFlyout && _react2.default.createElement(_config_view.ConfigView, {
        configBlock: this.state.selectedConfig,
        onClose: function onClose() {
          return _this2.setState({
            showFlyout: false,
            selectedConfig: undefined
          });
        },
        onSave: function onSave(config) {
          _this2.setState({
            showFlyout: false,
            selectedConfig: undefined
          });

          _this2.props.onConfigAddOrEdit(config);
        }
      }));
    }
  }]);

  return TagEdit;
}(_react2.default.PureComponent);

exports.TagEdit = TagEdit;