"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilterAction = createFilterAction;
exports.ACTION_APPLY_FILTER = void 0;

var _i18n = require("@kbn/i18n");

var _ui_actions = require("../ui_actions");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ACTION_APPLY_FILTER = 'ACTION_APPLY_FILTER';
exports.ACTION_APPLY_FILTER = ACTION_APPLY_FILTER;

function isCompatible(_x) {
  return _isCompatible.apply(this, arguments);
}

function _isCompatible() {
  _isCompatible = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(context) {
    var root;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(context.embeddable === undefined)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", false);

          case 2:
            root = context.embeddable.getRoot();
            return _context2.abrupt("return", Boolean(root.getInput().filters !== undefined && context.filters !== undefined));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _isCompatible.apply(this, arguments);
}

function createFilterAction() {
  return (0, _ui_actions.createAction)({
    type: ACTION_APPLY_FILTER,
    id: ACTION_APPLY_FILTER,
    getDisplayName: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.actions.applyFilterActionTitle', {
        defaultMessage: 'Apply filter to current view'
      });
    },
    isCompatible: isCompatible,
    execute: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var embeddable, filters, root;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                embeddable = _ref.embeddable, filters = _ref.filters;

                if (!(!filters || !embeddable)) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Applying a filter requires a filter and embeddable as context');

              case 3:
                _context.next = 5;
                return isCompatible({
                  embeddable: embeddable,
                  filters: filters
                });

              case 5:
                if (_context.sent) {
                  _context.next = 7;
                  break;
                }

                throw new _ui_actions.IncompatibleActionError();

              case 7:
                root = embeddable.getRoot();
                root.updateInput({
                  filters: filters
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function execute(_x2) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  });
}