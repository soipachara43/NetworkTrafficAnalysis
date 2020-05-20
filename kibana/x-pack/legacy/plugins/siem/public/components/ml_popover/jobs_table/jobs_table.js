"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoItemsMessage = exports.JobsTable = exports.JobsTableComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _kibana = require("../../../lib/kibana");

var i18n = _interopRequireWildcard(require("./translations"));

var _job_switch = require("./job_switch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JobNameWrapper = _styledComponents.default.div.withConfig({
  displayName: "JobNameWrapper",
  componentId: "sc-11hcpw8-0"
})(["margin:5px 0;"]);

JobNameWrapper.displayName = 'JobNameWrapper'; // TODO: Use SASS mixin @include EuiTextTruncate when we switch from styled components

var truncateThreshold = 200;

var getJobsTableColumns = function getJobsTableColumns(isLoading, onJobStateChange, basePath) {
  return [{
    name: i18n.COLUMN_JOB_NAME,
    render: function render(_ref) {
      var id = _ref.id,
          description = _ref.description;
      return _react.default.createElement(JobNameWrapper, null, _react.default.createElement(_eui.EuiLink, {
        "data-test-subj": "jobs-table-link",
        href: "".concat(basePath, "/app/ml#/jobs?mlManagement=(jobId:").concat(encodeURI(id), ")"),
        target: "_blank"
      }, _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, id)), _react.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "xs"
      }, description.length > truncateThreshold ? "".concat(description.substring(0, truncateThreshold), "...") : description));
    }
  }, {
    name: i18n.COLUMN_GROUPS,
    render: function render(_ref2) {
      var groups = _ref2.groups;
      return _react.default.createElement(_eui.EuiFlexGroup, {
        wrap: true,
        responsive: true,
        gutterSize: "xs"
      }, groups.map(function (group) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          grow: false,
          key: group
        }, _react.default.createElement(_eui.EuiBadge, {
          color: 'hollow'
        }, group));
      }));
    },
    width: '140px'
  }, {
    name: i18n.COLUMN_RUN_JOB,
    render: function render(job) {
      return job.isCompatible ? _react.default.createElement(_job_switch.JobSwitch, {
        job: job,
        isSiemJobsLoading: isLoading,
        onJobStateChange: onJobStateChange
      }) : _react.default.createElement(_eui.EuiIcon, {
        "aria-label": "Warning",
        size: "s",
        type: "alert",
        color: "warning"
      });
    },
    align: _eui.CENTER_ALIGNMENT,
    width: '80px'
  }];
};

var getPaginatedItems = function getPaginatedItems(items, pageIndex, pageSize) {
  return items.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
};

var JobsTableComponent = function JobsTableComponent(_ref3) {
  var isLoading = _ref3.isLoading,
      jobs = _ref3.jobs,
      onJobStateChange = _ref3.onJobStateChange;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      pageIndex = _useState2[0],
      setPageIndex = _useState2[1];

  var basePath = (0, _kibana.useBasePath)();
  var pageSize = 5;
  var pagination = {
    hidePerPageOptions: true,
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: jobs.length
  };
  (0, _react.useEffect)(function () {
    setPageIndex(0);
  }, [jobs.length]);
  return _react.default.createElement(_eui.EuiBasicTable, {
    "data-test-subj": "jobs-table",
    compressed: true,
    columns: getJobsTableColumns(isLoading, onJobStateChange, basePath),
    items: getPaginatedItems(jobs, pageIndex, pageSize),
    loading: isLoading,
    noItemsMessage: _react.default.createElement(NoItemsMessage, null),
    pagination: pagination,
    responsive: false,
    onChange: function onChange(_ref4) {
      var page = _ref4.page;
      setPageIndex(page.index);
    }
  });
};

exports.JobsTableComponent = JobsTableComponent;
JobsTableComponent.displayName = 'JobsTableComponent';

var JobsTable = _react.default.memo(JobsTableComponent);

exports.JobsTable = JobsTable;
JobsTable.displayName = 'JobsTable';

var NoItemsMessage = _react.default.memo(function () {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement("h3", null, i18n.NO_ITEMS_TEXT),
    titleSize: "xs",
    actions: _react.default.createElement(_eui.EuiButton, {
      href: "ml#/jobs/new_job/step/index_or_search",
      iconType: "popout",
      iconSide: "right",
      size: "s",
      target: "_blank"
    }, i18n.CREATE_CUSTOM_JOB)
  });
});

exports.NoItemsMessage = NoItemsMessage;
NoItemsMessage.displayName = 'NoItemsMessage';