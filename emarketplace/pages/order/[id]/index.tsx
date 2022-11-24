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

import { PayPalBtnPayment } from 'features/Payment/PayPal';

import { styled, Stack } from '@mui/material';

const ContentContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
}));

const CardsContainer = styled(Stack)(({ theme }) => ({
  gridColumn: '1 / 2',
  [theme.breakpoints.up('md')]: {
    gridColumn: '1 / span 4',
  },
  [theme.breakpoints.up('lg')]: {
    gridColumn: '1 / span 5',
  },
}));

const AsideContainer = styled('div')(({ theme }) => ({
  gridColumn: '1 / 2',
  [theme.breakpoints.up('md')]: {
    gridColumn: '5 / 7',
  },
  [theme.breakpoints.up('lg')]: {
    gridColumn: '6 / 7',
  },
}));

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

  const { isDelivered, paidAt } = order;

  const isPaid = Boolean(paidAt);

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
                <Alert color={isPaid ? 'success' : 'error'} sx={{ fontSize: '1.4rem' }}>
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
              renderAction={
                !isPaid
                  ? () => (
                      <PayPalBtnPayment
                        totalPrice={order.totalPrice}
                        orderId={order._id}
                      />
                    )
                  : null
              }
            />
          </AsideContainer>
        </ContentContainer>
      </main>
      <Footer />
    </MainLayout>
  );
};

(Order as any).auth = true;

export default Order;
