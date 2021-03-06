"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudPlugin = void 0;

var _is_cloud_enabled = require("../common/is_cloud_enabled");

var _constants = require("../common/constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CloudPlugin =
/*#__PURE__*/
function () {
  function CloudPlugin(initializerContext) {
    _classCallCheck(this, CloudPlugin);

    this.initializerContext = initializerContext;
  }

  _createClass(CloudPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(core, _ref) {
        var home, _this$initializerCont, id, resetPasswordUrl, isCloudEnabled;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                home = _ref.home;
                _this$initializerCont = this.initializerContext.config.get(), id = _this$initializerCont.id, resetPasswordUrl = _this$initializerCont.resetPasswordUrl;
                isCloudEnabled = (0, _is_cloud_enabled.getIsCloudEnabled)(id);

                if (home) {
                  home.environment.update({
                    cloud: isCloudEnabled
                  });

                  if (isCloudEnabled) {
                    home.tutorials.setVariable('cloud', {
                      id: id,
                      resetPasswordUrl: resetPasswordUrl
                    });
                  }
                }

                return _context.abrupt("return", {
                  cloudId: id,
                  isCloudEnabled: isCloudEnabled
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setup(_x, _x2) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "start",
    value: function start(coreStart) {
      coreStart.chrome.setHelpSupportUrl(_constants.ELASTIC_SUPPORT_LINK);
    }
  }]);

  return CloudPlugin;
}();

exports.CloudPlugin = CloudPlugin;