"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportSelectedTimeline = exports.importTimelines = void 0;

var _kibana = require("../../../lib/kibana");

var _constants = require("../../../../common/constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var importTimelines =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var fileToImport, _ref2$overwrite, overwrite, signal, formData;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileToImport = _ref2.fileToImport, _ref2$overwrite = _ref2.overwrite, overwrite = _ref2$overwrite === void 0 ? false : _ref2$overwrite, signal = _ref2.signal;
            formData = new FormData();
            formData.append('file', fileToImport);
            return _context.abrupt("return", _kibana.KibanaServices.get().http.fetch("".concat(_constants.TIMELINE_IMPORT_URL), {
              method: 'POST',
              headers: {
                'Content-Type': undefined
              },
              query: {
                overwrite: overwrite
              },
              body: formData,
              signal: signal
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function importTimelines(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.importTimelines = importTimelines;

var exportSelectedTimeline =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref4) {
    var _ref4$excludeExportDe, excludeExportDetails, _ref4$filename, filename, _ref4$ids, ids, signal, body, response;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref4$excludeExportDe = _ref4.excludeExportDetails, excludeExportDetails = _ref4$excludeExportDe === void 0 ? false : _ref4$excludeExportDe, _ref4$filename = _ref4.filename, filename = _ref4$filename === void 0 ? "timelines_export.ndjson" : _ref4$filename, _ref4$ids = _ref4.ids, ids = _ref4$ids === void 0 ? [] : _ref4$ids, signal = _ref4.signal;
            body = ids.length > 0 ? JSON.stringify({
              ids: ids
            }) : undefined;
            _context2.next = 4;
            return _kibana.KibanaServices.get().http.fetch("".concat(_constants.TIMELINE_EXPORT_URL), {
              method: 'POST',
              body: body,
              query: {
                exclude_export_details: excludeExportDetails,
                file_name: filename
              },
              signal: signal,
              asResponse: true
            });

          case 4:
            response = _context2.sent;
            return _context2.abrupt("return", response.body);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function exportSelectedTimeline(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.exportSelectedTimeline = exportSelectedTimeline;