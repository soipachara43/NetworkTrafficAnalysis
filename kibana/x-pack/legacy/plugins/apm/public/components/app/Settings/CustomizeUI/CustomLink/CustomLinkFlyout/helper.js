"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertFiltersToQuery = exports.replaceTemplateVariables = exports.getSelectOptions = exports.FILTER_SELECT_OPTIONS = exports.DEFAULT_OPTION = void 0;

var _i18n = require("@kbn/i18n");

var _mustache = _interopRequireDefault(require("mustache"));

var _lodash = require("lodash");

var _custom_link_filter_options = require("../../../../../../../../../../plugins/apm/common/custom_link/custom_link_filter_options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var DEFAULT_OPTION = {
  value: 'DEFAULT',
  text: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyOut.filters.defaultOption', {
    defaultMessage: 'Select field...'
  })
};
exports.DEFAULT_OPTION = DEFAULT_OPTION;
var FILTER_SELECT_OPTIONS = [DEFAULT_OPTION].concat(_toConsumableArray(_custom_link_filter_options.FILTER_OPTIONS.map(function (filter) {
  return {
    value: filter,
    text: filter
  };
})));
/**
 * Returns the options available, removing filters already added, but keeping the selected filter.
 *
 * @param filters
 * @param selectedKey
 */

exports.FILTER_SELECT_OPTIONS = FILTER_SELECT_OPTIONS;

var getSelectOptions = function getSelectOptions(filters, selectedKey) {
  return FILTER_SELECT_OPTIONS.filter(function (_ref) {
    var value = _ref.value;
    return !filters.some(function (_ref2) {
      var key = _ref2.key;
      return key === value && key !== selectedKey;
    });
  });
};

exports.getSelectOptions = getSelectOptions;

var getInvalidTemplateVariables = function getInvalidTemplateVariables(template, transaction) {
  return _mustache.default.parse(template).filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        type = _ref4[0];

    return type === 'name';
  }).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        value = _ref6[1];

    return value;
  }).filter(function (templateVar) {
    return (0, _lodash.get)(transaction, templateVar) == null;
  });
};

var validateUrl = function validateUrl(url, transaction) {
  if (!transaction || (0, _lodash.isEmpty)(transaction)) {
    return _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.preview.transaction.notFound', {
      defaultMessage: "We couldn't find a matching transaction document based on the defined filters."
    });
  }

  try {
    var invalidVariables = getInvalidTemplateVariables(url, transaction);

    if (!(0, _lodash.isEmpty)(invalidVariables)) {
      return _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.preview.contextVariable.noMatch', {
        defaultMessage: "We couldn't find a value match for {variables} in the example transaction document.",
        values: {
          variables: invalidVariables.map(function (variable) {
            return "{{".concat(variable, "}}");
          }).join(', ')
        }
      });
    }
  } catch (e) {
    return _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.preview.contextVariable.invalid', {
      defaultMessage: "We couldn't find an example transaction document due to invalid variable(s) defined."
    });
  }
};

var replaceTemplateVariables = function replaceTemplateVariables(url, transaction) {
  var error = validateUrl(url, transaction);

  try {
    return {
      formattedUrl: _mustache.default.render(url, transaction),
      error: error
    };
  } catch (e) {
    // errors will be caught on validateUrl function
    return {
      formattedUrl: url,
      error: error
    };
  }
};

exports.replaceTemplateVariables = replaceTemplateVariables;

var convertFiltersToQuery = function convertFiltersToQuery(filters) {
  return filters.reduce(function (acc, _ref7) {
    var key = _ref7.key,
        value = _ref7.value;

    if (key && value) {
      acc[key] = value;
    }

    return acc;
  }, {});
};

exports.convertFiltersToQuery = convertFiltersToQuery;