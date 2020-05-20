"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeSelection = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _memoize = require("../../../../../../visualizations/public/np_ready/public/legacy/memoize");

var _new_vis_help = require("./new_vis_help");

var _vis_help_text = require("./vis_help_text");

var _vis_type_icon = require("./vis_type_icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var TypeSelection =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TypeSelection, _React$Component);

  function TypeSelection() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TypeSelection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TypeSelection)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      highlightedType: null,
      query: ''
    });

    _defineProperty(_assertThisInitialized(_this), "getFilteredVisTypes", (0, _memoize.memoizeLast)(_this.filteredVisTypes));

    _defineProperty(_assertThisInitialized(_this), "renderVisType", function (visType) {
      var stage = {};
      var highlightMsg;

      if (!('aliasUrl' in visType) && visType.stage === 'experimental') {
        stage = {
          betaBadgeLabel: _i18n.i18n.translate('visualizations.newVisWizard.experimentalTitle', {
            defaultMessage: 'Experimental'
          }),
          betaBadgeTooltipContent: _i18n.i18n.translate('visualizations.newVisWizard.experimentalTooltip', {
            defaultMessage: 'This visualization might be changed or removed in a future release and is not subject to the support SLA.'
          })
        };
        highlightMsg = _i18n.i18n.translate('visualizations.newVisWizard.experimentalDescription', {
          defaultMessage: 'This visualization is experimental. The design and implementation are less mature than stable visualizations and might be subject to change.'
        });
      } else if ('aliasUrl' in visType) {
        if (visType.stage === 'beta') {
          var aliasDescription = _i18n.i18n.translate('visualizations.newVisWizard.betaDescription', {
            defaultMessage: 'This visualization is in beta and is subject to change. The design and code is less mature than official GA features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA features'
          });

          stage = {
            betaBadgeLabel: _i18n.i18n.translate('visualizations.newVisWizard.betaTitle', {
              defaultMessage: 'Beta'
            }),
            betaBadgeTooltipContent: aliasDescription // betaBadgeIconType: 'popout',

          };
          highlightMsg = aliasDescription;
        } else {
          var _aliasDescription = _i18n.i18n.translate('visualizations.newVisWizard.visTypeAliasDescription', {
            defaultMessage: 'Opens a Kibana application that is outside of Visualize.'
          });

          stage = {
            betaBadgeLabel: _i18n.i18n.translate('visualizations.newVisWizard.visTypeAliasTitle', {
              defaultMessage: 'Kibana application'
            }),
            betaBadgeTooltipContent: _aliasDescription,
            betaBadgeIconType: 'popout'
          };
          highlightMsg = _aliasDescription;
        }
      }

      var isDisabled = _this.state.query !== '' && !visType.highlighted;

      var onClick = function onClick() {
        return _this.props.onVisTypeSelected(visType);
      };

      var highlightedType = {
        title: visType.title,
        name: visType.name,
        description: visType.description,
        highlightMsg: highlightMsg
      };
      return _react2.default.createElement(_eui.EuiKeyPadMenuItemButton, _extends({
        key: visType.name,
        label: _react2.default.createElement("span", {
          "data-test-subj": "visTypeTitle"
        }, visType.title),
        onClick: onClick,
        onFocus: function onFocus() {
          return _this.setHighlightType(highlightedType);
        },
        onMouseEnter: function onMouseEnter() {
          return _this.setHighlightType(highlightedType);
        },
        onMouseLeave: function onMouseLeave() {
          return _this.setHighlightType(null);
        },
        onBlur: function onBlur() {
          return _this.setHighlightType(null);
        },
        className: "visNewVisDialog__type",
        "data-test-subj": "visType-".concat(visType.name),
        "data-vis-stage": !('aliasUrl' in visType) ? visType.stage : 'alias',
        disabled: isDisabled,
        "aria-describedby": "visTypeDescription-".concat(visType.name),
        role: "menuitem"
      }, stage), _react2.default.createElement(_vis_type_icon.VisTypeIcon, {
        icon: visType.icon,
        image: !('aliasUrl' in visType) ? visType.image : undefined
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryChange", function (ev) {
      _this.setState({
        query: ev.target.value
      });
    });

    return _this;
  }

  _createClass(TypeSelection, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          query = _this$state.query,
          highlightedType = _this$state.highlightedType;
      var visTypes = this.getFilteredVisTypes(this.props.visTypesRegistry, query);
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiModalHeader, null, _react2.default.createElement(_eui.EuiModalHeaderTitle, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "visualizations.newVisWizard.title",
        defaultMessage: "New Visualization"
      }))), _react2.default.createElement("div", {
        className: "visNewVisDialog__body"
      }, _react2.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "xl"
      }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        className: "visNewVisDialog__list",
        direction: "column",
        gutterSize: "none",
        responsive: false
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        className: "visNewVisDialog__searchWrapper"
      }, _react2.default.createElement(_eui.EuiFieldSearch, {
        placeholder: "Filter",
        value: query,
        onChange: this.onQueryChange,
        fullWidth: true,
        "data-test-subj": "filterVisType",
        "aria-label": _i18n.i18n.translate('visualizations.newVisWizard.filterVisTypeAriaLabel', {
          defaultMessage: 'Filter for a visualization type'
        })
      })), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: 1,
        className: "visNewVisDialog__typesWrapper"
      }, _react2.default.createElement(_eui.EuiScreenReaderOnly, null, _react2.default.createElement("span", {
        "aria-live": "polite"
      }, query && _react2.default.createElement(_react.FormattedMessage, {
        id: "visualizations.newVisWizard.resultsFound",
        defaultMessage: "{resultCount} {resultCount, plural, one {type} other {types} } found",
        values: {
          resultCount: visTypes.filter(function (type) {
            return type.highlighted;
          }).length
        }
      }))), _react2.default.createElement(_eui.EuiKeyPadMenu, {
        className: "visNewVisDialog__types",
        "data-test-subj": "visNewDialogTypes"
      }, visTypes.map(this.renderVisType))))), _react2.default.createElement(_eui.EuiFlexItem, {
        className: "visNewVisDialog__description",
        grow: false
      }, highlightedType ? _react2.default.createElement(_vis_help_text.VisHelpText, highlightedType) : _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "visualizations.newVisWizard.selectVisType",
        defaultMessage: "Select a visualization type"
      }))), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_new_vis_help.NewVisHelp, {
        promotedTypes: visTypes.filter(function (t) {
          return t.promotion;
        }),
        onPromotionClicked: this.props.onVisTypeSelected
      }))))));
    }
  }, {
    key: "filteredVisTypes",
    value: function filteredVisTypes(visTypes, query) {
      var _this2 = this;

      var types = visTypes.all().filter(function (type) {
        // Filter out all lab visualizations if lab mode is not enabled
        if (!_this2.props.showExperimental && type.stage === 'experimental') {
          return false;
        } // Filter out hidden visualizations


        if (type.hidden) {
          return false;
        }

        return true;
      });
      var allTypes = [].concat(_toConsumableArray(types), _toConsumableArray(visTypes.getAliases()));
      var entries;

      if (!query) {
        entries = allTypes.map(function (type) {
          return _objectSpread({}, type, {
            highlighted: false
          });
        });
      } else {
        var q = query.toLowerCase();
        entries = allTypes.map(function (type) {
          var matchesQuery = type.name.toLowerCase().includes(q) || type.title.toLowerCase().includes(q) || typeof type.description === 'string' && type.description.toLowerCase().includes(q);
          return _objectSpread({}, type, {
            highlighted: matchesQuery
          });
        });
      }

      return (0, _lodash.sortByOrder)(entries, ['highlighted', 'promotion', 'title'], ['desc', 'asc', 'asc']);
    }
  }, {
    key: "setHighlightType",
    value: function setHighlightType(highlightedType) {
      this.setState({
        highlightedType: highlightedType
      });
    }
  }]);

  return TypeSelection;
}(_react2.default.Component);

exports.TypeSelection = TypeSelection;