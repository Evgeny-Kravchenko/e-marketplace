import React, { ReactElement, useCallback } from 'react';
import Link from 'next/link';

import { Typography, styled } from '@mui/material';

import { Header, Footer } from 'widgets';
import { MainLayout } from 'shared/layouts';
import {
  useOrderItems,
  useIsOrderItemsEmpty,
  useOrderCount,
  useOrderTotalPrice,
} from 'entities/order/model';
import { OrdersTable, OrdersResult } from 'entities/order/ui';
import { DeleteFromCart, CheckoutOrder, ChangeOrderQuantity } from 'features';
import { Product } from 'shared/api';
import { PageTitle } from 'shared/ui';

const ShoppingCartContentContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'repeat(1, 1fr)',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const ShoppingCartTableContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    gridColumn: '1 / span 3',
  },
}));

const ShoppingCartCheckoutContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    gridColumn: '4 / span',
  },
}));

const Cart = (): ReactElement => {
  const orderItems = useOrderItems();
  const orderCount = useOrderCount();
  const isOrderItemsEmpty = useIsOrderItemsEmpty();
  const orderTotalPrice = useOrderTotalPrice();

  const changeOrderQuantity = useCallback(
    (orderItem: Product) => <ChangeOrderQuantity orderItem={orderItem} />,
    []
  );

  const deleteFromCartFeature = useCallback(
    (id: string) => <DeleteFromCart id={id} />,
    []
  );

  const checkoutFeature = useCallback(() => <CheckoutOrder />, []);

  return (
    <MainLayout title='Shopping cart'>
      <Header />
      <main>
        <PageTitle>Shopping cart</PageTitle>
        <ShoppingCartContentContainer>
          <ShoppingCartTableContainer>
            {!isOrderItemsEmpty && (
              <OrdersTable
                data={orderItems}
                renderDeleteFeature={deleteFromCartFeature}
                renderChangeQuantityFeature={changeOrderQuantity}
              />
            )}
            {isOrderItemsEmpty && (
              <Typography variant='body1' sx={{ fontSize: '2rem' }}>
                Cart is empty. <Link href='/'>Go shopping</Link>
              </Typography>
            )}
          </ShoppingCartTableContainer>
          {!isOrderItemsEmpty && (
            <ShoppingCartCheckoutContainer>
              <OrdersResult
                renderAction={checkoutFeature}
                orderCount={orderCount}
                totalPrice={orderTotalPrice}
              />
            </ShoppingCartCheckoutContainer>
          )}
        </ShoppingCartContentContainer>
      </main>
      <Footer />
    </MainLayout>
  );
};

export default Cart;
