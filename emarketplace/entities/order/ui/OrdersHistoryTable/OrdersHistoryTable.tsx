import React, { ReactElement, useMemo } from 'react';
import { CellProps } from 'react-table';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

import { Table } from 'shared/ui';
import { Order } from 'shared/api';

const generateColumns: any = () => [
  {
    id: 'id',
    Header: 'ID',
    accessor: '_id',
    disableSortBy: true,
  },
  {
    id: 'createdAt',
    Header: 'DATE',
    accessor: 'createdAt',
    disableSortBy: true,
    Cell: (props: CellProps<Order>) => {
      return <span>{new Date(props.row.original.createdAt).toLocaleDateString()}</span>;
    },
  },
  {
    id: 'totalPrice',
    Header: 'TOTAL',
    accessor: 'totalPrice',
    disableSortBy: true,
  },
  {
    id: 'paid',
    Header: 'PAID',
    accessor: 'paidAt',
    disableSortBy: true,
    Cell: (props: CellProps<Order>) => {
      return (
        <span>
          {props.row.original.paidAt
            ? new Date(props.row.original.paidAt).toLocaleDateString()
            : 'Not paid'}
        </span>
      );
    },
  },
  {
    id: 'delivered',
    Header: 'DELIVERED',
    accessor: 'delivered',
    disableSortBy: true,
    Cell: (props: CellProps<Order>) => {
      return (
        <span>
          {props.row.original.deliveredAt
            ? new Date(props.row.original.deliveredAt).toLocaleDateString()
            : 'Not Delivered'}
        </span>
      );
    },
  },
  {
    id: 'action',
    Header: 'ACTION',
    accessor: 'delivered',
    disableSortBy: true,
    Cell: (props: CellProps<Order>) => {
      return (
        <MuiLink href={`/order/${props.row.original._id}`} component={Link}>
          Details
        </MuiLink>
      );
    },
  },
];

interface Props {
  data: Order[];
}

export const OrdersHistoryTable = ({ data }: Props): ReactElement => {
  const columns = useMemo(() => generateColumns(), []);

  const normilizedData = useMemo(
    () => data.map((item) => ({ ...item, id: item._id })),
    [data]
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
