"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoIndent = autoIndent;
exports.getDocumentation = getDocumentation;

var _get_endpoint_from_position = require("../../../../lib/autocomplete/get_endpoint_from_position");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function autoIndent(_x, _x2) {
  return _autoIndent.apply(this, arguments);
}

function _autoIndent() {
  _autoIndent = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(editor, event) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            _context.next = 3;
            return editor.autoIndent();

          case 3:
            editor.getCoreEditor().getContainer().focus();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _autoIndent.apply(this, arguments);
}

function getDocumentation(editor, docLinkVersion) {
  return editor.getRequestsInRange().then(function (requests) {
    if (!requests || requests.length === 0) {
      return null;
    }

    var position = requests[0].range.end;
    position.column = position.column - 1;
    var endpoint = (0, _get_endpoint_from_position.getEndpointFromPosition)(editor.getCoreEditor(), position, editor.parser);

    if (endpoint && endpoint.documentation && endpoint.documentation.indexOf('http') !== -1) {
      return endpoint.documentation.replace('/master/', "/".concat(docLinkVersion, "/")).replace('/current/', "/".concat(docLinkVersion, "/"));
    } else {
      return null;
    }
  });
}