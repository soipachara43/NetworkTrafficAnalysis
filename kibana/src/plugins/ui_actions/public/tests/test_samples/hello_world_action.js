"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHelloWorldAction = createHelloWorldAction;
exports.ACTION_HELLO_WORLD = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _actions = require("../../actions");

var _public = require("../../../../kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ReactMenuItem = function ReactMenuItem() {
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, "Hello world!"), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiBadge, {
    color: 'danger'
  }, 'secret')));
};

var UiMenuItem = (0, _public.reactToUiComponent)(ReactMenuItem); // Casting to ActionType is a hack - in a real situation use
// declare module and add this id to ActionContextMapping.

var ACTION_HELLO_WORLD = 'ACTION_HELLO_WORLD';
exports.ACTION_HELLO_WORLD = ACTION_HELLO_WORLD;

function createHelloWorldAction(overlays) {
  return (0, _actions.createAction)({
    type: ACTION_HELLO_WORLD,
    getIconType: function getIconType() {
      return 'lock';
    },
    MenuItem: UiMenuItem,
    execute: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var flyoutSession;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                flyoutSession = overlays.openFlyout((0, _public.toMountPoint)(_react.default.createElement(_eui.EuiFlyout, {
                  ownFocus: true,
                  onClose: function onClose() {
                    return flyoutSession && flyoutSession.close();
                  }
                }, "Hello World, I am a hello world action!")), {
                  'data-test-subj': 'helloWorldAction'
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  });
}