"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetadataTable = MetadataTable;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _ElasticDocsLink = require("../../shared/Links/ElasticDocsLink");

var _HeightRetainer = require("../HeightRetainer");

var _Section = require("./Section");

var _history = require("../../../utils/history");

var _url_helpers = require("../Links/url_helpers");

var _useLocation = require("../../../hooks/useLocation");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _helper = require("./helper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function MetadataTable(_ref) {
  var sections = _ref.sections;
  var location = (0, _useLocation.useLocation)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var _urlParams$searchTerm = urlParams.searchTerm,
      searchTerm = _urlParams$searchTerm === void 0 ? '' : _urlParams$searchTerm;
  var filteredSections = (0, _helper.filterSectionsByTerm)(sections, searchTerm);
  var onSearchChange = (0, _react.useCallback)(function (e) {
    var value = e.target.value.trim().toLowerCase();

    _history.history.replace(_objectSpread({}, location, {
      search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(location.search), {
        searchTerm: value
      }))
    }));
  }, [location]);
  var noResultFound = Boolean(searchTerm) && (0, _lodash.isEmpty)(filteredSections);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_ElasticDocsLink.ElasticDocsLink, {
    section: "/apm/get-started",
    path: "/metadata.html"
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "help"
  }), " How to add labels and other data"))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFieldSearch, {
    onChange: onSearchChange,
    placeholder: _i18n.i18n.translate('xpack.apm.searchInput.filter', {
      defaultMessage: 'Filter...'
    }),
    style: {
      width: 400
    },
    isInvalid: noResultFound,
    value: searchTerm
  }))), _react.default.createElement(_HeightRetainer.HeightRetainer, null, filteredSections.map(function (section) {
    return _react.default.createElement("div", {
      key: section.key
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("h6", null, section.label)), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_Section.Section, {
      keyValuePairs: section.rows
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "xl"
    }));
  }), noResultFound && _react.default.createElement(NoResultFound, {
    value: searchTerm
  })));
}

var NoResultFound = function NoResultFound(_ref2) {
  var value = _ref2.value;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.apm.propertiesTable.agentFeature.noResultFound', {
    defaultMessage: "No results for \"{value}\".",
    values: {
      value: value
    }
  }))));
};