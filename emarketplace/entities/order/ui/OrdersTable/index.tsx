import React, { ReactElement, useMemo } from 'react';
import { CellProps, Column } from 'react-table';
import Image from 'next/image';

import { Box } from '@mui/material';

import { Table } from 'shared/ui';
import { Product } from 'shared/api';

interface generateColumnsProps {
  renderChangeQuantityFeature: (product: Product) => ReactElement;
  renderDeleteFeature?: (id: string) => ReactElement;
  additionalColumns?: ReadonlyArray<Column<object>>;
}

const generateColumns: any = ({
  renderDeleteFeature,
  renderChangeQuantityFeature,
  additionalColumns,
}: generateColumnsProps) => [
  {
    id: 'itemName',
    Header: 'Item',
    disableSortBy: true,
    Cell: (props: CellProps<Product>) => {
      return (
        <Box
          sx={(theme) => ({
            display: 'flex',
            gap: 1,
            flexDirection: 'column',

            [theme.breakpoints.up('sm')]: {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
          })}
        >
          <Image
            width={50}
            height={50}
            src={props.row.original.image}
            alt={props.value || 'Product preview'}
          />
          {props.row.original.name}
        </Box>
      );
    },
  },
  {
    id: 'qantity',
    Header: 'Qantity',
    disableSortBy: true,
    Cell: (props: CellProps<Product>) => (
      <Box sx={{ width: 'fit-content' }}>
        {renderChangeQuantityFeature(props.row.original)}
      </Box>
    ),
  },
  {
    id: 'price',
    Header: 'Price',
    accessor: 'price',
    disableSortBy: true,
  },
  ...(renderDeleteFeature
    ? [
        {
          id: 'action',
          Header: 'Action',
          Cell: (props: CellProps<Product>) => renderDeleteFeature(props.row.original.id),
        },
      ]
    : []),
  ...(additionalColumns || []),
];

interface Props {
  data: { orderItem: Product; count: number }[];
  renderDeleteFeature?: (id: string) => ReactElement;
  renderChangeQuantityFeature?: (orderItem: Product) => ReactElement;
  additionalColumns?: ReadonlyArray<Column<object>>;
}

export const OrdersTable = ({
  data,
  renderChangeQuantityFeature,
  renderDeleteFeature,
  additionalColumns,
}: Props): ReactElement => {
  const normilizedData = data.map((item) => ({ ...item.orderItem, count: item.count }));

  const columns = useMemo(
    () =>
      generateColumns({
        renderChangeQuantityFeature,
        renderDeleteFeature,
        additionalColumns,
      }),
    [renderChangeQuantityFeature, renderDeleteFeature, additionalColumns]
  );

  return (
    <Table
      columns={columns}
      data={normilizedData}
      isLoading={false}
      noDataMessage='There are not any items'
    />
  );
};
