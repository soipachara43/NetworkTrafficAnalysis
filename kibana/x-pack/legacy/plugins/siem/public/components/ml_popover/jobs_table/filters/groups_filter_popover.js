"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupsFilterPopover = exports.GroupsFilterPopoverComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

var _toggle_selected_group = require("./toggle_selected_group");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Popover for selecting which SiemJob groups to filter on. Component extracts unique groups and
 * their counts from the provided SiemJobs. The 'siem' group is filtered out as all jobs will be
 * siem jobs
 *
 * @param siemJobs jobs to fetch groups from to display for filtering
 * @param onSelectedGroupsChanged change listener to be notified when group selection changes
 */
var GroupsFilterPopoverComponent = function GroupsFilterPopoverComponent(_ref) {
  var siemJobs = _ref.siemJobs,
      onSelectedGroupsChanged = _ref.onSelectedGroupsChanged;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isGroupPopoverOpen = _useState2[0],
      setIsGroupPopoverOpen = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedGroups = _useState4[0],
      setSelectedGroups = _useState4[1];

  var groups = siemJobs.map(function (j) {
    return j.groups;
  }).flat().filter(function (g) {
    return g !== 'siem';
  });
  var uniqueGroups = Array.from(new Set(groups));
  (0, _react.useEffect)(function () {
    onSelectedGroupsChanged(selectedGroups);
  }, [selectedGroups.sort().join()]);
  return _react.default.createElement(_eui.EuiPopover, {
    ownFocus: true,
    button: _react.default.createElement(_eui.EuiFilterButton, {
      "data-test-subj": 'groups-filter-popover-button',
      iconType: "arrowDown",
      onClick: function onClick() {
        return setIsGroupPopoverOpen(!isGroupPopoverOpen);
      },
      isSelected: isGroupPopoverOpen,
      hasActiveFilters: selectedGroups.length > 0,
      numActiveFilters: selectedGroups.length
    }, i18n.GROUPS),
    isOpen: isGroupPopoverOpen,
    closePopover: function closePopover() {
      return setIsGroupPopoverOpen(!isGroupPopoverOpen);
    },
    panelPaddingSize: "none"
  }, uniqueGroups.map(function (group, index) {
    return _react.default.createElement(_eui.EuiFilterSelectItem, {
      checked: selectedGroups.includes(group) ? 'on' : undefined,
      key: "".concat(index, "-").concat(group),
      onClick: function onClick() {
        return (0, _toggle_selected_group.toggleSelectedGroup)(group, selectedGroups, setSelectedGroups);
      }
    }, "".concat(group, " (").concat(groups.filter(function (g) {
      return g === group;
    }).length, ")"));
  }), uniqueGroups.length === 0 && _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "minusInCircle"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement("p", null, i18n.NO_GROUPS_AVAILABLE))));
};

exports.GroupsFilterPopoverComponent = GroupsFilterPopoverComponent;
GroupsFilterPopoverComponent.displayName = 'GroupsFilterPopoverComponent';

var GroupsFilterPopover = _react.default.memo(GroupsFilterPopoverComponent);

exports.GroupsFilterPopover = GroupsFilterPopover;
GroupsFilterPopover.displayName = 'GroupsFilterPopover';