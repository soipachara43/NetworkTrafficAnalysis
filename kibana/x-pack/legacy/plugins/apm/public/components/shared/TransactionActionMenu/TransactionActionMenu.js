"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionActionMenu = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../plugins/observability/public");

var _useApmPluginContext2 = require("../../../hooks/useApmPluginContext");

var _useFetcher2 = require("../../../hooks/useFetcher");

var _useLocation = require("../../../hooks/useLocation");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _CustomLinkFlyout = require("../../app/Settings/CustomizeUI/CustomLink/CustomLinkFlyout");

var _CustomLink = require("./CustomLink");

var _CustomLinkPopover = require("./CustomLink/CustomLinkPopover");

var _sections = require("./sections");

var _useLicense = require("../../../hooks/useLicense");

var _variables = require("../../../style/variables");

var _helper = require("../../app/Settings/CustomizeUI/CustomLink/CustomLinkFlyout/helper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ActionMenuButton = function ActionMenuButton(_ref) {
  var onClick = _ref.onClick;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "arrowDown",
    iconSide: "right",
    onClick: onClick
  }, _i18n.i18n.translate('xpack.apm.transactionActionMenu.actionsButtonLabel', {
    defaultMessage: 'Actions'
  }));
};

var TransactionActionMenu = function TransactionActionMenu(_ref2) {
  var transaction = _ref2.transaction;
  var license = (0, _useLicense.useLicense)();
  var hasValidLicense = (license === null || license === void 0 ? void 0 : license.isActive) && (license === null || license === void 0 ? void 0 : license.hasAtLeast('gold'));

  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      core = _useApmPluginContext.core;

  var location = (0, _useLocation.useLocation)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isActionPopoverOpen = _useState2[0],
      setIsActionPopoverOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isCustomLinksPopoverOpen = _useState4[0],
      setIsCustomLinksPopoverOpen = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isCustomLinkFlyoutOpen = _useState6[0],
      setIsCustomLinkFlyoutOpen = _useState6[1];

  var filters = (0, _react.useMemo)(function () {
    return [{
      key: 'service.name',
      value: transaction === null || transaction === void 0 ? void 0 : transaction.service.name
    }, {
      key: 'service.environment',
      value: transaction === null || transaction === void 0 ? void 0 : transaction.service.environment
    }, {
      key: 'transaction.name',
      value: transaction === null || transaction === void 0 ? void 0 : transaction.transaction.name
    }, {
      key: 'transaction.type',
      value: transaction === null || transaction === void 0 ? void 0 : transaction.transaction.type
    }].filter(function (filter) {
      return typeof filter.value === 'string';
    });
  }, [transaction]);

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    return callApmApi({
      pathname: '/api/apm/settings/custom_links',
      params: {
        query: (0, _helper.convertFiltersToQuery)(filters)
      }
    });
  }, [filters]),
      _useFetcher$data = _useFetcher.data,
      customLinks = _useFetcher$data === void 0 ? [] : _useFetcher$data,
      status = _useFetcher.status,
      refetch = _useFetcher.refetch;

  var sections = (0, _sections.getSections)({
    transaction: transaction,
    basePath: core.http.basePath,
    location: location,
    urlParams: urlParams
  });

  var closePopover = function closePopover() {
    setIsActionPopoverOpen(false);
    setIsCustomLinksPopoverOpen(false);
  };

  var toggleCustomLinkFlyout = function toggleCustomLinkFlyout() {
    closePopover();
    setIsCustomLinkFlyoutOpen(function (isOpen) {
      return !isOpen;
    });
  };

  var toggleCustomLinkPopover = function toggleCustomLinkPopover() {
    setIsCustomLinksPopoverOpen(function (isOpen) {
      return !isOpen;
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, isCustomLinkFlyoutOpen && _react.default.createElement(_CustomLinkFlyout.CustomLinkFlyout, {
    defaults: {
      filters: filters
    },
    onClose: toggleCustomLinkFlyout,
    onSave: function onSave() {
      toggleCustomLinkFlyout();
      refetch();
    },
    onDelete: function onDelete() {
      toggleCustomLinkFlyout();
      refetch();
    }
  }), _react.default.createElement(_public.ActionMenu, {
    id: "transactionActionMenu",
    closePopover: closePopover,
    isOpen: isActionPopoverOpen,
    anchorPosition: "downRight",
    button: _react.default.createElement(ActionMenuButton, {
      onClick: function onClick() {
        return setIsActionPopoverOpen(true);
      }
    })
  }, _react.default.createElement("div", {
    style: {
      maxHeight: (0, _variables.px)(600),
      width: (0, _variables.px)(335)
    }
  }, isCustomLinksPopoverOpen ? _react.default.createElement(_CustomLinkPopover.CustomLinkPopover, {
    customLinks: customLinks.slice(3, customLinks.length),
    onCreateCustomLinkClick: toggleCustomLinkFlyout,
    onClose: toggleCustomLinkPopover,
    transaction: transaction
  }) : _react.default.createElement(_react.default.Fragment, null, sections.map(function (section, idx) {
    var isLastSection = idx !== sections.length - 1;
    return _react.default.createElement("div", {
      key: idx
    }, section.map(function (item) {
      return _react.default.createElement(_public.Section, {
        key: item.key
      }, item.title && _react.default.createElement(_public.SectionTitle, null, item.title), item.subtitle && _react.default.createElement(_public.SectionSubtitle, null, item.subtitle), _react.default.createElement(_public.SectionLinks, null, item.actions.map(function (action) {
        return _react.default.createElement(_public.SectionLink, {
          key: action.key,
          label: action.label,
          href: action.href
        });
      })));
    }), isLastSection && _react.default.createElement(_public.ActionMenuDivider, null));
  }), hasValidLicense && _react.default.createElement(_CustomLink.CustomLink, {
    customLinks: customLinks,
    status: status,
    onCreateCustomLinkClick: toggleCustomLinkFlyout,
    onSeeMoreClick: toggleCustomLinkPopover,
    transaction: transaction
  })))));
};

exports.TransactionActionMenu = TransactionActionMenu;