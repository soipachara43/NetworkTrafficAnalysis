"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionTabs = TransactionTabs;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _url_helpers = require("../../../shared/Links/url_helpers");

var _history = require("../../../../utils/history");

var _TransactionMetadata = require("../../../shared/MetadataTable/TransactionMetadata");

var _WaterfallContainer = require("./WaterfallContainer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var timelineTab = {
  key: 'timeline',
  label: _i18n.i18n.translate('xpack.apm.propertiesTable.tabs.timelineLabel', {
    defaultMessage: 'Timeline'
  })
};
var metadataTab = {
  key: 'metadata',
  label: _i18n.i18n.translate('xpack.apm.propertiesTable.tabs.metadataLabel', {
    defaultMessage: 'Metadata'
  })
};

function TransactionTabs(_ref) {
  var location = _ref.location,
      transaction = _ref.transaction,
      urlParams = _ref.urlParams,
      waterfall = _ref.waterfall,
      exceedsMax = _ref.exceedsMax;
  var tabs = [timelineTab, metadataTab];
  var currentTab = urlParams.detailTab === metadataTab.key ? metadataTab : timelineTab;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTabs, null, tabs.map(function (_ref2) {
    var key = _ref2.key,
        label = _ref2.label;
    return _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        _history.history.replace(_objectSpread({}, location, {
          search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(location.search), {
            detailTab: key
          }))
        }));
      },
      isSelected: currentTab.key === key,
      key: key
    }, label);
  })), _react.default.createElement(_eui.EuiSpacer, null), currentTab.key === timelineTab.key ? _react.default.createElement(_WaterfallContainer.WaterfallContainer, {
    location: location,
    urlParams: urlParams,
    waterfall: waterfall,
    exceedsMax: exceedsMax
  }) : _react.default.createElement(_TransactionMetadata.TransactionMetadata, {
    transaction: transaction
  }));
}