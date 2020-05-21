import React from 'react';
import { EuiSpacer } from '../spacer';
import { EuiTablePagination } from '../table';
export var defaults = {
  pageSizeOptions: [10, 25, 50]
};
export var PaginationBar = function PaginationBar(_ref) {
  var pagination = _ref.pagination,
      onPageSizeChange = _ref.onPageSizeChange,
      onPageChange = _ref.onPageChange;
  var pageSizeOptions = pagination.pageSizeOptions ? pagination.pageSizeOptions : defaults.pageSizeOptions;
  var pageCount = Math.ceil(pagination.totalItemCount / pagination.pageSize);
  return React.createElement("div", null, React.createElement(EuiSpacer, {
    size: "m"
  }), React.createElement(EuiTablePagination, {
    activePage: pagination.pageIndex,
    hidePerPageOptions: pagination.hidePerPageOptions,
    itemsPerPage: pagination.pageSize,
    itemsPerPageOptions: pageSizeOptions,
    pageCount: pageCount,
    onChangeItemsPerPage: onPageSizeChange,
    onChangePage: onPageChange
  }));
};
PaginationBar.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "PaginationBar"
};