import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';

import { usePlaceOrderAsync } from 'entities/order/model';
import {
  useOrderItems,
  usePaymentMethod,
  useOrderDelieveryAddress,
  useOrderTotalPrice,
  useShippingPriceValue,
  useTaxPrice,
} from 'entities/order/model';
import { round2 } from 'shared/utils';

export const PlaceOrder = (): ReactElement => {
  const dispatch = useDispatch();
  const { mutateAsync } = usePlaceOrderAsync(dispatch);
  const orderItems = useOrderItems();
  const paymentMethod = usePaymentMethod();
  const shippingAddress = useOrderDelieveryAddress();
  const itemsPrice = useOrderTotalPrice();
  const shippingPrice = useShippingPriceValue();
  const taxPrice = useTaxPrice();

  const handleClick = (): void => {
    mutateAsync({
      orderItems,
      paymentMethod,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice: round2(itemsPrice + shippingPrice + taxPrice),
    });
  };

  return (
    <Button
      fullWidth
      variant='contained'
      color='secondary'
      sx={{ textTransform: 'none', fontSize: '1.6rem' }}
      onClick={handleClick}
    >
      Place Order
    </Button>
  );
};
