"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlGeneratorInternal = void 0;

var _i18n = require("@kbn/i18n");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UrlGeneratorInternal =
/*#__PURE__*/
function () {
  function UrlGeneratorInternal(spec, getGenerator) {
    _classCallCheck(this, UrlGeneratorInternal);

    this.spec = spec;
    this.getGenerator = getGenerator;

    if (spec.isDeprecated && !spec.migrate) {
      throw new Error(_i18n.i18n.translate('share.urlGenerators.error.noMigrationFnProvided', {
        defaultMessage: 'If the access link generator is marked as deprecated, you must provide a migration function.'
      }));
    }

    if (!spec.isDeprecated && spec.migrate) {
      throw new Error(_i18n.i18n.translate('share.urlGenerators.error.migrationFnGivenNotDeprecated', {
        defaultMessage: 'If you provide a migration function, you must mark this generator as deprecated'
      }));
    }

    if (!spec.createUrl && !spec.isDeprecated) {
      throw new Error(_i18n.i18n.translate('share.urlGenerators.error.noCreateUrlFnProvided', {
        defaultMessage: 'This generator is not marked as deprecated. Please provide a createUrl fn.'
      }));
    }

    if (spec.createUrl && spec.isDeprecated) {
      throw new Error(_i18n.i18n.translate('share.urlGenerators.error.createUrlFnProvided', {
        defaultMessage: 'This generator is marked as deprecated. Do not supply a createUrl fn.'
      }));
    }
  }

  _createClass(UrlGeneratorInternal, [{
    key: "getPublicContract",
    value: function getPublicContract() {
      var _this = this;

      return {
        id: this.spec.id,
        createUrl: function () {
          var _createUrl = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(state) {
            var _ref, id, newState;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(_this.spec.migrate && !_this.spec.createUrl)) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 3;
                    return _this.spec.migrate(state);

                  case 3:
                    _ref = _context.sent;
                    id = _ref.id;
                    newState = _ref.state;
                    // eslint-disable-next-line
                    console.warn("URL generator is deprecated and may not work in future versions. Please migrate your data.");
                    return _context.abrupt("return", _this.getGenerator(id).createUrl(newState));

                  case 8:
                    return _context.abrupt("return", _this.spec.createUrl(state));

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function createUrl(_x) {
            return _createUrl.apply(this, arguments);
          }

          return createUrl;
        }(),
        isDeprecated: !!this.spec.isDeprecated,
        migrate: function () {
          var _migrate = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(state) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (_this.spec.isDeprecated) {
                      _context2.next = 2;
                      break;
                    }

                    throw new Error(_i18n.i18n.translate('share.urlGenerators.error.migrateCalledNotDeprecated', {
                      defaultMessage: 'You cannot call migrate on a non-deprecated generator.'
                    }));

                  case 2:
                    return _context2.abrupt("return", _this.spec.migrate(state));

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function migrate(_x2) {
            return _migrate.apply(this, arguments);
          }

          return migrate;
        }()
      };
    }
  }]);

  return UrlGeneratorInternal;
}();

exports.UrlGeneratorInternal = UrlGeneratorInternal;