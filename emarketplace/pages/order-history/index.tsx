import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';

import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';
import { OrdersHistoryTable } from 'entities/order/ui/OrdersHistoryTable';
import { typicodeApi, Order } from 'shared/api';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await typicodeApi.getOrdersHistory({ req });

  return {
    props: {
      data,
    },
  };
};

interface Props {
  data: Order[];
}

const OrderHistory = ({ data }: Props): ReactElement => {
  return (
    <MainLayout>
      <Header />
      <OrdersHistoryTable data={data} />
      <Footer />
    </MainLayout>
  );
};

OrderHistory.auth = true;

export default OrderHistory;
