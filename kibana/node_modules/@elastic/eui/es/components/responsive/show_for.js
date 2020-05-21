import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
var responsiveSizesToClassNameMap = {
  xs: 'eui-showFor--xs',
  s: 'eui-showFor--s',
  m: 'eui-showFor--m',
  l: 'eui-showFor--l',
  xl: 'eui-showFor--xl'
};
export var EuiShowFor = function EuiShowFor(_ref) {
  var children = _ref.children,
      sizes = _ref.sizes,
      display = _ref.display;
  var utilityClasses = sizes.map(function (item) {
    var append = display ? "--".concat(display) : '';
    return "".concat(responsiveSizesToClassNameMap[item]).concat(append);
  });

  if (React.isValidElement(children)) {
    return React.createElement(React.Fragment, null, React.Children.map(children, function (child) {
      return React.cloneElement(child, {
        className: classNames(child.props.className, utilityClasses)
      });
    }));
  } else {
    return React.createElement("span", {
      className: classNames(utilityClasses)
    }, children);
  }
};
EuiShowFor.propTypes = {
  children: PropTypes.node,

  /**
     * List of all the responsive sizes to show the children for.
     * Options are `'xs' | 's' | 'm' | 'l' | 'xl'`
     */
  sizes: PropTypes.arrayOf(PropTypes.oneOf(["xs", "s", "m", "l", "xl"]).isRequired).isRequired,

  /**
     * Optional display as property. Leaving as `undefined` renders as `inline`.
     */
  display: PropTypes.oneOf(["block", "inlineBlock", "flex"])
};
EuiShowFor.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiShowFor",
  "props": {
    "children": {
      "type": {
        "name": "node"
      },
      "required": false,
      "description": ""
    },
    "sizes": {
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "enum",
          "value": [{
            "value": "\"xs\"",
            "computed": false
          }, {
            "value": "\"s\"",
            "computed": false
          }, {
            "value": "\"m\"",
            "computed": false
          }, {
            "value": "\"l\"",
            "computed": false
          }, {
            "value": "\"xl\"",
            "computed": false
          }]
        }
      },
      "required": true,
      "description": "List of all the responsive sizes to show the children for.\nOptions are `'xs' | 's' | 'm' | 'l' | 'xl'`"
    },
    "display": {
      "type": {
        "name": "enum",
        "value": [{
          "value": "\"block\"",
          "computed": false
        }, {
          "value": "\"inlineBlock\"",
          "computed": false
        }, {
          "value": "\"flex\"",
          "computed": false
        }]
      },
      "required": false,
      "description": "Optional display as property. Leaving as `undefined` renders as `inline`."
    }
  }
};