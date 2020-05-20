"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadZippedRuntime = exports.downloadRuntime = exports.downloadRenderedWorkpad = exports.downloadWorkpad = void 0;

var _fileSaver = _interopRequireDefault(require("file-saver"));

var _constants = require("../../common/lib/constants");

var _i18n = require("../../i18n");

var _notify = require("./notify");

var workpadService = _interopRequireWildcard(require("./workpad_service"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var strings = _i18n.ErrorStrings.downloadWorkpad;

var downloadWorkpad =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(workpadId) {
    var workpad, jsonBlob;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return workpadService.get(workpadId);

          case 3:
            workpad = _context.sent;
            jsonBlob = new Blob([JSON.stringify(workpad)], {
              type: 'application/json'
            });

            _fileSaver.default.saveAs(jsonBlob, "canvas-workpad-".concat(workpad.name, "-").concat(workpad.id, ".json"));

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);

            _notify.notify.error(_context.t0, {
              title: strings.getDownloadFailureErrorMessage()
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function downloadWorkpad(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.downloadWorkpad = downloadWorkpad;

var downloadRenderedWorkpad =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(renderedWorkpad) {
    var jsonBlob;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              jsonBlob = new Blob([JSON.stringify(renderedWorkpad)], {
                type: 'application/json'
              });

              _fileSaver.default.saveAs(jsonBlob, "canvas-embed-workpad-".concat(renderedWorkpad.name, "-").concat(renderedWorkpad.id, ".json"));
            } catch (err) {
              _notify.notify.error(err, {
                title: strings.getDownloadRenderedWorkpadFailureErrorMessage()
              });
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function downloadRenderedWorkpad(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.downloadRenderedWorkpad = downloadRenderedWorkpad;

var downloadRuntime =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(basePath) {
    var path;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            path = "".concat(basePath).concat(_constants.API_ROUTE_SHAREABLE_RUNTIME_DOWNLOAD);
            window.open(path);
            return _context3.abrupt("return");

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);

            _notify.notify.error(_context3.t0, {
              title: strings.getDownloadRuntimeFailureErrorMessage()
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function downloadRuntime(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.downloadRuntime = downloadRuntime;

var downloadZippedRuntime =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(data) {
    var zip;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              zip = new Blob([data], {
                type: 'octet/stream'
              });

              _fileSaver.default.saveAs(zip, 'canvas-workpad-embed.zip');
            } catch (err) {
              _notify.notify.error(err, {
                title: strings.getDownloadZippedRuntimeFailureErrorMessage()
              });
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function downloadZippedRuntime(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.downloadZippedRuntime = downloadZippedRuntime;