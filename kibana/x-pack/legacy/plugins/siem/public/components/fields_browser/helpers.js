"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeBrowserFieldsWithDefaultCategory = exports.createVirtualCategory = exports.filterBrowserFieldsByFieldName = exports.getFieldCount = exports.categoryHasFields = exports.getFieldBrowserSearchInputClassName = exports.getFieldBrowserCategoryTitleClassName = exports.getCategoryPaneCategoryClassName = exports.TYPE_COLUMN_WIDTH = exports.TABLE_HEIGHT = exports.SEARCH_INPUT_WIDTH = exports.PANES_FLEX_GROUP_WIDTH = exports.HEADER_HEIGHT = exports.FIELDS_PANE_WIDTH = exports.FIELD_BROWSER_HEIGHT = exports.FIELD_BROWSER_WIDTH = exports.FIELD_COLUMN_WIDTH = exports.DESCRIPTION_COLUMN_WIDTH = exports.CATEGORY_PANE_WIDTH = exports.LoadingSpinner = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _default_headers = require("../timeline/body/column_headers/default_headers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoadingSpinner = (0, _styledComponents.default)(_eui.EuiLoadingSpinner).withConfig({
  displayName: "LoadingSpinner",
  componentId: "sc-1n9jal5-0"
})(["cursor:pointer;position:relative;top:3px;"]);
exports.LoadingSpinner = LoadingSpinner;
LoadingSpinner.displayName = 'LoadingSpinner';
var CATEGORY_PANE_WIDTH = 200;
exports.CATEGORY_PANE_WIDTH = CATEGORY_PANE_WIDTH;
var DESCRIPTION_COLUMN_WIDTH = 300;
exports.DESCRIPTION_COLUMN_WIDTH = DESCRIPTION_COLUMN_WIDTH;
var FIELD_COLUMN_WIDTH = 200;
exports.FIELD_COLUMN_WIDTH = FIELD_COLUMN_WIDTH;
var FIELD_BROWSER_WIDTH = 900;
exports.FIELD_BROWSER_WIDTH = FIELD_BROWSER_WIDTH;
var FIELD_BROWSER_HEIGHT = 300;
exports.FIELD_BROWSER_HEIGHT = FIELD_BROWSER_HEIGHT;
var FIELDS_PANE_WIDTH = 670;
exports.FIELDS_PANE_WIDTH = FIELDS_PANE_WIDTH;
var HEADER_HEIGHT = 40;
exports.HEADER_HEIGHT = HEADER_HEIGHT;
var PANES_FLEX_GROUP_WIDTH = CATEGORY_PANE_WIDTH + FIELDS_PANE_WIDTH + 10;
exports.PANES_FLEX_GROUP_WIDTH = PANES_FLEX_GROUP_WIDTH;
var SEARCH_INPUT_WIDTH = 850;
exports.SEARCH_INPUT_WIDTH = SEARCH_INPUT_WIDTH;
var TABLE_HEIGHT = 260;
exports.TABLE_HEIGHT = TABLE_HEIGHT;
var TYPE_COLUMN_WIDTH = 50;
/**
 * Returns the CSS class name for the title of a category shown in the left
 * side field browser
 */

exports.TYPE_COLUMN_WIDTH = TYPE_COLUMN_WIDTH;

var getCategoryPaneCategoryClassName = function getCategoryPaneCategoryClassName(_ref) {
  var categoryId = _ref.categoryId,
      timelineId = _ref.timelineId;
  return "field-browser-category-pane-".concat(categoryId, "-").concat(timelineId);
};
/**
 * Returns the CSS class name for the title of a category shown in the right
 * side of field browser
 */


exports.getCategoryPaneCategoryClassName = getCategoryPaneCategoryClassName;

var getFieldBrowserCategoryTitleClassName = function getFieldBrowserCategoryTitleClassName(_ref2) {
  var categoryId = _ref2.categoryId,
      timelineId = _ref2.timelineId;
  return "field-browser-category-title-".concat(categoryId, "-").concat(timelineId);
};
/** Returns the class name for a field browser search input */


exports.getFieldBrowserCategoryTitleClassName = getFieldBrowserCategoryTitleClassName;

var getFieldBrowserSearchInputClassName = function getFieldBrowserSearchInputClassName(timelineId) {
  return "field-browser-search-input-".concat(timelineId);
};
/** Returns true if the specified category has at least one field */


exports.getFieldBrowserSearchInputClassName = getFieldBrowserSearchInputClassName;

var categoryHasFields = function categoryHasFields(category) {
  return category.fields != null && Object.keys(category.fields).length > 0;
};
/** Returns the count of fields in the specified category */


exports.categoryHasFields = categoryHasFields;

var getFieldCount = function getFieldCount(category) {
  return category != null && category.fields != null ? Object.keys(category.fields).length : 0;
};
/**
 * Filters the specified `BrowserFields` to return a new collection where every
 * category contains at least one field name that matches the specified substring.
 */


exports.getFieldCount = getFieldCount;

var filterBrowserFieldsByFieldName = function filterBrowserFieldsByFieldName(_ref3) {
  var browserFields = _ref3.browserFields,
      substring = _ref3.substring;
  var trimmedSubstring = substring.trim(); // filter each category such that it only contains fields with field names
  // that contain the specified substring:

  var filteredBrowserFields = Object.keys(browserFields).reduce(function (filteredCategories, categoryId) {
    return _objectSpread({}, filteredCategories, _defineProperty({}, categoryId, _objectSpread({}, browserFields[categoryId], {
      fields: (0, _fp.filter)(function (f) {
        return f.name != null && f.name.includes(trimmedSubstring);
      }, browserFields[categoryId].fields).reduce(function (filtered, field) {
        return _objectSpread({}, filtered, _defineProperty({}, field.name, field));
      }, {})
    })));
  }, {}); // only pick non-empty categories from the filtered browser fields

  var nonEmptyCategories = (0, _fp.pickBy)(function (category) {
    return categoryHasFields(category);
  }, filteredBrowserFields);
  return nonEmptyCategories;
};
/**
 * Returns a "virtual" category (e.g. default ECS) from the specified fieldIds
 */


exports.filterBrowserFieldsByFieldName = filterBrowserFieldsByFieldName;

var createVirtualCategory = function createVirtualCategory(_ref4) {
  var browserFields = _ref4.browserFields,
      fieldIds = _ref4.fieldIds;
  return {
    fields: fieldIds.reduce(function (fields, fieldId) {
      var splitId = fieldId.split('.'); // source.geo.city_name -> [source, geo, city_name]

      return _objectSpread({}, fields, _defineProperty({}, fieldId, _objectSpread({}, (0, _fp.get)([splitId.length > 1 ? splitId[0] : 'base', 'fields', fieldId], browserFields), {
        name: fieldId
      })));
    }, {})
  };
};
/** Merges the specified browser fields with the default category (i.e. `default ECS`) */


exports.createVirtualCategory = createVirtualCategory;

var mergeBrowserFieldsWithDefaultCategory = function mergeBrowserFieldsWithDefaultCategory(browserFields) {
  return _objectSpread({}, browserFields, _defineProperty({}, _default_headers.DEFAULT_CATEGORY_NAME, createVirtualCategory({
    browserFields: browserFields,
    fieldIds: _default_headers.defaultHeaders.map(function (header) {
      return header.id;
    })
  })));
};

exports.mergeBrowserFieldsWithDefaultCategory = mergeBrowserFieldsWithDefaultCategory;