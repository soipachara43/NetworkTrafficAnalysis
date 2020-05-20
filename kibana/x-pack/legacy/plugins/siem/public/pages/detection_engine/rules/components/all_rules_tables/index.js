"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllRulesTables = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("../../translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// EuiBasicTable give me a hardtime with adding the ref attributes so I went the easy way
// after few hours of fight with typescript !!!! I lost :(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var MyEuiBasicTable = (0, _styledComponents.default)(_eui.EuiBasicTable).withConfig({
  displayName: "MyEuiBasicTable",
  componentId: "sc-1ix9cu5-0"
})([""]);
var AllRulesTabs;

(function (AllRulesTabs) {
  AllRulesTabs["rules"] = "rules";
  AllRulesTabs["monitoring"] = "monitoring";
})(AllRulesTabs || (AllRulesTabs = {}));

var allRulesTabs = [{
  id: AllRulesTabs.rules,
  name: i18n.RULES_TAB,
  disabled: false
}, {
  id: AllRulesTabs.monitoring,
  name: i18n.MONITORING_TAB,
  disabled: false
}];

var AllRulesTablesComponent = function AllRulesTablesComponent(_ref) {
  var _ref2, _ref3;

  var euiBasicTableSelectionProps = _ref.euiBasicTableSelectionProps,
      hasNoPermissions = _ref.hasNoPermissions,
      monitoringColumns = _ref.monitoringColumns,
      paginationMemo = _ref.paginationMemo,
      rules = _ref.rules,
      rulesColumns = _ref.rulesColumns,
      rulesStatuses = _ref.rulesStatuses,
      sorting = _ref.sorting,
      tableOnChangeCallback = _ref.tableOnChangeCallback,
      tableRef = _ref.tableRef;

  var _useState = (0, _react.useState)(AllRulesTabs.rules),
      _useState2 = _slicedToArray(_useState, 2),
      allRulesTab = _useState2[0],
      setAllRulesTab = _useState2[1];

  var emptyPrompt = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: _react.default.createElement("h3", null, i18n.NO_RULES),
      titleSize: "xs",
      body: i18n.NO_RULES_BODY
    });
  }, []);
  var tabs = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiTabs, null, allRulesTabs.map(function (tab) {
      return _react.default.createElement(_eui.EuiTab, {
        onClick: function onClick() {
          return setAllRulesTab(tab.id);
        },
        isSelected: tab.id === allRulesTab,
        disabled: tab.disabled,
        key: tab.id
      }, tab.name);
    }));
  }, [allRulesTabs, allRulesTab, setAllRulesTab]);
  return _react.default.createElement(_react.default.Fragment, null, tabs, allRulesTab === AllRulesTabs.rules && _react.default.createElement(MyEuiBasicTable, {
    "data-test-subj": "rules-table",
    columns: rulesColumns,
    isSelectable: (_ref2 = !hasNoPermissions) !== null && _ref2 !== void 0 ? _ref2 : false,
    itemId: "id",
    items: rules !== null && rules !== void 0 ? rules : [],
    noItemsMessage: emptyPrompt,
    onChange: tableOnChangeCallback,
    pagination: paginationMemo,
    ref: tableRef,
    sorting: sorting,
    selection: hasNoPermissions ? undefined : euiBasicTableSelectionProps
  }), allRulesTab === AllRulesTabs.monitoring && _react.default.createElement(MyEuiBasicTable, {
    "data-test-subj": "monitoring-table",
    columns: monitoringColumns,
    isSelectable: (_ref3 = !hasNoPermissions) !== null && _ref3 !== void 0 ? _ref3 : false,
    itemId: "id",
    items: rulesStatuses,
    noItemsMessage: emptyPrompt,
    onChange: tableOnChangeCallback,
    pagination: paginationMemo,
    sorting: sorting
  }));
};

var AllRulesTables = (0, _react.memo)(AllRulesTablesComponent);
exports.AllRulesTables = AllRulesTables;