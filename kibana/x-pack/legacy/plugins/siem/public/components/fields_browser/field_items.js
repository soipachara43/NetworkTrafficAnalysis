"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldColumns = exports.getFieldItems = exports.Description = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggable_wrapper = require("../drag_and_drop/draggable_wrapper");

var _droppable_wrapper = require("../drag_and_drop/droppable_wrapper");

var _helpers = require("../drag_and_drop/helpers");

var _field_badge = require("../draggables/field_badge");

var _empty_value = require("../empty_value");

var _helpers2 = require("../event_details/helpers");

var _selectable_text = require("../selectable_text");

var _default_headers = require("../timeline/body/column_headers/default_headers");

var _constants = require("../timeline/body/constants");

var _truncatable_text = require("../truncatable_text");

var _field_name = require("./field_name");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var TypeIcon = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "TypeIcon",
  componentId: "sc-1idz2bi-0"
})(["margin-left:5px;position:relative;top:-1px;"]);
TypeIcon.displayName = 'TypeIcon';

var Description = _styledComponents.default.span.withConfig({
  displayName: "Description",
  componentId: "sc-1idz2bi-1"
})(["user-select:text;width:150px;"]);

exports.Description = Description;
Description.displayName = 'Description';
/**
 * An item rendered in the table
 */

/**
 * Returns the draggable fields, values, and descriptions shown when a user expands an event
 */
var getFieldItems = function getFieldItems(_ref) {
  var browserFields = _ref.browserFields,
      category = _ref.category,
      categoryId = _ref.categoryId,
      columnHeaders = _ref.columnHeaders,
      _ref$highlight = _ref.highlight,
      highlight = _ref$highlight === void 0 ? '' : _ref$highlight,
      onUpdateColumns = _ref.onUpdateColumns,
      timelineId = _ref.timelineId,
      toggleColumn = _ref.toggleColumn;
  return (0, _fp.uniqBy)('name', _toConsumableArray(Object.values(category != null && category.fields != null ? category.fields : {}))).map(function (field) {
    return {
      description: _react.default.createElement(_selectable_text.SelectableText, {
        "data-test-subj": "field-".concat(field.name, "-description")
      }, "".concat(field.description || (0, _empty_value.getEmptyValue)(), " ").concat((0, _helpers2.getExampleText)(field.example))),
      field: _react.default.createElement(_droppable_wrapper.DroppableWrapper, {
        droppableId: (0, _helpers.getDroppableId)("field-browser-field-items-field-droppable-wrapper-".concat(timelineId, "-").concat(categoryId, "-").concat(field.name)),
        key: "field-browser-field-items-field-droppable-wrapper-".concat(timelineId, "-").concat(categoryId, "-").concat(field.name),
        isDropDisabled: true,
        type: _helpers.DRAG_TYPE_FIELD,
        renderClone: function renderClone(provided) {
          return _react.default.createElement("div", _extends({}, provided.draggableProps, provided.dragHandleProps, {
            ref: provided.innerRef
          }), _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_field_badge.DraggableFieldBadge, {
            fieldId: field.name || ''
          })));
        }
      }, _react.default.createElement(_reactBeautifulDnd.Draggable, {
        draggableId: (0, _helpers.getDraggableFieldId)({
          contextId: "field-browser-field-items-field-draggable-".concat(timelineId, "-").concat(categoryId, "-").concat(field.name),
          fieldId: field.name || ''
        }),
        index: 0
      }, function (provided) {
        return _react.default.createElement("div", _extends({}, provided.draggableProps, provided.dragHandleProps, {
          ref: provided.innerRef
        }), _react.default.createElement(_eui.EuiFlexGroup, {
          alignItems: "center",
          gutterSize: "none"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiToolTip, {
          content: i18n.TOGGLE_COLUMN_TOOLTIP
        }, _react.default.createElement(_eui.EuiCheckbox, {
          checked: columnHeaders.findIndex(function (c) {
            return c.id === field.name;
          }) !== -1,
          "data-test-subj": "field-".concat(field.name, "-checkbox"),
          id: field.name || '',
          onChange: function onChange() {
            return toggleColumn({
              columnHeaderType: _default_headers.defaultColumnHeaderType,
              id: field.name || '',
              width: _constants.DEFAULT_COLUMN_MIN_WIDTH
            });
          }
        }))), _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiToolTip, {
          content: field.type
        }, _react.default.createElement(TypeIcon, {
          "data-test-subj": "field-".concat(field.name, "-icon"),
          type: (0, _helpers2.getIconFromType)(field.type || '')
        }))), _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_field_name.FieldName, {
          categoryId: field.category || categoryId,
          categoryColumns: (0, _helpers2.getColumnsWithTimestamp)({
            browserFields: browserFields,
            category: field.category || categoryId
          }),
          fieldId: field.name || '',
          highlight: highlight,
          onUpdateColumns: onUpdateColumns
        }))));
      })),
      fieldId: field.name || ''
    };
  });
};
/**
 * Returns a table column template provided to the `EuiInMemoryTable`'s
 * `columns` prop
 */


exports.getFieldItems = getFieldItems;

var getFieldColumns = function getFieldColumns() {
  return [{
    field: 'field',
    name: i18n.FIELD,
    sortable: true,
    render: function render(field, _) {
      return _react.default.createElement(_react.default.Fragment, null, field);
    },
    width: '250px'
  }, {
    field: 'description',
    name: i18n.DESCRIPTION,
    render: function render(description, _) {
      return _react.default.createElement(_truncatable_text.TruncatableText, null, _react.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: description
      }, _react.default.createElement(_react.default.Fragment, null, description)));
    },
    sortable: true,
    truncateText: true,
    width: '400px'
  }];
};

exports.getFieldColumns = getFieldColumns;