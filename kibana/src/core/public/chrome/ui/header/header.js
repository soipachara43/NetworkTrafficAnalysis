"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _header_badge = require("./header_badge");

var _header_breadcrumbs = require("./header_breadcrumbs");

var _header_help_menu = require("./header_help_menu");

var _header_nav_controls = require("./header_nav_controls");

var _nav_link = require("./nav_link");

var _header_logo = require("./header_logo");

var _nav_drawer = require("./nav_drawer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "navDrawerRef", (0, _react.createRef)());

    var isLocked = false;
    props.isLocked$.subscribe(function (initialIsLocked) {
      return isLocked = initialIsLocked;
    });
    _this.state = {
      appTitle: 'Kibana',
      isVisible: true,
      navLinks: [],
      recentlyAccessed: [],
      forceNavigation: false,
      navControlsLeft: [],
      navControlsRight: [],
      currentAppId: '',
      isLocked: isLocked
    };
    return _this;
  }

  _createClass(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscription = Rx.combineLatest(this.props.appTitle$, this.props.isVisible$, this.props.forceAppSwitcherNavigation$, this.props.navLinks$, this.props.recentlyAccessed$, // Types for combineLatest only handle up to 6 inferred types so we combine these separately.
      Rx.combineLatest(this.props.navControlsLeft$, this.props.navControlsRight$, this.props.application.currentAppId$, this.props.isLocked$)).subscribe({
        next: function next(_ref) {
          var _ref2 = _slicedToArray(_ref, 6),
              appTitle = _ref2[0],
              isVisible = _ref2[1],
              forceNavigation = _ref2[2],
              navLinks = _ref2[3],
              recentlyAccessed = _ref2[4],
              _ref2$ = _slicedToArray(_ref2[5], 4),
              navControlsLeft = _ref2$[0],
              navControlsRight = _ref2$[1],
              currentAppId = _ref2$[2],
              isLocked = _ref2$[3];

          _this2.setState({
            appTitle: appTitle,
            isVisible: isVisible,
            forceNavigation: forceNavigation,
            navLinks: navLinks.filter(function (navLink) {
              return !navLink.hidden;
            }),
            recentlyAccessed: recentlyAccessed,
            navControlsLeft: navControlsLeft,
            navControlsRight: navControlsRight,
            currentAppId: currentAppId,
            isLocked: isLocked
          });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }, {
    key: "renderMenuTrigger",
    value: function renderMenuTrigger() {
      var _this3 = this;

      return _react.default.createElement(_eui.EuiHeaderSectionItemButton, {
        "aria-label": _i18n.i18n.translate('core.ui.chrome.headerGlobalNav.toggleSideNavAriaLabel', {
          defaultMessage: 'Toggle side navigation'
        }),
        onClick: function onClick() {
          return _this3.navDrawerRef.current.toggleOpen();
        }
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "apps",
        size: "m"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          appTitle = _this$state.appTitle,
          isVisible = _this$state.isVisible,
          navControlsLeft = _this$state.navControlsLeft,
          navControlsRight = _this$state.navControlsRight;
      var _this$props = this.props,
          badge$ = _this$props.badge$,
          breadcrumbs$ = _this$props.breadcrumbs$,
          helpExtension$ = _this$props.helpExtension$,
          helpSupportUrl$ = _this$props.helpSupportUrl$,
          kibanaDocLink = _this$props.kibanaDocLink,
          kibanaVersion = _this$props.kibanaVersion;
      var navLinks = this.state.navLinks.map(function (link) {
        return (0, _nav_link.euiNavLink)(link, _this4.props.legacyMode, _this4.state.currentAppId, _this4.props.basePath, _this4.props.application.navigateToApp);
      });

      if (!isVisible) {
        return null;
      }

      var className = (0, _classnames.default)('chrHeaderWrapper', {
        'chrHeaderWrapper--navIsLocked': this.state.isLocked
      }, 'hide-for-sharing');
      return _react.default.createElement("header", {
        className: className,
        "data-test-subj": "headerGlobalNav"
      }, _react.default.createElement(_eui.EuiHeader, null, _react.default.createElement(_eui.EuiHeaderSection, {
        grow: false
      }, _react.default.createElement(_eui.EuiShowFor, {
        sizes: ['xs', 's']
      }, _react.default.createElement(_eui.EuiHeaderSectionItem, {
        border: "right"
      }, this.renderMenuTrigger())), _react.default.createElement(_eui.EuiHeaderSectionItem, {
        border: "right"
      }, _react.default.createElement(_header_logo.HeaderLogo, {
        href: this.props.homeHref,
        forceNavigation: this.state.forceNavigation,
        navLinks: navLinks
      })), _react.default.createElement(_header_nav_controls.HeaderNavControls, {
        side: "left",
        navControls: navControlsLeft
      })), _react.default.createElement(_header_breadcrumbs.HeaderBreadcrumbs, {
        appTitle: appTitle,
        breadcrumbs$: breadcrumbs$
      }), _react.default.createElement(_header_badge.HeaderBadge, {
        badge$: badge$
      }), _react.default.createElement(_eui.EuiHeaderSection, {
        side: "right"
      }, _react.default.createElement(_eui.EuiHeaderSectionItem, null, _react.default.createElement(_header_help_menu.HeaderHelpMenu, {
        helpExtension$: helpExtension$,
        helpSupportUrl$: helpSupportUrl$,
        kibanaDocLink: kibanaDocLink,
        kibanaVersion: kibanaVersion
      })), _react.default.createElement(_header_nav_controls.HeaderNavControls, {
        side: "right",
        navControls: navControlsRight
      }))), _react.default.createElement(_nav_drawer.NavDrawer, {
        isLocked: this.state.isLocked,
        onIsLockedUpdate: this.props.onIsLockedUpdate,
        navLinks: navLinks,
        chromeNavLinks: this.state.navLinks,
        recentlyAccessedItems: this.state.recentlyAccessed,
        basePath: this.props.basePath,
        ref: this.navDrawerRef
      }));
    }
  }]);

  return Header;
}(_react.Component);

exports.Header = Header;