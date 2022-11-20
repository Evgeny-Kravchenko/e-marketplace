import React, { ReactElement, useMemo } from 'react';
import { CellProps } from 'react-table';
import Image from 'next/image';

import { Box } from '@mui/material';

import { Table } from 'shared/ui';
import { Product } from 'shared/api';

interface generateColumnsProps {
  renderDeleteFeature: (id: string) => ReactElement;
  renderChangeQuantityFeature: (product: Product) => ReactElement;
}

const generateColumns: any = ({
  renderDeleteFeature,
  renderChangeQuantityFeature,
}: generateColumnsProps) => [
  {
    id: 'itemName',
    Header: 'Item',
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
            alt={props.value}
          />
          {props.row.original.name}
        </Box>
      );
    },
  },
  {
    id: 'qantity',
    Header: 'Qantity',
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
  },
  {
    id: 'action',
    Header: 'Action',
    Cell: (props: CellProps<Product>) => renderDeleteFeature(props.row.original.id),
  },
];

interface Props {
  data: { orderItem: Product; count: number }[];
  renderDeleteFeature?: (id: string) => ReactElement;
  renderChangeQuantityFeature?: (orderItem: Product) => ReactElement;
}

export const OrdersTable = ({
  data,
  renderDeleteFeature,
  renderChangeQuantityFeature,
}: Props): ReactElement => {
  const normilizedData = data.map((item) => ({ ...item.orderItem, count: item.count }));

  const columns = useMemo(
    () => generateColumns({ renderDeleteFeature, renderChangeQuantityFeature }),
    [renderDeleteFeature, renderChangeQuantityFeature]
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
