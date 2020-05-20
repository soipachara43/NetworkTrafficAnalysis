"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumns = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _with_copy_to_clipboard = require("../../lib/clipboard/with_copy_to_clipboard");

var _draggable_wrapper = require("../drag_and_drop/draggable_wrapper");

var _droppable_wrapper = require("../drag_and_drop/droppable_wrapper");

var _helpers = require("../drag_and_drop/helpers");

var _field_badge = require("../draggables/field_badge");

var _field_name = require("../fields_browser/field_name");

var _selectable_text = require("../selectable_text");

var _helpers2 = require("../tables/helpers");

var _default_headers = require("../timeline/body/column_headers/default_headers");

var _constants = require("../timeline/body/constants");

var _constants2 = require("../timeline/body/renderers/constants");

var _formatted_field = require("../timeline/body/renderers/formatted_field");

var _with_hover_actions = require("../with_hover_actions");

var _helpers3 = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HoverActionsContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "HoverActionsContainer",
  componentId: "sc-17m2rvl-0"
})(["align-items:center;display:flex;flex-direction:row;height:25px;justify-content:center;left:5px;position:absolute;top:-10px;width:30px;"]);
HoverActionsContainer.displayName = 'HoverActionsContainer';

var getColumns = function getColumns(_ref) {
  var browserFields = _ref.browserFields,
      columnHeaders = _ref.columnHeaders,
      eventId = _ref.eventId,
      onUpdateColumns = _ref.onUpdateColumns,
      contextId = _ref.contextId,
      toggleColumn = _ref.toggleColumn;
  return [{
    field: 'field',
    name: '',
    sortable: false,
    truncateText: false,
    width: '30px',
    render: function render(field) {
      return _react.default.createElement(_eui.EuiToolTip, {
        content: i18n.TOGGLE_COLUMN_TOOLTIP
      }, _react.default.createElement(_eui.EuiCheckbox, {
        checked: columnHeaders.findIndex(function (c) {
          return c.id === field;
        }) !== -1,
        "data-test-subj": "toggle-field-".concat(field),
        id: field,
        onChange: function onChange() {
          return toggleColumn({
            columnHeaderType: _default_headers.defaultColumnHeaderType,
            id: field,
            width: _constants.DEFAULT_COLUMN_MIN_WIDTH
          });
        }
      }));
    }
  }, {
    field: 'field',
    name: i18n.FIELD,
    sortable: true,
    truncateText: false,
    render: function render(field, data) {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "none"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        content: data.type
      }, _react.default.createElement(_eui.EuiIcon, {
        "data-test-subj": "field-type-icon",
        type: (0, _helpers3.getIconFromType)(data.type)
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_droppable_wrapper.DroppableWrapper, {
        droppableId: (0, _helpers.getDroppableId)("event-details-field-droppable-wrapper-".concat(contextId, "-").concat(eventId, "-").concat(data.category, "-").concat(field)),
        key: (0, _helpers.getDroppableId)("event-details-field-droppable-wrapper-".concat(contextId, "-").concat(eventId, "-").concat(data.category, "-").concat(field)),
        isDropDisabled: true,
        type: _helpers.DRAG_TYPE_FIELD,
        renderClone: function renderClone(provided) {
          return _react.default.createElement("div", _extends({}, provided.draggableProps, provided.dragHandleProps, {
            ref: provided.innerRef
          }), _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_field_badge.DraggableFieldBadge, {
            fieldId: field
          })));
        }
      }, _react.default.createElement(_reactBeautifulDnd.Draggable, {
        draggableId: (0, _helpers.getDraggableFieldId)({
          contextId: "event-details-field-draggable-".concat(contextId, "-").concat(eventId, "-").concat(data.category, "-").concat(field),
          fieldId: field
        }),
        index: 0
      }, function (provided) {
        return _react.default.createElement("div", _extends({}, provided.draggableProps, provided.dragHandleProps, {
          ref: provided.innerRef
        }), _react.default.createElement(_field_name.FieldName, {
          categoryId: data.category,
          categoryColumns: (0, _helpers3.getColumnsWithTimestamp)({
            browserFields: browserFields,
            category: data.category
          }),
          "data-test-subj": "field-name",
          fieldId: field,
          onUpdateColumns: onUpdateColumns
        }));
      }))));
    }
  }, {
    field: 'values',
    name: i18n.VALUE,
    sortable: true,
    truncateText: false,
    render: function render(values, data) {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        direction: "column",
        alignItems: "flexStart",
        component: "span",
        gutterSize: "none"
      }, values != null && values.map(function (value, i) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          grow: false,
          component: "span",
          key: "event-details-value-flex-item-".concat(contextId, "-").concat(eventId, "-").concat(data.field, "-").concat(i, "-").concat(value)
        }, _react.default.createElement(_with_hover_actions.WithHoverActions, {
          hoverContent: _react.default.createElement(HoverActionsContainer, {
            "data-test-subj": "hover-actions-container"
          }, _react.default.createElement(_eui.EuiToolTip, {
            content: i18n.COPY_TO_CLIPBOARD
          }, _react.default.createElement(_with_copy_to_clipboard.WithCopyToClipboard, {
            text: value,
            titleSummary: i18n.VALUE.toLowerCase()
          }))),
          render: function render() {
            return data.field === _constants2.MESSAGE_FIELD_NAME ? _react.default.createElement(_helpers2.OverflowField, {
              value: value
            }) : _react.default.createElement(_formatted_field.FormattedFieldValue, {
              contextId: "event-details-value-formatted-field-value-".concat(contextId, "-").concat(eventId, "-").concat(data.field, "-").concat(i, "-").concat(value),
              eventId: eventId,
              fieldFormat: data.format,
              fieldName: data.field,
              fieldType: data.type,
              value: value
            });
          }
        }));
      }));
    }
  }, {
    field: 'description',
    name: i18n.DESCRIPTION,
    render: function render(description, data) {
      return _react.default.createElement(_selectable_text.SelectableText, null, _react.default.createElement(_eui.EuiText, {
        size: "xs"
      }, "".concat(description || '', " ").concat((0, _helpers3.getExampleText)(data.example))));
    },
    sortable: true,
    truncateText: true,
    width: '50%'
  }, {
    field: 'valuesConcatenated',
    name: i18n.BLANK,
    render: function render() {
      return null;
    },
    sortable: false,
    truncateText: true,
    width: '1px'
  }];
};

exports.getColumns = getColumns;