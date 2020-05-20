"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomLinkOverview = void 0;

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _useLicense = require("../../../../../hooks/useLicense");

var _useFetcher2 = require("../../../../../hooks/useFetcher");

var _CustomLinkFlyout = require("./CustomLinkFlyout");

var _CustomLinkTable = require("./CustomLinkTable");

var _EmptyPrompt = require("./EmptyPrompt");

var _Title = require("./Title");

var _CreateCustomLinkButton = require("./CreateCustomLinkButton");

var _LicensePrompt = require("../../../../shared/LicensePrompt");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CustomLinkOverview = function CustomLinkOverview() {
  var license = (0, _useLicense.useLicense)();
  var hasValidLicense = (license === null || license === void 0 ? void 0 : license.isActive) && (license === null || license === void 0 ? void 0 : license.hasAtLeast('gold'));

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFlyoutOpen = _useState2[0],
      setIsFlyoutOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      customLinkSelected = _useState4[0],
      setCustomLinkSelected = _useState4[1];

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    return callApmApi({
      pathname: '/api/apm/settings/custom_links'
    });
  }, []),
      customLinks = _useFetcher.data,
      status = _useFetcher.status,
      refetch = _useFetcher.refetch;

  (0, _react.useEffect)(function () {
    if (customLinkSelected) {
      setIsFlyoutOpen(true);
    }
  }, [customLinkSelected]);

  var onCloseFlyout = function onCloseFlyout() {
    setCustomLinkSelected(undefined);
    setIsFlyoutOpen(false);
  };

  var onCreateCustomLinkClick = function onCreateCustomLinkClick() {
    setIsFlyoutOpen(true);
  };

  var showEmptyPrompt = status === _useFetcher2.FETCH_STATUS.SUCCESS && (0, _lodash.isEmpty)(customLinks);
  return _react.default.createElement(_react.default.Fragment, null, isFlyoutOpen && _react.default.createElement(_CustomLinkFlyout.CustomLinkFlyout, {
    onClose: onCloseFlyout,
    defaults: customLinkSelected,
    customLinkId: customLinkSelected === null || customLinkSelected === void 0 ? void 0 : customLinkSelected.id,
    onSave: function onSave() {
      onCloseFlyout();
      refetch();
    },
    onDelete: function onDelete() {
      onCloseFlyout();
      refetch();
    }
  }), _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_Title.Title, null)), hasValidLicense && !showEmptyPrompt && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_CreateCustomLinkButton.CreateCustomLinkButton, {
    onClick: onCreateCustomLinkClick
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), hasValidLicense ? showEmptyPrompt ? _react.default.createElement(_EmptyPrompt.EmptyPrompt, {
    onCreateCustomLinkClick: onCreateCustomLinkClick
  }) : _react.default.createElement(_CustomLinkTable.CustomLinkTable, {
    items: customLinks,
    onCustomLinkSelected: setCustomLinkSelected
  }) : _react.default.createElement(_LicensePrompt.LicensePrompt, {
    text: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.license.text', {
      defaultMessage: "To create custom links, you must be subscribed to an Elastic Gold license or above. With it, you'll have the ability to create custom links to improve your workflow when analyzing your services."
    })
  })));
};

exports.CustomLinkOverview = CustomLinkOverview;