"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertMonitorStatusComponent = exports.selectedLocationsToString = exports.AlertFieldNumber = exports.handleAlertFieldNumberChange = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _kuery_bar_container = require("../../connected/kuerybar/kuery_bar_container");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var handleAlertFieldNumberChange = function handleAlertFieldNumberChange(e, isInvalid, setIsInvalid, setFieldValue) {
  var num = parseInt(e.target.value, 10);

  if (isNaN(num) || num < 1) {
    setIsInvalid(true);
  } else {
    if (isInvalid) setIsInvalid(false);
    setFieldValue(num);
  }
};

exports.handleAlertFieldNumberChange = handleAlertFieldNumberChange;

var AlertFieldNumber = function AlertFieldNumber(_ref) {
  var ariaLabel = _ref['aria-label'],
      dataTestSubj = _ref['data-test-subj'],
      disabled = _ref.disabled,
      fieldValue = _ref.fieldValue,
      setFieldValue = _ref.setFieldValue;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isInvalid = _useState2[0],
      setIsInvalid = _useState2[1];

  return _react.default.createElement(_eui.EuiFieldNumber, {
    "aria-label": ariaLabel,
    compressed: true,
    "data-test-subj": dataTestSubj,
    min: 1,
    onChange: function onChange(e) {
      return handleAlertFieldNumberChange(e, isInvalid, setIsInvalid, setFieldValue);
    },
    disabled: disabled,
    value: fieldValue,
    isInvalid: isInvalid
  });
};

exports.AlertFieldNumber = AlertFieldNumber;

var AlertExpressionPopover = function AlertExpressionPopover(_ref2) {
  var ariaLabel = _ref2['aria-label'],
      content = _ref2.content,
      dataTestSubj = _ref2['data-test-subj'],
      description = _ref2.description,
      id = _ref2.id,
      value = _ref2.value;

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isOpen = _useState4[0],
      setIsOpen = _useState4[1];

  return _react.default.createElement(_eui.EuiPopover, {
    id: id,
    anchorPosition: "downLeft",
    button: _react.default.createElement(_eui.EuiExpression, {
      "aria-label": ariaLabel,
      color: isOpen ? 'primary' : 'secondary',
      "data-test-subj": dataTestSubj,
      description: description,
      isActive: isOpen,
      onClick: function onClick() {
        return setIsOpen(!isOpen);
      },
      value: value
    }),
    isOpen: isOpen,
    closePopover: function closePopover() {
      return setIsOpen(false);
    }
  }, content);
};

var selectedLocationsToString = function selectedLocationsToString(selectedLocations) {
  return (// create a nicely-formatted description string for all `on` locations
    selectedLocations.filter(function (_ref3) {
      var checked = _ref3.checked;
      return checked === 'on';
    }).map(function (_ref4) {
      var label = _ref4.label;
      return label;
    }).sort().reduce(function (acc, cur) {
      if (acc === '') {
        return cur;
      }

      return acc + ", ".concat(cur);
    }, '')
  );
};

exports.selectedLocationsToString = selectedLocationsToString;

