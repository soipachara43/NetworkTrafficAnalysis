"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toJson = toJson;
exports.mockMoment = mockMoment;
exports.getRenderedHref = getRenderedHref;
exports.mockNow = mockNow;
exports.delay = delay;
exports.expectTextsNotInDocument = expectTextsNotInDocument;
exports.expectTextsInDocument = expectTextsInDocument;
exports.inspectSearchParams = inspectSearchParams;

var _enzymeToJson = _interopRequireDefault(require("enzyme-to-json"));

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

require("@testing-library/jest-dom/extend-expect");

var _reactRouterDom = require("react-router-dom");

var _LocationContext = require("../context/LocationContext");

var _MockApmPluginContext = require("../context/ApmPluginContext/MockApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function toJson(wrapper) {
  return (0, _enzymeToJson.default)(wrapper, {
    noKey: true,
    mode: 'deep'
  });
}

function mockMoment() {
  // avoid timezone issues
  jest.spyOn(_moment.default.prototype, 'format').mockImplementation(function () {
    return "1st of January (mocking ".concat(this.unix(), ")");
  }); // convert relative time to absolute time to avoid timing issues

  jest.spyOn(_moment.default.prototype, 'fromNow').mockImplementation(function () {
    return "1337 minutes ago (mocking ".concat(this.unix(), ")");
  });
} // Useful for getting the rendered href from any kind of link component


function getRenderedHref(_x, _x2) {
  return _getRenderedHref.apply(this, arguments);
}

function _getRenderedHref() {
  _getRenderedHref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(Component, location) {
    var el, a;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            el = (0, _react2.render)(_react.default.createElement(_MockApmPluginContext.MockApmPluginContextWrapper, null, _react.default.createElement(_reactRouterDom.MemoryRouter, {
              initialEntries: [location]
            }, _react.default.createElement(_LocationContext.LocationProvider, null, _react.default.createElement(Component, null)))));
            _context.next = 3;
            return (0, _react2.waitForElement)(function () {
              return el.container.querySelector('a');
            });

          case 3:
            a = el.container.querySelector('a');
            return _context.abrupt("return", a ? a.getAttribute('href') : '');

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getRenderedHref.apply(this, arguments);
}

function mockNow(date) {
  var fakeNow = new Date(date).getTime();
  return jest.spyOn(Date, 'now').mockReturnValue(fakeNow);
}

function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function expectTextsNotInDocument(output, texts) {
  texts.forEach(function (text) {
    try {
      output.getByText(text);
    } catch (err) {
      if (err.message.startsWith('Unable to find an element with the text:')) {
        return;
      } else {
        throw err;
      }
    }

    throw new Error("Unexpected text found: ".concat(text));
  });
}

function expectTextsInDocument(output, texts) {
  texts.forEach(function (text) {
    expect(output.getByText(text)).toBeInTheDocument();
  });
}

function inspectSearchParams(_x3) {
  return _inspectSearchParams.apply(this, arguments);
}

function _inspectSearchParams() {
  _inspectSearchParams = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(fn) {
    var options,
        spy,
        response,
        error,
        mockSetup,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            spy = jest.fn().mockImplementation(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(request) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", options.mockResponse ? options.mockResponse(request) : {
                          hits: {
                            hits: {
                              total: {
                                value: 0
                              }
                            }
                          }
                        });

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref.apply(this, arguments);
              };
            }());
            mockSetup = {
              start: 1528113600000,
              end: 1528977600000,
              client: {
                search: spy
              },
              internalClient: {
                search: spy
              },
              config: new Proxy({}, {
                get: function get() {
                  return 'myIndex';
                }
              }),
              uiFiltersES: [{
                term: {
                  'my.custom.ui.filter': 'foo-bar'
                }
              }],
              indices: {
                'apm_oss.sourcemapIndices': 'myIndex',
                'apm_oss.errorIndices': 'myIndex',
                'apm_oss.onboardingIndices': 'myIndex',
                'apm_oss.spanIndices': 'myIndex',
                'apm_oss.transactionIndices': 'myIndex',
                'apm_oss.metricsIndices': 'myIndex',
                apmAgentConfigurationIndex: 'myIndex',
                apmCustomLinkIndex: 'myIndex'
              },
              dynamicIndexPattern: null
            };
            _context3.prev = 3;
            _context3.next = 6;
            return fn(mockSetup);

          case 6:
            response = _context3.sent;
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](3);
            error = _context3.t0; // we're only extracting the search params

          case 12:
            return _context3.abrupt("return", {
              params: spy.mock.calls[0][0],
              response: response,
              error: error,
              spy: spy,
              teardown: function teardown() {
                return spy.mockClear();
              }
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 9]]);
  }));
  return _inspectSearchParams.apply(this, arguments);
}