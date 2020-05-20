"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconFromType = exports.getExampleText = exports.getColumnsWithTimestamp = exports.getColumnHeaderFromBrowserField = exports.search = void 0;

var _fp = require("lodash/fp");

var _constants = require("../timeline/body/constants");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Defines the behavior of the search input that appears above the table of data
 */
var search = {
  box: {
    incremental: true,
    placeholder: i18n.PLACEHOLDER,
    schema: true
  }
};
exports.search = search;

var getColumnHeaderFromBrowserField = function getColumnHeaderFromBrowserField(_ref) {
  var browserField = _ref.browserField,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? _constants.DEFAULT_COLUMN_MIN_WIDTH : _ref$width;
  return {
    category: browserField.category,
    columnHeaderType: 'not-filtered',
    description: browserField.description != null ? browserField.description : undefined,
    example: browserField.example != null ? "".concat(browserField.example) : undefined,
    id: browserField.name || '',
    type: browserField.type,
    aggregatable: browserField.aggregatable,
    width: width
  };
};
/**
 * Returns a collection of columns, where the first column in the collection
 * is a timestamp, and the remaining columns are all the columns in the
 * specified category
 */


exports.getColumnHeaderFromBrowserField = getColumnHeaderFromBrowserField;

var getColumnsWithTimestamp = function getColumnsWithTimestamp(_ref2) {
  var browserFields = _ref2.browserFields,
      category = _ref2.category;
  var emptyFields = {};
  var timestamp = (0, _fp.get)('base.fields.@timestamp', browserFields);

  var categoryFields = _toConsumableArray(Object.values((0, _fp.getOr)(emptyFields, "".concat(category, ".fields"), browserFields)));

  return timestamp != null && categoryFields.length ? (0, _fp.uniqBy)('id', [getColumnHeaderFromBrowserField({
    browserField: timestamp,
    width: _constants.DEFAULT_DATE_COLUMN_MIN_WIDTH
  })].concat(_toConsumableArray(categoryFields.map(function (f) {
    return getColumnHeaderFromBrowserField({
      browserField: f
    });
  })))) : [];
};
/** Returns example text, or an empty string if the field does not have an example */


exports.getColumnsWithTimestamp = getColumnsWithTimestamp;

var getExampleText = function getExampleText(example) {
  return !(0, _fp.isEmpty)(example) ? "Example: ".concat(example) : '';
};

exports.getExampleText = getExampleText;

var getIconFromType = function getIconFromType(type) {
  switch (type) {
    case 'string': // fall through

    case 'keyword':
      return 'string';

    case 'number': // fall through

    case 'long':
      return 'number';

    case 'date':
      return 'clock';

    case 'ip':
      return 'globe';

    case 'object':
      return 'questionInCircle';

    case 'float':
      return 'number';

    default:
      return 'questionInCircle';
  }
};

exports.getIconFromType = getIconFromType;