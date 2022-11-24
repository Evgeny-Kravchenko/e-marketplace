import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { DeliveiryAddress, Order, PaymentMethod, Product } from 'shared/api';
import { RootState } from 'app/store';
import { round2 } from 'shared/utils';

export const useOrderCount = (): number =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.orderItems,
      (items) => items.reduce((acc, item) => acc + item.count, 0)
    )
  );

export const useOrderItems = (): { orderItem: Product; count: number }[] =>
  useSelector(
    createSelector(
      (state: RootState) => state.order,
      (order) => order.orderItems
    )
  );

export const useIsOrderItemsEmpty = (): boolean =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.orderItems,
      (orderItems) => !orderItems.length
    )
  );

export const useOrderTotalPrice = (): number =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.orderItems,
      (items) =>
        items.reduce(
          (acc, item) => acc + item.count * parseFloat(item.orderItem.price),
          0
        )
    )
  );

export const useOrderItemQuantityById = (id: string): number =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.orderItems,
      (items) => items.find((item) => item.orderItem.id === id).count || 0
    )
  );

export const useOrderDelieveryAddress = (): DeliveiryAddress =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.deliveryAddress,
      (delieveryAddress: DeliveiryAddress) => delieveryAddress
    )
  );

export const usePaymentMethod = (): PaymentMethod =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.paymentMethod,
      (paymentMethod: PaymentMethod) => paymentMethod
    )
  );

export const useIsDeliverInfo = (): boolean =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.deliveryAddress,
      (deliveryAddress: DeliveiryAddress) => Boolean(deliveryAddress.fullName)
    )
  );

export const useTaxPrice = (): number => {
  const itemsTotalPrice = useOrderTotalPrice();

  return round2(itemsTotalPrice * 0.15);
};

export const useShippingPriceValue = (): number => {
  const itemsTotalPrice = useOrderTotalPrice();

  return itemsTotalPrice > 200 ? 0 : 15;
};
