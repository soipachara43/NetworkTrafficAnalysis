"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteTimelineModalOverlay = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _delete_timeline_modal = require("./delete_timeline_modal");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\ndiv.euiPopover__panel-isOpen {\n  display: none;\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var RemovePopover = (0, _styledComponents.createGlobalStyle)(_templateObject());

/**
 * Renders a button that when clicked, displays the `Delete Timeline` modal
 */
var DeleteTimelineModalOverlay = _react.default.memo(function (_ref) {
  var deleteTimelines = _ref.deleteTimelines,
      isModalOpen = _ref.isModalOpen,
      savedObjectIds = _ref.savedObjectIds,
      title = _ref.title,
      onComplete = _ref.onComplete;
  var internalCloseModal = (0, _react.useCallback)(function () {
    if (onComplete != null) {
      onComplete();
    }
  }, [onComplete]);
  var onDelete = (0, _react.useCallback)(function () {
    if (savedObjectIds != null) {
      deleteTimelines(savedObjectIds);
    }

    if (onComplete != null) {
      onComplete();
    }
  }, [deleteTimelines, savedObjectIds, onComplete]);
  return _react.default.createElement(_react.default.Fragment, null, isModalOpen && _react.default.createElement(RemovePopover, {
    "data-test-subj": "remove-popover"
  }), isModalOpen ? _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    maxWidth: _delete_timeline_modal.DELETE_TIMELINE_MODAL_WIDTH,
    onClose: internalCloseModal
  }, _react.default.createElement(_delete_timeline_modal.DeleteTimelineModal, {
    "data-test-subj": "delete-timeline-modal",
    onDelete: onDelete,
    title: title,
    closeModal: internalCloseModal
  }))) : null);
});

exports.DeleteTimelineModalOverlay = DeleteTimelineModalOverlay;
DeleteTimelineModalOverlay.displayName = 'DeleteTimelineModalOverlay';