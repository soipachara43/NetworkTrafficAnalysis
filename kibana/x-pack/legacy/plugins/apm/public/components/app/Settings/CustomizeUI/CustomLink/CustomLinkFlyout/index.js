"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomLinkFlyout = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _useApmPluginContext = require("../../../../../../hooks/useApmPluginContext");

var _FiltersSection = require("./FiltersSection");

var _FlyoutFooter = require("./FlyoutFooter");

var _LinkSection = require("./LinkSection");

var _saveCustomLink = require("./saveCustomLink");

var _LinkPreview = require("./LinkPreview");

var _Documentation = require("./Documentation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var filtersEmptyState = [{
  key: '',
  value: ''
}];

var CustomLinkFlyout = function CustomLinkFlyout(_ref) {
  var _defaults$filters;

  var onClose = _ref.onClose,
      onSave = _ref.onSave,
      onDelete = _ref.onDelete,
      defaults = _ref.defaults,
      customLinkId = _ref.customLinkId;
  var toasts = (0, _useApmPluginContext.useApmPluginContext)().core.notifications.toasts;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSaving = _useState2[0],
      setIsSaving = _useState2[1];

  var _useState3 = (0, _react.useState)((defaults === null || defaults === void 0 ? void 0 : defaults.label) || ''),
      _useState4 = _slicedToArray(_useState3, 2),
      label = _useState4[0],
      setLabel = _useState4[1];

  var _useState5 = (0, _react.useState)((defaults === null || defaults === void 0 ? void 0 : defaults.url) || ''),
      _useState6 = _slicedToArray(_useState5, 2),
      url = _useState6[0],
      setUrl = _useState6[1];

  var _useState7 = (0, _react.useState)((defaults === null || defaults === void 0 ? void 0 : (_defaults$filters = defaults.filters) === null || _defaults$filters === void 0 ? void 0 : _defaults$filters.length) ? defaults.filters : filtersEmptyState),
      _useState8 = _slicedToArray(_useState7, 2),
      filters = _useState8[0],
      setFilters = _useState8[1];

  var isFormValid = !!label && !!url;

  var onSubmit =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(event) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              setIsSaving(true);
              _context.next = 4;
              return (0, _saveCustomLink.saveCustomLink)({
                id: customLinkId,
                label: label,
                url: url,
                filters: filters,
                toasts: toasts
              });

            case 4:
              setIsSaving(false);
              onSave();

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return _react.default.createElement(_eui.EuiPortal, null, _react.default.createElement("form", {
    onSubmit: onSubmit
  }, _react.default.createElement(_eui.EuiFlyout, {
    ownFocus: true,
    onClose: onClose,
    size: "m"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.title', {
    defaultMessage: 'Create link'
  })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.label', {
    defaultMessage: 'Links will be available in the context of transaction details throughout the APM app. You can create an unlimited number of links. You can refer to dynamic variables by using any of the transaction metadata to fill in your URLs. More information, including examples, are available in the'
  }), ' ', _react.default.createElement(_Documentation.Documentation, {
    label: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.label.doc', {
      defaultMessage: 'documentation.'
    })
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_LinkSection.LinkSection, {
    label: label,
    onChangeLabel: setLabel,
    url: url,
    onChangeUrl: setUrl
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_FiltersSection.FiltersSection, {
    filters: filters,
    onChangeFilters: setFilters
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_LinkPreview.LinkPreview, {
    label: label,
    url: url,
    filters: filters
  })), _react.default.createElement(_FlyoutFooter.FlyoutFooter, {
    isSaveButtonEnabled: isFormValid,
    onClose: onClose,
    isSaving: isSaving,
    onDelete: onDelete,
    customLinkId: customLinkId
  }))));
};

exports.CustomLinkFlyout = CustomLinkFlyout;