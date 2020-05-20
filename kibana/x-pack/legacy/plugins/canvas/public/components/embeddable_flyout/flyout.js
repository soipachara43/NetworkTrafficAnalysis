"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddEmbeddableFlyout = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _public = require("../../../../../../../src/plugins/saved_objects/public/");

var _legacy = require("../../../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public/legacy");

var _i18n = require("../../../i18n");

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

var strings = _i18n.ComponentStrings.AddEmbeddableFlyout;

var AddEmbeddableFlyout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddEmbeddableFlyout, _React$Component);

  function AddEmbeddableFlyout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AddEmbeddableFlyout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AddEmbeddableFlyout)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onAddPanel", function (id, savedObjectType, name) {
      var embeddableFactories = _legacy.start.getEmbeddableFactories(); // Find the embeddable type from the saved object type


      var found = Array.from(embeddableFactories).find(function (embeddableFactory) {
        return Boolean(embeddableFactory.savedObjectMetaData && embeddableFactory.savedObjectMetaData.type === savedObjectType);
      });
      var foundEmbeddableType = found ? found.type : 'unknown';

      _this.props.onSelect(id, foundEmbeddableType);
    });

    return _this;
  }

  _createClass(AddEmbeddableFlyout, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var embeddableFactories = _legacy.start.getEmbeddableFactories();

      var availableSavedObjects = Array.from(embeddableFactories).filter(function (factory) {
        return _this2.props.availableEmbeddables.includes(factory.type);
      }).map(function (factory) {
        return factory.savedObjectMetaData;
      }).filter(function (maybeSavedObjectMetaData) {
        return maybeSavedObjectMetaData !== undefined;
      });
      return _react.default.createElement(_eui.EuiFlyout, {
        ownFocus: true,
        onClose: this.props.onClose,
        "data-test-subj": "dashboardAddPanel"
      }, _react.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "m"
      }, _react.default.createElement("h2", null, strings.getTitleText()))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_public.SavedObjectFinderUi, {
        onChoose: this.onAddPanel,
        savedObjectMetaData: availableSavedObjects,
        showFilter: true,
        noItemsMessage: strings.getNoItemsText(),
        savedObjects: this.props.savedObjects,
        uiSettings: this.props.uiSettings
      })));
    }
  }]);

  return AddEmbeddableFlyout;
}(_react.default.Component);

exports.AddEmbeddableFlyout = AddEmbeddableFlyout;