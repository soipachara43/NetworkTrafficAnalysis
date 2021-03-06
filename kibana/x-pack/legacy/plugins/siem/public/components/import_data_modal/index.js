"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportDataModal = exports.ImportDataModalComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _toasters = require("../toasters");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Modal component for importing Rules from a json file
 */
var ImportDataModalComponent = function ImportDataModalComponent(_ref) {
  var checkBoxLabel = _ref.checkBoxLabel,
      closeModal = _ref.closeModal,
      description = _ref.description,
      errorMessage = _ref.errorMessage,
      failedDetailed = _ref.failedDetailed,
      importComplete = _ref.importComplete,
      importData = _ref.importData,
      _ref$showCheckBox = _ref.showCheckBox,
      showCheckBox = _ref$showCheckBox === void 0 ? true : _ref$showCheckBox,
      showModal = _ref.showModal,
      submitBtnText = _ref.submitBtnText,
      subtitle = _ref.subtitle,
      successMessage = _ref.successMessage,
      title = _ref.title;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      selectedFiles = _useState2[0],
      setSelectedFiles = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isImporting = _useState4[0],
      setIsImporting = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      overwrite = _useState6[0],
      setOverwrite = _useState6[1];

  var _useStateToaster = (0, _toasters.useStateToaster)(),
      _useStateToaster2 = _slicedToArray(_useStateToaster, 2),
      dispatchToaster = _useStateToaster2[1];

  var cleanupAndCloseModal = (0, _react.useCallback)(function () {
    setIsImporting(false);
    setSelectedFiles(null);
    closeModal();
  }, [setIsImporting, setSelectedFiles, closeModal]);
  var importDataCallback = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var abortCtrl, importResponse, formattedErrors;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(selectedFiles != null)) {
              _context.next = 17;
              break;
            }

            setIsImporting(true);
            abortCtrl = new AbortController();
            _context.prev = 3;
            _context.next = 6;
            return importData({
              fileToImport: selectedFiles[0],
              overwrite: overwrite,
              signal: abortCtrl.signal
            });

          case 6:
            importResponse = _context.sent;

            // TODO: Improve error toast details for better debugging failed imports
            // e.g. When success == true && success_count === 0 that means no rules were overwritten, etc
            if (importResponse.success) {
              (0, _toasters.displaySuccessToast)(successMessage(importResponse.success_count), dispatchToaster);
            }

            if (importResponse.errors.length > 0) {
              formattedErrors = importResponse.errors.map(function (e) {
                return failedDetailed(e.rule_id, e.error.status_code, e.error.message);
              });
              (0, _toasters.displayErrorToast)(errorMessage, formattedErrors, dispatchToaster);
            }

            importComplete();
            cleanupAndCloseModal();
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            cleanupAndCloseModal();
            (0, _toasters.errorToToaster)({
              title: errorMessage,
              error: _context.t0,
              dispatchToaster: dispatchToaster
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 13]]);
  })), [selectedFiles, overwrite]);
  var handleCloseModal = (0, _react.useCallback)(function () {
    setSelectedFiles(null);
    closeModal();
  }, [closeModal]);
  return _react.default.createElement(_react.default.Fragment, null, showModal && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: closeModal,
    maxWidth: '750px'
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, title)), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("h4", null, description)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFilePicker, {
    id: "rule-file-picker",
    initialPromptText: subtitle,
    onChange: function onChange(files) {
      setSelectedFiles(files && files.length > 0 ? files : null);
    },
    display: 'large',
    fullWidth: true,
    isLoading: isImporting
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), showCheckBox && _react.default.createElement(_eui.EuiCheckbox, {
    id: "import-data-modal-checkbox-label",
    label: checkBoxLabel,
    checked: overwrite,
    onChange: function onChange() {
      return setOverwrite(!overwrite);
    }
  })), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: handleCloseModal
  }, i18n.CANCEL_BUTTON), _react.default.createElement(_eui.EuiButton, {
    onClick: importDataCallback,
    disabled: selectedFiles == null || isImporting,
    fill: true
  }, submitBtnText)))));
};

exports.ImportDataModalComponent = ImportDataModalComponent;
ImportDataModalComponent.displayName = 'ImportDataModalComponent';

var ImportDataModal = _react.default.memo(ImportDataModalComponent);

exports.ImportDataModal = ImportDataModal;
ImportDataModal.displayName = 'ImportDataModal';