"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockBrowserDriverFactory = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var contexts = _interopRequireWildcard(require("../export_types/common/lib/screenshots/constants"));

var _browsers = require("../server/browsers");

var _chromium = require("../server/browsers/chromium");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const mockSelectors = {
  renderComplete: 'renderedSelector',
  itemsCountAttribute: 'itemsSelector',
  screenshot: 'screenshotSelector',
  timefilterDurationAttribute: 'timefilterDurationSelector',
  toastHeader: 'toastHeaderSelector'
};

const getMockElementsPositionAndAttributes = (title, description) => [{
  position: {
    boundingClientRect: {
      top: 0,
      left: 0,
      width: 10,
      height: 11
    },
    scroll: {
      x: 0,
      y: 0
    }
  },
  attributes: {
    title,
    description
  }
}];

const mockWaitForSelector = jest.fn();
mockWaitForSelector.mockImplementation(selectorArg => {
  const {
    renderComplete,
    itemsCountAttribute,
    toastHeader
  } = mockSelectors;

  if (selectorArg === `${renderComplete},[${itemsCountAttribute}]`) {
    return Promise.resolve(true);
  } else if (selectorArg === toastHeader) {
    return Rx.never().toPromise();
  }

  throw new Error(selectorArg);
});
const mockBrowserEvaluate = jest.fn();
mockBrowserEvaluate.mockImplementation(() => {
  const lastCallIndex = mockBrowserEvaluate.mock.calls.length - 1;
  const {
    context: mockCall
  } = mockBrowserEvaluate.mock.calls[lastCallIndex][1];

  if (mockCall === contexts.CONTEXT_SKIPTELEMETRY) {
    return Promise.resolve();
  }

  if (mockCall === contexts.CONTEXT_GETNUMBEROFITEMS) {
    return Promise.resolve(1);
  }

  if (mockCall === contexts.CONTEXT_INJECTCSS) {
    return Promise.resolve();
  }

  if (mockCall === contexts.CONTEXT_WAITFORRENDER) {
    return Promise.resolve();
  }

  if (mockCall === contexts.CONTEXT_GETTIMERANGE) {
    return Promise.resolve('Default GetTimeRange Result');
  }

  if (mockCall === contexts.CONTEXT_ELEMENTATTRIBUTES) {
    return Promise.resolve(getMockElementsPositionAndAttributes('Default Mock Title', 'Default '));
  }

  throw new Error(mockCall);
});
const mockScreenshot = jest.fn();
mockScreenshot.mockImplementation(item => {
  return Promise.resolve(`allyourBase64 of ${Object.keys(item)}`);
});

const getCreatePage = driver => jest.fn().mockImplementation(() => Rx.of({
  driver,
  exit$: Rx.never()
}));

const defaultOpts = {
  evaluate: mockBrowserEvaluate,
  waitForSelector: mockWaitForSelector,
  screenshot: mockScreenshot,
  getCreatePage
};

const createMockBrowserDriverFactory = async (logger, opts) => {
  const browserConfig = {
    inspect: true,
    userDataDir: '/usr/data/dir',
    viewport: {
      width: 12,
      height: 12
    },
    disableSandbox: false,
    proxy: {
      enabled: false
    }
  };
  const binaryPath = '/usr/local/share/common/secure/';
  const captureConfig = {
    networkPolicy: {},
    timeouts: {}
  };
  const mockBrowserDriverFactory = await (0, _chromium.createDriverFactory)(binaryPath, logger, browserConfig, captureConfig);
  const mockPage = {};
  const mockBrowserDriver = new _browsers.HeadlessChromiumDriver(mockPage, {
    inspect: true,
    networkPolicy: captureConfig.networkPolicy
  }); // mock the driver methods as either default mocks or passed-in

  mockBrowserDriver.waitForSelector = opts.waitForSelector ? opts.waitForSelector : defaultOpts.waitForSelector; // prettier-ignore

  mockBrowserDriver.evaluate = opts.evaluate ? opts.evaluate : defaultOpts.evaluate;
  mockBrowserDriver.screenshot = opts.screenshot ? opts.screenshot : defaultOpts.screenshot;
  mockBrowserDriverFactory.createPage = opts.getCreatePage ? opts.getCreatePage(mockBrowserDriver) : getCreatePage(mockBrowserDriver);
  return mockBrowserDriverFactory;
};

exports.createMockBrowserDriverFactory = createMockBrowserDriverFactory;