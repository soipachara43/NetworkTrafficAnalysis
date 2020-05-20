"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDescriptionItem = exports.addFilterStateIfNotThere = exports.buildListItems = exports.StepRuleDescription = exports.StepRuleDescriptionComponent = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _public = require("../../../../../../../../../../src/plugins/data/public");

var _translations = require("../../../../../components/timeline/translations");

var _kibana = require("../../../../../lib/kibana");

var _helpers = require("./helpers");

var _use_siem_jobs = require("../../../../../components/ml_popover/hooks/use_siem_jobs");

var _ml_job_description = require("./ml_job_description");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DescriptionListContainer = (0, _styledComponents.default)(_eui.EuiDescriptionList).withConfig({
  displayName: "DescriptionListContainer",
  componentId: "sc-160970h-0"
})(["&.euiDescriptionList--column .euiDescriptionList__title{width:30%;}&.euiDescriptionList--column .euiDescriptionList__description{width:70%;}"]);

var StepRuleDescriptionComponent = function StepRuleDescriptionComponent(_ref) {
  var data = _ref.data,
      _ref$columns = _ref.columns,
      columns = _ref$columns === void 0 ? 'multi' : _ref$columns,
      indexPatterns = _ref.indexPatterns,
      schema = _ref.schema;
  var kibana = (0, _kibana.useKibana)();

  var _useState = (0, _react.useState)(new _public.FilterManager(kibana.services.uiSettings)),
      _useState2 = _slicedToArray(_useState, 1),
      filterManager = _useState2[0];

  var _useSiemJobs = (0, _use_siem_jobs.useSiemJobs)(true),
      _useSiemJobs2 = _slicedToArray(_useSiemJobs, 2),
      siemJobs = _useSiemJobs2[1];

  var keys = Object.keys(schema);
  var listItems = keys.reduce(function (acc, key) {
    if (key === 'machineLearningJobId') {
      return [].concat(_toConsumableArray(acc), [(0, _ml_job_description.buildMlJobDescription)((0, _fp.get)(key, data), (0, _fp.get)(key, schema).label, siemJobs)]);
    }

    return [].concat(_toConsumableArray(acc), _toConsumableArray(buildListItems(data, (0, _fp.pick)(key, schema), filterManager, indexPatterns)));
  }, []);

  if (columns === 'multi') {
    return _react.default.createElement(_eui.EuiFlexGroup, null, (0, _fp.chunk)(Math.ceil(listItems.length / 2), listItems).map(function (chunkListItems, index) {
      return _react.default.createElement(_eui.EuiFlexItem, {
        "data-test-subj": "listItemColumnStepRuleDescription",
        key: "description-step-rule-".concat(index)
      }, _react.default.createElement(_eui.EuiDescriptionList, {
        listItems: chunkListItems
      }));
    }));
  }

  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "listItemColumnStepRuleDescription"
  }, columns === 'single' ? _react.default.createElement(_eui.EuiDescriptionList, {
    listItems: listItems
  }) : _react.default.createElement(DescriptionListContainer, {
    "data-test-subj": "singleSplitStepRuleDescriptionList",
    type: "column",
    listItems: listItems
  })));
};

exports.StepRuleDescriptionComponent = StepRuleDescriptionComponent;
var StepRuleDescription = (0, _react.memo)(StepRuleDescriptionComponent);
exports.StepRuleDescription = StepRuleDescription;

var buildListItems = function buildListItems(data, schema, filterManager, indexPatterns) {
  return Object.keys(schema).reduce(function (acc, field) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(getDescriptionItem(field, (0, _fp.get)([field, 'label'], schema), data, filterManager, indexPatterns)));
  }, []);
};

exports.buildListItems = buildListItems;

var addFilterStateIfNotThere = function addFilterStateIfNotThere(filters) {
  return filters.map(function (filter) {
    if (filter.$state == null) {
      return _objectSpread({
        $state: {
          store: _public.esFilters.FilterStateStore.APP_STATE
        }
      }, filter);
    } else {
      return filter;
    }
  });
};

exports.addFilterStateIfNotThere = addFilterStateIfNotThere;

var getDescriptionItem = function getDescriptionItem(field, label, data, filterManager, indexPatterns) {
  if (field === 'queryBar') {
    var _get;

    var filters = addFilterStateIfNotThere((_get = (0, _fp.get)('queryBar.filters', data)) !== null && _get !== void 0 ? _get : []);
    var query = (0, _fp.get)('queryBar.query.query', data);
    var savedId = (0, _fp.get)('queryBar.saved_id', data);
    return (0, _helpers.buildQueryBarDescription)({
      field: field,
      filters: filters,
      filterManager: filterManager,
      query: query,
      savedId: savedId,
      indexPatterns: indexPatterns
    });
  } else if (field === 'threat') {
    var threat = (0, _fp.get)(field, data).filter(function (singleThreat) {
      return singleThreat.tactic.name !== 'none';
    });
    return (0, _helpers.buildThreatDescription)({
      label: label,
      threat: threat
    });
  } else if (field === 'references') {
    var urls = (0, _fp.get)(field, data);
    return (0, _helpers.buildUrlsDescription)(label, urls);
  } else if (field === 'falsePositives') {
    var values = (0, _fp.get)(field, data);
    return (0, _helpers.buildUnorderedListArrayDescription)(label, field, values);
  } else if (Array.isArray((0, _fp.get)(field, data))) {
    var _values = (0, _fp.get)(field, data);

    return (0, _helpers.buildStringArrayDescription)(label, field, _values);
  } else if (field === 'severity') {
    var val = (0, _fp.get)(field, data);
    return (0, _helpers.buildSeverityDescription)(label, val);
  } else if (field === 'timeline') {
    var _timeline$title;

    var timeline = (0, _fp.get)(field, data);
    return [{
      title: label,
      description: (_timeline$title = timeline.title) !== null && _timeline$title !== void 0 ? _timeline$title : _translations.DEFAULT_TIMELINE_TITLE
    }];
  } else if (field === 'note') {
    var _val = (0, _fp.get)(field, data);

    return (0, _helpers.buildNoteDescription)(label, _val);
  } else if (field === 'ruleType') {
    var ruleType = (0, _fp.get)(field, data);
    return (0, _helpers.buildRuleTypeDescription)(label, ruleType);
  }

  var description = (0, _fp.get)(field, data);

  if ((0, _fp.isNumber)(description) || !(0, _fp.isEmpty)(description)) {
    return [{
      title: label,
      description: description
    }];
  }

  return [];
};

exports.getDescriptionItem = getDescriptionItem;