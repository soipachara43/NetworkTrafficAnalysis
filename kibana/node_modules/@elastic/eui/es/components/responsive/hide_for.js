import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
var responsiveSizesToClassNameMap = {
  xs: 'eui-hideFor--xs',
  s: 'eui-hideFor--s',
  m: 'eui-hideFor--m',
  l: 'eui-hideFor--l',
  xl: 'eui-hideFor--xl'
};
export var EuiHideFor = function EuiHideFor(_ref) {
  var children = _ref.children,
      sizes = _ref.sizes;
  var utilityClasses = sizes.map(function (item) {
    return responsiveSizesToClassNameMap[item];
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
EuiHideFor.propTypes = {
  children: PropTypes.node,

  /**
     * List of all the responsive sizes to show the children for.
     * Options are `'xs' | 's' | 'm' | 'l' | 'xl'`
     */
  sizes: PropTypes.arrayOf(PropTypes.oneOf(["xs", "s", "m", "l", "xl"]).isRequired).isRequired
};
EuiHideFor.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiHideFor",
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
    }
  }
};