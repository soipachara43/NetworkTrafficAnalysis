"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screenshotsObservableFactory = screenshotsObservableFactory;

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _get_element_position_data = require("./get_element_position_data");

var _get_number_of_items = require("./get_number_of_items");

var _get_screenshots = require("./get_screenshots");

var _get_time_range = require("./get_time_range");

var _open_url = require("./open_url");

var _wait_for_render = require("./wait_for_render");

var _wait_for_visualizations = require("./wait_for_visualizations");

var _inject_css = require("./inject_css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function screenshotsObservableFactory(server, browserDriverFactory) {
  const config = server.config();
  const captureConfig = config.get('xpack.reporting.capture');
  return function screenshotsObservable({
    logger,
    urls,
    conditionalHeaders,
    layout,
    browserTimezone
  }) {
    const create$ = browserDriverFactory.createPage({
      viewport: layout.getBrowserViewport(),
      browserTimezone
    }, logger);
    return Rx.from(urls).pipe((0, _operators.concatMap)(url => {
      return create$.pipe((0, _operators.mergeMap)(({
        driver,
        exit$
      }) => {
        const setup$ = Rx.of(1).pipe((0, _operators.takeUntil)(exit$), (0, _operators.mergeMap)(() => (0, _open_url.openUrl)(server, driver, url, conditionalHeaders, logger)), (0, _operators.mergeMap)(() => (0, _get_number_of_items.getNumberOfItems)(server, driver, layout, logger)), (0, _operators.mergeMap)(async itemsCount => {
          const viewport = layout.getViewport(itemsCount);
          await Promise.all([driver.setViewport(viewport, logger), (0, _wait_for_visualizations.waitForVisualizations)(server, driver, itemsCount, layout, logger)]);
        }), (0, _operators.mergeMap)(async () => {
          // Waiting till _after_ elements have rendered before injecting our CSS
          // allows for them to be displayed properly in many cases
          await (0, _inject_css.injectCustomCss)(driver, layout, logger);

          if (layout.positionElements) {
            // position panel elements for print layout
            await layout.positionElements(driver, logger);
          }

          await (0, _wait_for_render.waitForRenderComplete)(driver, layout, captureConfig, logger);
        }), (0, _operators.mergeMap)(async () => {
          return await Promise.all([(0, _get_time_range.getTimeRange)(driver, layout, logger), (0, _get_element_position_data.getElementPositionAndAttributes)(driver, layout, logger)]).then(([timeRange, elementsPositionAndAttributes]) => ({
            elementsPositionAndAttributes,
            timeRange
          }));
        }), (0, _operators.catchError)(err => {
          logger.error(err);
          return Rx.of({
            elementsPositionAndAttributes: null,
            timeRange: null,
            error: err
          });
        }));
        return setup$.pipe((0, _operators.mergeMap)(async data => {
          const elements = data.elementsPositionAndAttributes ? data.elementsPositionAndAttributes : getDefaultElementPosition(layout.getViewport(1));
          const screenshots = await (0, _get_screenshots.getScreenshots)(driver, elements, logger);
          const {
            timeRange,
            error: setupError
          } = data;
          return {
            timeRange,
            screenshots,
            error: setupError
          };
        }));
      }), (0, _operators.first)());
    }), (0, _operators.take)(urls.length), (0, _operators.toArray)());
  };
}
/*
 * If an error happens setting up the page, we don't know if there actually
 * are any visualizations showing. These defaults should help capture the page
 * enough for the user to see the error themselves
 */


const getDefaultElementPosition = ({
  height,
  width
}) => [{
  position: {
    boundingClientRect: {
      top: 0,
      left: 0,
      height,
      width
    },
    scroll: {
      x: 0,
      y: 0
    }
  },
  attributes: {}
}];