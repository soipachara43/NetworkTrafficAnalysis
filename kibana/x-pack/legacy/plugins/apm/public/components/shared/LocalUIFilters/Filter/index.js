"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _FilterBadgeList = require("./FilterBadgeList");

var _variables = require("../../../../style/variables");

var _FilterTitleButton = require("./FilterTitleButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Popover = (0, _styledComponents.default)(_eui.EuiPopover).attrs(function () {
  return {
    anchorClassName: 'anchor'
  };
}).withConfig({
  displayName: "Popover",
  componentId: "sc-92gggq-0"
})([".anchor{display:block;}"]);

var SelectContainer = _styledComponents.default.div.withConfig({
  displayName: "SelectContainer",
  componentId: "sc-92gggq-1"
})(["width:", ";"], (0, _variables.px)(_variables.unit * 16));

var Counter = _styledComponents.default.div.withConfig({
  displayName: "Counter",
  componentId: "sc-92gggq-2"
})(["border-radius:", ";background:", ";padding:0 ", ";"], _eui_theme_light.default.euiBorderRadius, _eui_theme_light.default.euiColorLightShade, _eui_theme_light.default.paddingSizes.xs);

var ApplyButton = (0, _styledComponents.default)(_eui.EuiButton).withConfig({
  displayName: "ApplyButton",
  componentId: "sc-92gggq-3"
})(["align-self:flex-end;"]); // needed for IE11

var FlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "FlexItem",
  componentId: "sc-92gggq-4"
})(["flex-basis:auto !important;"]);

var Filter = function Filter(_ref) {
  var name = _ref.name,
      title = _ref.title,
      options = _ref.options,
      onChange = _ref.onChange,
      value = _ref.value,
      showCount = _ref.showCount;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPopover = _useState2[0],
      setShowPopover = _useState2[1];

  var toggleShowPopover = function toggleShowPopover() {
    return setShowPopover(function (show) {
      return !show;
    });
  };

  var button = _react.default.createElement(_FilterTitleButton.FilterTitleButton, {
    onClick: toggleShowPopover
  }, title);

  var items = (0, _react.useMemo)(function () {
    return options.map(function (option) {
      return {
        label: option.name,
        append: showCount ? _react.default.createElement(Counter, null, _react.default.createElement(_eui.EuiText, {
          size: "xs"
        }, option.count)) : null,
        checked: value.includes(option.name) ? 'on' : undefined
      };
    });
  }, [value, options, showCount]);

  var _useState3 = (0, _react.useState)(items),
      _useState4 = _slicedToArray(_useState3, 2),
      visibleOptions = _useState4[0],
      setVisibleOptions = _useState4[1];

  (0, _react.useEffect)(function () {
    setVisibleOptions(items);
  }, [items]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Popover, {
    id: "local-filter-".concat(name),
    closePopover: toggleShowPopover,
    button: button,
    isOpen: showPopover,
    panelPaddingSize: "s",
    anchorPosition: "downLeft"
  }, _react.default.createElement(_eui.EuiSelectable, {
    onChange: function onChange(selectedOptions) {
      setVisibleOptions(selectedOptions);
    },
    options: visibleOptions,
    searchable: true
  }, function (list, search) {
    return _react.default.createElement(SelectContainer, null, _react.default.createElement(_eui.EuiFlexGroup, {
      direction: "column",
      gutterSize: "none"
    }, _react.default.createElement(FlexItem, {
      grow: true
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "xxxs",
      textTransform: "uppercase"
    }, _react.default.createElement("h4", null, _i18n.i18n.translate('xpack.apm.applyFilter', {
      defaultMessage: 'Apply {title} filter',
      values: {
        title: title
      }
    }))), _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "none"
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), search, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), list, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    })), _react.default.createElement(FlexItem, {
      grow: false
    }, _react.default.createElement(ApplyButton, {
      color: "primary",
      fill: true,
      onClick: function onClick() {
        var newValue = visibleOptions.filter(function (option) {
          return option.checked === 'on';
        }).map(function (option) {
          return option.label;
        });
        setShowPopover(false);
        onChange(newValue);
      },
      size: "s"
    }, _i18n.i18n.translate('xpack.apm.applyOptions', {
      defaultMessage: 'Apply options'
    })))));
  })), value.length ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_FilterBadgeList.FilterBadgeList, {
    onRemove: function onRemove(val) {
      onChange(value.filter(function (v) {
        return val !== v;
      }));
    },
    value: value
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })) : null);
};

exports.Filter = Filter;