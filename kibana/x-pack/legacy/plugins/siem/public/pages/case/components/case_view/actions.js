"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseViewActions = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var i18n = _interopRequireWildcard(require("./translations"));

var _use_delete_cases = require("../../../../containers/case/use_delete_cases");

var _confirm_delete_case = require("../confirm_delete_case");

var _types = require("../../../home/types");

var _property_actions = require("../property_actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var CaseViewActionsComponent = function CaseViewActionsComponent(_ref) {
  var caseData = _ref.caseData,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled;

  // Delete case
  var _useDeleteCases = (0, _use_delete_cases.useDeleteCases)(),
      handleToggleModal = _useDeleteCases.handleToggleModal,
      handleOnDeleteConfirm = _useDeleteCases.handleOnDeleteConfirm,
      isDeleted = _useDeleteCases.isDeleted,
      isDisplayConfirmDeleteModal = _useDeleteCases.isDisplayConfirmDeleteModal;

  var confirmDeleteModal = (0, _react.useMemo)(function () {
    return _react.default.createElement(_confirm_delete_case.ConfirmDeleteCaseModal, {
      caseTitle: caseData.title,
      isModalVisible: isDisplayConfirmDeleteModal,
      isPlural: false,
      onCancel: handleToggleModal,
      onConfirm: handleOnDeleteConfirm.bind(null, [{
        id: caseData.id,
        title: caseData.title
      }])
    });
  }, [isDisplayConfirmDeleteModal, caseData]); // TO DO refactor each of these const's into their own components

  var propertyActions = (0, _react.useMemo)(function () {
    var _caseData$externalSer, _ref2, _caseData$externalSer2;

    return [{
      disabled: disabled,
      iconType: 'trash',
      label: i18n.DELETE_CASE,
      onClick: handleToggleModal
    }].concat(_toConsumableArray(caseData.externalService != null && !(0, _fp.isEmpty)((_caseData$externalSer = caseData.externalService) === null || _caseData$externalSer === void 0 ? void 0 : _caseData$externalSer.externalUrl) ? [{
      iconType: 'popout',
      label: i18n.VIEW_INCIDENT((_ref2 = (_caseData$externalSer2 = caseData.externalService) === null || _caseData$externalSer2 === void 0 ? void 0 : _caseData$externalSer2.externalTitle) !== null && _ref2 !== void 0 ? _ref2 : ''),
      onClick: function onClick() {
        var _caseData$externalSer3;

        return window.open((_caseData$externalSer3 = caseData.externalService) === null || _caseData$externalSer3 === void 0 ? void 0 : _caseData$externalSer3.externalUrl, '_blank');
      }
    }] : []));
  }, [disabled, handleToggleModal, caseData]);

  if (isDeleted) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/".concat(_types.SiemPageName.case)
    });
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_property_actions.PropertyActions, {
    propertyActions: propertyActions
  }), confirmDeleteModal);
};

var CaseViewActions = _react.default.memo(CaseViewActionsComponent);

exports.CaseViewActions = CaseViewActions;