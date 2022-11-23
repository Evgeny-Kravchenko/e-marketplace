import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { Product } from 'shared/api';
import { DeliveiryAddress, PaymentMethod } from 'shared/api';

import { addItemToOrder } from './thunks';

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
  extraReducers: (builder) => {
    builder.addCase(addItemToOrder.fulfilled, (state, action) => {
      if (!action.payload.orderItem.countInStock) {
        action.payload.errorHandler('Product is out of stock');
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
        action.payload.successAction && action.payload.successAction();
        return;
      }
      if (
        action.payload.replaceCount &&
        action.payload.count > action.payload.orderItem.countInStock
      ) {
        action.payload.errorHandler('Product is out of stock');
        return;
      }
      const qantityInCart = state.orderItems.find(
        (item) => item.orderItem.id === action.payload.orderItem.id
      );

      if (qantityInCart) {
        if (
          qantityInCart.count + action.payload.count >
          action.payload.orderItem.countInStock
        ) {
          action.payload.errorHandler('Product is out of stock');
          return;
        }
        state.orderItems = state.orderItems.map((order) =>
          order.orderItem.id === action.payload.orderItem.id
            ? { ...order, count: order.count + action.payload.count }
            : order
        );
        action.payload.successAction && action.payload.successAction();
      } else {
        state.orderItems.push({
          orderItem: action.payload.orderItem,
          count: action.payload.count,
        });
        action.payload.successAction && action.payload.successAction();
      }
    });
  },
  reducers: {
    deleteItemFromOrder(state, action: PayloadAction<{ id: string }>) {
      state.orderItems = state.orderItems.filter(
        (item) => item.orderItem.id !== action.payload.id
      );
    },
    clearOrder(state) {
      const { orderItems } = initialState;
      state.orderItems = orderItems;
    },
    saveShippingAddress(state, action: PayloadAction<DeliveiryAddress>) {
      state.deliveryAddress = { ...state.deliveryAddress, ...action.payload };
    },
    savePaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteItemFromOrder, clearOrder, saveShippingAddress, savePaymentMethod } =
  orderModel.actions;
export const reducer = orderModel.reducer;
