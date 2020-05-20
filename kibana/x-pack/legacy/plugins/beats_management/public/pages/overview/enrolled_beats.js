"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatsPage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireDefault(require("react"));

var _enroll_beats = require("../../components/enroll_beats");

var _breadcrumb = require("../../components/navigation/breadcrumb");

var _table = require("../../components/table");

var _action_schema = require("../../components/table/action_schema");

var _table2 = require("../../components/table/table");

var _with_kuery_autocompletion = require("../../containers/with_kuery_autocompletion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BeatsPageComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(BeatsPageComponent, _React$PureComponent);

  function BeatsPageComponent(props) {
    var _this;

    _classCallCheck(this, BeatsPageComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BeatsPageComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "tableRef", _react2.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "renderActionArea", function () {
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiButtonEmpty, {
        onClick: function onClick() {
          // random, but specific number ensures new tab does not overwrite another _newtab in chrome
          // and at the same time not truly random so that many clicks of the link open many tabs at this same URL
          window.open('https://www.elastic.co/guide/en/beats/libbeat/current/getting-started.html', '_newtab35628937456');
        }
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beats.installBeatsLearningButtonLabel",
        defaultMessage: "Learn how to install beats"
      })), _react2.default.createElement(_eui.EuiButton, {
        size: "s",
        color: "primary",
        onClick:
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this.props.goTo("/overview/enrolled_beats/enroll");

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beats.enrollBeatsButtonLabel",
        defaultMessage: "Enroll Beats"
      })), _this.props.location.pathname === '/overview/enrolled_beats/enroll' && _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement(_eui.EuiModal, {
        onClose: function onClose() {
          _this.props.setUrlState({
            enrollmentToken: ''
          });

          _this.props.goTo("/overview/enrolled_beats");
        },
        style: {
          width: '640px'
        }
      }, _react2.default.createElement(_eui.EuiModalHeader, null, _react2.default.createElement(_eui.EuiModalHeaderTitle, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.beatsManagement.beats.enrollNewBeatsTitle",
        defaultMessage: "Enroll a new Beat"
      }))), _react2.default.createElement(_eui.EuiModalBody, null, _react2.default.createElement(_enroll_beats.EnrollBeat, {
        frameworkBasePath: _this.props.libs.framework.info.basePath,
        enrollmentToken: _this.props.urlState.enrollmentToken,
        getBeatWithToken: _this.props.containers.beats.getBeatWithToken,
        createEnrollmentToken:
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var enrollmentTokens;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this.props.libs.tokens.createEnrollmentTokens();

                case 2:
                  enrollmentTokens = _context2.sent;

                  _this.props.setUrlState({
                    enrollmentToken: enrollmentTokens[0]
                  });

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })),
        onBeatEnrolled: function onBeatEnrolled() {
          _this.props.setUrlState({
            enrollmentToken: ''
          });
        }
      }), !_this.props.urlState.enrollmentToken && _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiButton, {
        size: "s",
        color: "primary",
        style: {
          marginLeft: 10
        },
        onClick:
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this.props.goTo('/overview/enrolled_beats');

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }))
      }, "Done"))))));
    });

    _defineProperty(_assertThisInitialized(_this), "notifyBeatDisenrolled",
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(beats) {
        var intl, title, text;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                intl = _this.props.intl;

                if (beats.length === 1) {
                  title = intl.formatMessage({
                    id: 'xpack.beatsManagement.beats.beatDisenrolledNotificationTitle',
                    defaultMessage: '{firstBeatNameOrId} disenrolled'
                  }, {
                    firstBeatNameOrId: "\"".concat(beats[0].name || beats[0].id, "\"")
                  });
                  text = intl.formatMessage({
                    id: 'xpack.beatsManagement.beats.beatDisenrolledNotificationDescription',
                    defaultMessage: 'Beat with ID {firstBeatId} was disenrolled.'
                  }, {
                    firstBeatId: "\"".concat(beats[0].id, "\"")
                  });
                } else {
                  title = intl.formatMessage({
                    id: 'xpack.beatsManagement.beats.disenrolledBeatsNotificationTitle',
                    defaultMessage: '{beatsLength} beats disenrolled'
                  }, {
                    beatsLength: beats.length
                  });
                }

                _this.setState({
                  notifications: _this.state.notifications.concat({
                    color: 'warning',
                    id: "disenroll_".concat(new Date()),
                    title: title,
                    text: text
                  })
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "notifyUpdatedTagAssociation", function (action, beats, tag) {
      var intl = _this.props.intl;
      var notificationMessage = action === 'removed' ? intl.formatMessage({
        id: 'xpack.beatsManagement.beats.removedNotificationDescription',
        defaultMessage: 'Removed tag {tag} from {assignmentsLength, plural, one {beat {beatName}} other {# beats}}.'
      }, {
        tag: "\"".concat(tag, "\""),
        assignmentsLength: beats.length,
        beatName: "\"".concat(beats[0].name || beats[0].id, "\"")
      }) : intl.formatMessage({
        id: 'xpack.beatsManagement.beats.addedNotificationDescription',
        defaultMessage: 'Added tag {tag} to {assignmentsLength, plural, one {beat {beatName}} other {# beats}}.'
      }, {
        tag: "\"".concat(tag, "\""),
        assignmentsLength: beats.length,
        beatName: "\"".concat(beats[0].name || beats[0].id, "\"")
      });
      var notificationTitle = action === 'removed' ? intl.formatMessage({
        id: 'xpack.beatsManagement.beats.removedNotificationTitle',
        defaultMessage: '{assignmentsLength, plural, one {Tag} other {Tags}} removed'
      }, {
        assignmentsLength: beats.length
      }) : intl.formatMessage({
        id: 'xpack.beatsManagement.beats.addedNotificationTitle',
        defaultMessage: '{assignmentsLength, plural, one {Tag} other {Tags}} added'
      }, {
        assignmentsLength: beats.length
      });

      _this.setState({
        notifications: _this.state.notifications.concat({
          color: 'success',
          id: "tag-".concat(_moment.default.now()),
          text: _react2.default.createElement("p", null, notificationMessage),
          title: notificationTitle
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedBeats", function () {
      if (!_this.tableRef.current) {
        return [];
      }

      var selectedIds = _this.tableRef.current.state.selection.map(function (beat) {
        return beat.id;
      });

      var beats = [];
      selectedIds.forEach(function (id) {
        var beat = _this.props.containers.beats.state.list.find(function (b) {
          return b.id === id;
        });

        if (beat) {
          beats.push(beat);
        }
      });
      return beats;
    });

    _this.state = {
      notifications: [],
      tags: null,
      beats: [],
      assignmentOptions: null
    };
    props.renderAction(_this.renderActionArea);
    return _this;
  }

  _createClass(BeatsPageComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.urlState.beatsKBar) {
        this.props.containers.beats.reload(this.props.urlState.beatsKBar);
      }

      this.updateBeatsData(this.props.urlState.beatsKBar);
    }
  }, {
    key: "updateBeatsData",
    value: function () {
      var _updateBeatsData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(beatsKBar) {
        var beats, tags;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t1 = _lodash.sortBy;
                _context5.next = 3;
                return this.props.libs.beats.getAll(beatsKBar);

              case 3:
                _context5.t2 = _context5.sent;
                _context5.t0 = (0, _context5.t1)(_context5.t2, 'id');

                if (_context5.t0) {
                  _context5.next = 7;
                  break;
                }

                _context5.t0 = [];

              case 7:
                beats = _context5.t0;
                _context5.next = 10;
                return this.props.libs.tags.getTagsWithIds((0, _lodash.flatten)(beats.map(function (beat) {
                  return beat.tags;
                })));

              case 10:
                tags = _context5.sent;
                this.setState({
                  tags: tags,
                  beats: beats
                });

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateBeatsData(_x2) {
        return _updateBeatsData.apply(this, arguments);
      }

      return updateBeatsData;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_breadcrumb.Breadcrumb, {
        title: _i18n.i18n.translate('xpack.beatsManagement.breadcrumb.enrolledBeats', {
          defaultMessage: 'Enrolled Beats'
        }),
        path: "/overview/enrolled_beats"
      }), _react2.default.createElement(_with_kuery_autocompletion.WithKueryAutocompletion, {
        libs: this.props.libs,
        fieldPrefix: "beat"
      }, function (autocompleteProps) {
        return _react2.default.createElement(_table.Table, {
          kueryBarProps: _objectSpread({}, autocompleteProps, {
            filterQueryDraft: 'false',
            // todo
            isValid: _this2.props.libs.elasticsearch.isKueryValid(_this2.props.urlState.beatsKBar || ''),
            onChange: function onChange(value) {
              _this2.props.setUrlState({
                beatsKBar: value
              });

              _this2.updateBeatsData(value);
            },
            onSubmit: function onSubmit() {
              return null;
            },
            // todo
            value: _this2.props.urlState.beatsKBar || ''
          }),
          actions: _action_schema.beatsListActions,
          actionData: {
            tags: _this2.state.assignmentOptions
          },
          actionHandler:
          /*#__PURE__*/
          function () {
            var _ref5 = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee6(action, payload) {
              var status, assignmentOptions;
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.t0 = action;
                      _context6.next = _context6.t0 === _table2.AssignmentActionType.Assign ? 3 : _context6.t0 === _table2.AssignmentActionType.Delete ? 10 : _context6.t0 === _table2.AssignmentActionType.Reload ? 16 : 21;
                      break;

                    case 3:
                      _context6.next = 5;
                      return _this2.props.containers.beats.toggleTagAssignment(payload, _this2.getSelectedBeats());

                    case 5:
                      status = _context6.sent;
                      _context6.next = 8;
                      return _this2.updateBeatsData();

                    case 8:
                      _this2.notifyUpdatedTagAssociation(status, _this2.getSelectedBeats(), payload);

                      return _context6.abrupt("break", 21);

                    case 10:
                      _context6.next = 12;
                      return _this2.props.containers.beats.deactivate(_this2.getSelectedBeats());

                    case 12:
                      _context6.next = 14;
                      return _this2.updateBeatsData();

                    case 14:
                      _this2.notifyBeatDisenrolled(_this2.getSelectedBeats());

                      return _context6.abrupt("break", 21);

                    case 16:
                      _context6.next = 18;
                      return _this2.props.libs.tags.getassignableTagsForBeats(_this2.getSelectedBeats());

                    case 18:
                      assignmentOptions = _context6.sent;

                      _this2.setState({
                        assignmentOptions: assignmentOptions
                      });

                      return _context6.abrupt("break", 21);

                    case 21:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }));

            return function (_x3, _x4) {
              return _ref5.apply(this, arguments);
            };
          }(),
          items: _this2.state.beats.map(function (beat) {
            return _objectSpread({}, beat, {
              tags: (_this2.state.tags || []).filter(function (tag) {
                return beat.tags.includes(tag.id);
              })
            });
          }),
          ref: _this2.tableRef,
          type: _table.BeatsTableType
        });
      }), _react2.default.createElement(_eui.EuiGlobalToastList, {
        toasts: this.state.notifications,
        dismissToast: function dismissToast() {
          return _this2.setState({
            notifications: []
          });
        },
        toastLifeTimeMs: 5000
      }));
    }
  }]);

  return BeatsPageComponent;
}(_react2.default.PureComponent);

var BeatsPage = (0, _react.injectI18n)(BeatsPageComponent);
exports.BeatsPage = BeatsPage;