import React, { useEffect, useMemo } from 'react';
import {
  Column,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useFlexLayout,
  SortingRule,
} from 'react-table';

import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  CircularProgress,
} from '@mui/material';

import { StyledTableCell } from './TableStyles';

interface CustomTableProps {
  columns: ReadonlyArray<Column<object>>;
  data: object[];
  isLoading: boolean;
  noDataMessage?: string;
  handleSort?: (sortBy?: SortingRule<string>) => void;
  sortField?: string | null;
  sortDesc?: boolean | null;
  getRowId?: (row: object) => string;
  page?: number;
  rowsPerPage?: number;
}

export function Table({
  columns,
  data,
  isLoading,
  noDataMessage,
  handleSort,
  sortField,
  sortDesc,
  getRowId,
  page,
  rowsPerPage,
}: CustomTableProps): JSX.Element {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      getRowId,
      manualSortBy: true,
      useControlledState: (state) => {
        return useMemo(() => {
          return {
            ...state,
            pageSize: rowsPerPage || state.pageSize,
          };
        }, [state, page, rowsPerPage]);
      },
      initialState: {
        pageIndex: page,
        pageSize: rowsPerPage,
        sortBy:
          sortField && typeof sortDesc === 'boolean'
            ? [{ id: sortField, desc: sortDesc }]
            : [],
      },
    },
    useSortBy,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (Array.isArray(sortBy) && typeof handleSort === 'function') {
      handleSort(sortBy[0]);
    }
  }, [sortBy, handleSort]);

  return (
    <MuiTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => {
          const headerRowProps = headerGroup.getHeaderGroupProps();
          return (
            <TableRow {...headerRowProps} key={headerRowProps.key}>
              {headerGroup.headers.map((column) => {
                if (column.disableSortBy) {
                  return (
                    <StyledTableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                    >
                      {column.render('Header')}
                    </StyledTableCell>
                  );
                }
                return (
                  <StyledTableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                  >
                    <TableSortLabel
                      style={{ height: '100%', display: 'flex' }}
                      active={column.isSorted}
                      direction={
                        column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : 'asc'
                      }
                    >
                      {column.render('Header')}
                    </TableSortLabel>
                  </StyledTableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {!isLoading && (!Array.isArray(data) || data.length === 0) && noDataMessage && (
          <TableRow>
            <StyledTableCell align='center' colSpan={columns.length}>
              {noDataMessage}
            </StyledTableCell>
          </TableRow>
        )}
        {isLoading && (
          <TableRow>
            <StyledTableCell>
              <CircularProgress color='secondary' size='3rem' />
            </StyledTableCell>
          </TableRow>
        )}
        {!isLoading &&
          rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <StyledTableCell
                      {...cell.getCellProps()}
                      key={cell.column.id + cell.row.id}
                    >
                      {cell.render('Cell')}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </MuiTable>
  );
}

Table.defaultProps = {
  selectionEnabled: false,
  getRowId: ({ id }: { id: string }) => id,
  page: 0,
  rowsPerPage: 9999999999999, // It is needed fot tables that have no pagination. React table needs certain number to understand how many rows can be selected
};
