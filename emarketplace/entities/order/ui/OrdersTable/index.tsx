import React, { ReactElement, useMemo } from 'react';
import { CellProps } from 'react-table';
import Image from 'next/image';

import { Box } from '@mui/material';

import { Table } from 'shared/ui';
import { Product } from 'shared/api';

interface generateColumnsProps {
  renderAction: (id: string) => ReactElement;
}

const generateColumns: any = ({ renderAction }: generateColumnsProps) => [
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
    accessor: 'count',
  },
  {
    id: 'price',
    Header: 'Price',
    accessor: 'price',
  },
  {
    id: 'action',
    Header: 'Action',
    Cell: (props: CellProps<Product>) => renderAction(props.row.original.id),
  },
];

interface Props {
  data: { orderItem: Product; count: number }[];
  renderAction?: (id: string) => ReactElement;
}

export const OrdersTable = ({ data, renderAction }: Props): ReactElement => {
  const normilizedData = data.map((item) => ({ ...item.orderItem, count: item.count }));

  const columns = useMemo(() => generateColumns({ renderAction }), [renderAction]);

  return (
    <Table
      columns={columns}
      data={normilizedData}
      isLoading={false}
      noDataMessage='There are not any items'
    />
  );
};
