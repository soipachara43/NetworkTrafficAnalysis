"use strict";

var euiVars = _interopRequireWildcard(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _i18n2 = require("ui/i18n");

var _unstated = require("unstated");

var _constants = require("../common/constants");

var _background = require("./components/layouts/background");

var _breadcrumb = require("./components/navigation/breadcrumb");

var _breadcrumb2 = require("./components/navigation/breadcrumb/breadcrumb");

var _beats = require("./containers/beats");

var _tags = require("./containers/tags");

var _kibana = require("./lib/compose/kibana");

var _router = require("./router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function startApp(_x) {
  return _startApp.apply(this, arguments);
}

function _startApp() {
  _startApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(libs) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            libs.framework.renderUIAtPath(_constants.BASE_PATH, _react.default.createElement(_styledComponents.ThemeProvider, {
              theme: {
                eui: euiVars
              }
            }, _react.default.createElement(_i18n2.I18nContext, null, _react.default.createElement(_reactRouterDom.HashRouter, {
              basename: "/management/beats_management"
            }, _react.default.createElement(_unstated.Provider, {
              inject: [new _beats.BeatsContainer(libs), new _tags.TagsContainer(libs)]
            }, _react.default.createElement(_breadcrumb.BreadcrumbProvider, {
              useGlobalBreadcrumbs: libs.framework.versionGreaterThen('6.7.0')
            }, _react.default.createElement(_unstated.Subscribe, {
              to: [_beats.BeatsContainer, _tags.TagsContainer]
            }, function (beats, tags) {
              return _react.default.createElement(_background.Background, null, _react.default.createElement(_breadcrumb2.Breadcrumb, {
                title: _i18n.i18n.translate('xpack.beatsManagement.management.breadcrumb', {
                  defaultMessage: 'Management'
                })
              }), _react.default.createElement(_router.AppRouter, {
                libs: libs,
                beatsContainer: beats,
                tagsContainer: tags
              }));
            })))))), libs.framework.versionGreaterThen('6.7.0') ? 'management' : 'self');
            _context.next = 3;
            return libs.framework.waitUntilFrameworkReady();

          case 3:
            if (libs.framework.licenseIsAtLeast('standard')) {
              libs.framework.registerManagementSection({
                id: 'beats',
                name: _i18n.i18n.translate('xpack.beatsManagement.centralManagementSectionLabel', {
                  defaultMessage: 'Beats'
                }),
                iconName: 'logoBeats'
              });
              libs.framework.registerManagementUI({
                sectionId: 'beats',
                name: _i18n.i18n.translate('xpack.beatsManagement.centralManagementLinkLabel', {
                  defaultMessage: 'Central Management'
                }),
                basePath: _constants.BASE_PATH
              });
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startApp.apply(this, arguments);
}

startApp((0, _kibana.compose)());