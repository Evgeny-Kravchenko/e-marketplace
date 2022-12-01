import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { Order, Product } from 'shared/api';
import { DeliveiryAddress, PaymentMethod } from 'shared/api';

// import { addItemToOrder } from './thunks';

export interface OrderState {
  orderItems: { orderItem: Product; count: number }[];
  ordersHistory: Order[];
  deliveryAddress: DeliveiryAddress;
  paymentMethod: {
    value: string;
  };
}

const initialState: OrderState = {
  orderItems: [],
  ordersHistory: [],
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
    addItemToOrder() {
      // for saga
      console.log('Slice add item to order action');
    },
    setOrderItems(
      state,
      action: PayloadAction<{ orderItems: { orderItem: Product; count: number }[] }>
    ) {
      console.log('Slice set order items action');
      state.orderItems = action.payload.orderItems;
    },
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
export const {
  deleteItemFromOrder,
  clearOrder,
  saveShippingAddress,
  savePaymentMethod,
  addItemToOrder,
  setOrderItems,
} = orderModel.actions;
export const reducer = orderModel.reducer;
