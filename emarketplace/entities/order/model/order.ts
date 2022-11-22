import { createSlice, createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { Product } from 'shared/api';
import { DeliveiryAddress, PaymentMethod } from 'shared/api';

export interface OrderState {
  orderItems: { orderItem: Product; count: number }[];
  deliveryAddress: DeliveiryAddress;
  paymentMethod: {
    value: string;
  };
}

const initialState: OrderState = {
  orderItems: [],
  deliveryAddress: {
    fullName: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
  },
  paymentMethod: {
    value: '',
  },
};

export const orderModel = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItemToOrder: (
      state,
      action: PayloadAction<{
        orderItem: Product;
        numInStock: number;
        count: number;
        replaceCount?: boolean;
      }>
    ) => {
      if (!action.payload.numInStock) {
        return;
      }
      if (
        action.payload.replaceCount &&
        action.payload.orderItem.countInStock >= action.payload.count
      ) {
        state.orderItems = state.orderItems.map((order) =>
          order.orderItem.id === action.payload.orderItem.id
            ? { ...order, count: action.payload.count }
            : order
        );
        return;
      }
      if (
        action.payload.replaceCount &&
        action.payload.count > action.payload.numInStock
      ) {
        alert('Product is out of stock');
        return;
      }
      const qantityInCart = state.orderItems.find(
        (item) => item.orderItem.id === action.payload.orderItem.id
      );

      if (qantityInCart) {
        if (qantityInCart.count + action.payload.count > action.payload.numInStock) {
          alert('Product is out of stock');
          return;
        }
        state.orderItems = state.orderItems.map((order) =>
          order.orderItem.id === action.payload.orderItem.id
            ? { ...order, count: order.count + action.payload.count }
            : order
        );
      } else {
        state.orderItems.push({
          orderItem: action.payload.orderItem,
          count: action.payload.count,
        });
      }
    },
    deleteItemFromOrder(state, action: PayloadAction<{ id: string }>) {
      state.orderItems = state.orderItems.filter(
        (item) => item.orderItem.id !== action.payload.id
      );
    },
    clearOrder(state) {
      state.orderItems = [];
    },
    saveShippingAddress(state, action: PayloadAction<DeliveiryAddress>) {
      state.deliveryAddress = { ...state.deliveryAddress, ...action.payload };
    },
    savePaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
  },
});

// selectors

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

// Action creators are generated for each case reducer function
export const {
  addItemToOrder,
  deleteItemFromOrder,
  clearOrder,
  saveShippingAddress,
  savePaymentMethod,
} = orderModel.actions;
export const reducer = orderModel.reducer;
