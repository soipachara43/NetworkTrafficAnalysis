"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProviderItemBadge = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _provider_badge = require("./provider_badge");

var _provider_item_actions = require("./provider_item_actions");

var _timeline_context = require("../timeline_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ProviderItemBadge = _react.default.memo(function (_ref) {
  var andProviderId = _ref.andProviderId,
      browserFields = _ref.browserFields,
      deleteProvider = _ref.deleteProvider,
      field = _ref.field,
      kqlQuery = _ref.kqlQuery,
      isEnabled = _ref.isEnabled,
      isExcluded = _ref.isExcluded,
      onDataProviderEdited = _ref.onDataProviderEdited,
      operator = _ref.operator,
      providerId = _ref.providerId,
      timelineId = _ref.timelineId,
      toggleEnabledProvider = _ref.toggleEnabledProvider,
      toggleExcludedProvider = _ref.toggleExcludedProvider,
      val = _ref.val;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var togglePopover = (0, _react.useCallback)(function () {
    setIsPopoverOpen(!isPopoverOpen);
  }, [isPopoverOpen]);
  var closePopover = (0, _react.useCallback)(function () {
    setIsPopoverOpen(false);
  }, []);
  var onToggleEnabledProvider = (0, _react.useCallback)(function () {
    toggleEnabledProvider();
    closePopover();
  }, [toggleEnabledProvider]);
  var onToggleExcludedProvider = (0, _react.useCallback)(function () {
    toggleExcludedProvider();
    closePopover();
  }, [toggleExcludedProvider]);
  return _react.default.createElement(_timeline_context.TimelineContext.Consumer, null, function (isLoading) {
    return _react.default.createElement(_provider_item_actions.ProviderItemActions, {
      andProviderId: andProviderId,
      browserFields: browserFields,
      button: _react.default.createElement(_provider_badge.ProviderBadge, {
        deleteProvider: !isLoading ? deleteProvider : _fp.noop,
        field: field,
        kqlQuery: kqlQuery,
        isEnabled: isEnabled,
        isExcluded: isExcluded,
        providerId: providerId,
        togglePopover: togglePopover,
        val: val,
        operator: operator
      }),
      closePopover: closePopover,
      deleteProvider: deleteProvider,
      field: field,
      kqlQuery: kqlQuery,
      isEnabled: isEnabled,
      isExcluded: isExcluded,
      isLoading: isLoading,
      isOpen: isPopoverOpen,
      onDataProviderEdited: onDataProviderEdited,
      operator: operator,
      providerId: providerId,
      timelineId: timelineId,
      toggleEnabledProvider: onToggleEnabledProvider,
      toggleExcludedProvider: onToggleExcludedProvider,
      value: val
    });
  });
});

exports.ProviderItemBadge = ProviderItemBadge;
ProviderItemBadge.displayName = 'ProviderItemBadge';