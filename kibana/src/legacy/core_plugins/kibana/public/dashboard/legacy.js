"use strict";

var _legacy_imports = require("./legacy_imports");

var _index = require("./index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var instance;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          instance = (0, _index.plugin)({
            env: _legacy_imports.npSetup.plugins.kibanaLegacy.env
          });
          instance.setup(_legacy_imports.npSetup.core, _legacy_imports.npSetup.plugins);
          instance.start(_legacy_imports.npStart.core, _legacy_imports.npStart.plugins);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();