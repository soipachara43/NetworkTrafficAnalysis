"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMonitor = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _header_section = require("../../../../components/header_section");

var _utility_bar = require("../../../../components/utility_bar");

var _columns = require("./columns");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ActivityMonitor = _react.default.memo(function () {
  var sampleTableData = [{
    id: 1,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Running'
  }, {
    id: 2,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Stopped'
  }, {
    id: 3,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Fail'
  }, {
    id: 4,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 5,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 6,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 7,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 8,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 9,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 10,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 11,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 12,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 13,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 14,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 15,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 16,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 17,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 18,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 19,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 20,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }, {
    id: 21,
    rule: {
      href: '#/detections/rules/rule-details',
      name: 'Automated exfiltration'
    },
    ran: '2019-12-28 00:00:00.000-05:00',
    lookedBackTo: '2019-12-28 00:00:00.000-05:00',
    status: 'Completed',
    response: 'Success'
  }];

  var _useState = (0, _react.useState)(sampleTableData.length),
      _useState2 = _slicedToArray(_useState, 1),
      itemsTotalState = _useState2[0];

  var _useState3 = (0, _react.useState)({
    index: 0,
    size: 20
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      pageState = _useState4[0],
      setPageState = _useState4[1]; // const [selectedState, setSelectedState] = useState<ColumnTypes[]>([]);


  var _useState5 = (0, _react.useState)({
    field: 'ran',
    direction: 'desc'
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      sortState = _useState6[0],
      setSortState = _useState6[1];

  var handleChange = (0, _react.useCallback)(function (_ref) {
    var page = _ref.page,
        sort = _ref.sort;
    setPageState(page);
    setSortState(sort);
  }, [setPageState, setSortState]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_header_section.HeaderSection, {
    title: "Activity monitor"
  }), _react.default.createElement(_utility_bar.UtilityBar, {
    border: true
  }, _react.default.createElement(_utility_bar.UtilityBarSection, null, _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, null, 'Showing: 39 activites')), _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, null, 'Selected: 2 activities'), _react.default.createElement(_utility_bar.UtilityBarAction, {
    iconType: "stop"
  }, 'Stop selected')), _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarAction, {
    iconType: "cross"
  }, 'Clear 7 filters')))), _react.default.createElement(_eui.EuiBasicTable, {
    columns: _columns.columns,
    isSelectable: true,
    itemId: "id",
    items: sampleTableData,
    onChange: handleChange,
    pagination: {
      pageIndex: pageState.index,
      pageSize: pageState.size,
      totalItemCount: itemsTotalState,
      pageSizeOptions: [5, 10, 20]
    },
    selection: {
      selectable: function selectable(item) {
        return item.status !== 'Completed';
      },
      selectableMessage: function selectableMessage(selectable) {
        return selectable ? '' : 'Completed runs cannot be acted upon';
      },
      onSelectionChange: function onSelectionChange(selectedItems) {// setSelectedState(selectedItems);
      }
    },
    sorting: {
      sort: sortState
    }
  })));
});

exports.ActivityMonitor = ActivityMonitor;
ActivityMonitor.displayName = 'ActivityMonitor';