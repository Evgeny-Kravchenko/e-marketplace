import React, { ReactElement, useMemo, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { CellProps, Column } from 'react-table';

import { Typography, Alert } from '@mui/material';

import { MainLayout } from 'shared/layouts';
import { PageTitle } from 'shared/ui';
import { Header, Footer } from 'widgets';
import { typicodeApi, Order } from 'shared/api';
import { OrderPlacementCard, OrdersTable, OrderSummary } from 'entities/order/ui';
import { Product } from 'shared/api';

import { ContentContainer, CardsContainer, AsideContainer } from './styles';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const order = await typicodeApi.getOrderById(id as string);

  return {
    props: { order },
  };
};

interface Props {
  order: Order;
}

const Order = ({ order }: Props): ReactElement => {
  const { query } = useRouter();
  const orderId = query.id;

  const addressString = useMemo(
    () => Object.values(order.shippingAddress).join(', '),
    [order]
  );

  const changeOrderQuantity = useCallback(
    (orderItem: { count: number } & Product) => (
      <Typography variant='body1' sx={{ fontSize: '1.6rem' }}>
        {orderItem.count}
      </Typography>
    ),
    []
  );

  const additionalColumns = useMemo(() => {
    return [
      {
        id: 'subtotal',
        Header: 'Subtotal',
        accessor: 'subtotal',
        Cell: (props: CellProps<Product & { count: number }>) => (
          <span>{props.row.original.count * Number(props.row.original.price)}</span>
        ),
      },
    ];
  }, []);

  const { isDelivered, isPaid } = order;

  return (
    <MainLayout title={`Order ${orderId}`}>
      <Header />
      <main>
        <PageTitle>{`Order ${orderId}`}</PageTitle>
        <ContentContainer>
          <CardsContainer spacing={2}>
            <OrderPlacementCard
              title='Shipping Address'
              renderAdditional={() => (
                <Alert
                  color={isDelivered ? 'success' : 'error'}
                  sx={{ fontSize: '1.4rem' }}
                >
                  {isDelivered ? `Delivered at ${order.deliveredAt}` : 'Not delivered'}
                </Alert>
              )}
            >
              <Typography variant='body1' sx={{ fontSize: '1.8rem' }}>
                {addressString}
              </Typography>
            </OrderPlacementCard>
            <OrderPlacementCard
              title='Payment'
              renderAdditional={() => (
                <Alert
                  color={isDelivered ? 'success' : 'error'}
                  sx={{ fontSize: '1.4rem' }}
                >
                  {isPaid ? `Paid at ${order.paidAt}` : 'Not paid'}
                </Alert>
              )}
            >
              <Typography variant='body1' sx={{ fontSize: '1.8rem' }}>
                {order.paymentMethod.value}
              </Typography>
            </OrderPlacementCard>
            <OrderPlacementCard title='Order items'>
              <OrdersTable
                data={order.orderItems}
                renderChangeQuantityFeature={changeOrderQuantity}
                additionalColumns={additionalColumns as ReadonlyArray<Column<object>>}
              />
            </OrderPlacementCard>
          </CardsContainer>
          <AsideContainer>
            <OrderSummary
              itemsPrice={order.itemsPrice}
              tax={order.taxPrice}
              shipping={order.shippingPrice}
              total={order.totalPrice}
            />
          </AsideContainer>
        </ContentContainer>
      </main>
      <Footer />
    </MainLayout>
  );
};

Order.auth = true;

export default Order;
