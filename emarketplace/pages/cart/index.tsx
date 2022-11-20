import React, { ReactElement, useCallback } from 'react';
import Link from 'next/link';

import { Typography } from '@mui/material';

import { Header, Footer } from 'widgets';
import { MainLayout } from 'shared/layouts';
import {
  useOrderItems,
  useIsOrderItemsEmpty,
  useOrderCount,
  useOrderTotalPrice,
} from 'entities/order/model';
import { OrdersTable, OrdersResult } from 'entities/order/ui';
import { DeleteFromCart, CheckoutOrder } from 'features';

import {
  ShoppingCartPageTitle,
  ShoppingCartContentContainer,
  ShoppingCartTableContainer,
  ShoppingCartCheckoutContainer,
} from './styles';

const Cart = (): ReactElement => {
  const orderItems = useOrderItems();
  const orderCount = useOrderCount();
  const isOrderItemsEmpty = useIsOrderItemsEmpty();
  const orderTotalPrice = useOrderTotalPrice();

  const deleteFromCartFeature = useCallback(
    (id: string) => <DeleteFromCart id={id} />,
    []
  );

  const checkoutFeature = useCallback(() => <CheckoutOrder />, []);

  return (
    <MainLayout title='Shopping cart'>
      <Header />
      <main>
        <ShoppingCartPageTitle variant='h1'>Shopping cart</ShoppingCartPageTitle>
        <ShoppingCartContentContainer>
          <ShoppingCartTableContainer>
            {!isOrderItemsEmpty && (
              <OrdersTable data={orderItems} renderAction={deleteFromCartFeature} />
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
