"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSettings = exports.AdvancedSettingsComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _reactRouterDom = require("react-router-dom");

var _call_outs = require("./components/call_outs");

var _search = require("./components/search");

var _form = require("./components/form");

var _advanced_settings_voice_announcement = require("./components/advanced_settings_voice_announcement");

var _lib = require("./lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var AdvancedSettingsComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(AdvancedSettingsComponent, _Component);

  function AdvancedSettingsComponent(props) {
    var _this;

    _classCallCheck(this, AdvancedSettingsComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AdvancedSettingsComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "settings", void 0);

    _defineProperty(_assertThisInitialized(_this), "groupedSettings", void 0);

    _defineProperty(_assertThisInitialized(_this), "categoryCounts", void 0);

    _defineProperty(_assertThisInitialized(_this), "categories", []);

    _defineProperty(_assertThisInitialized(_this), "uiSettingsSubscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "initSettings", _this.mapConfig);

    _defineProperty(_assertThisInitialized(_this), "initGroupedSettings", _this.mapSettings);

    _defineProperty(_assertThisInitialized(_this), "onQueryChange", function (_ref) {
      var query = _ref.query;

      _this.setState({
        query: query,
        filteredSettings: _this.mapSettings(_eui.Query.execute(query, _this.settings))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearQuery", function () {
      _this.setState({
        query: _eui.Query.parse(''),
        footerQueryMatched: false,
        filteredSettings: _this.groupedSettings
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFooterQueryMatchChange", function (matched) {
      _this.setState({
        footerQueryMatched: matched
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveConfig",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(changes) {
        var arr;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                arr = Object.entries(changes).map(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      key = _ref4[0],
                      value = _ref4[1];

                  return _this.props.uiSettings.set(key, value);
                });
                return _context.abrupt("return", Promise.all(arr));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _this.settings = _this.initSettings(_this.props.uiSettings);
    _this.groupedSettings = _this.initGroupedSettings(_this.settings);
    _this.categories = _this.initCategories(_this.groupedSettings);
    _this.categoryCounts = _this.initCategoryCounts(_this.groupedSettings);

    var parsedQuery = _eui.Query.parse(_this.props.queryText ? (0, _lib.getAriaName)(_this.props.queryText) : '');

    _this.state = {
      query: parsedQuery,
      footerQueryMatched: false,
      filteredSettings: _this.mapSettings(_eui.Query.execute(parsedQuery, _this.settings))
    };
    return _this;
  }

  _createClass(AdvancedSettingsComponent, [{
    key: "init",
    value: function init(config) {
      this.settings = this.initSettings(config);
      this.groupedSettings = this.initGroupedSettings(this.settings);
      this.categories = this.initCategories(this.groupedSettings);
      this.categoryCounts = this.initCategoryCounts(this.groupedSettings);
    }
  }, {
    key: "initCategories",
    value: function initCategories(groupedSettings) {
      return Object.keys(groupedSettings).sort(function (a, b) {
        if (a === _lib.DEFAULT_CATEGORY) return -1;
        if (b === _lib.DEFAULT_CATEGORY) return 1;
        if (a > b) return 1;
        return a === b ? 0 : -1;
      });
    }
  }, {
    key: "initCategoryCounts",
    value: function initCategoryCounts(groupedSettings) {
      return Object.keys(groupedSettings).reduce(function (counts, category) {
        counts[category] = groupedSettings[category].length;
        return counts;
      }, {});
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.uiSettingsSubscription = this.props.uiSettings.getUpdate$().subscribe(function () {
        var query = _this2.state.query;

        _this2.init(_this2.props.uiSettings);

        _this2.setState({
          filteredSettings: _this2.mapSettings(_eui.Query.execute(query, _this2.settings))
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.uiSettingsSubscription) {
        this.uiSettingsSubscription.unsubscribe();
      }
    }
  }, {
    key: "mapConfig",
    value: function mapConfig(config) {
      var all = config.getAll();
      return Object.entries(all).map(function (setting) {
        return (0, _lib.toEditableConfig)({
          def: setting[1],
          name: setting[0],
          value: setting[1].userValue,
          isCustom: config.isCustom(setting[0]),
          isOverridden: config.isOverridden(setting[0])
        });
      }).filter(function (c) {
        return !c.readonly;
      }).sort(_eui.Comparators.property('name', _eui.Comparators.default('asc')));
    }
  }, {
    key: "mapSettings",
    value: function mapSettings(settings) {
      // Group settings by category
      return settings.reduce(function (groupedSettings, setting) {
        // We will want to change this logic when we put each category on its
        // own page aka allowing a setting to be included in multiple categories.
        var category = setting.category[0];
        (groupedSettings[category] = groupedSettings[category] || []).push(setting);
        return groupedSettings;
      }, {});
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          filteredSettings = _this$state.filteredSettings,
          query = _this$state.query,
          footerQueryMatched = _this$state.footerQueryMatched;
      var componentRegistry = this.props.componentRegistry;
      var PageTitle = componentRegistry.get(componentRegistry.componentType.PAGE_TITLE_COMPONENT);
      var PageSubtitle = componentRegistry.get(componentRegistry.componentType.PAGE_SUBTITLE_COMPONENT);
      var PageFooter = componentRegistry.get(componentRegistry.componentType.PAGE_FOOTER_COMPONENT);
      return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "none"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(PageTitle, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_search.Search, {
        query: query,
        categories: this.categories,
        onQueryChange: this.onQueryChange
      }))), _react.default.createElement(PageSubtitle, null), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_call_outs.CallOuts, null), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_advanced_settings_voice_announcement.AdvancedSettingsVoiceAnnouncement, {
        queryText: query.text,
        settings: filteredSettings
      }), _react.default.createElement(_form.Form, {
        settings: this.groupedSettings,
        visibleSettings: filteredSettings,
        categories: this.categories,
        categoryCounts: this.categoryCounts,
        clearQuery: this.clearQuery,
        save: this.saveConfig,
        showNoResultsMessage: !footerQueryMatched,
        enableSaving: this.props.enableSaving,
        dockLinks: this.props.dockLinks,
        toasts: this.props.toasts
      }), _react.default.createElement(PageFooter, {
        toasts: this.props.toasts,
        query: query,
        onQueryMatchChange: this.onFooterQueryMatchChange,
        enableSaving: this.props.enableSaving
      }));
    }
  }]);

  return AdvancedSettingsComponent;
}(_react.Component);

exports.AdvancedSettingsComponent = AdvancedSettingsComponent;

var AdvancedSettings = function AdvancedSettings(props) {
  var _useParams = (0, _reactRouterDom.useParams)(),
      query = _useParams.query;

  return _react.default.createElement(AdvancedSettingsComponent, {
    queryText: query || '',
    enableSaving: props.enableSaving,
    uiSettings: props.uiSettings,
    dockLinks: props.dockLinks,
    toasts: props.toasts,
    componentRegistry: props.componentRegistry
  });
};

exports.AdvancedSettings = AdvancedSettings;