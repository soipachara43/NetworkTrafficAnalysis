"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDocTableDirective = createDocTableDirective;

var _doc_table = _interopRequireDefault(require("./doc_table.html"));

var _public = require("../../../../../../../../plugins/kibana_utils/public");

var _doc_table_strings = require("./doc_table_strings");

var _kibana_services = require("../../../kibana_services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// @ts-ignore
function createDocTableDirective(pagerFactory, $filter) {
  return {
    restrict: 'E',
    template: _doc_table.default,
    scope: {
      sorting: '=',
      columns: '=',
      hits: '=',
      totalHitCount: '=',
      indexPattern: '=',
      isLoading: '=?',
      infiniteScroll: '=?',
      filter: '=?',
      minimumVisibleRows: '=?',
      onAddColumn: '=?',
      onChangeSortOrder: '=?',
      onMoveColumn: '=?',
      onRemoveColumn: '=?',
      inspectorAdapters: '=?'
    },
    link: function link($scope, $el) {
      $scope.$watch('minimumVisibleRows', function (minimumVisibleRows) {
        $scope.limit = Math.max(minimumVisibleRows || 50, $scope.limit || 50);
      });
      $scope.persist = {
        sorting: $scope.sorting,
        columns: $scope.columns
      };
      var limitTo = $filter('limitTo');

      var calculateItemsOnPage = function calculateItemsOnPage() {
        $scope.pager.setTotalItems($scope.hits.length);
        $scope.pageOfItems = limitTo($scope.hits, $scope.pager.pageSize, $scope.pager.startIndex);
      };

      $scope.limitedResultsWarning = (0, _doc_table_strings.getLimitedSearchResultsMessage)((0, _kibana_services.getServices)().uiSettings.get('discover:sampleSize'));

      $scope.addRows = function () {
        $scope.limit += 50;
      };

      $scope.$watch('hits', function (hits) {
        if (!hits) return; // Reset infinite scroll limit

        $scope.limit = 50;

        if (hits.length === 0) {
          (0, _public.dispatchRenderComplete)($el[0]);
        }

        if ($scope.infiniteScroll) return;
        $scope.pager = pagerFactory.create(hits.length, 50, 1);
        calculateItemsOnPage();
      });
      $scope.pageOfItems = [];

      $scope.onPageNext = function () {
        $scope.pager.nextPage();
        calculateItemsOnPage();
      };

      $scope.onPagePrevious = function () {
        $scope.pager.previousPage();
        calculateItemsOnPage();
      };

      $scope.shouldShowLimitedResultsWarning = function () {
        return !$scope.pager.hasNextPage && $scope.pager.totalItems < $scope.totalHitCount;
      };
    }
  };
}