var AlertMonitorStatusComponent = function AlertMonitorStatusComponent(props) {
  var _ref8, _timerangeUnitOptions2;

  var filters = props.filters,
      locations = props.locations;

  var _useState5 = (0, _react.useState)(5),
      _useState6 = _slicedToArray(_useState5, 2),
      numTimes = _useState6[0],
      setNumTimes = _useState6[1];

  var _useState7 = (0, _react.useState)(15),
      _useState8 = _slicedToArray(_useState7, 2),
      numMins = _useState8[0],
      setNumMins = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      allLabels = _useState10[0],
      setAllLabels = _useState10[1]; // locations is an array of `Option[]`, but that type doesn't seem to be exported by EUI


  var _useState11 = (0, _react.useState)(locations.map(function (location) {
    return {
      'aria-label': _i18n.i18n.translate('xpack.uptime.alerts.locationSelectionItem.ariaLabel', {
        defaultMessage: 'Location selection item for "{location}"',
        values: {
          location: location
        }
      }),
      disabled: allLabels,
      label: location
    };
  })),
      _useState12 = _slicedToArray(_useState11, 2),
      selectedLocations = _useState12[0],
      setSelectedLocations = _useState12[1];

  var _useState13 = (0, _react.useState)([{
    'aria-label': _i18n.i18n.translate('xpack.uptime.alerts.timerangeUnitSelectable.secondsOption.ariaLabel', {
      defaultMessage: '"Seconds" time range select item'
    }),
    'data-test-subj': 'xpack.uptime.alerts.monitorStatus.timerangeUnitSelectable.secondsOption',
    key: 's',
    label: _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.timerangeOption.seconds', {
      defaultMessage: 'seconds'
    })
  }, {
    'aria-label': _i18n.i18n.translate('xpack.uptime.alerts.timerangeUnitSelectable.minutesOption.ariaLabel', {
      defaultMessage: '"Minutes" time range select item'
    }),
    'data-test-subj': 'xpack.uptime.alerts.monitorStatus.timerangeUnitSelectable.minutesOption',
    checked: 'on',
    key: 'm',
    label: _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.timerangeOption.minutes', {
      defaultMessage: 'minutes'
    })
  }, {
    'aria-label': _i18n.i18n.translate('xpack.uptime.alerts.timerangeUnitSelectable.hoursOption.ariaLabel', {
      defaultMessage: '"Hours" time range select item'
    }),
    'data-test-subj': 'xpack.uptime.alerts.monitorStatus.timerangeUnitSelectable.hoursOption',
    key: 'h',
    label: _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.timerangeOption.hours', {
      defaultMessage: 'hours'
    })
  }, {
    'aria-label': _i18n.i18n.translate('xpack.uptime.alerts.timerangeUnitSelectable.daysOption.ariaLabel', {
      defaultMessage: '"Days" time range select item'
    }),
    'data-test-subj': 'xpack.uptime.alerts.monitorStatus.timerangeUnitSelectable.daysOption',
    key: 'd',
    label: _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.timerangeOption.days', {
      defaultMessage: 'days'
    })
  }]),
      _useState14 = _slicedToArray(_useState13, 2),
      timerangeUnitOptions = _useState14[0],
      setTimerangeUnitOptions = _useState14[1];

  var setAlertParams = props.setAlertParams;
  (0, _react.useEffect)(function () {
    setAlertParams('numTimes', numTimes);
  }, [numTimes, setAlertParams]);
  (0, _react.useEffect)(function () {
    var _ref5, _timerangeUnitOptions;

    var timerangeUnit = (_ref5 = (_timerangeUnitOptions = timerangeUnitOptions.find(function (_ref6) {
      var checked = _ref6.checked;
      return checked === 'on';
    })) === null || _timerangeUnitOptions === void 0 ? void 0 : _timerangeUnitOptions.key) !== null && _ref5 !== void 0 ? _ref5 : 'm';
    setAlertParams('timerange', {
      from: "now-".concat(numMins).concat(timerangeUnit),
      to: 'now'
    });
  }, [numMins, timerangeUnitOptions, setAlertParams]);
  (0, _react.useEffect)(function () {
    if (allLabels) {
      setAlertParams('locations', []);
    } else {
      setAlertParams('locations', selectedLocations.filter(function (l) {
        return l.checked === 'on';
      }).map(function (l) {
        return l.label;
      }));
    }
  }, [selectedLocations, setAlertParams, allLabels]);
  (0, _react.useEffect)(function () {
    setAlertParams('filters', filters);
  }, [filters, setAlertParams]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_kuery_bar_container.KueryBar, {
    "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.filterBar.ariaLabel', {
      defaultMessage: 'Input that allows filtering criteria for the monitor status alert'
    }),
    autocomplete: props.autocomplete,
    "data-test-subj": "xpack.uptime.alerts.monitorStatus.filterBar"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(AlertExpressionPopover, {
    "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.numTimesExpression.ariaLabel', {
      defaultMessage: 'Open the popover for down count input'
    }),
    content: _react.default.createElement(AlertFieldNumber, {
      "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.numTimesField.ariaLabel', {
        defaultMessage: 'Enter number of down counts required to trigger the alert'
      }),
      "data-test-subj": "xpack.uptime.alerts.monitorStatus.numTimesField",
      disabled: false,
      fieldValue: numTimes,
      setFieldValue: setNumTimes
    }),
    "data-test-subj": "xpack.uptime.alerts.monitorStatus.numTimesExpression",
    description: "any monitor is down >",
    id: "ping-count",
    value: "".concat(numTimes, " times")
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(AlertExpressionPopover, {
    "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.timerangeValueExpression.ariaLabel', {
      defaultMessage: 'Open the popover for time range value field'
    }),
    content: _react.default.createElement(AlertFieldNumber, {
      "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.timerangeValueField.ariaLabel', {
        defaultMessage: "Enter the number of time units for the alert's range"
      }),
      "data-test-subj": "xpack.uptime.alerts.monitorStatus.timerangeValueField",
      disabled: false,
      fieldValue: numMins,
      setFieldValue: setNumMins
    }),
    "data-test-subj": "xpack.uptime.alerts.monitorStatus.timerangeValueExpression",
    description: "within",
    id: "timerange",
    value: "last ".concat(numMins)
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(AlertExpressionPopover, {
    "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.timerangeUnitExpression.ariaLabel', {
      defaultMessage: 'Open the popover for time range unit select field'
    }),
    content: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
      size: "xxs"
    }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.alerts.monitorStatus.timerangeSelectionHeader",
      defaultMessage: "Select time range unit"
    }))), _react.default.createElement(_eui.EuiSelectable, {
      "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.timerangeUnitSelectable', {
        defaultMessage: 'Selectable field for the time range units alerts should use'
      }),
      "data-test-subj": "xpack.uptime.alerts.monitorStatus.timerangeUnitSelectable",
      options: timerangeUnitOptions,
      onChange: function onChange(newOptions) {
        if (newOptions.reduce(function (acc, _ref7) {
          var checked = _ref7.checked;
          return acc || checked === 'on';
        }, false)) {
          setTimerangeUnitOptions(newOptions);
        }
      },
      singleSelection: true,
      listProps: {
        showIcons: true
      }
    }, function (list) {
      return list;
    })),
    "data-test-subj": "xpack.uptime.alerts.monitorStatus.timerangeUnitExpression",
    description: "",
    id: "timerange-unit",
    value: (_ref8 = (_timerangeUnitOptions2 = timerangeUnitOptions.find(function (_ref9) {
      var checked = _ref9.checked;
      return checked === 'on';
    })) === null || _timerangeUnitOptions2 === void 0 ? void 0 : _timerangeUnitOptions2.label.toLowerCase()) !== null && _ref8 !== void 0 ? _ref8 : ''
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), selectedLocations.length === 0 && _react.default.createElement(_eui.EuiExpression, {
    color: "secondary",
    "data-test-subj": "xpack.uptime.alerts.monitorStatus.locationsEmpty",
    description: "in",
    isActive: false,
    value: "all locations"
  }), selectedLocations.length > 0 && _react.default.createElement(AlertExpressionPopover, {
    "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.locationsSelectionExpression.ariaLabel', {
      defaultMessage: 'Open the popover to select locations the alert should trigger'
    }),
    content: _react.default.createElement(_eui.EuiFlexGroup, {
      direction: "column"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSwitch, {
      "aria-label": _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.locationSelectionSwitch.ariaLabel', {
        defaultMessage: 'Select the locations the alert should trigger'
      }),
      "data-test-subj": "xpack.uptime.alerts.monitorStatus.locationsSelectionSwitch",
      label: "Check all locations",
      checked: allLabels,
      onChange: function onChange() {
        setAllLabels(!allLabels);
        setSelectedLocations(selectedLocations.map(function (l) {
          return _objectSpread({
            'aria-label': _i18n.i18n.translate('xpack.uptime.alerts.monitorStatus.locationSelection', {
              defaultMessage: 'Select the location {location}',
              values: {
                location: l
              }
            })
          }, l, {
            'data-test-subj': "xpack.uptime.alerts.monitorStatus.locationSelection.".concat(l.label, "LocationOption"),
            disabled: !allLabels
          });
        }));
      }
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSelectable, {
      "data-test-subj": "xpack.uptime.alerts.monitorStatus.locationsSelectionSelectable",
      options: selectedLocations,
      onChange: function onChange(e) {
        return setSelectedLocations(e);
      }
    }, function (location) {
      return location;
    }))),
    "data-test-subj": "xpack.uptime.alerts.monitorStatus.locationsSelectionExpression",
    description: "from",
    id: "locations",
    value: selectedLocations.length === 0 || allLabels ? 'any location' : selectedLocationsToString(selectedLocations)
  }));
};

exports.AlertMonitorStatusComponent = AlertMonitorStatusComponent;