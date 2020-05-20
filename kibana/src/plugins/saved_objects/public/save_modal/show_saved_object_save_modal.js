"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSaveModal = showSaveModal;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function isSuccess(result) {
  return 'id' in result;
}

function showSaveModal(saveModal, I18nContext) {
  var container = document.createElement('div');

  var closeModal = function closeModal() {
    _reactDom.default.unmountComponentAtNode(container);

    document.body.removeChild(container);
  };

  var onSave = saveModal.props.onSave;

  var onSaveConfirmed =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return onSave.apply(void 0, _args);

            case 2:
              response = _context.sent;

              // close modal if we either hit an error or the saved object got an id
              if (Boolean(isSuccess(response) ? response.id : response.error)) {
                closeModal();
              }

              return _context.abrupt("return", response);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onSaveConfirmed() {
      return _ref.apply(this, arguments);
    };
  }();

  document.body.appendChild(container);

  var element = _react.default.cloneElement(saveModal, {
    onSave: onSaveConfirmed,
    onClose: closeModal
  });

  _reactDom.default.render(_react.default.createElement(I18nContext, null, element), container);
}