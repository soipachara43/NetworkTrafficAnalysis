function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { useEffect } from 'react';
export var getEventPosition = function getEventPosition(location, container) {
  var x = location.x,
      y = location.y;

  var _container$getBoundin = container.getBoundingClientRect(),
      width = _container$getBoundin.width,
      height = _container$getBoundin.height,
      left = _container$getBoundin.left,
      top = _container$getBoundin.top;

  var leftPos = x - (left + window.pageXOffset);
  var topPos = y - (top + window.pageYOffset);

  if (leftPos < 0) {
    leftPos = 0;
  } else if (leftPos > width) {
    leftPos = width;
  }

  if (topPos < 0) {
    topPos = 0;
  } else if (topPos > height) {
    topPos = height;
  }

  return {
    left: leftPos,
    top: topPos,
    width: width,
    height: height
  };
};
export var throttle = function throttle(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn.apply(void 0, arguments);
      time = Date.now();
    }
  };
};
export function isMouseEvent(event) {
  return _typeof(event) === 'object' && 'pageX' in event && 'pageY' in event;
}
export function useMouseMove(handleChange) {
  var interactionConditional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  useEffect(function () {
    return unbindEventListeners;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  var handleInteraction = function handleInteraction(e, isFirstInteraction) {
    if (e) {
      if (interactionConditional) {
        var x = isMouseEvent(e) ? e.pageX : e.touches[0].pageX;
        var y = isMouseEvent(e) ? e.pageY : e.touches[0].pageY;
        handleChange({
          x: x,
          y: y
        }, isFirstInteraction);
      }
    }
  };

  var handleMouseMove = throttle(function (e) {
    handleChange({
      x: e.pageX,
      y: e.pageY
    }, false);
  });

  var handleMouseDown = function handleMouseDown(e) {
    handleInteraction(e, true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', unbindEventListeners);
  };

  var unbindEventListeners = function unbindEventListeners() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', unbindEventListeners);
  };

  return [handleMouseDown, handleInteraction];
}